
/*


function load_file()
{   
    var id_registro = document.getElementsByName('record')[0].value;
    YAHOO.SUGAR.MessageBox.show({msg: '<form id="customDetail" name="customDetail" action="index.php?module=redk_Remesas&action=devoluciones&record='+id_registro+'" method="post" enctype="multipart/form-data"><input type="file" name="fichero" size="10"> <br><a onclick="document.forms[\'customDetail\'].submit();">Cargar</a></form>', title: 'Subir fichero'} );

    
}
*/

function load_file()
{   
    YAHOO.SUGAR.MessageBox.show({msg: '<form id="customDetail" name="customDetail" action="index.php?module=redk_Remesas&action=devoluciones_sepa" method="post" enctype="multipart/form-data"><input type="file" name="fichero" size="10"> <br><a onclick="document.forms[\'customDetail\'].submit();"><br/><center><button>Cargar Devolución</button></center></a></form>', title: 'Subir fichero'} );

}


YAHOO.util.Event.addListener(window, 'load', load_file);