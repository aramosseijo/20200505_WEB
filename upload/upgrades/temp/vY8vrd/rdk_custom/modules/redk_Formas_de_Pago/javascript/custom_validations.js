

var modulo = "redk_Formas_de_Pago";

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

            if (resultado_php.length > 0) { //Si ha dado un mensaje de error, lo mostramos
                add_error_style(formulario, campo, resultado_php);
                returnValue = false;
            }
        }
    }

    var record = getValorByName("record");


    campo = "redk_formas_de_pago_accountsaccounts_ida";
    valor = getValor(campo);
    var campo2 = "redk_formas_de_pago_contactscontacts_ida";
    var valor2 = getValor(campo2);
    xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validations&field=" + campo + "&value=" + valor + "&value2=" + valor2 + "&record=" + record, false);
    xmlhttp.send();

    if (returnValue) {
        campo = "redk_formas_de_pago_contactscontacts_ida";
        valor = getValor(campo);
        var campo2 = "redk_formas_de_pago_accountsaccounts_ida";
        var valor2 = getValor(campo2);
        xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validations&field=" + campo + "&value=" + valor + "&value2=" + valor2 + "&record=" + record, false);
        xmlhttp.send();
    }

    //Valor del campo número de cuenta
    if (returnValue) {
        var campo2 = "redk_formas_de_pago_accountsaccounts_ida";
        var valor2 = getValor(campo2);
        var campo3 = "redk_formas_de_pago_contactscontacts_ida";
        var valor3 = getValor(campo3);
        campo = "numerocuenta";
        valor = getValor(campo);
        xmlhttp.open("GET", "index.php?module=" + modulo + "&action=custom_validations&field=" + campo + "&value=" + valor + "&value2=" + valor2 + "&value3=" + valor3 + "&record=" + record, false);
        xmlhttp.send();
    }


    if (returnValue) {
        //Por último, calculamos el nombre de la inscripción, que debe ser de la forma:
        var campo_name = getElementForm('name');
        var valor_name=document.getElementById('name').value;
        if(valor_name == ''){
            var nombre_contacto = document.getElementById('redk_formas_de_pago_contacts_name').value;
            //var medio_pago = document.getElementById('mediopago').value;
            //Obtenemos el valor
            var indice = document.getElementById('mediopago').selectedIndex;
            var medio_pago = document.getElementById('mediopago').options[indice].text;         
        
            var importe  = document.getElementById('importe').value;
            if (nombre_contacto !== '')
                campo_name.value = nombre_contacto;
            if (medio_pago !== '')
                campo_name.value = (nombre_contacto === '') ? medio_pago : nombre_contacto + ' - ' + medio_pago;
            if (importe !== '')
                campo_name.value = document.getElementById('name').value === '' ? importe : campo_name.value + ' - ' + importe;
        
            //En el caso que la forma de pago estuviera relacionada con una Cuenta, habría que poner el nombre de Cuenta
            var cuenta = document.getElementById('redk_formas_de_pago_accounts_name').value;
            if (cuenta !== '')
            campo_name.value = campo_name.value === '' ? cuenta : campo_name.value + ' - ' + cuenta;
        }
    }

    ajaxStatus.hideStatus();

    return returnValue;
}


function getElementForm(campo) {
    //Si estamos en un subformulario hay que tener cuidado ya que puede ser el mismo módulo que estamos tratando

    if (vista == "subpanel" || vista == "quick") { //subformulario

        var subpanel = document.getElementById(formulario).getElementsByTagName('input'); //los textos

        for (j = 0; j < subpanel.length; j++) {
            if (subpanel[j].id == campo) {
                return subpanel[j];
            }
        }
        subpanel = document.getElementById(formulario).getElementsByTagName('select'); //los desplegables

        for (j = 0; j < subpanel.length; j++) {
            if (subpanel[j].id == campo) {
                return subpanel[j];
            }
        }
    }
    if (document.getElementById(campo) != null)
        return document.getElementById(campo);
    else
        return null
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

