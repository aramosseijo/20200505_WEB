{*
***********************************************
Muestra los parámetros finales del formulario
***********************************************
*}

<link rel="stylesheet" type="text/css" href="include/javascript/yui/build/datatable/assets/skins/sam/datatable.css?v={$VERSION_MARK}">
{*<script type="text/javascript" src="custom/modules/redk_Eventos/javascript/WebFormGrid.js?v={$VERSION_MARK}"></script>*}
{literal}
<style>
	.yui-dt table {width: 180px;}
	.edit tr th {padding: 0px 2px !important;}
	.tabDetailViewDF {border-bottom: 0px;}
</style>
<script>
	function editUrl() {
	    var chk_url_elm = document.getElementById("chk_edit_url");
	    if (chk_url_elm.checked == true) {
	        var url_elm = document.getElementById("post_url");
	        url_elm.disabled = false;
	    }
	    if (chk_url_elm.checked == false) {
	        var url_elm = document.getElementById("post_url");
	        url_elm.disabled = true;
	    }
	}
</script>
{/literal}
    <table width="100%">
        <tr>
            <td><h2>{$MOD.LBL_WEBFORMS_STEP5}</h2></td>
            <td align="right" nowrap><span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span> {$APP.NTC_REQUIRED}</td>
    	</tr>
    </table>
    <table width="100%" class="edit view">
    	<tr>
    		<td>
        		<table style="width: 100%">
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_HEADER}:</td>
        				<td width="80%">
        					<input id="web_header" name="web_header" title="{$MOD.LBL_DEFINE_HEADER}" size="60" value="{$MAP.FORM_HEADER|default:$MOD.LBL_DEFINE_HEADER}" type="text">
        				</td>
        			</tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_DESCRIPTION}:</td>
        				<td width="80%">
        					{assign var="DEFAULT_DESC" value=$MOD.LBL_DESCRIPTION_TEXT_FORM|cat:"&nbsp;"|cat:$MOD.LBL_DESCRIPTION_TEXT_FP_FORM}
        					<textarea id="web_description" name="web_description" rows="2" cols="55">{$MAP.FORM_DESCRIPTION|default:$DEFAULT_DESC}</textarea>
        				</td>
        			</tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_SUBMIT}:</td>
        				<td width="80%">
        					<input id="web_submit" name="web_submit" title="{$MOD.LBL_WEBFORMS_SUBMIT}" size="60" value="{$MAP.FORM_SUBMIT_LABEL|default:$MOD.LBL_WEBFORMS_SUBMIT_DEFAULT}" type="text">
        				</td>
        			</tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_POST_URL}:</td>
        				<td width="80%">
       						<input id="post_url" name="post_url" size="60" disabled='true' value="{$MAP.FORM_WEB_POST_URL}" type="text">
        					<input id="chk_edit_url" name="chk_edit_url" onclick="editUrl();" class='checkbox' type='checkbox'><span class="dataLabel" width="10%">{$MOD.LBL_WEBFORMS_POST_URL_MODIFY}</span>
        				</td>
        			</tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_REDIRECT_OK_URL}:&nbsp;<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
        				<td>
        					<input id="redirect_ok_url" name="redirect_ok_url" size="60" value="{$MAP.FORM_REDIRECT_OK_URL|default:$MAP.REDIRECT_OK_URL_DEFAULT}" type="text">
        				</td>
        			</tr>
                    <tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_REDIRECT_KO_URL}:&nbsp;<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
        				<td>
        					<input id="redirect_ko_url" name="redirect_ko_url" size="60" value="{$MAP.FORM_REDIRECT_KO_URL|default:$MAP.REDIRECT_KO_URL_DEFAULT}" type="text">
        				</td>
        			</tr>
					<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_TIPO_PAGO}:&nbsp;<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
        				<td>
                            <select id="tipopago" name="tipopago">
                            {html_options options=$MAP.TIPO_PAGO_OPTIONS selected=$MAP.TIPO_PAGO}
                            </select>
                        </td>
        			</tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_TIPO_RELACION}:&nbsp;</td>
        				<td>
                            <select id="tiporelacion" name="tiporelacion">
                            {html_options options=$MAP.TIPO_RELACION_OPTIONS selected=$MAP.TIPO_RELACION}
                            </select>
                        </td>
        			</tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_NOTIFICATION_EMAIL_TEMPLATE}:&nbsp;</td>
        				<td>
        					<span sugar="slot40b"> 
        						<input class="sqsEnabled" autocomplete="off" id="email_template_name" name="email_template_name" type="text" value="{$MAP.EMAIL_TEMPLATE_NAME}" /> 
        						<input id="email_template_id" name="email_template_id" type="hidden" value="{$MAP.EMAIL_TEMPLATE_ID}" /> 
        						<input title="{$APP.LBL_SELECT_BUTTON_TITLE}" type="button" class="button" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name=btn1 onclick='open_popup("EmailTemplates", 600, 400, "", true, false,{$MAP.EMAIL_TEMPLATES_POPUP_REQ_DATA});' />
        					</span sugar="slot">
        				</td>
        			</tr>    			
        			<tr>
        				<td scope="row">{$MOD.LBL_RELATED_CAMPAIGN}:&nbsp;<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
        				<td>
        					<span sugar="slot40b"> 
        						<input class="sqsEnabled" autocomplete="off" id="campaign_name" name="campaign_name" type="text" value="{$MAP.CAMPAIGN_NAME}" /> 
        						<input id="campaign_id" name="campaign_id" type="hidden" value="{$MAP.CAMPAIGN_ID}" /> 
        						<input title="{$APP.LBL_SELECT_BUTTON_TITLE}" type="button" class="button" value='{$APP.LBL_SELECT_BUTTON_LABEL}' name=btn1 onclick='open_popup("Campaigns", 600, 400, "", true, false,{$MAP.CAMPAIGNS_POPUP_REQ_DATA});' />
        					</span sugar="slot">
        				</td>
        			</tr>
        			<tr>
        	        	 <td scope="row">{$APP.LBL_ASSIGNED_TO}&nbsp;<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
                  	  	 <td>
                  	  	 	<span sugar="slot45b">
                  	  	 		<input class="sqsEnabled" autocomplete="off" id="assigned_user_name" name="assigned_user_name" type="text" value="{$MAP.ASSIGNED_USER_NAME}">
								<input id="assigned_user_id" name="assigned_user_id" type="hidden" value="{$MAP.ASSIGNED_USER_ID}" />
	        		    	 	<input title="{$APP.LBL_SELECT_BUTTON_TITLE}" type="button" class="button" value="{$APP.LBL_SELECT_BUTTON_LABEL}" name=btn1 onclick='open_popup("Users", 600, 400, "", true, false, {$MAP.USERS_POPUP_REQ_DATA});' />
        		    	 	</span sugar='slot'>
        				</td>
              	    </tr>
        			<tr>
        				<td scope="row">{$MOD.LBL_WEBFORMS_FOOTER}:</td>
        				<td>
        					<textarea name='web_footer' rows='2' cols='55'>{$MAP.FORM_FOOTER|default:$MOD.LBL_WEBFORMS_FOOTER_DEFAULT}</textarea>
        				</td>
        			</tr>
        		</table>
    		</td>
    	</tr>
    </table>
    <table width="100%">
    	<tr>
    		<td align="right" style="padding-bottom: 2px;">
    			<input title="{$APP.LBL_BACK}" accessKey="{$APP.LBL_BACK}" class="button" onclick="return back('webforms');" type="submit" name="button" value="{$APP.LBL_BACK}"> 
    			<input title="{$APP.LBL_NEXT_BUTTON_LABEL}" class="button" type="submit" name="button" value="{$APP.LBL_NEXT_BUTTON_LABEL}" onclick="return check_form('webforms')">
    		</td>
    	</tr>
    </table>