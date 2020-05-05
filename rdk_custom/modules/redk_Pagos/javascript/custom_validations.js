// Define el nombre del módulo, se usa en algunas funciones que lo necesitan, por ejemplo, para construir el nombre del formulario.
var modulo = "redk_Pagos";
validarIBAN = getConstanteValue('SEPA_VALIDATE_IBAN');

/**
 * Realiza validaciones de la relación con la Persona/Organización y calcula el nombre 
 */
function customCheckForm() {

	var xmlhttp;
	var returnValue = true;

	clear_all_errors();

	// Comprueba el vínculo con la persona y la cuenta
	returnValue = checkAccountAndContact();

	if (returnValue) {
		calcName();	// Si no hay error calcula el nombre
	}

	return returnValue;
}

/**
* Calcula el nombre del registro
*/
var autoName = "";	// declara la variable global para poder mantener el resultado entre llamadas a la función
function calcName() {

	// Por último, calculamos el nombre de la inscripción, que debe ser de la forma:
	var campo_name = getFormElementById('name');
	var valor_name = campo_name.value;

	// Calcula el nombre si no hay nombre definido o el nombre es el calculado de manera automática
	if (valor_name == '' || autoName == valor_name) {

		var nombre_fp = getValorById('redk_formas_de_pago_redk_pagos_name');
		var fecha = getValorById('fechalinecobro');

		// Si no hay fecha de pago la genera a partir de la fecha de hoy
		if (!fecha || !isDate(fecha)) {
			fecha = new Date();
		} else {
			fecha = getDateObject(fecha);
		}

		fecha = fecha.getFullYear() + "-" + pad((fecha.getMonth() + 1), 2) + "-" + pad(fecha.getDate(), 2);

		autoName = nombre_fp + ' - ' + fecha;

		// Guarda el nombre automático generado
		campo_name.value = autoName;
	}
}

/**
* Retorna una cadena de longitud width, donde aparece el número n y el carácter z a la izquierda
* Normalmente se usará para añadir ceros a la izquierda.
*/
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/**
* Comprueba la vinculación a Persona y Organización
*/
function checkAccountAndContact() {

	var returnValue = false;

	ajaxStatus = getAjaxStatus();
	ajaxStatus.showStatus(SUGAR.language.get('app_strings', 'LBL_LOADING'));

	xmlhttp = getAjaxObject();
	var formname = getFormName();

	var forma_pago_id = getValorById('redk_formas_de_pago_redk_pagosredk_formas_de_pago_ida');

	// Si hay forma de pago recupera el la persona o la organización de ella
	if (!forma_pago_id) {
		console.error("No hay forma de pago vinculada. No se puede guardar.");
		add_error_style(formname, 'redk_formas_de_pago_redk_pagosredk_formas_de_pago_ida', SUGAR.language.get(modulo, 'LBL_SIN_FORMA_PAGO'));
	} else {
		var record = getValorByName("record");

		xmlhttp.open("GET", "index.php?module=" + modulo + "&action=get_related_contact_and_account&forma_pago_id=" + forma_pago_id + "&record=" + record, false);
		xmlhttp.send();

		if (xmlhttp.readyState !== 4 || xmlhttp.status !== 200) {
			console.error("Error enviando la petición al servidor.");
		} else {
			var resultado = JSON.parse(xmlhttp.responseText);
			if (resultado.ret) {

				var contactName = getFormElementById("redk_pagos_contacts_name");
				var contactId = getFormElementById("redk_pagos_contactscontacts_ida");
				var accountName = getFormElementById("redk_pagos_accounts_name");
				var accountId = getFormElementById("redk_pagos_accountsaccounts_ida");

				contactName.value = resultado.data.contact_name;
				contactId.value = resultado.data.contact_id;
				accountName.value = resultado.data.account_name;
				accountId.value = resultado.data.account_id;
				returnValue = true;

			} else {
				add_error_style(formname, 'redk_formas_de_pago_redk_pagosredk_formas_de_pago_ida', resultado.msg);
			}
		}
	}

	ajaxStatus.hideStatus();

	return returnValue;
}

/**
* Valida el número de cuenta
*/
function checkCCC() {

	//20180429 jch Obviamos la validacion del numero de cuenta si la variable SEPA_VALIDATE_IBAN esta establecida a 0 
	if (validarIBAN == "0") {
		return true;
	}


	var returnValue = false;
	campo = "numerocuenta";
	valor = getValorById(campo);

	ajaxStatus = getAjaxStatus();
	ajaxStatus.showStatus(SUGAR.language.get('app_strings', 'LBL_LOADING'));

	xmlhttp = getAjaxObject();
	xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validations&field=" + campo + "&value=" + valor + "&value2=&value3=&record=", false);
	xmlhttp.send();

	if (xmlhttp.readyState !== 4 || xmlhttp.status !== 200) {
		console.error("Error enviando la petición al servidor.");
	} else {
		var resultado = JSON.parse(xmlhttp.responseText);
		returnValue = resultado.ret;
	}

	ajaxStatus.hideStatus();
	return returnValue;
}

/**
 * Adapta el formulario al medio de pago seleccionado
 */
function adaptaFormulario() {
	var medioPagoEl = getFormElementById("mediopago");
	if (!medioPagoEl) {
		console.error("No se ha definido el campo Medio de pago.");
	} else {
		var medioPago = medioPagoEl.options[medioPagoEl.selectedIndex];
		switch (medioPago.value) {
			case "transferencia_emitida":
				visibilidadCCC(true);
				visibilidadMandato(false);
				visibilidadTarjeta(false);
				break;
			case "domiciliacion":
				visibilidadCCC(true);
				visibilidadMandato(true);
				visibilidadTarjeta(false);
				break;
			/** 
			 * NO SE USA PORQUE NO SE REALIZA LA GESTIÓN DE PAGOS RECURRENTES CON TARJETA,
			 * CUANDO SEA NECESARIO, DESCOMENTAR ESTAS LINEAS
			case "tarjeta": 	  visibilidadCCC(false);
								  visibilidadTarjeta(true);
								  break;
			*/

			default:
				visibilidadCCC(false);
				visibilidadMandato(false);
				visibilidadTarjeta(false);
				break;
		}
	}
}

/**
 * Modifica la visibilidad del número de cuenta
 */
function visibilidadCCC(visible) {
	var fields = [{
		"field": "numerocuenta",
		"label": "LBL_NUMEROCUENTA",
		"validation": {
			"type": "callback",
			"required": true,
			"func": checkCCC,
			"msg": "LBL_CCC_ERRONEA"
		}
	}

	];
	visibilidad(fields, visible);
}
/**
 * Modifica la visibilidad del mandato
 */
function visibilidadMandato(visible) {
	var fields = [
		{
			"field": "mandato_id_c",
			"label": "LBL_MANDATO_ID",
			"validation": {
				"type": "required"

			}
		}

	];
	visibilidad(fields, visible);
}










/**
 * Modifica la visibilidad de los campos relacionados con la tarjeta
 */
function visibilidadTarjeta(visible) {
	/** 
	  * NO SE USA PORQUE NO SE REALIZA LA GESTIÓN DE PAGOS RECURRENTES CON TARJETA,
	  * CUANDO SEA NECESARIO, ELIMINAR EL SIGUIENTE RETORNO
	  */
	return true;
	var fields = [
		{ "field": "mes_caducidad_tarjeta_c", "label": "LBL_MES_CADUCIDAD_TARJETA", "validation": { "type": "required" } },
		{ "field": "annio_caducidad_tarjeta_c", "label": "LBL_ANNIO_CADUCIDAD_TARJETA", "validation": { "type": "required" } },
		{ "field": "numeroreferenciatarjeta", "label": "LBL_NUMEROREFERENCIATARJETA", "validation": { "type": "required" } },
	];
	visibilidad(fields, visible);
}

// Cuando exista el campo Medio de Pago se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined'",
	function () {
		YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("mediopago")), 'change', adaptaFormulario);
	}
);

// Cuando existan los campos mediopago y numerocuenta se ejecuta la función que adapta el formulario
// CUANDO SE IMPLEMENTEN LOS PAGOS RECURRENTES CON TARJETA, AÑADIR && typeof($('#numeroreferenciatarjeta')) != 'undefined' en la condición
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined' && typeof($('#numerocuenta')) != 'undefined' && typeof CustomFormTools != 'undefined' ", adaptaFormulario);

/************ 
 GESTION IBAN
 ************/
// STIC TODO: Validar si podemos incluir jQuery
$('input#numerocuenta').on('blur paste', function () {
	$(this).val($(this).val().replace(/[^0-9a-zA-Z]/g, '').toUpperCase())
})