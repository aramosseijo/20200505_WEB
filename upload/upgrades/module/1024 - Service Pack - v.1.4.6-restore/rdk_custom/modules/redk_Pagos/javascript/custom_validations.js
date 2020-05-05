// Define el nombre del módulo, se usa en algunas funciones que lo necesitan, por ejemplo, para construir el nombre del formulario.
var modulo = "redk_Pagos";

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
function calcName () {
	
	// Por último, calculamos el nombre de la inscripción, que debe ser de la forma:
	var campo_name = getFormElementById('name');
	var valor_name = campo_name.value;

	// Calcula el nombre si no hay nombre definido o el nombre es el calculado de manera automática
	if (valor_name == '' || autoName == valor_name) {
		
		var nombre_fp = getValorById('redk_formas_de_pago_redk_pagos_name');
		var fecha = getValorById('fechalinecobro');
		
		// Si no hay fecha de pago la genera a partir de la fecha de hoy
		if (! fecha || ! isDate(fecha)) {
			fecha = new Date();
		} else {
			fecha = getDateObject(fecha);
		}
		
		fecha = fecha.getFullYear() + "-" + pad((fecha.getMonth() +1),2) + "-" + pad(fecha.getDate(),2);
		
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
	if (! forma_pago_id) {
		console.error("No hay forma de pago vinculada. No se puede guardar.");
		add_error_style(formname, 'redk_formas_de_pago_redk_pagosredk_formas_de_pago_ida', SUGAR.language.get(modulo, 'LBL_SIN_FORMA_PAGO'));
	} else {
		var record = getValorByName("record");
		
		xmlhttp.open("GET", "index.php?module=" + modulo + "&action=get_related_contact_and_account&forma_pago_id=" + forma_pago_id + "&record=" + record, false);
		xmlhttp.send();
		
		if(xmlhttp.readyState !== 4 || xmlhttp.status !== 200) {
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
function checkCCC () {

	var returnValue = false;
	campo = "numerocuenta";
	valor = getValorById(campo);

	ajaxStatus = getAjaxStatus();
	ajaxStatus.showStatus(SUGAR.language.get('app_strings', 'LBL_LOADING'));

	xmlhttp = getAjaxObject();
	xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validarRelacion&field=" + campo + "&value=" + valor + "&value2=&value3=&record=", false);
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
function adaptaFormulario () {
	var medioPagoEl = getFormElementById("mediopago");
	if (! medioPagoEl) {
		console.error("No se ha definido el campo Medio de pago.");
	} else {
		var medioPago = medioPagoEl.options[medioPagoEl.selectedIndex];
		switch (medioPago.value) {
			case "domiciliacion": visibilidadCCC(true);
								  visibilidadTarjeta(false);
								  break;
			/** 
			 * NO SE USA PORQUE NO SE REALIZA LA GESTIÓN DE PAGOS RECURRENTES CON TARJETA,
			 * CUANDO SEA NECESARIO, DESCOMENTAR ESTAS LINEAS
			case "tarjeta": 	  visibilidadCCC(false);
								  visibilidadTarjeta(true);
								  break;
			*/
			default:			  visibilidadCCC(false);
								  visibilidadTarjeta(false);
								  break;
		}
	}
}

/**
 * Modifica la visibilidad de los campos relacionados con el Número de Cuenta
 */
function visibilidadCCC(visible) {
	var fields = [
				 {"field": "numerocuenta", "label": "LBL_NUMEROCUENTA", "validation" : {"type": "callback",
																						"required": true,
																						"func": checkCCC, 
																						"msg": "LBL_CCC_ERRONEA"}},
				 {"field": "mandato_id_c", "label": "LBL_MANDATO_ID", "validation" : {"type": "required"}},
				 {"field": "numero_iban_c", "label": "LBL_NUMERO_IBAN", "validation" : {"type": "required"}}
				 ];
	visibilidad(fields,visible);
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
				 {"field": "mes_caducidad_tarjeta_c", "label": "LBL_MES_CADUCIDAD_TARJETA", "validation" : {"type": "required"}},
				 {"field": "annio_caducidad_tarjeta_c", "label": "LBL_ANNIO_CADUCIDAD_TARJETA", "validation" : {"type": "required"}},
			     {"field": "numeroreferenciatarjeta", "label": "LBL_NUMEROREFERENCIATARJETA", "validation" : {"type": "required"}},
				 ];
	visibilidad(fields,visible);
}

// Cuando exista el campo Medio de Pago se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("mediopago")), 'change', adaptaFormulario);
    }
);

// Cuando existan los campos mediopago y numerocuenta se ejecuta la función que adapta el formulario
// CUANDO SE IMPLEMENTEN LOS PAGOS RECURRENTES CON TARJETA, AÑADIR && typeof($('#numeroreferenciatarjeta')) != 'undefined' en la condición
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined' && typeof($('#numerocuenta')) != 'undefined' && typeof CustomFormTools != 'undefined' ", adaptaFormulario);


/************ 
 GESTION IBAN
 ************/
SUGAR.util.doWhen("typeof($('#numerocuenta'))!= 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(getFormElementById("numerocuenta")), 'change', calcular_iban);
    }
); 

// Añade el gestor de evento a medio de pago
SUGAR.util.doWhen("typeof($('#numero_iban_c')) != 'undefined'",
    function() {
		var iban = getFormElementById("numero_iban_c");
		if (iban) {iban.readOnly = true;}
    }
);

/**
 * Calcula el Iban asociado al núermo de cuenta
 */ 
function calcular_iban() {
	var ibanElement = getFormElementById('numero_iban_c');
	var nCuentaElement = getFormElementById('numerocuenta');
	if (! ibanElement || ! nCuentaElement) {
		console.log("No se ha definido el campo Número de IBAN o el Número de cuenta.");
	} else {
		ibanElement.value = '';
		if (typeof(IBAN) === 'undefined') {
			console.log("Cargando script de comprobación del iban.");
			loadScript("rdk_custom/include/javascript/iban.js", calcular_iban);
		} else {
			var iban = null;
			try {
				iban = IBAN.fromBBAN("ES", nCuentaElement.value);
				ibanElement.value = iban.slice(0, 4);
			} catch (ex) {
				console.error("Error calculando el IBAN: " + ex);
			}
		}
	}
}

