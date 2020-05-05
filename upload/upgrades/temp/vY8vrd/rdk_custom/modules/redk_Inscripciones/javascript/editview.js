/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



// Call function when page loads
YAHOO.util.Event.addListener(window, 'load', onLoadCustom);


//Poner validaciones de fecha
check_form_original=null;
formname = 'EditView';

function check_form_override(){
    custom_validadores();
    return false;
}

function onLoadCustom(){
    // Replace the original check_form funcion with our custom function
    check_form_original=check_form;
    check_form=check_form_override;
}

function custom_validadores() {
disableOnUnloadEditView(document.forms['EditView']);
 nombre_evento = document.getElementById('redk_eventos_redk_inscripciones_name').value;
 nombre_contacto = document.getElementById('redk_inscripciones_contacts_name').value;
 nombre_cuenta = document.getElementById('redk_inscripciones_accounts_name').value;
 nombre_lead = document.getElementById('redk_inscripciones_leads_name').value;
 
 //RESET al name
 
 
 //document.getElementById('name').value = '';
 
 //Generación automática del nombre: Generación del campo nombre del registro de la inscripción 
 //de forma automática que estará compuesto con el Nombre del Contacto, Cuenta o Cliente Potencial 
 //más el nombre del Evento asociado a la inscripción
 
 if(document.getElementById('name').value ==''){
    if(nombre_contacto != '' && nombre_evento != '')
      document.getElementById('name').value = nombre_contacto+' - '+nombre_evento;
    if(nombre_cuenta != '' && nombre_evento != '')
      document.getElementById('name').value = nombre_cuenta+' - '+nombre_evento;
    if(nombre_lead != '' && nombre_evento != '')
      document.getElementById('name').value = nombre_lead+' - '+nombre_evento;   
 }
 

 //Verificación de SugarCRM por defecto
 iserror = !check_form_original(formname);

//Añadir nuestra validación de JAVASCRIPT que queremos realizar

 if (!iserror)
   document.EditView.submit();


}
