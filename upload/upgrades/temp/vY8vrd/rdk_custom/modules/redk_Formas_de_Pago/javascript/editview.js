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

 //Verificación de SugarCRM por defecto
 iserror = !check_form_original(formname);

//Añadir nuestra validación de JAVASCRIPT que queremos realizar

 if (!iserror) {
	
        if(document.getElementById('numerocuenta').value != ''){
            resultado = validar_banco(document.getElementById('numerocuenta').value);
            if(resultado != 0){
                iserror = true;
                alert("Número de cuenta no valido");
            }
        }
        
        if(!iserror)
            document.EditView.submit();
    }

}


function validar_banco(numero_cuenta) 
{
    if(numero_cuenta.length != 20) return -1;
    
	var banco = numero_cuenta.substring(0,4);
	var sucursal = numero_cuenta.substring(4,8);
	var dc = numero_cuenta.substring(8,10);
	var cuenta = numero_cuenta.substring(10);	  
  
		if (banco == ""  || sucursal == "" || dc == "" || cuenta == ""){
		  return 0;
		}
		else 
		{
			if (banco.length != 4 || sucursal.length != 4 ||
				dc.length != 2 || cuenta.length != 10)
				{
				return -1;							
			}
			else {
			  if (!numerico(banco) || !numerico(sucursal) ||
				  !numerico(dc) || !numerico(cuenta)){
				return -1;
				  	}				
			  else {
			  	//alert(obtenerDigito("00" + banco + sucursal));
			  	//alert(obtenerDigito(cuenta));
				if (!(obtenerDigito("00" + banco + sucursal) ==
					  parseInt(dc.charAt(0))) || 
					!(obtenerDigito(cuenta) ==
					  parseInt(dc.charAt(1))))
					  {
					return -1;					  					  	
				  	} 
				else
				  return 0;
			  }
			}
		}
                return -1;
}

function numerico(valor){
  cad = valor.toString();
  for (var i=0; i<cad.length; i++) {
    var caracter = cad.charAt(i);
	if (caracter<"0" || caracter>"9")
	  return false;
  }
  return true;
}

function obtenerDigito(valor){
  valores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
  control = 0;
  for (i=0; i<=9; i++)
    control += parseInt(valor.charAt(i)) * valores[i];
  control = 11 - (control % 11);
  if (control == 11) control = 0;
  else if (control == 10) control = 1;
  return control;
}
