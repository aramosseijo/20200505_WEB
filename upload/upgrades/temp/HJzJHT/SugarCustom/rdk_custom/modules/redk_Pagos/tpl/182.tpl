{* /*****************************************
.tpl template of 182 Model
 ****************************************/ *}
{literal}
<style>
.letter13{font-size:13px;}
.letter10{font-size:10px;}
td, th {
    text-align: left;
    padding: 3px;
    padding-right: 50px;
}
</style>
{/literal}

<table width="100%">
    <tr>
    {*TITLE*} <th style="text-align:left"><h2>{$MOD.LBL_M182_TITLE}</h2></th>
   </tr>
</table>
<hr style="height:2px;border-width:0;color:#3f77c4;background-color:#3f77c4;" width="50%">

<br>
{*INSTRUCTIONS*}
{if $ERR.TIPO_ERROR== 0} <p style="text-align:left;color:#000000;" class="letter13">{$MOD.LBL_M182_INSTRUCT}</p>  {/if}
{if $ERR.TIPO_ERROR== 1} <p style="text-align:left;color:#d5061e;" class="letter13">{$MOD.LBL_M182_INSTRUCT}</p> {/if}

<br>
<form name="redk_Pagos" method="POST">
<input type="hidden" id="module" name="module" value="redk_Pagos">
<input type="hidden" id="action" name="action" value="modelo182">

<table border="0" cellspacing="5">
  <br>
{*TYPE OF PAYMENTS*}
    <select id="tipopago" name="tipopago[]" multiple="multiple">
    {html_options values=$LAB.TIPO_PAGO_VALUES output=$INT.TIPO_PAGO_OUTPUT}
    </select>
</table>

<table width="100%">
{*BUTTONS*}
  	<tr>
			<br><br>
	     <td align="left" style="padding-bottom: 2px;">
	        <input title="{$MOD.LBL_M182_BACK}" class="button" type="reset"  value="{$MOD.LBL_M182_BACK}">
          <input title="{$MOD.LBL_M182_NEXT}" class="button" type="submit"  value="{$MOD.LBL_M182_NEXT}">
       </td>
		</tr>
</table>
<br>
<table width="100%">

</table>
</form>
