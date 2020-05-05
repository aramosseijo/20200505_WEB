{*
/*********************************************************************************
 Plantilla del formulario para formatear
 ********************************************************************************/
*}
<!-- form -->
<form action="{$MAP.FORM.URL}" name="{$MAP.FORM.NAME|default:"WebToLeadForm"}" method="POST" id="{$MAP.FORM.ID|default:"WebToLeadForm"}">
	<!-- hidden Fields -->
	{foreach from=$MAP.FORM.HIDDEN item=FIELD}
			<input type="hidden" id="{$FIELD.ID|default:$FIELD.NAME}" name="{$FIELD.NAME}" value="{$FIELD.VALUE}">
	{/foreach}
	<!-- // hidden fields -->
	<table width='100%' style='border-top: 1px solid; border-bottom: 1px solid; padding: 10px 6px 12px 10px; background-color: rgb(233, 243, 255); font-size: 12px; background-repeat: repeat-x; background-position: center top;'>
		
		<!-- header -->
		{if $MAP.FORM.HEADER.TEXT}
			<tr style="{$MAP.FORM.HEADER.CSS} font-size: 18px; font-weight: bold; text-align: center;">
				<td colspan="4"><b><h2>{$MAP.FORM.HEADER.TEXT}</h2></b></td>
			</tr>
			<tr style="{$MAP.FORM.HEADER.CSS} font-size: 2px;">
				<td colspan="4">&nbsp</td>
			</tr>
		{/if}
		<!-- // header -->
		
		<!-- description -->
		{if $MAP.FORM.DESCRIPTION.TEXT} 
			<tr style="{$MAP.FORM.DESCRIPTION.CSS} font-size: 12px; text-align: left">
				<td colspan="4">{$MAP.FORM.DESCRIPTION.TEXT}</td>
			</tr>
			<tr style="font-size: 8px; text-align: center">
				<td colspan="4">&nbsp</td>
			</tr>
		{/if}
		<!-- // description -->

		<!-- fieldSets -->
		{foreach from=$MAP.FORM.FIELDSET item=FIELDSET}
			<tbody id="{$FIELDSET.NAME}" class="section">
				<tr style="margin: 10px 0 6px 0;">
					<td colspan="4" style="font-size: 12px; font-weight: bold; text-align: left;">{$FIELDSET.LABEL}</td>
				</tr>
			
				{foreach from=$FIELDSET.ROWS item=ROW}
					<tr>					
					
					{foreach from=$ROW item=COLS}
						
						{foreach from=$COLS item=FIELD}
							
							<td width="15%" id="td_lbl_{$FIELD.name}" style="text-align: left; font-size: 12px; font-weight: normal;{if $FIELD.hidden} display: none{/if}">
								<span sugar='slot'><label id="lbl_{$FIELD.name}" for="{$FIELD.name}">{$FIELD.label}</label></span sugar='slot'>
								{if $FIELD.DEF.required}
			        				<span id="lbl_{$FIELD.name}_required" class="required" style="color: rgb(255, 0, 0);">{$APP.LBL_REQUIRED_SYMBOL}</span>
			        			{/if}
			        		</td>
			        		<td width="35%" id="td_{$FIELD.name}" style="font-size: 12px; font-weight: normal;{if $FIELD.hidden} display: none{/if}">
		        				{* 
									TEXTAREA
									Se renderiza como un input text porque de lo contrario el editor no funciona. 
									Se añade el span id='ta_replace' para poder volver a transformarlo en el momento de generar el formulario 
								*}
			        			<span {if $FIELD.DEF.type == 'text'} id="ta_replace" {/if} sugar="slot">
									{* Input Select *}
									{if $FIELD.DEF.type == "multienum" || $FIELD.DEF.type == "enum" || $FIELD.DEF.type == "radioenum"}
										<select name="{$FIELD.name}" id="{$FIELD.name}" {if $FIELD.DEF.isMultiSelect} multiple="true" {/if} {$FIELD.script}>
										{html_options options=$FIELD.options selected=$FIELD.selected_options}
										</select>
									{* Input Checkbox *}
									{elseif $FIELD.DEF.type == "bool"}
										<input type="checkbox" id="{$FIELD.name}" name="{$FIELD.name}" {if $FIELD.DEF.default} checked {/if} {$FIELD.script}/>
									{* Input Date *}
									{elseif $FIELD.DEF.type == "date" || $FIELD.DEF.type == "datetime" || $FIELD.DEF.type == "datetimecombo"}
										<span class="dateTime">
						                	<input class="date_input" autocomplete="off" type="text" name="{$FIELD.name}" id="{$FIELD.name}" title="{$FIELD.name}" size="11" maxlength="10" {$FIELD.script}>
							                <img src="{$MAP.SERVERURL}/themes/Sugar5/images/jscalendar.gif" style="position:relative; top:6px" border="0" id="{$FIELD.name}_trigger">
						                </span>
						                {literal}
										<script type="text/javascript">
						                    Calendar.setup ({ {/literal}
						                        inputField : "{$FIELD.name}",
						                        ifFormat : "{$FIELD.dateformat}",
						                        daFormat : "{$FIELD.dateformat}",
						                        button : "{$FIELD.name}_trigger",
						                        singleClick : true,
						                        dateStr : "",
						                        startWeekday: 1,
						                        step : 1,
						                        weekNumbers:false {literal}
						                    });
						                </script>
						                {/literal}
						                {if $FIELD.DEF.type == "datetime" || $FIELD.DEF.type == "datetimecombo"}
					                        <select name="{$FIELD.name}___h" id="{$FIELD.name}___h" {$FIELD.script}>
											{html_options values=$MAP.HOURS options=$MAP.HOURS}
											</select>
											<select name="{$FIELD.name}___m" id="{$FIELD.name}___m" {$FIELD.script}>
											{html_options values=$MAP.MINUTES options=$MAP.MINUTES}
											</select>
						                {/if}
						            {* Input Varchar, url, phone, relate, email, currency *}    
									{elseif $FIELD.DEF.type == 'varchar' || $FIELD.DEF.type == 'name' || $FIELD.DEF.type == 'phone' || $FIELD.DEF.type == 'currency' || 
											$FIELD.DEF.type == 'url' || $FIELD.DEF.type == 'int' || $FIELD.DEF.type == 'relate' || $FIELD.DEF.type == 'email'}
										<input id="{$FIELD.name}" name="{$FIELD.name}" type="text" {$FIELD.script} {if $FIELD.DEF.type == 'email'} onchange="validateEmailAdd(this);" {/if}>
									{* 
										TEXTAREA
										Se renderiza como un input text porque de lo contrario el editor no funciona. 
										Se añade el span id='ta_replace' para poder volver a transformarlo en el momento de generar el formulario 
									*}
									{elseif $FIELD.DEF.type == 'text'}	
										<span id='ta_replace' sugar='slot'><input id="{$FIELD.name}" name="{$FIELD.name}" type="text" {$FIELD.script}></span>
									{/if}
								</span sugar='slot'>
							</td>
						{/foreach}
						
					{/foreach}

					</tr>
				{/foreach}
				
			</tbody>
		{/foreach}
		<!-- // fieldSets -->
		
		<!-- buttons -->
		<tr align="center">
			<td colspan="4">
				<input type="button" onclick="submit_form(this.form);" class="button" name="Submit" value="{$MAP.FORM.SUBMIT_LABEL|default $MOD.LBL_WEBFORMS_SUBMIT}"/>
			</td>
		</tr>
		<!-- // buttons -->
		
		<!-- footer -->
		{if $MAP.FORM.FOOTER.TEXT}
			<tr style="{$MAP.FORM.FOOTER.CSS} font-size: 18px; font-weight: bold; text-align: center;">
				<td colspan="4">&nbsp</TD>
			</tr>
			<tr style="{$MAP.FORM.FOOTER.CSS} font-size: 12px; font-weight: bold; text-align: center;">
				<td colspan="4"><b>{$MAP.FORM.FOOTER.TEXT}</b></td>
			</tr>
		{/if}
		<!-- // footer -->
		
	</table>
</form>
<!-- // form -->