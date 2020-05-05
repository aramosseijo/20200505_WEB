function load_file_c19()
{   
    YAHOO.SUGAR.MessageBox.show({msg: '<form id="customDetail" name="customDetail" action="index.php?module=redk_Remesas&action=devoluciones" method="post" enctype="multipart/form-data"><input type="file" name="fichero" size="10"> <br><a onclick="document.forms[\'customDetail\'].submit();"><br/><center><button>Cargar Devolución</button></center></a></form>', title: 'Subir fichero'} );

}


YAHOO.util.Event.addListener(window, 'load', load_file_c19);