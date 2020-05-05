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
 
 
//    formaDepago = document.getElementById('redk_formas_de_pago_redk_pagos_name').value;
//    
//    contacto = document.getElementById('redk_pagos_contacts_name').value;
//    
//    cuenta = document.getElementById('redk_pagos_accounts_name').value; 
//  
//    nombre = document.getElementById('name').value;
//    
//    var fecha = new Date();
//    fecha = (fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear());
//    
//    
// 
//    //RESET al name
//    document.getElementById('name').value = '';
// 
//    //Generación automática del nombre: Generación del campo nombre del registro de la inscripción 
//    //de forma automática que estará compuesto con el Nombre del Contacto, Cuenta o Cliente Potencial 
//    //más el nombre del Evento asociado a la inscripción
//    if(contacto != '' && formaDepago != '')
//        document.getElementById('name').value = formaDepago+'_'+contacto+'_'+fecha;
//    
//    if(cuenta != '' && formaDepago != '')
//        document.getElementById('name').value = formaDepago+'_'+cuenta+'_'+fecha;
    
    

    //Verificación de SugarCRM por defecto
    iserror = !check_form_original(formname);

    //Añadir nuestra validación de JAVASCRIPT que queremos realizar

    if (!iserror)
        document.EditView.submit();


}
