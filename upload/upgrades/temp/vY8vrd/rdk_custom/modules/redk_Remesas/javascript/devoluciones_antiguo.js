
function load_devoluciones_antiguo()
{   
    var id_registro = document.getElementsByName('record')[0].value;
    YAHOO.SUGAR.MessageBox.show({msg: '<form id="customDetail" name="customDetail" action="index.php?module=redk_Remesas&action=devoluciones&record='+id_registro+'" method="post" enctype="multipart/form-data"><input type="file" name="fichero" size="10"> <br><a onclick="document.forms[\'customDetail\'].submit();">Cargar</a></form>', title: 'Subir devoluciones'} );

    
}