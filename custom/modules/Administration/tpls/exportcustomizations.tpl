{*

/*********************************************************************************
 * The contents of this file are subject to the SugarCRM Master Subscription
 * Agreement ("License") which can be viewed at
 * http://www.sugarcrm.com/crm/en/msa/master_subscription_agreement_11_April_2011.pdf
 * By installing or using this file, You have unconditionally agreed to the
 * terms and conditions of the License, and You may not use this file except in
 * compliance with the License.  Under the terms of the license, You shall not,
 * among other things: 1) sublicense, resell, rent, lease, redistribute, assign
 * or otherwise transfer Your rights to the Software, and 2) use the Software
 * for timesharing or service bureau purposes such as hosting the Software for
 * commercial gain and/or for the benefit of a third party.  Use of the Software
 * may be subject to applicable fees and any use of the Software without first
 * paying applicable fees is strictly prohibited.  You do not have the right to
 * remove SugarCRM copyrights from the source code or user interface.
 *
 * All copies of the Covered Code must include on each user interface screen:
 *  (i) the "Powered by SugarCRM" logo and
 *  (ii) the SugarCRM copyright notice
 * in the same form as they appear in the distribution.  See full license for
 * requirements.
 *
 * Your Warranty, Limitations of liability and Indemnity are expressly stated
 * in the License.  Please refer to the License for the specific language
 * governing these rights and limitations under the License.  Portions created
 * by SugarCRM are Copyright (C) 2004-2011 SugarCRM, Inc.; All Rights Reserved.
 ********************************************************************************/



*}
<br><h2>Recordar realizar un "Update Head" después del "commit" antes de generar los paquetes.</h2><br>
<form name="exportcustom" id="exportcustom">
<input type='hidden' name='module' value='Administration'>
<input type='hidden' name='action' value='ExportCustom'>
<div align="left">
<input type="submit" class="button" name="exportCustomBtn" value="{$mod_strings.LBL_EC_EXPORTBTN}" onclick="return check_form('exportcustom');">
<input type="button" name="CheckAll" value="Check All" onClick="checkAll(document.exportcustom.modules);">
<input type="button" name="UnCheckAll" value="Uncheck All" onClick="uncheckAll(document.exportcustom.modules);">
</div>
<br>

	
    <table border="0" CELLSPACING="15" WIDTH="100%">
        <TR><input type="hidden" name="hiddenCount"></TR>
        {foreach from=$modules key=k item=i}
        
        <TR>
            <TD><h3 style='margin-bottom:20px;'>{if $i != ""}<INPUT onchange="updateCount(this);" type="checkbox" name="modules[]" id="modules" value={$k}>{/if} {if isset($moduleList[$k])} {$moduleList[$k]} {else} {$k} {/if} </h3></TD>
            <TD VALIGN="top">
            {foreach from=$i item=j}
            {$j}<br>
            {/foreach}
            </TD>
        </TR>
        
        {/foreach} 
    </table>
    <br> 
    <div align="left">
<input type="submit" class="button" name="exportCustomBtn" value="{$mod_strings.LBL_EC_EXPORTBTN}" onclick="return check_form('exportcustom');">
<input type="button" name="CheckAll" value="Check All" onClick="checkAll(document.exportcustom.modules);">
<input type="button" name="UnCheckAll" value="Uncheck All" onClick="uncheckAll(document.exportcustom.modules);">
</div>
</form>

{literal}
<script type="text/javascript">
function checkAll(field)
{

for (i = 0; i < field.length; i++)
	field[i].checked = true ;
}

function uncheckAll(field)
{
for (i = 0; i < field.length; i++)
	field[i].checked = false ;
}

var boxChecked = 0;

function updateCount(box) {
   boxChecked = box.checked == true ? ++boxChecked : --boxChecked;
   document.exportcustom.hiddenCount.value = (boxChecked == 0 ? "" : "CHECKED");
}
{/literal}
ModuleBuilder.helpRegister('exportcustom');
ModuleBuilder.helpSetup('exportcustom','exportHelp');
addToValidate('exportcustom', 'hiddenCount', 'varchar', true, '{$mod_strings.LBL_EC_CHECKERROR}');
addToValidate('exportcustom', 'name', 'varchar', true, '{$mod_strings.LBL_PACKAGE_NAME}'{literal});
</script>
{/literal}
{include file='modules/ModuleBuilder/tpls/assistantJavascript.tpl'}