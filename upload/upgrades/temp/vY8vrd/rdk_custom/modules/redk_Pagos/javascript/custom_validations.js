


var modulo = "redk_Pagos";

var returnValue = true;
var campo;
var valor;
var formulario = "";
var botones = null;
var vista = null;

var bt_save_quick = document.getElementById(modulo + '_dcmenu_save_button');
var bt_save_header = document.getElementById('SAVE_HEADER');
var bt_save_footer = document.getElementById('SAVE_FOOTER');


try {
    if (document.forms['form_DCQuickCreate_' + modulo] != null)
        vista = "quick";
    else if (document.forms['form_SubpanelQuickCreate_' + modulo] != null) {
        vista = "subpanel";
        botones = document.forms['form_SubpanelQuickCreate_' + modulo].getElementsByClassName("button");
    } else
        vista = "edit";
}
catch (err) {
    vista = "";
}


var bt_save_subform1 = null;
var bt_save_subform2 = null;

if (vista == "subpanel") {
    for (j = 0; j < botones.length; j++) {
        if (botones[j].id == modulo + '_subpanel_save_button') {
            if (bt_save_subform1 == null)
                bt_save_subform1 = botones[j];
            else
                bt_save_subform2 = botones[j];
        }
    }

    if (bt_save_subform1 != null) {
        formulario = "form_SubpanelQuickCreate" + modulo;
        bt_save_subform1.onclick = function() {
            disableOnUnloadEditView();
            bt_save_subform1.form.action.value = 'Save';
            if (validaciones_save() && check_form(formulario))
                return SUGAR.subpanelUtils.inlineSave(bt_save_subform1.form.id, modulo + '_subpanel_save_button');
            return false;
        };
    }

    if (bt_save_subform2 != null) {
        formulario = "form_SubpanelQuickCreate_" + modulo;
        bt_save_subform2.onclick = function() {
            disableOnUnloadEditView();
            bt_save_subform2.form.action.value = 'Save';
            if (validaciones_save() && check_form(formulario))
                return SUGAR.subpanelUtils.inlineSave(bt_save_subform2.form.id, modulo + '_subpanel_save_button');
            return false;
        };
    }
}

else if (vista == "quick") {
    if (bt_save_subform1 == null && bt_save_subform2 == null) {
        formulario = "form_DCQuickCreate_" + modulo;
        bt_save_quick.form.action.value = 'Save';
        bt_save_quick.onclick = function() {
            if (validaciones_save() && check_form(formulario))
                return DCMenu.save(this.form.id, modulo + '_subpanel_save_button');
            return false;
        };
    }
}

else if (vista == "edit") {
    if (bt_save_header != null) {
        if (bt_save_subform1 == null && bt_save_subform2 == null) {
            formulario = "EditView";
            bt_save_header.form.action.value = 'Save';

            bt_save_header.onclick = function() {

                if (validaciones_save() && check_form(formulario))
                    SUGAR.ajaxUI.submitForm(bt_save_header.form);
                return false;
            };
        }
    }

    if (bt_save_footer != null) {
        if (bt_save_subform1 == null && bt_save_subform2 == null) {
            formulario = "EditView";
            bt_save_footer.form.action.value = 'Save';
            bt_save_footer.onclick = function() {
                if (validaciones_save() && check_form(formulario))
                    SUGAR.ajaxUI.submitForm(bt_save_footer.form);
                return false;
            };
        }
    }
}

function validaciones_save() {
    var xmlhttp;

    clear_all_errors();
    returnValue = true;

    var ajaxStatus = new SUGAR.ajaxStatusClass();
    ajaxStatus.flashStatus(SUGAR.language.get('app_strings', 'LBL_LOADING'), 1);

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var resultado_php = xmlhttp.responseText;

            if (resultado_php.length > 1) { //Si ha dado un mensaje de error, lo mostramos

                if (resultado_php.indexOf("get_related_contact_and_account") != -1) {
                    var resultado = JSON.parse(resultado_php);
                    document.getElementById("redk_pagos_contacts_name").value = resultado.contact_name;
                    document.getElementById("redk_pagos_contactscontacts_ida").value = resultado.contact_id;
                    document.getElementById("redk_pagos_accounts_name").value = resultado.account_name;
                    document.getElementById("redk_pagos_accountsaccounts_ida").value = resultado.account_id;
                    returnValue = true;
                }
                else {
                    add_error_style(formulario, campo, resultado_php);
                    returnValue = false;
                }
            }

        }
    }

    var record = getValorByName("record");
    
    //get_related_contact_and_account 
    var forma_pago_id = getValor('redk_formas_de_pago_redk_pagosredk_formas_de_pago_ida');
    if (forma_pago_id != "") {
        xmlhttp.open("GET", "index.php?module=" + modulo + "&action=get_related_contact_and_account&forma_pago_id=" + forma_pago_id + "&record=" + record, false);
        xmlhttp.send();
    }


    var name = document.getElementById("name");
    if (vista === "subpanel")
        name = GetElementById(document.getElementById('subpanel_list'), "name");
    
    var formaDepago = document.getElementById('redk_formas_de_pago_redk_pagos_name').value;
    var contacto = document.getElementById('redk_pagos_contacts_name').value;
    var cuenta = document.getElementById('redk_pagos_accounts_name').value; 
    var fecha = new Date();
    fecha = (fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
  
    if(contacto != '' && formaDepago != '')
        name.value = formaDepago+'_'+contacto+'_'+fecha;
    else if(cuenta != '' && formaDepago != '')
        name.value = formaDepago+'_'+cuenta+'_'+fecha;
    else
        name.value = formaDepago+'_'+fecha;

    campo = "redk_pagos_accounts_name";
    valor = getValor(campo);
    var campo2 = "redk_pagos_contacts_name";
    var valor2 = getValor(campo2);
    xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validarRelacion&field=" + campo + "&value=" + valor + "&value2=" + valor2 + "&record=" + record, false);
    xmlhttp.send();

    campo = "redk_pagos_contacts_name";
    valor = getValor(campo);
    var campo2 = "redk_pagos_accounts_name";
    var valor2 = getValor(campo2);
    xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validarRelacion&field=" + campo + "&value=" + valor + "&value2=" + valor2 + "&record=" + record, false);
    xmlhttp.send();

    //Pasamos el valor del número de cuenta
    campo = "numerocuenta";
    valor = getValor(campo);
    xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validarRelacion&field=" + campo + "&value=" + valor + "&record=" + record, false);
    xmlhttp.send();


    ajaxStatus.hideStatus();

    return returnValue;
}

function GetElementById( dNode, id ) {

	var dResult = null;

	if ( dNode.getAttribute('id') == id )
		return dNode;

	for ( var i = 0; i < dNode.childNodes.length; i++ ) {
		if ( dNode.childNodes[i].nodeType == 1 ) {
			dResult = GetElementById( dNode.childNodes[i], id );
			if ( dResult != null )
				break;
		}
	}

	return dResult;
}

function getValor(campo) {
    //Si estamos en un subformulario hay que tener cuidado ya que puede ser el mismo módulo que estamos tratando

    if (vista == "subpanel" || vista == "quick") { //subformulario

        var subpanel = document.getElementById(formulario).getElementsByTagName('input'); //los textos

        for (j = 0; j < subpanel.length; j++) {
            if (subpanel[j].id == campo) {
                return subpanel[j].value;
            }
        }
        subpanel = document.getElementById(formulario).getElementsByTagName('select'); //los desplegables

        for (j = 0; j < subpanel.length; j++) {
            if (subpanel[j].id == campo) {
                return subpanel[j].value;
            }
        }
    }
    if (document.getElementById(campo) != null)
        return document.getElementById(campo).value;
    else
        return null
}

function getValorByName(campo) {
    //Si estamos en un subformulario hay que tener cuidado ya que puede ser el mismo módulo que estamos tratando

    if (vista == "subpanel" || vista == "quick") { //subformulario

        var subpanel = document.getElementById(formulario).getElementsByTagName('input'); //los textos

        for (j = 0; j < subpanel.length; j++) {
            if (subpanel[j].name == campo) {
                return subpanel[j].value;
            }
        }
        //TODO: si no se encuentran en los textos, buscar en los select
    }

    if (document.getElementsByName('record') != null)
        return document.getElementsByName('record')[0].value;
    else
        return "";
}

