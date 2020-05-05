// Define el nombre del módulo, se usa en algunas funciones que lo necesitan, por ejemplo, para construir el nombre del formulario.
var modulo = "redk_Formas_de_Pago";
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
		calcName(); // Si no hay error calcula el nombre
	}

	return returnValue;
}

/**
 * Calcula el nombre del registro
 */
var autoName = ""; // declara la variable global para poder mantener el resultado entre llamadas a la función
function calcName() {

	// Por último, calculamos el nombre de la inscripción, que debe ser de la forma:
	var campo_name = getFormElementById('name');
	var valor_name = campo_name.value;

	// Calcula el nombre si no hay nombre definido o el nombre es el calculado de manera automática
	if (valor_name == '' || autoName == valor_name) {

		var nombre_contacto = getValorById('redk_formas_de_pago_contacts_name');
		var nombre_cuenta = getValorById('redk_formas_de_pago_accounts_name');
		var mp = getFormElementById('mediopago');
		var medio_pago = mp.options[mp.selectedIndex].text;
		var importe = getValorById('importe');

		autoName = '';
		if (nombre_contacto !== '') {
			autoName = nombre_contacto;
		} else if (nombre_cuenta !== '') {
			autoName = nombre_cuenta;
		}

		if (medio_pago !== '') {
			autoName = (autoName === '') ? medio_pago : autoName + ' - ' + medio_pago;
		}

		if (importe !== '') {
			autoName = (autoName === '') ? importe : autoName + ' - ' + importe;
		}

		// Guarda el nombre automático generado
		campo_name.value = autoName;
	}
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
	var campo = "redk_formas_de_pago_accountsaccounts_ida";
	var valor = getValorById(campo);
	var campo2 = "redk_formas_de_pago_contactscontacts_ida";
	var valor2 = getValorById(campo2);

	xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validations&field=" + campo + "&value=" + valor + "&value2=" + valor2 + "&record=", false);
	xmlhttp.send();

	if (xmlhttp.readyState !== 4 || xmlhttp.status !== 200) {
		console.error("Error enviando la petición al servidor.");
	} else {
		var resultado = JSON.parse(xmlhttp.responseText);
		if (!resultado.ret) { //Si ha dado un mensaje de error, lo mostramos
			add_error_style(formname, campo, resultado.msg);
			add_error_style(formname, campo2, resultado.msg);
		} else {
			returnValue = true;
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

	var returnValue = true;
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
				visibilidadTarjeta(false);
				visibilidadMandato(false);
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
			// No necesitamos que el campo sea requerido, ya que se genera en el LH
			// "validation": {
			// 	"type": "required"
			// }
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
	var fields = [{
		"field": "mes_caducidad_tarjeta_c",
		"label": "LBL_MES_CADUCIDAD_TARJETA",
		"validation": {
			"type": "required"
		}
	},
	{
		"field": "annio_caducidad_tarjeta_c",
		"label": "LBL_ANNIO_CADUCIDAD_TARJETA",
		"validation": {
			"type": "required"
		}
	},
	{
		"field": "numeroreferenciatarjeta",
		"label": "LBL_NUMEROREFERENCIATARJETA",
		"validation": {
			"type": "required"
		}
	},
	];
	visibilidad(fields, visible);
}

// Cuando exista el campo Medio de Pago se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined'",
	function () {
		YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("mediopago")), 'change', adaptaFormulario);
	}
);

// Cuando existan los campos mediopago y numerocuenta, se ejecuta la función que adapta el formulario
// CUANDO SE IMPLEMENTEN LOS PAGOS RECURRENTES CON TARJETA, AÑADIR && typeof($('#numeroreferenciatarjeta')) != 'undefined' en la condición
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined' && typeof($('#numerocuenta')) != 'undefined' && typeof CustomFormTools != 'undefined' ", adaptaFormulario);


/************ 
 GESTION IBAN
 ************/
// STIC TODO: Validar si podemos incluir jQuery
$('input#numerocuenta').on('blur paste', function () {
	$(this).val($(this).val().replace(/[^0-9a-zA-Z]/g, '').toUpperCase())
})