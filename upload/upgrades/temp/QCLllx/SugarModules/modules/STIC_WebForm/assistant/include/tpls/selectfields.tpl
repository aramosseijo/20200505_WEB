{*
***********************************************
Muestra el asistente para incluir/quitar campos 
***********************************************
*}
<div id='grid_Div'>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td><h2>{$MOD.LBL_WEBFORMS_GRID_TITLE}{$MAP.SELECTION_MODULE_LABEL}</h2></td>
            <td align="right" nowrap><span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span> {$APP.NTC_REQUIRED}</td>
        </tr>
    </table>
    <table width="100%" class="edit view">
    	<tr>
    		<td><b>{$MOD.LBL_DRAG_DROP_COLUMNS}</b></td>
    	</tr>
    	<tr>
    		<td>
        		<table width="555" style="border-spacing: 0px; border-collapse: separate; border: none; margin-top: 5px">
        			<tr>
        				  <td>
        					<table align="center" width='350'>
            		            <tbody>
                                    <tr><td align="center">{$DRAG_DROP_CHOOSER_WEB_TO_LEAD}</td></tr>
                                </tbody>
                            </table>
        			     </td>
        			</tr>
        			<tr>
        				<td colspan='3'>
        				  <div id='webformfields'></div>
        				</td>
        			</tr>
        		</table>
            </td>
        </tr>
    </table>
    <table width="100%">
		<tr>
    		<td align="left">
    			<input id="add_remove_all_button" type='button' title="{$APP.LBL_ADD_ALL_LEAD_FIELDS}" class="button" onclick="javascript:dragDropAllFields(this,'{$APP.LBL_ADD_ALL_LEAD_FIELDS}','{$APP.LBL_REMOVE_ALL_LEAD_FIELDS}');" name="button" value="{$APP.LBL_ADD_ALL_LEAD_FIELDS}">
    		</td>
    		<td align="right" style="padding-bottom: 2px;">
				<input title="{$APP.LBL_BACK}" accessKey="{$APP.LBL_BACK}" class="button" onclick="return back('webforms');" type="submit" name="button" value="{$APP.LBL_BACK}"> 
				<input id="next_button" type='submit' onclick="return next('webforms');" title="{$APP.LBL_NEXT_BUTTON_LABEL}" class="button" name="next_button" value="{$APP.LBL_NEXT_BUTTON_LABEL}">
    		</td>
		</tr>
    </table>
</div>
