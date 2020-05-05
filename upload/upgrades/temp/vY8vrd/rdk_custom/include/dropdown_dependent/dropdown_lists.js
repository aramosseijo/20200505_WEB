/*******************************************/
/****************  REDK  *******************/
/*******************************************/

//Llamada para que cuando se termine de cargar la ventana realize la llamada a la función JavaScript indicada
//YAHOO.util.Event.addListener(window, "load", ajax_getsub);

//Alternativa a la función superior, pero en este caso se tiene que controlar que solo se entre una vez a la función
//YAHOO.util.Event.onContentReady(window,onLoadCustom);

//Función Javascript que realiza llamada AJAX a SugarCRM y trata la respuesta
//En este caso es rellenar los valores de una lista desplegable
function ajax_get_select(moduleName, requestParams, selectElement, selected_sc) {
    var url = 'index.php?entryPoint=' + moduleName + '&' + requestParams;	
        
	
    //Llamada Asincrona a la petición, se indica que funciones se tienen que ejecutar en caso de respuesta correcta o erronea
    var cObj = YAHOO.util.Connect.asyncRequest('POST', url, {
        success: success,
        failure: failure,
        argument: selectElement
    });
	
    function failure(data) {
        alert('No se puede conectar.');
    }//END function failure
	
    function success(data) {        
        if(data.responseText) {
                        
            var optionsObject = JSON.parse(data.responseText);
			
            if(optionsObject === false) {
                alert('Error, parsing JSON data.');
            }

            var selectElement2update = document.getElementById(selectElement);
            selectElement2update.innerHTML = '';
            for(var i in optionsObject){
	
                var eOption = new Option();
                eOption.value = optionsObject[i]['value'];
                eOption.label = optionsObject[i]['label'];
                eOption.text =  optionsObject[i]['label'];
					
                if(eOption.value == selected_sc){
                    eOption.selected=true;
                }
											
                try {
                    selectElement2update.add(eOption, null);
                } catch (e) {
                    selectElement2update.add(eOption);
                }
            }
        }
    }//END function success
}//END function ajax_get_select

function ajax_getsub(campo_padre,campo_hijo,desplegable)
{    
    
    motivo = document.getElementById(campo_padre);
    if(typeof motivo.options[motivo.selectedIndex] === "undefined")
        id_motivo = '';
    else
        id_motivo = motivo.options[motivo.selectedIndex].value;
	
    submotivo = document.getElementById(campo_hijo);
    if(!submotivo.selectedIndex) indice=0;
    else indice = submotivo.selectedIndex;
 	
    if(typeof submotivo.options[indice] === "undefined")
        id_submotivo = '';
    else
        id_submotivo = submotivo.options[indice].value;

	
    if(id_motivo!=''){		
        accion = 'getsubdropdown';		
        params = "id_seleccionado=" + id_motivo + "&desplegable=" + desplegable;	
        ajax_get_select(accion,params,campo_hijo,id_submotivo);//Llamada a función que realiza petición de datos por AJAX
    }else{
        document.getElementById(campo_hijo).innerHTML = '';//Establecemos el desplegable sin valores
    }  
    
}
