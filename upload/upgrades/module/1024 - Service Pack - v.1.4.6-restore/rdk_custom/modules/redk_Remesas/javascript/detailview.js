function load_file()
{   
    YAHOO.SUGAR.MessageBox.show({msg: '<form id="customDetail" name="customDetail" action="index.php?module=redk_Remesas&action=devoluciones_sepa" method="post" enctype="multipart/form-data"><input type="file" name="fichero" size="10"> <br><a onclick="document.forms[\'customDetail\'].submit();"><br/><center><button>' + SUGAR.language.get('redk_Remesas', 'LBL_SEPA_RETURN_LOAD_FILE') + '</button></center></a></form>', title: SUGAR.language.get('redk_Remesas', 'LBL_SEPA_RETURN_SELECT_FILE')} );

}

YAHOO.util.Event.addListener(window, 'load', load_file);