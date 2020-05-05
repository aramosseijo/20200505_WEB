// Define el nombre del módulo, se usa en algunas funciones que lo necesitan, por ejemplo, para construir el nombre del formulario.
var modulo = "redk_Formas_de_Pago";

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
		
		var nombre_contacto = getValorById('redk_formas_de_pago_contacts_name');
		var nombre_cuenta = getValorById('redk_formas_de_pago_accounts_name');
		var mp = getFormElementById('mediopago');
		var medio_pago = mp.options[mp.selectedIndex].text;         
		var importe  = getValorById('importe');
		
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
	
	if(xmlhttp.readyState !== 4 || xmlhttp.status !== 200) {
		console.error("Error enviando la petición al servidor.");
	} else {
		var resultado = JSON.parse(xmlhttp.responseText);
		if (! resultado.ret) { //Si ha dado un mensaje de error, lo mostramos
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
function checkCCC () {

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
				 {"field": "numeroiban_c", "label": "LBL_NUMEROIBAN", "validation" : {"type": "required"}}
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

// Cuando existan los campos mediopago y numerocuenta, se ejecuta la función que adapta el formulario
// CUANDO SE IMPLEMENTEN LOS PAGOS RECURRENTES CON TARJETA, AÑADIR && typeof($('#numeroreferenciatarjeta')) != 'undefined' en la condición
SUGAR.util.doWhen("typeof($('#mediopago')) != 'undefined' && typeof($('#numerocuenta')) != 'undefined' && typeof CustomFormTools != 'undefined' ", adaptaFormulario);

/******************
 GESTION DEL MANDATO 
 ******************/

SUGAR.util.doWhen("typeof($('#numerocuenta'))!= 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(getFormElementById("numerocuenta")), 'change', calcular_mandato);
    }
);

/**
 * Calcula el mandato asociado al número de cuenta
 */
function calcular_mandato() {
	
    // Si la cuenta es de 20 digitos ya hay un mandato anterior, avisar que se generara uno nuevo con su nueva CCC
	var nCuentaElement = getFormElementById('numerocuenta');
	var mandatoElement = getFormElementById('mandato_id_c');
	if (! nCuentaElement || ! mandatoElement) {
		console.log("El campo mandato o número de cuenta no está definido");
	} else if (nCuentaElement.value.length >= 20) {
		var nuevoMandato = true;
        if (mandatoElement.value != '') {
			var msg = SUGAR.language.get(modulo,"LBL_CAMBIA_CUENTA");
            nuevoMandato = confirm(msg);
		}
		if (nuevoMandato) {
            var mandato = Math.floor((Math.random() * 100000000) + 1);
            mandatoElement.value = mandato;
        }
    }
};

/************ 
 GESTION IBAN
 ************/
SUGAR.util.doWhen("typeof($('#numerocuenta'))!= 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(getFormElementById("numerocuenta")), 'change', calcular_iban);
    }
); 

// Añade el gestor de evento a medio de pago
SUGAR.util.doWhen("typeof($('#numeroiban_c')) != 'undefined'",
    function() {
		var iban = getFormElementById("numeroiban_c");
		if (iban) {iban.readOnly = true;}
    }
);

/**
 * Calcula el Iban asociado al núermo de cuenta
 */ 
function calcular_iban() {
	var ibanElement = getFormElementById('numeroiban_c');
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