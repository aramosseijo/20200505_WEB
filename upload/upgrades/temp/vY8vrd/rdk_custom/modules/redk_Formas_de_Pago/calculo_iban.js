/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

YAHOO.util.Event.addListener(window, "load", carga_iban);

YAHOO.util.Event.onContentReady(window,carga_iban);


var carga_iban_true ;
function carga_iban(){
    if (typeof carga_iban_true!='undefined'){
        return;
    }
    YAHOO.util.Event.addListener(document.getElementById('numerocuenta'), 'change', revisar_iban);
    carga_iban_true = true;
}
 
 function revisar_iban(){
     document.getElementById('numeroiban_c').value = '';
      loadScript("rdk_custom/modules/redk_Formas_de_Pago/iban.js", calcular_iban);
      
 }  
 
 function loadScript(url, callback)
{
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

var calcular_iban = function() {
        var iban = IBAN.fromBBAN("ES", document.getElementById('numerocuenta').value);
        document.getElementById('numeroiban_c').value = iban.slice(0, 4);
   
};