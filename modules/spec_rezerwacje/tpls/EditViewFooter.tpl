<!-- <link rel="stylesheet" type="text/css" href="themes/Sugar/style.css" /> -->
<script type="text/javascript" src="modules/spec_rezerwacje/Rezerwacje.js"></script>
<script type="text/javascript">
var selectButtonTitle = '{$APP.LBL_SELECT_BUTTON_TITLE}';
var selectButtonKey	  = '{$APP.LBL_SELECT_BUTTON_KEY}';
var selectButtonValue = '{$APP.LBL_SELECT_BUTTON_LABEL}';
var deleteButtonValue = '{$MOD.LBL_REMOVE_PRODUCT_LINE}';
</script>
{$MOD.LBL_RESOURCES}
 
 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabForm">
 <tr>
  <td>
   <table width="100%" border="0" cellspacing="0" cellpadding="0" id="productLine">
   
   <tr>
     <td class="dataLabel">{$MOD.LBL_RES_NAME}</td>
     <td class="dataLabel">{$MOD.LBL_RES_TYPE}</td>
     <td class="dataLabel">{$MOD.LBL_RES_NO_INV}</td>
     <td class="dataLabel">{$MOD.LBL_RES_H_RATE} ({$CURRENCY})</td>
      <td class="dataLabel">{$MOD.LBL_RES_D_RATE} ({$CURRENCY})</td>
       <td class="dataLabel"></td>
   </tr>
   
   {$PRODUCT_LINE}
    
   </table>
</table>
<div style="padding-top: 2px">
 <input type="button" class="button" value="{$MOD.LBL_ADD_RES}" id="addProductLine" onclick="insertProductLine({$PRODUCT_LINE_COUNT})" />
 </div>
<br>

{{include file='include/EditView/footer.tpl'}}
