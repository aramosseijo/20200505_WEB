

//Cambia la visibilidad de un campo
function changeVisibility(field, visibility) {
    var o_td = document.getElementById('td_' + field);
    var o_td_lbl = document.getElementById('td_lbl_' + field);
    
    if (o_td) {
    	o_td.style.display = visibility;
    }
    
    if (o_td_lbl) {
    	o_td_lbl.style.display = visibility;
    }
}

// Muestra un campo oculto
function showField(field) {
    changeVisibility(field,'table-cell');
}

// Oculta un campo
function hideField(field) {
    changeVisibility(field,'none');
}



// Función de envio del formulario
function submit_form(form) {
    if (check_fields()) {
        if (typeof(validateCaptchaAndSubmit) != 'undefined') {
            validateCaptchaAndSubmit();
        } else {
            form.submit();
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
    var requiredLabel = document.getElementById('lbl_'+field+'_required');
    if (! requiredLabel) {
    	var rlParent = document.getElementById('td_lbl_'+field);
    	if (rlParent) {
    		var newLabel = document.createElement('span');
    		newLabel.id = "lbl_"+field+"_required";
    		newLabel.class = "required";
    		newLabel.style = "color: rgb(255, 0, 0);";
    		newLabel.innerText = APP_LBL_REQUIRED_SYMBOL;
    		rlParent.appendChild(newLabel);
    	}
    }
}

// Elimina un campo como requerido
function remove_required (field) {
    var reqs=document.getElementById('req_id').value;
    document.getElementById('req_id').value = reqs.replace(field + ';','');
    var requiredLabel = document.getElementById('lbl_'+field+'_required');
    if (requiredLabel) {requiredLabel.parentNode.removeChild(requiredLabel);}
}

function check_fields(){

	// Comprueba los campos requeridos, los campos de nif/cif, los mails y los campos de fecha
    if (! validateRequired() || ! validateNifCif() || ! validateMails() || ! validateDates()) {  
    	return false;
    } else {
        // Si todo es correcto substituye los campos booleanos
    	var boolHidden = document.getElementById('bool_id');
        if(boolHidden != null){
            var reqs=boolHidden.value;
            if (reqs.length) {	// Si hay campos booleanos los trata
    	        bools = reqs.substring(0,reqs.lastIndexOf(';'));
    	        var bool_fields = new Array();
    	        var bool_fields = bools.split(';');
    	        nbr_fields = bool_fields.length;
    	        for(var i=0;i<nbr_fields;i++) {
    	        	var element = document.getElementById(bool_fields[i]);
    	        	element.value == (element.value == 'on' ? 1 : 0);
    	        }
            }
        }
        return true; 
    } 
}

/**
 * Comprueba el formato de los campos de fecha
 */
function validateDates() {
	var elements = $.find('input[type=text].date_input');
	
	if (elements && elements.length > 0 ) {
		for (var i=0;i<elements.length;i++) {
			// El campo puede no ser obligatorio, por lo tanto, solo se valida si el elemento tiene algun valor
			if (elements[i].value && ! validateDate(elements[i].value)) {
				var label = document.getElementById('lbl_'+elements[i].id);
				alert(STIC_WebForm_LBL_INVALID_FORMAT + ': ' + label.textContent.trim().replace(/:$/, ''));
				selectTextInput(elements[i]);
				return false;
			}
		}
	}
	return true;
}

/**
 * Valida una fecha usando el formato indicado en APP_DATE_FORMAT. No tiene en cuenta si el año es bisiesto
 * @param date
 * @returns {Boolean}
 */
function validateDate(date) {
	var number = /\d+/g;
	var numbers = [];
	var match = number.exec(date);
	while (match != null) {
	    numbers.push(match[0]);
	    match = number.exec(date);
	}
	if (numbers.length != 3) return false;	// si no tenemos tres campos numéricos, seguro que no es una fecha
	
	var format = /\%Y|\%m|\%d/g;
	var fields = [];
	match = format.exec(APP_DATE_FORMAT);	// Separamos los campos del formato
	while (match != null) {
	    fields.push(match[0]);
	    match = format.exec(APP_DATE_FORMAT);
	}
	
	var idxFields = [];	// Indexa los campos para poder acceder a ellos directamente
	for (var i = 0; i < fields.length; i++) {
		idxFields[fields[i].replace('%','')] = i;
	}
	
	// Recupera los valores de cada campo
	var day = numbers[idxFields.d];
	var month = numbers[idxFields.m];
	var year = numbers[idxFields.Y];

	// Comprueba la longitud de los campos
	if (month.length != 2 || day.length != 2 || year.length != 4) return false;
	
	// Comprueba el formato de separadores
	if (date.replace(number,'') != APP_DATE_FORMAT.replace(format,'')) return false;

	day = parseInt(day);
	month = parseInt(month);
	year = parseInt(year);
	
	// Comprueba el valor del mes y el día
	if (month > 12 || month < 1) return false;
	else {
		if (day < 1) return false;
		switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10: 
			case 12: return day <= 31;
			case 2:  return day <= 29; // no se tiene en cuenta los años bisiestos
			case 4:
			case 6:
			case 9:
			case 11: return day <= 30;	
		}
	}
}

/**
 * Comprueba los campos requeridos
 * @returns {Boolean}
 */
function validateRequired() {
	// Comprueba los campos requeridos
    var reqHidden = document.getElementById('req_id');
    if( reqHidden != null) {
        var reqs=reqHidden.value;
        if (reqs.length) {	// Si hay campos requeridos los comprueba
	        reqs = reqs.substring(0,reqs.lastIndexOf(';'));
	        var req_fields = new Array();
	        var req_fields = reqs.split(';');
	        nbr_fields = req_fields.length;
	        for(var i=0;i<nbr_fields;i++) {
	        	var element = document.getElementById(req_fields[i]);
	            if(element.value.length <=0 || element.value==0){
	            	alert(STIC_WebForm_LBL_PROVIDE_WEB_FORM_FIELDS);
	                selectTextInput(element);
	                return false;
	                break;  
	            }
	        }
        }
    }
    return true;
}

/**
 * Valida los mails del formulario
 * @returns {Boolean}
 */
function validateMails() {
	var fields = ['Contacts___email1','Contacts___email2','Accounts___email1','Accounts___email2'];
	var ret = true;
	for (var i=0; i<fields.length && ret;i++) {
		ret = validateEmailAdd(document.getElementById(fields[i]));
	}
	return ret;
}

/**
 * Valida una dirección de correo
 * @param obj Objeto DOM del input que contiene el correo
 * @returns {Boolean}
 */
function validateEmailAdd(obj){
	if (obj != null && obj.value.length > 0 && ! isValidEmail(obj.value)) {
		var label = document.getElementById('lbl_'+obj.id);
		alert(STIC_WebForm_LBL_INVALID_FORMAT + ': ' + label.textContent.replace(/: +$/, ''));
		selectTextInput(obj);
		return false;
	} else {
		return true;
	}
}

/**
 * Comprueba los campos CIF y/o NIF
 */
function validateNifCif () {
    var nif = document.getElementById('Contacts___numeroidentificacion_c');
    var cif = document.getElementById('Accounts___cif_c');
    // Los campos nif y cif pueden no ser obligatorios, por tanto, si no tienen ningún valor, no es necesario validarlos
    if (nif && nif.value && ! isValidDNI(nif.value)) {
        label = ' ';
        if (nif.labels && nif.labels[0]) {
            label += nif.labels[0].textContent;
        }
        alert(STIC_WebForm_LBL_INVALID_FORMAT+ label);
        nif.focus();
        return false;
    }
    if (cif && cif.value && ! isValidCif(cif.value) && ! isValidDNI(cif.value)) {
        label = ' ';
        if (cif.labels && cif.labels[0]) {
            label += cif.labels[0].textContent;
        }
        alert(STIC_WebForm_LBL_INVALID_FORMAT + label);
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
 * Formatea campos de importe
 */
function formatCurrency (input) {
	var value = Number(input.value);
	if (! isNaN(value)) {
		input.value = value.toFixed(2);
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

// Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).
// Acepta NIEs (Extranjeros con X, Y o Z al principio)
// http://trellat.es/funcion-para-validar-dni-o-nie-en-javascript/
function isValidDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if (expresion_regular_dni.test(dni) === true) {
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        return (letra == let);
    } else {
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
	if (typeof input.setSelectionRange != 'undefined') {
		input.setSelectionRange(0, input.value.length);
	}
	input.focus();
}
