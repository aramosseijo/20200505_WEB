
/**
 * Calcula el nombre del formulario HTML
 */
function getForm () {
	var formNames = ['form_DCQuickCreate_' + modulo, 'form_SubpanelQuickCreate_' + modulo, 'form_QuickCreate_' + modulo, 'EditView'];
	var form = null;
	for (var i=0; i<formNames.length && ! form; i++) {
		form = document.forms[formNames[i]];
	} 
	return form;
}

/**
* Retorna el nombre del formulario activo
*/
function getFormName() {
	var form = getForm();
	return (form != null ? form.id : "EditView");
}

/**
* Retorna el objeto ajaxStatus
*/
function getAjaxStatus() {
	// Si tiene valor comprueba su validez
	if (typeof ajaxStatus == 'undefined') {
		ajaxStatus = new SUGAR.ajaxStatusClass();
	}
	return ajaxStatus;
}

/**
* Retorna el objeto para llamadas Ajax
*/
function getAjaxObject() {
	var xmlhttp;
	// code for IE7+, Firefox, Chrome, Opera, Safari
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	// code for IE6, IE5		
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	return xmlhttp;
}

/**
* Retorna un elemento del formulario referenciado por su id
*/
function getFormElementById (id) {
	var form = getForm();
	
	if (! form) {
		console.error("No se ha definido el formulario.");
		return null;
	}
	
	var element = $(form).find("#"+id);
	
	if (! element || element.length == 0 ) {
		console.warn("No se ha encontrado el elemento con id: " + id);
		return null;
	} else {
		return element[0];
	} 
}

/**
* Retorna un elemento del formulario referenciado por su nombre
*/
function getFormElementByName (name) {
	var form = getForm();
	
	if (! form) {
		console.error("No se ha definido el formulario.");
		return null;
	}
	
	var element = $(form).find('input[name="' + name + '"]');
	
	if (! element || element.length == 0 ) {
		console.warn("No se ha encontrado el elemento con nombre: " + name);
		return null;
	} else {
		return element[0];
	}	
}

/**
* Retorna el valor de un input del formulario referenciado por su id
*/
function getValorById(id) {
    
	var element = getFormElementById(id);
	
	if (element == null) {
		return null;
	} else {
		return element.value;
	}
}

/**
 * Retorna el valor de un input del formulario referenciado por su nombre
 */
function getValorByName(name) {
    //Si estamos en un subformulario hay que tener cuidado ya que puede ser el mismo módulo que estamos tratando
	var element = getFormElementByName(name);
	
	if (element == null) {
		return null;
	} else {
		return element.value;
	}
}

/**
 * Carga un script de la url indicada y llama a la funcion callback cuando se cargue.
 */
function loadScript(url, callback) {
	
	console.log("Cargando script de [" + url + "].");
	// Adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild(script);

}


/**
 * Modifica la visibilidad de los campos especificados
 */
function visibilidad(campos, visible) {
	
	for (var i = 0; i < campos.length; i++) {
		var el = getFormElementById(campos[i].field);
		var elLabel = getFormElementById(campos[i].field + "_label");
		if (! el || ! elLabel) {				// Comprueba que exista el elemento
			console.warn("Elemento no definido: " + campos[i].field + " - " + elLabel);
		} else {
			
			// Gestiona la visibilidad del los controles
			YAHOO.util.Dom.setStyle(el, 'display', (visible ? '' :  'none' ));
            YAHOO.util.Dom.setStyle(elLabel, 'visibility', (visible ? 'visible' :  'hidden' ));
			//el.readOnly = ! visible;
			YAHOO.util.Dom.setStyle(el, 'background-color', (visible ? '' : '#EEE'));
			if (!SUGAR.isIE) {
				YAHOO.util.Dom.setStyle(el, 'color', (visible ? '' : '#22'));
			}

			// Gestiona los campos a validar
			if (typeof campos[i].validation != 'undefined') {
				
				// Añade el control de validación
				validationStatus(el, campos[i], visible);
				var required = campos[i].validation.type == "required" || campos[i].validation.required === true;
				
				// Si el campo es requerido añade o elimina el asterisco en función de su visibilidad
				if (required) {
					if (visible) {
						// Añade el asterisco
						var node = document.createElement("span");
						node.innerHTML = "*";
						node.className = "required";
						elLabel.appendChild(node);
					} else {
						// Elimina el asterisco
						if (elLabel) {
							var els = YAHOO.util.Dom.getElementsBy(function(e) {
								return e.className == 'required';
							}, "span", elLabel);
							
							if (els != null && els.length) {
								for (var j = 0; j < els.length; j++) {
									elLabel.removeChild(els[j]);
								}
							}
						}
					}	
				}
			}
		} 
	}
}

/**
* Añade o elimina un campo al array de validaciones de los formularios activos
*/
function validationStatus (campoEl, campoDef, enabled) {

	var formulario = getFormName();
	var campo = campoEl.id;
	var formId = campoEl.form.id;

	console.log("Formulario usado: " + formulario);

	// Añade campo a validar
	if (enabled) {
		var msg = "";
		switch (campoDef.validation.type) {
			case "callback": msg = SUGAR.language.get(modulo, campoDef.validation.msg);
							 addToValidateCallback(formulario, campo, 'text', campoDef.validation.required === true, msg != 'undefined' ? msg : campoDef.label, campoDef.validation.func);
							 break;
			case "required": msg = SUGAR.language.get(modulo, campoDef.label);
							 addToValidate(formulario, campo, 'text', true, msg != 'undefined' ? msg : campoDef.label);
							 break;
			default: console.warn("Tipo de validación no definido: " + campoDef.validation.type);
		}
	} else if (! enabled && checkValidate(formulario, campo)) {
		removeFromValidate(formulario, campo);
	}
}


//TODO: Documentar existencia de esta function en  wikidev
/*
20180423 jchg
Devuelve el valor de una constante del sistema mediante Javascript. Funciona en modo asincrono*/
function getConstanteValue(constante, asyncMode=false) {
	var res = null;
	var url = "index.php?module=redk_Constantes&action=get_constante_value&constante=" + constante

	$.ajax({
		url: url,
		dataType: 'json',
		async: asyncMode,
		success: function (json) {
			res = json;
		}
	});

	return res;
}






/**
 * Sobreescribe la funcion check_form que se llama por defecto por parte de Sugar, para poder añadir validaciones personalizadas
 */
if (typeof check_form_ori == 'undefined' ) {
	var check_form_ori = check_form;
}
var check_form = function (form) {
	
	var ret = true;
	
	disableOnUnloadEditView(form);
	
	// Si hay una función personalizada definida, la llama
	if (typeof customCheckForm != 'undefined') {
		ret = customCheckForm (form);
	}

	// Si no hay error llama a la función inicial
	if (ret) {
		ret = check_form_ori(form);
	}
	
	return ret;
}

// Define la variable para indicar que se ha cargado el archivo
var CustomFormTools = true;

