



function set_return_and_saveobjetivos(popup_reply_data)
{
    var form_name=popup_reply_data.form_name;
    var name_to_value_array=popup_reply_data.name_to_value_array;
    for(var the_key in name_to_value_array)
    {
        if(the_key=='toJSON')
        {}
        else
        {
            window.document.forms[form_name].elements[the_key].value=name_to_value_array[the_key];
        }
    }
    
    window.document.forms[form_name].return_module.value=window.document.forms[form_name].module.value;
    window.document.forms[form_name].return_action.value='DetailView';
    window.document.forms[form_name].return_id.value=window.document.forms[form_name].record.value;
    window.document.forms[form_name].action.value='AddObjetivos';
    window.document.forms[form_name].submit();
}
