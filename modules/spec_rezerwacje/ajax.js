/*********************************************************************************
 * The contents of this file are subject to the SpecINFO License which is placed in
 * the file LICENSE.TXT located in the main directory of the module.
 * By installing or using this file, You have unconditionally agreed to the
 * terms and conditions of the License, and You may not use this file except in
 * compliance with the License. Under the terms of the license, You shall not,
 * among other things: sublicense, resell, rent, lease, redistribute, assign
 * or otherwise transfer Your rights to the Software. Use of the Software
 * may be subject to applicable fees and any use of the Software without first
 * paying applicable fees is strictly prohibited. You do not have the right to
 * remove SpecINFO copyrights from the source code or user interface.
 *
 * Your Warranty, Limitations of liability and Indemnity are expressly stated
 * in the License. 
 *
 * Portions created by SpecINFO S.C. are Copyright
 * (C) 2013 SpecINFO S.C. http://www.specinfo.pl; All Rights Reserved.
 ********************************************************************************/
 
function dateToYMDHM(date)
{
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    var h= date.getHours();
    var min= date.getMinutes();
    return '' + y +'-'+ (m<=9?'0'+m:m) +'-'+ (d<=9?'0'+d:d) +' '+h+':'+(min<=9?'0'+min:min)+':00';
}


function ajax_get(form_name){
	var dat_from=dateToYMDHM(getDateObject($("#rezerwacja_od").val()));
	var dat_to=dateToYMDHM(getDateObject($("#rezerwacja_do").val()));
	var res_id=$('[name="record"]').val();
	var resources_allowed;
	var is_error=0;
	var resource_name;
	var resource_nr;
	
	$.ajax({							
		url: "index.php?module=spec_rezerwacje&action=AjaxGet&sugar_body_only=true",
		dataType: 'json',
		async: false, 
		data: {
				"record": res_id,
				"date_from": dat_from,
				"date_to": dat_to,
				"res_ids":  all_selects(),
			},
																	
		success: function(res){						
			if(res.success == 'yes'){
				resources_allowed=res.resources_allowed;
				
			}else
				alert('Error loading');
		},
		
		error: function(){
			alert('Error loading');
		}
	});
	clear_all_errors();
	if(!isBefore($("#fecha_desde").val(),$("#fecha_hasta").val())){
		add_error_style(form_name, 'fecha_desde', SUGAR.language.get('stic_Reservas', 'LBL_RES_DATE_TO_ERROR'),true);
		add_error_style(form_name, 'fecha_hasta', SUGAR.language.get('stic_Reservas', 'LBL_RES_DATE_FROM_ERROR'),true);
		is_error=1;
	}
	
	var out=$('#productLine tr:not([style="display: none;"]) input[id^="product_name"]');
	var len=out.length;
	for (i=0; i < len; i++) {
		var id=out.eq(i).attr('id');
		var nr=id.substring(12);
		var war=$('#product_id'+nr).val();
		if (war != null) {
			if (resources_allowed[war] == 0) {
				is_error=1;
				add_error_style(form_name, 'product_name'+nr, SUGAR.language.get('stic_Reservas', 'LBL_RES_ERROR'), true);
			}	
		}
	}

	if(is_error==1) return false;
	
	return true;
}

function all_selects() {
	
	Array.prototype.unique = function() {
		var a = [];
		var l = this.length;
		for(var i=0; i<l; i++) {
			for(var j=i+1; j<l; j++) {
				// If this[i] is found later in the array
				if (this[i] === this[j])
					j = ++i;
			}
			a.push(this[i]);
		}
		return a;
	};
	
	var resources_ids = new Array();
	var resource_id;
	$("#productLine tr").each(function () {
		if ($(this).is(":visible")) {
			resource_id=$(this).find($("input[name^='product_id']")).val();
			if (resource_id != null) {
				resources_ids.push(resource_id);
			}
		}	
	});
	var resources_ids_uq=resources_ids.unique();
	var length = resources_ids_uq.length;

	var jObject={};
		
	for(i in resources_ids_uq) {
		jObject[i] = resources_ids_uq[i];
	}

	jObject= YAHOO.lang.JSON.stringify(jObject);
	
	return jObject;
}