
var modulo = "Contacts";


/**
 * Realiza validaciones de la relación con la Persona/Organización y calcula el nombre 
 */
function customCheckForm() {
	// Elimina y añade la validación del DNI para evitar que se elimine del array de validaciones en la carga del formulario y 
	// evitar que se duplique la validación en caso de guardar varias veces
	validationStatus(getFormElementById('numeroidentificacion_c'),
											{"field": "numeroidentificacion_c", "label": "LBL_NUMEROIDENTIFICACION", "validation": 
												{"type": "callback",
												 "required": false,
												 "func": validateId, 
												 "msg": "LBL_NUMEROIDENTIFICACION_ERRONEO"}}, 
											false);
	validationStatus(getFormElementById('numeroidentificacion_c'),
											{"field": "numeroidentificacion_c", "label": "LBL_NUMEROIDENTIFICACION", "validation": 
												{"type": "callback",
												 "required": false,
												 "func": validateId, 
												 "msg": "LBL_NUMEROIDENTIFICACION_ERRONEO"}}, 
											true);
	return true;
}

/**
 * Modifica la visibilidad de los campos relacionados con el Número de Cuenta
 */
function visibilidadOtroSector(visible) {
	var fields = [{"field": "otrosectorprofesional_c", "label": "LBL_OTROSECTORPROFESIONAL"}];
	visibilidad(fields,visible);
}

/**
 * Adapta el formulario al motivo de baja seleccionado
 */
function adaptaFormulario () {
	var secProfEl = getFormElementById("sectorprofesion_c");
	if (! secProfEl) {
		console.error("No se ha definido el campo Sector Profesional.");
	} else {
		var secProf = secProfEl.options[secProfEl.selectedIndex];
		switch (secProf.value) {
			case "otros": visibilidadOtroSector(true); break;
			default:	  visibilidadOtroSector(false);	 break;
		}
	}
}


// Cuando exista el campo motivobaja_c se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#sectorprofesion_c')) != 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("sectorprofesion_c")), 'change', adaptaFormulario);
    }
);

// Adaptación incial del formulario
SUGAR.util.doWhen("typeof($('#sectorprofesion_c')) != 'undefined' && typeof CustomFormTools != 'undefined'", adaptaFormulario);

/**
* Comprueba el campo numeroidentificacion_c
*/
function validateId () {
	var idEl = getFormElementById('numeroidentificacion_c');
	var tipoIdEl = getFormElementById('tipoidentificacion_c');
	var tipoId = 'nif';	// Indica si el tipo de documento es un NIF o NIE (puede ser pasaporte)
	if (! tipoIdEl) {
		console.warn("No se ha definido el campo Tipo de Identificación, se asume que es un NIF.");
	} else {
		tipoId = tipoIdEl.options[tipoIdEl.selectedIndex];
	}
	if (! idEl) {
		console.warn("No se ha definido el campo NIF.");
		return true;
	} else {
		switch (tipoId.value) {
			case 'nif': 
			case 'nie': return isValidDNI(idEl.value); break;
			case 'cif': return isValidCif(idEl.value); break;
			default: console.log("Tipo de identificación no validable.");
				return true;
		}

	}
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