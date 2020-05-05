// Valida las direcciones de correo si se han añadido
function validateMails() {
	var fields = ['email1','email2'];
	var ret = true;
	for (var i=0; i<fields.length && ret;i++) {
		ret = validateEmailAdd(document.getElementById(fields[i]));
	}
	return ret;
}

// Valida una dirección de correo
function validateEmailAdd(obj){
	if (obj != null && obj.value.length > 0 && obj.value.match({$regex}) == null) {
		var label = document.getElementById('lbl_'+obj.id);
		alert('${web_not_valid_email_address}' + ': ' + label.textContent.replace(/: +$/, ''));
		selectTextInput(obj);
		return false;
	} else {
		return true;
	}
}

// Función encargada de dar contenido al campo 'nombre de cuenta'
function fn_autorrellenar() {
    var account = document.getElementById('account_name');
    var first_name = document.getElementById('first_name');
    var last_name = document.getElementById('last_name');
    if (account) {
        account.value =  ( (first_name && first_name.value) ? first_name.value + ' ' : '' );
        account.value += ( (last_name && last_name.value) ? last_name.value : '' );
    }
}

// Función de envio del formulario
function submit_form() {
    if (check_fields()) {
        if (typeof(validateCaptchaAndSubmit) != 'undefined') {
            validateCaptchaAndSubmit();
        } else {
            document.WebToLeadForm.submit();
        }
    }    
    return false;
}

// Anade un campo como requerido
function add_required (field) {
    var reqs=document.getElementById('req_id').value;
    if (-1 == reqs.search(field+';')) {
        document.getElementById('req_id').value += field + ';';
    }
}

// Elimina un campo como requerido
function remove_required (field) {
    var reqs=document.getElementById('req_id').value;
    document.getElementById('req_id').value = reqs.replace(field + ';','');
}

function check_fields(){
    // Sustituye los campos booleanos
    if(document.getElementById('bool_id') != null){
        var reqs=document.getElementById('bool_id').value;
        bools = reqs.substring(0,reqs.lastIndexOf(';'));
        var bool_fields = new Array();
        var bool_fields = bools.split(';');
        nbr_fields = bool_fields.length;
        for(var i=0;i<nbr_fields;i++) {
            if(document.getElementById(bool_fields[i]).value == 'on') {
                document.getElementById(bool_fields[i]).value = 1;
            } else {
                document.getElementById(bool_fields[i]).value = 0;
            }
        }
    }
    // Comprueba los campos requeridos
    var req = true;
    if(document.getElementById('req_id') != null) {
        var reqs=document.getElementById('req_id').value;
        reqs = reqs.substring(0,reqs.lastIndexOf(';'));
        var req_fields = new Array();
        var req_fields = reqs.split(';');
        nbr_fields = req_fields.length;
        for(var i=0;i<nbr_fields;i++) {
            if(document.getElementById(req_fields[i]).value.length <=0 || document.getElementById(req_fields[i]).value==0){
                req = false;
                break;  
            }
        }
    }
    // Si no estan todos los campos requeridos muestra un mensaje de error
    if (! req) {
        alert('${web_form_required_fileds_msg}');
        return false;
    } else if (! validateNifCif()) {	// Valida el nif/cif
        return false;
    } else if (! validateMails()) {    	// Valida los campos de correo
    	return false;
    } else {
    	// Si estan todos los campos requeridos autorrellena los campos
        fn_autorrellenar();
        // Si todo es correcto saldrá por este punto
        return true; 
    } 
}

/**
 * Comprueba los campos CIF y/o NIF
 */
function validateNifCif () {
    var nif = document.getElementById('numeroidentificacion_c');
    var cif = document.getElementById('cif_c');
    if (nif && ! isValidDNI(nif.value)) {
        label = ' ';
        if (nif.labels && nif.labels[0]) {
            label += nif.labels[0].textContent;
        }
        alert('${web_form_invalid_format}'+ label);
        nif.focus();
        return false;
    }
    if (cif && ! isValidCif(cif.value) && ! isValidDNI(cif.value)) {
        label = ' ';
        if (cif.labels && cif.labels[0]) {
            label += cif.labels[0].textContent;
        }
        alert('${web_form_invalid_format}'+ label);
        cif.focus();
        return false;
    }
    return true;   
}

// comprobamos con cada cambio de valor en el campo que solo se admiten numero y el separador
// de decimales '.'
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57)){
            return false;
    }
	if (charCode == 46) {
		var evento = evt || event;
		var dots = evento.currentTarget.value.match(/\./g);		// Si ya hay un punto no permite añadir otro
		if (dots && dots.length > 0) return false;
		if (evento.currentTarget.value.length == 0) evento.currentTarget.value = '0';	// Si el punto está al inicion incluye un 0
	}
    return true;
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

// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
// Acepta NIEs (Extranjeros con X, Y o Z al principio)
// http://trellat.es/funcion-para-validar-dni-o-nie-en-javascript/
function isValidDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        }else{
            //alert('Dni correcto');
            return true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}

// Asigna un valor a un campo select 
function setSelectValue (select, value) {

    for(var i=0; i<select.options.length; i++) {
        if (select.options[i].value == value) {
            select.options[i].selected = true;
        } else {
            select.options[i].selected = false;
        }
    }
    
    // Guarda el valor previo
	select.prev_value = select.options[select.selectedIndex].value;
	
}

/**
 * Selecciona el texto de un input text del formulario
 * @param input Objeto del que se seleccionará el texto
 * @returns void
 */
function selectTextInput(input) {
	input.setSelectionRange(0, input.value.length);
	input.focus();
}
