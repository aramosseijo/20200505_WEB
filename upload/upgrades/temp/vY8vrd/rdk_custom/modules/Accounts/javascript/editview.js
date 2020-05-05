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
	
        if(document.getElementById('cif_c').value != ''){
            resultado = valida_nif_cif_nie(document.getElementById('cif_c').value);
            if(resultado != 2){
                iserror = true;
                alert("CIF no valido");
            }
        }
        
        if(!iserror)
            document.EditView.submit();
    }

}

//Retorna: 1 = NIF ok, 2 = CIF ok, 3 = NIE ok, -1 = NIF error, -2 = CIF error, -3 = NIE error, 0 = ??? error
function valida_nif_cif_nie(a) 
{
 var temp=a.toUpperCase();
 var cadenadni="TRWAGMYFPDXBNJZSQVHLCKE";
 
 if (temp!==''){
  //si no tiene un formato valido devuelve error
  if ((!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(temp) && !/^[T]{1}[A-Z0-9]{8}$/.test(temp)) && !/^[0-9]{8}[A-Z]{1}$/.test(temp))
  {
   return 0;
  }
 
  //comprobacion de NIFs estandar
  if (/^[0-9]{8}[A-Z]{1}$/.test(temp))
  {
   posicion = a.substring(8,0) % 23;
   letra = cadenadni.charAt(posicion);
   var letradni=temp.charAt(8);
   if (letra == letradni)
   {
       return 1;
   }
   else
   {
    return -1;
   }
  }
 
  //algoritmo para comprobacion de codigos tipo CIF
  suma = parseInt(a[2])+parseInt(a[4])+parseInt(a[6]);
  for (i = 1; i < 8; i += 2)
  {
   temp1 = 2 * parseInt(a[i]);
   temp1 += '';
   temp1 = temp1.substring(0,1);
   temp2 = 2 * parseInt(a[i]);
   temp2 += '';
   temp2 = temp2.substring(1,2);
   if (temp2 == '')
   {
    temp2 = '0';
   }
 
   suma += (parseInt(temp1) + parseInt(temp2));
  }
  suma += '';
  n = 10 - parseInt(suma.substring(suma.length-1, suma.length));
 
  //comprobacion de NIFs especiales (se calculan como CIFs)
  if (/^[KLM]{1}/.test(temp))
  {
   if (a[8] == String.fromCharCode(64 + n))
   {
    return 1;
   }
   else
   {
    return -1;
   }
  }
 
  //comprobacion de CIFs
  if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(temp))
  {
   temp = n + '';
   if (a[8] == String.fromCharCode(64 + n) || a[8] == parseInt(temp.substring(temp.length-1, temp.length)))
   {
    return 2;
   }
   else
   {
    return -2;
   }
  }
 
  //comprobacion de NIEs
  //T
  if (/^[T]{1}/.test(temp))
  {
   if (a[8] == /^[T]{1}[A-Z0-9]{8}$/.test(temp))
   {
    return 3;
   }
   else
   {
    return -3;
   }
  }
 
  //XYZ
  if (/^[XYZ]{1}/.test(temp))
  {
   pos = str_replace(['X', 'Y', 'Z'], ['0','1','2'], temp).substring(0, 8) % 23;
   if (a[8] == cadenadni.substring(pos, pos + 1))
   {
    return 3;
   }
   else
   {
    return -3;
   }
  }
 }
 
 return 0;
}