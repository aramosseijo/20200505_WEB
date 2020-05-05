var IBAN = (function()
{
    var paisOmision = 'es';

    //============================================
    // PUBLISHED

    /*
      El parámetro numero puede ser un CCC o un IBAN
      Si es un CCC retorna el IBAN correspondiente
      Si es un IBAN lo formatea
      Avisa si es un CCC incorrecto o un IBAN incorrecto

      Ejemplo1: IBAN.convertir('12345') --> 'Error: No es IBAN ni CCC'
      Ejemplo2: IBAN.convertir('ES0012345678061234567890') --> 'Error: IBAN incorrecto'
      Ejemplo3: IBAN.convertir('ES5212345678001234567890') --> 'Error: CCC incorrecto'
      Ejemplo4: IBAN.convertir('ES6812345678061234567890') --> 'ES68 1234 5678 0612 3456 7890'
      Ejemplo5: IBAN.convertir('1234-5678-06-1234567890') --> 'ES68 1234 5678 0612 3456 7890'
    */
    function convertir(numero, pais) {
        numero = limpiar(numero);
        var iban = numero.substr(numero.length-24, 24);
        var ccc = numero.substr(numero.length-20, 20);
        if (!esIBAN(numero) && !esCCC(numero)) return 'Error: No es IBAN ni CCC';
        else if (esIBAN(numero) && !validarIBAN(iban)) return 'Error: IBAN incorrecto'; 
        else if (!validarCCC(ccc)) return 'Error: CCC incorrecto';
        else if (esIBAN(numero)) return formatearIBAN(iban);
        else return formatearIBAN(calcularIBAN(ccc, pais));
    }

    // Ejemplo: IBAN.calcular('1234-5678-??-1234567890') --> 'ES6812345678061234567890' (68 y 06)
    function calcular(numero, pais) {
        numero = limpiar(numero);
        if (esCCC(numero)) {
            var dc = numero.substr(8,2);
            if (!sonDigitos(dc)) numero = calcularCCC(numero);
            return calcularIBAN(numero, pais);
        }
        else return numero;
    }

    // Ejemplo1: IBAN.validar('ES68 1234 5678 0612 3456 7890') --> true (68)
    // Ejemplo2: IBAN.validar('1234-5678-06-1234567890') --> true (06)
    function validar(numero) {
        numero = limpiar(numero);
        if (esIBAN(numero)) return validarIBAN(numero);
        else if (esCCC(numero)) return validarCCC(numero);
        else return false;
    }

    // Ejemplo: IBAN.formatear('12345678061234567890') --> '1234-5678-06-1234567890'
    // Ejemplo: IBAN.formatear('ES6812345678061234567890') --> 'ES68 1234 5678 0612 3456 7890'
    function formatear(numero, separador) {
        numero = limpiar(numero);
        if (esIBAN(numero)) return formatearIBAN(numero, separador);
        else if (esCCC(numero)) return formatearCCC(numero, separador);
        else return '';
    }

    //============================================
    // HIGH LEVEL

    /*
      Cómo se calcula los dígitos de control del IBAN
      a) Se añade al final de la BBAN, el código del país
         según la norma ISO 3166-1 y dos ceros.
      b) Si en el BBAN hay letras, convierte estas letras en números del 10 al 35,
         siguiendo el orden del abecedario; A=10 y Z=35.
      c) Divide el número por 97, y quédate con el resto.
      d) Réstale a 98 el resto que te quede
      e) Ya tenemos los dígitos de control, si la diferencia es menor a 10,
         añade un 0 a la izquierda.
    */

    // Ejemplo: calcularIBAN('1234-5678-06-1234567890', 'es') --> 'ES6812345678061234567890'
    function calcularIBAN(ccc, pais) {
        ccc = limpiar(ccc);
        pais = (pais==undefined? paisOmision: pais).toUpperCase();
        var cifras = ccc + valorCifras(pais) + '00';
        var resto = modulo(cifras, 97);
        return pais + cerosIzquierda(98-resto, 2) + ccc;
    }

    // Ejemplo1: validarIBAN('ES00 1234 5678 0612 3456 7890') --> false
    // Ejemplo2: validarIBAN('ES68 1234 5678 0612 3456 7890') --> true
    function validarIBAN(iban) {
        iban = limpiar(iban);
        var pais = iban.substr(0, 2);
        var dc = iban.substr(2, 2);
        var cifras = iban.substr(4, 20) + valorCifras(pais) + dc;
        resto = modulo(cifras, 97);
        return resto == 1;
    }

    // Ejemplo1: validarCCC('1234-5678-00-1234567890') --> false
    // Ejemplo2: validarCCC('1234-5678-06-1234567890') --> true
    function validarCCC(ccc) {
        ccc = limpiar(ccc);
        var items = formatearCCC(ccc, ' ').split(' ');
        var dc = modulo11(items[0] + items[1]) + '' + modulo11(items[3]);
        return dc == items[2];
    }


    // Ejemplo: calcularCCC('1234-5678-??-1234567890') --> '12345678061234567890'
    function calcularCCC(ccc) {
        ccc = limpiar(ccc);
        return ccc.substr(0,8) + calcularDC(ccc) + ccc.substr(10,10);
    }

    // Ejemplo: calcularDC('1234-5678-??-1234567890') --> '06'
    function calcularDC(ccc) {
        ccc = limpiar(ccc);
        var items = formatearCCC(ccc, ' ').split(' ');
        return modulo11(items[0] + items[1]) + '' + modulo11(items[3]);
    }

    // Ejemplo: formatearCCC('12345678061234567890') --> '1234-5678-06-1234567890'
    function formatearCCC(ccc, separador) {
        ccc = limpiar(ccc);
        if (separador==undefined) separador = '-';
        return ccc.substr(0,4) + separador + ccc.substr(4,4) + separador +
              ccc.substr(8,2) + separador + ccc.substr(10,10);
    }

    // Ejemplo: formatearIBAN('ES6812345678061234567890') --> 'ES68 1234 5678 0612 3456 7890'
    function formatearIBAN(iban, separador) {
        iban = limpiar(iban);
        if (separador==undefined) separador = ' ';
        var items = [];
        for (var i=0; i<6; i++) { items.push(iban.substr(i*4, 4)); }
        return items.join(separador);
    }

    //============================================
    // LOW LEVEL

    function esCCC(cifras) {
        ////return /^(\d{20})$/i.test(cifras);
        return cifras.length == 20;
    }

    function esIBAN(cifras) {
        ////return /^(\d{24})$/i.test(cifras);
        return cifras.length == 24;
    }

    // Ejemplo1: sonDigitos('1234') --> true
    // Ejemplo2: sonDigitos('12e4') --> false
    function sonDigitos(cifras) {
        var er = new RegExp('^(\\d{'+cifras.length+'})$', 'i');
        return er.test(cifras);
    }

    // Ejemplo: limpiar('IBAN1234 5678-90') --> '1234567890'
    function limpiar(numero) {
        numero = ''+numero;  
        return numero
                .replace(/IBAN/g, '')
                .replace(/ /g, '')
                .replace(/-/g, '');
    }

    // Ejemplo: modulo('12345678061234567890142800', 97) --> 30
    function modulo(cifras, divisor) {
        /*
        El entero más grande en Javascript es 9.007.199.254.740.990 (2^53)
        que tiene 16 cifras, de las cuales las 15 últimas pueden tomar cualquier valor.
        El divisor y el resto tendrán 2 cifras. Por lo tanto CUENTA como tope
        puede ser de 13 cifras (15-2) y como mínimo de 1 cifra.
        */
        var CUENTA = 10;
        var largo = cifras.length;
        var resto = 0;
        for (var i=0; i<largo; i+=CUENTA) {
            var dividendo = resto + '' + cifras.substr(i, CUENTA);
            resto = dividendo % divisor;
        }
        return resto;
    }

    // Ejemplo1: modulo11('12345678') --> '0'
    // Ejemplo2: modulo11('1234567890') --> '6'
    function modulo11(cifras) {
        var modulos = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6]; //2^index % 11
        var suma = 0;
        var cifras = cerosIzquierda(cifras, 10);
        for (var i=0; i<cifras.length; i++) {
            suma += parseInt(cifras[i]) * modulos[i];
        }
        var control = suma % 11;
        return control < 2? control: 11 - control;
    }

    // Ejemplo: cerosIzquierda('7', 3) --> '007'
    function cerosIzquierda(cifras, largo) {
        cifras += '';
        while(cifras.length < largo) { cifras = '0'+cifras; }
        return cifras;
    }

    // Ejemplo: valorCifras('es') --> '1428'
    function valorCifras(cifras) {
        var LETRAS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // A=10, B=11, ... Z=35
        var items = [];
        for (var i=0; i<cifras.length; i++) {
            var posicion = LETRAS.indexOf(cifras[i]);
            items.push(posicion < 0? '-': posicion);
        }
        return items.join('');
    }

    //--------------------------------------------

    return {
        convertir: convertir,
        calcular: calcular,
        validar: validar,
        formatear: formatear,
    };

})();

/* FIN */


function validateIBAN () {    
    if(document.getElementById('numerocuenta') != null){        
        iban_aux = IBAN.formatear(document.getElementById('numerocuenta').value);        
        if(document.getElementById('mediopago').value == 'domiciliacion'){
            if(!IBAN.validar(iban_aux)){
                alert('${web_form_formapago_IBAN_incorrecto}');
                selectTextInput(document.getElementById('numerocuenta'));
                return false;
                
            } else {
                document.getElementById('numerocuenta').value=IBAN.convertir(iban_aux);
                return true;
            }
            
        } else {
            return true;
        }
        
    }
}

// Sobrecarga la función de validación de datos para incluir la validación de los campos de las formas de pago
(function () {
    var tmpCheckFields = check_fields;
    check_fields = function () {
                        if (tmpCheckFields) return (tmpCheckFields() && validateIBAN());
                        return validateIBAN();
                   }
})();
    
// Adapta el formulario en función del valor de la periodicidad    
function adaptaPeriodicidad() {
    
	var o_periodicidad = document.getElementById('periodicidad');   // Recupera el elemento html de periodicidad
    var v_periodicidad = o_periodicidad.options[o_periodicidad.selectedIndex].value;
	var o_mediopago = document.getElementById('mediopago');   // Recupera el elemento html de medio de pago
	var v_mediopago = o_mediopago.options[o_mediopago.selectedIndex].value;
	
    // Si la periodicidad tiene un valor y no es puntual marca el medio de pago como 'Domiciliación' 
    if (v_periodicidad && v_periodicidad != 'puntual' && v_mediopago == 'tarjeta' ) {
		if (confirm('${web_form_periodicidad_puntual}')) {
			setSelectValue(o_mediopago, 'domiciliacion');
			adaptaMedioPago();
		} else {
			setSelectValue(o_periodicidad, o_periodicidad.prev_value);
			return false;
		}
    } 
	
	o_periodicidad.prev_value = v_periodicidad;
}

// Adapta el formulario en función del valor del medio de pago
function adaptaMedioPago() {
	var o_mediopago = document.getElementById('mediopago');   // Recupera el elemento html de medio de pago
    var v_mediopago = o_mediopago.options[o_mediopago.selectedIndex].value;
	var o_periodicidad = document.getElementById('periodicidad');   // Recupera el elemento html de periodicidad
    var v_periodicidad = o_periodicidad.options[o_periodicidad.selectedIndex].value;

	// Si el medio de pago ha cambiado a tarjeta, comprueba la periodicidad
	if (v_mediopago == 'tarjeta' && v_periodicidad && v_periodicidad != 'puntual') {
		if (confirm('${web_form_mediopago_puntual}')) {
			// Si se quiere continuar, se indica periodicidad puntual
			setSelectValue(o_periodicidad, 'puntual');
		} else {
			setSelectValue(o_mediopago, o_mediopago.prev_value);
			return false;
		}
	}
	
    // Si el medio de pago es una domiciliación muestra el campo numero de cuenta y lo marca como requerido
    if (v_mediopago == 'domiciliacion') {
        showTR('numerocuenta');
        add_required('numerocuenta');
    } else {
	    hideTR('numerocuenta');
        remove_required('numerocuenta');
    } 
	o_mediopago.prev_value = v_mediopago;
}

// Cambia la visibilidad de un campo
function changeVisibility(field, visibility) {
    var o_tr = document.getElementById('tr_' + field);
    if (o_tr) {
        o_tr.style.display = visibility;
    }
}

// Muestra un campo oculto
function showTR(field) {
    changeVisibility(field,'table-row');
}

// Oculta un campo
function hideTR(field) {
    changeVisibility(field,'none');
}
