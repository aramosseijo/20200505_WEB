function load_file_c19()
{   
    YAHOO.SUGAR.MessageBox.show({width:'auto',msg: '<form id="customDetail" name="customDetail" action="index.php?module=redk_Remesas&action=devoluciones" method="post" enctype="multipart/form-data"><input type="file" name="fichero" size="10"> <br><a onclick="document.forms[\'customDetail\'].submit();"><br/><center><button>' + SUGAR.language.get('redk_Remesas', 'LBL_SEPA_RETURN_LOAD_FILE') + '</button></center></a></form>', title: SUGAR.language.get('redk_Remesas', 'LBL_SEPA_RETURN_SELECT_FILE')} );

}

YAHOO.util.Event.addListener(window, 'load', load_file_c19);