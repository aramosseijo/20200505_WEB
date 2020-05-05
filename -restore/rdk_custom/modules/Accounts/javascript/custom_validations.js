
var modulo = "Accounts";


/**
 * Realiza validaciones de la relación con la Persona/Organización y calcula el nombre 
 */
function customCheckForm() {
	// Elimina y añade la validación del DNI para evitar que se elimine del array de validaciones en la carga del formulario y 
	// evitar que se duplique la validación en caso de guardar varias veces
	validationStatus(getFormElementById('cif_c'),
											{"field": "cif_c", "label": "LBL_CIF", "validation": 
												{"type": "callback",
												 "required": false,
												 "func": validateId, 
												 "msg": "LBL_CIF_ERRONEO"}}, 
											false);
	validationStatus(getFormElementById('cif_c'),
											{"field": "cif_c", "label": "LBL_CIF", "validation": 
												{"type": "callback",
												 "required": false,
												 "func": validateId, 
												 "msg": "LBL_CIF_ERRONEO"}}, 
											true);
	return true;
}


/**
* Comprueba el campo LBL_CIF
*/
function validateId () {
	var idEl = getFormElementById('cif_c');
	// Aceptará tanto CIF como NIF
	return isValidDNI(idEl.value) || isValidCif(idEl.value);
}

/** 
* Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
* Acepta NIEs (Extranjeros con X, Y o Z al principio)
* http://trellat.es/funcion-para-validar-dni-o-nie-en-javascript/
*/
function isValidDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if (expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

/**
 * Valida si un cif es válido
 * Adaptada para javascript desde su original en:
 * http://www.michublog.com/informatica/8-funciones-para-la-validacion-de-formularios-con-expresiones-regulares 
 */
function isValidCif(cif) {
    cif.toUpperCase();
             
    cifRegEx1 = /^[ABEH][0-9]{8}/i;
    cifRegEx2 = /^[KPQS][0-9]{7}[A-J]/i;
    cifRegEx3 = /^[CDFGJLMNRUVW][0-9]{7}[0-9A-J]/i;
	
    if (cif.match(cifRegEx1) || cif.match(cifRegEx2) || cif.match(cifRegEx3)) {
    	control = cif.charAt(cif.length-1);
    	suma_A = 0;
    	suma_B = 0;
    	 
    	for (i = 1; i < 8; i++) {
    		if (i % 2 == 0) suma_A += parseInt(cif.charAt(i));
    		else {
    			t = (parseInt(cif.charAt(i)) * 2).toString();
    			p = 0;
    			 
    			for (j = 0; j < t.length; j++) {
    				p += parseInt(t.charAt(j));
    			}
    			suma_B += p;
    		}
    	}
    	 
    	suma_C = (parseInt(suma_A + suma_B)) + '';	// Así se convierte en cadena
    	suma_D = (10 - parseInt(suma_C.charAt(suma_C.length - 1))) % 10;
    	 
    	letras = 'JABCDEFGHI';
    	 
    	if (control >= '0' && control <= '9') return (control == suma_D);
    	else return (control.toUpperCase() == letras[suma_D]);
    }
    else return false;
}