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
<script type="text/javascript">

function enableOptions(includeOrg) {
	var cif = document.getElementById("cifobligatorio");
	var nameOrg = document.getElementById("nombreorgopcional");
	cif.disabled = ! includeOrg.checked;
	nameOrg.disabled = ! includeOrg.checked;
	if (cif.disabled) {cif.checked = false;}
	if (nameOrg.disabled) {nameOrg.checked = false;}
}

function optionalNameCtrl(cifObligatorio) {
	var nameOrg = document.getElementById("nombreorgopcional");
	nameOrg.disabled = cifObligatorio.checked;
	if (nameOrg.disabled) {nameOrg.checked = false;}
}

</script>
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
        				<td class="check"><input type="checkbox" name="incluyefp" id="incluyefp" value="1" {$FP_CHECKED}></td>
        				<td class="text">{$MOD.LBL_WEBFORMS_INCLUYE_PAGOS}</td>
        			</tr>
					<tr>
					    <td class="check"><input type="checkbox" name="incluyeorg" id="incluyeorg" value="1" {$ORG_CHECKED} onclick="enableOptions(this);"></td>
        				<td class="text">{$MOD.LBL_WEBFORMS_INCLUYE_ORGANIZACION}</td>
        			</tr>
        			<tr>
					    <td class="check"><input type="checkbox" name="nombreorgopcional" id="nombreorgopcional" value="1" {$NOMBRE_ORG_CHECKED} {if (! $ORG_CHECKED || $CIF_CHECKED)} disabled {/if}></td>
        				<td class="text">{$MOD.LBL_WEBFORMS_HACER_NOMBRE_OPCIONAL}</td>
        			</tr>
        			<tr>
            		   	<td class="check"><input type="checkbox" name="cifobligatorio" id="cifobligatorio" value="1" {$CIF_CHECKED} {if ! $ORG_CHECKED} disabled {/if} onclick="optionalNameCtrl(this);"> </td>
        				<td class="text"">{$MOD.LBL_WEBFORMS_HACER_CIF_OBLIGATORIO}</td>
        			</tr>
        			<tr>
        				<td class="check"><input type="checkbox" name="incluyeinscripcion" id="incluyeinscripcion" value="1" {$INS_CHECKED}></td>
        				<td class="text">{$MOD.LBL_WEBFORMS_INCLUYE_INSCRIPCION}</td>
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
