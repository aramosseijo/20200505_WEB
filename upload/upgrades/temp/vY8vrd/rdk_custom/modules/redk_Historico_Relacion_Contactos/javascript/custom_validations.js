


var modulo = "redk_Historico_Relacion_Contactos";


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

    returnValue = true;


    var name = document.getElementById("name");
    if (vista === "subpanel")
        name = GetElementById(document.getElementById('subpanel_list'),"name");
    
    var valor_name=document.getElementById('name').value;
    if(valor_name == ''){

        //Por último, calculamos el nombre de la inscripción, que debe ser de la forma:
        var persona = document.getElementById('redk_historico_relacion_contactos_contacts_name').value;
        //var tiporelacion = document.getElementById('tiporelacion').value;
        //jjrodrigue en lugar del incide obtenemos el valor del texto
        var indice = document.getElementById('tiporelacion').selectedIndex;
        var tiporelacion = document.getElementById('tiporelacion').options[indice].text; 
        if (persona !== '')
                name.value = persona;
            if (tiporelacion !== '')
                name.value = (persona === '') ? tiporelacion : persona + ' - ' + tiporelacion;
    }
        
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

