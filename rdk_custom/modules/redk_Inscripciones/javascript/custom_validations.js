var modulo = "redk_Inscripciones";

/**
 * Realiza validaciones de la relación con la Persona/Organización y calcula el nombre 
 */
function customCheckForm() {
	
	var xmlhttp;
    var returnValue = true;
	
	clear_all_errors();
	
	// Comprueba el vínculo con la persona y la cuenta
	returnValue = checkAccountContactOrLead();
	
    if (returnValue) {
		calcName();	// Si no hay error calcula el nombre
    }

    return returnValue;
}

/**
* Calcula el nombre del registro
*/
var autoName = "";	// declara la variable global para poder mantener el resultado entre llamadas a la función
function calcName () {
	
	// Por último, calculamos el nombre de la inscripción, que debe ser de la forma:
	var campo_name = getFormElementById('name');
	var valor_name = campo_name.value;

	// Calcula el nombre si no hay nombre definido o el nombre es el calculado de manera automática
	if (valor_name == '' || autoName == valor_name) {
		
		var nombre_evento = getValorById('redk_eventos_redk_inscripciones_name');
		var nombre_contacto = getValorById('redk_inscripciones_contacts_name');
		var nombre_cuenta = getValorById('redk_inscripciones_accounts_name');
		var nombre_lead = getValorById('redk_inscripciones_leads_name');
		autoName = nombre_contacto || nombre_cuenta || nombre_lead;
		
		if (nombre_evento) {
			if (autoName) {
				autoName += ' - ';
			}
			autoName += nombre_evento;
		}
		campo_name.value = autoName;
	}
}

/**
* Comprueba la vinculación a Persona y Organización
*/
function checkAccountContactOrLead() {
	
	var returnValue = false;

	ajaxStatus = getAjaxStatus();
    ajaxStatus.showStatus(SUGAR.language.get('app_strings', 'LBL_LOADING'));

    xmlhttp = getAjaxObject();
	
	var formname = getFormName();
    var accountField = "redk_inscripciones_accounts_name";
    var account = getValorById(accountField);
    var contactField = "redk_inscripciones_contacts_name";
    var contact = getValorById(contactField);
	var leadField = "redk_inscripciones_leads_name";
	var lead = getValorById(leadField);
	var record = getValorByName("record");
	
	// Si tenemos valores nulos, los sustituye por valores vacíos
	contact = contact || '';
	account = account || '';
	lead = lead || '';
	
	xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validarRelacion&validation=accountcontactorlead&account=" + account + "&contact=" + contact + "&lead=" + lead + "&record=" + record, false);
    xmlhttp.send();
	
	if(xmlhttp.readyState !== 4 || xmlhttp.status !== 200) {
		console.error("Error enviando la petición al servidor.");
	} else {
		var resultado = JSON.parse(xmlhttp.responseText);
		if (! resultado.ret) { //Si ha dado un mensaje de error, lo mostramos
			// Los campos de Organización y Contacto pueden estar involucrados en el error o no estarlo
			if (resultado.error == 1 || resultado.error == 2) {
				add_error_style(formname, accountField, resultado.msg);
			}
			if (resultado.error == 1 || resultado.error == 3) {
				add_error_style(formname, contactField, resultado.msg);
			}
			// El campo Interesados siempre estará involucrado en caso de error
			add_error_style(formname, leadField, resultado.msg);
		} else {
			returnValue = true;
		}
	}
	
	ajaxStatus.hideStatus();
	
	return returnValue;
}

/**
 * Modifica la visibilidad de los campos relacionados con el Número de Cuenta
 */
function visibilidadNoParticipa(visible) {
	var fields = [{"field": "motivonoparticipa", "label": "LBL_MOTIVONOPARTICIPA"}];
	visibilidad(fields,visible);
}

/**
 * Modifica la visibilidad de los campos relacionados con el Número de Cuenta
 */
function visibilidadRechazado(visible) {
	var fields = [{"field": "motivorechazado", "label": "LBL_MOTIVORECHAZADO"}];
	visibilidad(fields,visible);
}

/**
 * Modifica la visibilidad de la descripción de las necesidades especiales
 */
function visibilidadDescNE(visible) {
	var fields = [{"field": "descripcionnecesidades", "label": "LBL_DESCRIPCIONNECESIDADES"}];
	visibilidad(fields,visible);
}

/**
 * Adapta el formulario a las Necesiades Especiales
 */
function adaptaNecesidadesEspeciales () {
	var secProfEl = getFormElementById("necesidadesespeciales");
	if (! secProfEl) {
		console.error("No se ha definido el campo Sector Profesional.");
	} else {
		var secProf = secProfEl.options[secProfEl.selectedIndex];
		switch (secProf.value) {
			case "1": visibilidadDescNE(true); break;
			default:  visibilidadDescNE(false);	break;
		}
	}
}

/**
 * Adapta el formulario al Estado de la inscripcion
 */
function adaptaEstado () {
	var estadoEl = getFormElementById("estado");
	if (! estadoEl) {
		console.error("No se ha definido el campo Medio de pago.");
	} else {
		var estado = estadoEl.options[estadoEl.selectedIndex];
		switch (estado.value) {
			case "rechazado": 	visibilidadRechazado(true); 
								visibilidadNoParticipa(false);
								break;
			case "noParticipa": visibilidadRechazado(false); 
								visibilidadNoParticipa(true); 
								break;
			default: 			visibilidadRechazado(false); 
								visibilidadNoParticipa(false); 
		}
	}
}

// Cuando exista el campo motivobaja_c se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#necesidadesespeciales')) != 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("necesidadesespeciales")), 'change', adaptaNecesidadesEspeciales);
    }
);

// Cuando exista el campo Medio de Pago se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#estado')) != 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("estado")), 'change', adaptaEstado);
    }
);

// Adaptación inicial del formulario
SUGAR.util.doWhen("typeof($('#necesidadesespeciales')) != 'undefined' && typeof CustomFormTools != 'undefined'", adaptaNecesidadesEspeciales);
SUGAR.util.doWhen("typeof($('#estado')) != 'undefined' && typeof CustomFormTools != 'undefined'", adaptaEstado);
