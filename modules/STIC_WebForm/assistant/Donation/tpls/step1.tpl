{*
/*********************************************************************************
 Paso 1 del formulario de inscripción a eventos.
 Pregunta los parámetros principales del formulario
 ********************************************************************************/
*}
{literal}
<style>
	td.check {width: 1%; max-width:150px; text-align: left;}
	td.text {white-space:nowrap; text-align: left; padding-right: 2px; vertical-align: middle;}
</style>
{/literal}
<div id='grid_Div'>
    <table width="100%">
        <tr>
            <td><h2>{$MOD.LBL_WEBFORMS_STEP1}</h2></td>
        </tr>
    </table>
    <table width="100%" class="edit view">
    	<tr>
    		<td>
        		<table width="100%" style="border-spacing: 0px; border-collapse: separate; border: none; margin-top: 5px">
        			<tr>
        				<td style="width: 1%; max-width:150px; white-space:nowrap; text-align: left; padding-right: 2px; vertical-align: middle;">{$MOD.LBL_DONATION_WEB_MODULE}:&nbsp;</td>
        		        <td style="text-align: left;">
			    			<select name="web_module" id="web_module">
								{html_options options=$MAP.MODULES selected=$MAP.WEB_MODULE}
							</select>
						</td>
        			</tr>
                </table>
            </td>
        </tr>
     </table>
     <table width="100%" border="0" cellspacing="0" cellpadding="2">
		<tr>
			<td width='10%'>&nbsp;</td>
			<td align="right" style="padding-bottom: 2px;">
				<input type="submit" name="button" title="{$APP.LBL_CANCEL_BUTTON_TITLE}" accessKey="{$APP.LBL_CANCEL_BUTTON_KEY}" class="button" onclick="this.form.action.value='{$MAP.RETURN_ACTION}'; this.form.module.value='{$MAP.RETURN_MODULE}'; this.form.record.value='{$MAP.RETURN_ID}'" value="{$APP.LBL_CANCEL_BUTTON_LABEL}"> 
				<input id="next_button" type='submit' title="{$APP.LBL_NEXT_BUTTON_LABEL}" class="button" name="next_button" value="{$APP.LBL_NEXT_BUTTON_LABEL}">
			</td>
		</tr>
	</table>
</div>
