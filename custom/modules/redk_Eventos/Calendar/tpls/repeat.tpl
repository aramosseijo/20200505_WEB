{*
/*********************************************************************************
 * SugarCRM Community Edition is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by SugarCRM".
 ********************************************************************************/

*}
<table width="100%">
    <tr>
    {*TÍTOL*} <th style="text-align:left"><h2>{$MOD.LBL_TITLE}</h2></th>
   </tr>
</table>
<br>
<div id="edit_all_recurrences_block" style="display: none;">
	<button type="button" id="btn-edit-all-recurrences" onclick="CAL.edit_all_recurrences();"> {$MOD.LBL_EDIT_ALL_RECURRENCES} </button>
	<button type="button" id="btn-remove-all-recurrences" onclick="CAL.remove_all_recurrences();"> {$MOD.LBL_REMOVE_ALL_RECURRENCES} </button>
</div>

<div id="cal-repeat-block" style="dispaly: none;">

<form name="CalendarRepeatForm" id="CalendarRepeatForm" method="POST">
<input type="hidden" id="module" name="module" value="redk_Eventos">
<input type="hidden" id="action" name="action" value="save_data">
<input type="hidden" name="repeat_parent_id">

<table class="edit view" width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="12.5%" valign="top" scope="row">{$MOD.LBL_TIME_START}:<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
    <td width="37.5%" valign="top">
      <div>
        <input type="input" size="11" maxlength="10" id="repeat_start_day_input" name="repeat_start_day" value="" required>
        <img border="0" src="index.php?entryPoint=getImage&imageName=jscalendar.gif" alt="{$APP.LBL_TIME_START}" id="repeat_start_day_trigger" align="absmiddle" >
        <select name="repeat_start_hour">{html_options options=$repeat_hours selected="9"}</select> <span id="repeat-hours-text"></span> :
        <select name="repeat_start_minute">{html_options options=$repeat_minutes selected="0"}</select> <span id="repeat-minutes-text"></span>

        <script type="text/javascript">
            Calendar.setup ({literal}{{/literal}
              inputField : "repeat_start_day_input",
              ifFormat : "%d/%m/%Y",
              daFormat : "%d/%m/%Y",
              button : "repeat_start_day_trigger",
              singleClick : true,
              dateStr : "",
              step : 1,
              startWeekday: {$CALENDAR_FDOW|default:'1'},
              weekNumbers:false
            {literal}}{/literal});
        </script>
      </div>
    </td>
  </tr>

  <tr>
    <td width="12.5%" valign="top" scope="row">{$MOD.LBL_TIME_FINAL}:<span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></td>
    <td width="37.5%" valign="top">
      <div>
        <input type="input" size="11" maxlength="10" id="repeat_final_day_input" name="repeat_final_day" value="" required>
        <img border="0" src="index.php?entryPoint=getImage&imageName=jscalendar.gif" alt="{$APP.LBL_TIME_FINAL}" id="repeat_final_day_trigger" align="absmiddle" >
        <select name="repeat_final_hour">{html_options options=$repeat_hours selected="0"}</select> <span id="repeat-hours-text"></span> :
        <select name="repeat_final_minute">{html_options options=$repeat_minutes selected="0"}</select> <span id="repeat-minutes-text"></span>
				<span id="info_hours" style="font-weight:bolder"></span>

        <script type="text/javascript">
            Calendar.setup ({literal}{{/literal}
              inputField : "repeat_final_day_input",
              ifFormat : "%d/%m/%Y",
              daFormat : "%d/%m/%Y",
              button : "repeat_final_day_trigger",
              singleClick : true,
              dateStr : "",
              step : 1,
              startWeekday: {$CALENDAR_FDOW|default:'1'},
              weekNumbers:false
            {literal}}{/literal});
        </script>
      </div>
    </td>
  </tr>

  <tr>
		<td width="12.5%" valign="top" scope="row">{$MOD.LBL_REPEAT_TYPE}:</td>
		<td width="37.5%" valign="top">
			<select name="repeat_type" onchange="toggle_repeat_type();">{html_options options=$APPLIST.repeat_type_dom}</select>
		</td>
	</tr>

  <tr id="repeat_interval_row" style="display: none;">
		<td width="12.5%" valign="top" scope="row">{$MOD.LBL_REPEAT_INTERVAL}:</td>
		<td width="37.5%" valign="top">
			<select name="repeat_interval">{html_options options=$repeat_intervals selected="1"}</select> <span id="repeat-interval-text"></span>
		</td>
	</tr>

	<tr id="repeat_end_row" style="display: none;">
		<td width="12.5%" valign="top" scope="row">{$MOD.LBL_REPEAT_END}:</td>
		<td width="37.5%" valign="top">
			<div>
				<input type="radio" name="repeat_end_type" value="number" id="repeat_count_radio" checked onclick="toggle_repeat_end();" style="position: relative; top: -5px;"> {$MOD.LBL_REPEAT_END_AFTER}
				<input type="input" size="3" name="repeat_count" value="10"> {$MOD.LBL_REPEAT_OCCURRENCES}
			</div>
			<div>
				<input type="radio" name="repeat_end_type" id="repeat_until_radio" value="date" onclick="toggle_repeat_end();" style="position: relative; top: -5px;"> {$MOD.LBL_REPEAT_END_BY}
				<input type="input" size="11" maxlength="10" id="repeat_until_input" name="repeat_until" value="" disabled>
				<img border="0" src="index.php?entryPoint=getImage&imageName=jscalendar.gif" alt="{$APP.LBL_ENTER_DATE}" id="repeat_until_trigger" align="absmiddle" style="display: none;">

				<script type="text/javascript">
						Calendar.setup ({literal}{{/literal}
							inputField : "repeat_until_input",
							ifFormat : "%d/%m/%Y",
							daFormat : "%d/%m/%Y",
							button : "repeat_until_trigger",
							singleClick : true,
							dateStr : "",
							step : 1,
							startWeekday: {$CALENDAR_FDOW|default:'1'},
							weekNumbers:false
						{literal}}{/literal});
				</script>
			</div>
		</td>
	</tr>

	<tr id="repeat_dow_row" style="display: none;">
		<td width="12.5%" valign="top" scope="row">{$MOD.LBL_REPEAT_DOW}:</td>
		<td width="37.5%" valign="top">
			{foreach name=dow from=$dow key=i item=d}
				{$d.label} <input type="checkbox" name="repeat_dow_{$d.index}" id="repeat_dow[]" style="margin-right: 10px;">
			{/foreach}
		</td>
	</tr>

</table>
<div id="cal-edit-buttons" class="ft">
  <input title="grabar" class="button" type="submit" name="button" value="{$MOD.LBL_SAVE_BUTTON}">
  <input title="Enrera" class="button" onclick="SUGAR.ajaxUI.loadContent('index.php?action=index&module=redk_Eventos'); return false;" type="submit" name="button" value="{$MOD.LBL_CANCEL_BUTTON}">
  </div>
</form>
</div>

<script type="text/javascript">
{literal}
	function toggle_repeat_type(){

		if(typeof validate != "undefined" && typeof validate['CalendarRepeatForm'] != "undefined")
			validate['CalendarRepeatForm'] = undefined;

		if(document.forms['CalendarRepeatForm'].repeat_type.value == ""){
			document.getElementById("repeat_interval_row").style.display = "none";
			document.getElementById("repeat_end_row").style.display = "none";
		}else{
			document.getElementById("repeat_interval_row").style.display = "";
      document.getElementById("repeat_end_row").style.display = "";
			toggle_repeat_end();
		}

		var repeat_dow_row = document.getElementById("repeat_dow_row");
		if(document.forms['CalendarRepeatForm'].repeat_type.value == "Weekly"){
			repeat_dow_row.style.display = "";
		}else{
			repeat_dow_row.style.display = "none";
		}

		var intervalTextElm = document.getElementById('repeat-interval-text');
		if (intervalTextElm && typeof SUGAR.language.languages.app_list_strings['repeat_intervals'] != 'undefined') {
			intervalTextElm.innerHTML = SUGAR.language.languages.app_list_strings['repeat_intervals'][document.forms['CalendarRepeatForm'].repeat_type.value];
		}
	}

	function toggle_repeat_end(){
		if(document.getElementById("repeat_count_radio").checked){
			document.forms['CalendarRepeatForm'].repeat_until.setAttribute("disabled","disabled");
			document.forms['CalendarRepeatForm'].repeat_count.removeAttribute("disabled");
			document.getElementById("repeat_until_trigger").style.display = "none";

			if(typeof validate != "undefined" && typeof validate['CalendarRepeatForm'] != "undefined"){
				removeFromValidate('CalendarRepeatForm', 'repeat_until');
			}
			addToValidateMoreThan('CalendarRepeatForm', 'repeat_count', 'int', true,'{/literal}{$MOD.LBL_REPEAT_COUNT}{literal}', 1);
		}else{
			document.forms['CalendarRepeatForm'].repeat_count.setAttribute("disabled","disabled");
			document.forms['CalendarRepeatForm'].repeat_until.removeAttribute("disabled");
			document.getElementById("repeat_until_trigger").style.display = "";

			if(typeof validate != "undefined" && typeof validate['CalendarRepeatForm'] != "undefined"){
				removeFromValidate('CalendarRepeatForm', 'repeat_count');
			}
			addToValidate('CalendarRepeatForm', 'repeat_until', 'date', true,'{/literal}{$MOD.LBL_REPEAT_UNTIL}{literal}');
		}

		// prevent an issue when a calendar date picker is hidden under a dialog
		var editContainer = document.getElementById('cal-edit_c');
		if (editContainer) {
			var pickerContainer = document.getElementById('container_repeat_until_trigger_c');
			if (pickerContainer) {
				pickerContainer.style.zIndex = editContainer.style.zIndex + 1;
			}
		}
	}


 // added feedback to date and hours select
	
function setHoursInfo() {

    var start = $('#repeat_start_day_input').val() + '/' + $('[name=repeat_start_hour]').val() + '/' + $('[name=repeat_start_minute]').val()
    start = start.split('/')
    var start = new Date(start[2],start[1],start[0],start[3],start[4] * 15);
    var final = $('#repeat_final_day_input').val() + '/' + $('[name=repeat_final_hour]').val() + '/' + $('[name=repeat_final_minute]').val()
    final = final.split('/')
    var final = new Date(final[2],final[1],final[0],final[3],final[4] * 15);
    var difference = final.getTime() - start.getTime();
    if (difference <= 0) {
        $('#info_hours').html("<span style='color:red;display:inline-block;'>Error! </span>")
        return;
    }
    var minutes = Math.round(difference / 60000);
    var hours = Math.floor((parseInt(minutes) / 60))
    var minutes = (parseInt(minutes) % 60)
    hours = parseInt(hours) < 10 ? '0' + hours : hours
    minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes
    $('#info_hours').text(SUGAR.language.get('redk_Eventos', 'LBL_SESSION_DURATION') + ': ' + hours + 'h ' + minutes + '\'')

}

$('[name=repeat_start_hour]').off('change')
$('[name=repeat_start_hour],[name=repeat_final_hour],[name=repeat_start_minute],[name=repeat_final_minute]').on('change', function() {
    setHoursInfo();

})
var currentStartDate = $('#repeat_start_day_input').val();
$('BODY').on('click', '#container_repeat_start_day_trigger a', function() {
    $('#repeat_final_day_input').val($('#repeat_start_day_input').val());
    setHoursInfo();
})

$('BODY').on('click', '#container_repeat_final_day_trigger a', function() {
    setHoursInfo();
})

$('#repeat_start_day_input,#repeat_final_day_input').on('change', function() {
    setHoursInfo();
})

$('#repeat_start_day_input').val(new Date().toLocaleDateString());
$('#repeat_final_day_input').val(new Date().toLocaleDateString());
$('[name=repeat_final_hour]').val('10');

setHoursInfo()
{/literal}
</script>
