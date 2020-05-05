{* Muestra el formulario generado para la edición de su formato *}

{$MAP.JAVASCRIPT}
{*<script type="text/javascript" language="Javascript" src="modules/EmailTemplates/EmailTemplate.js?v={VERSION_MARK}"></script>*}
{*<script type="text/javascript" language="Javascript" src="cache/include/javascript/sugar_grp1_yui.js?v={VERSION_MARK}"></script>*}

<script type="text/javascript">
	{$MAP.FIELD_DEFS_JS}
</script>
<table width="100%">
    <tr>
        <td><h2>{$MOD.LBL_WEBFORMS_FORMAT}</h2></td>
        <td align="right" nowrap><span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span> {$APP.NTC_REQUIRED}</td>
    </tr>
</table>
<table width="100%" class="edit view">
	<tr>
		<td>
			<table width="100%">
				<tr>
					<td>
						<textarea id="body_html" name="body_html" cols="100" rows="40">{include file="$INCLUDE_TEMPLATE_DIR/formtoformat.tpl"}</textarea>
	                </td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table width="100%">
    <tr>
		<td align="left" nowrap><span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span> {$APP.NTC_REQUIRED}</td>
		<td align="right" style="padding-left: 2px;">
			<input title="{$APP.LBL_BACK}" accessKey="{$APP.LBL_BACK}" class="button" onclick="return back('webforms');" type="submit" name="button" value="{$APP.LBL_BACK}"> 
   			<input title="{$APP.LBL_GENERATE_WEB_TO_LEAD_FORM}" class="button" type="submit" name="button" value="{$APP.LBL_GENERATE_WEB_TO_LEAD_FORM}">				
		</td>
	</tr>
</table>
{$MAP.TINY}