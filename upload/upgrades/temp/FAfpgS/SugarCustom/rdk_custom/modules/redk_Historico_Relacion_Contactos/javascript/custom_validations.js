
var modulo = "redk_Historico_Relacion_Contactos";

/**
 * Función de validación personalizada. 
 * Además de permitir incluir validaciones, calcula el nombre del registro.
 */
function customCheckForm() {
	clear_all_errors();
	calcName();	
    return true;
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
		
		var nombreOrg = getValorById('redk_historico_relacion_contactos_contacts_name');
		var tipoRelElement = getFormElementById('tiporelacion');
		var tipoRel = "";
		if (tipoRelElement) {
			var indice = tipoRelElement.selectedIndex;
			tipoRel = tipoRelElement.options[indice].text; 
		}
		
		if (nombreOrg) {
			autoName = nombreOrg;
		}
		
		if (tipoRel) {
			autoName += ' - ' + tipoRel;
		}
				
		// Guarda el nombre automático generado
		campo_name.value = autoName;
	}
}


/**
 * Modifica la visibilidad de los campos relacionados con el Número de Cuenta
 */
function visibilidadOtrosMotivos(visible) {
	var fields = [{"field": "otrosmotivos_c", "label": "LBL_OTROSMOTIVOS"}];
	visibilidad(fields,visible);
}

/**
 * Adapta el formulario al motivo de baja seleccionado
 */
function adaptaFormulario () {
	var mBajaEl = getFormElementById("motivobaja_c");
	if (! mBajaEl) {
		console.error("No se ha definido el campo Motivo de baja.");
	} else {
		var mBaja = mBajaEl.options[mBajaEl.selectedIndex];
		switch (mBaja.value) {
			case "otrosMotivos": visibilidadOtrosMotivos(true);
   							     break;
			
			default:			 visibilidadOtrosMotivos(false);
								 break;
		}
	}
}

// Cuando exista el campo motivobaja_c se le añade un controlador para el evento Change
SUGAR.util.doWhen("typeof($('#motivobaja_c')) != 'undefined'",
    function() {
        YAHOO.util.Event.addListener(YAHOO.util.Dom.get(document.getElementsByName("motivobaja_c")), 'change', adaptaFormulario);
    }
);

// Adaptación incial del formulario
SUGAR.util.doWhen("typeof($('#motivobaja_c')) != 'undefined' && typeof CustomFormTools != 'undefined'", adaptaFormulario);

