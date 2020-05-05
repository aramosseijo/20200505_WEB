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
/**
 * Insert product line
 */
 function qsnumberformat(o,ln) {
	 document.getElementById('st_godz'+ln).value=myFormatNumber(o.stawka_godz);
	 document.getElementById('st_dobowa'+ln).value=myFormatNumber(o.stawka_dobowa);
}
 
function insertProductLine(ln)
{
	var x=document.getElementById('productLine').insertRow(-1);
	var y=x.insertCell(0);
	var v=x.insertCell(1);
	var z=x.insertCell(2);
	var a=x.insertCell(3);
	var b=x.insertCell(4);
	var c=x.insertCell(5);

	x.id = 'product_line' + ln; //dodanie id nowego wiersza
	y.className="dataField";
	v.className="dataField";
	z.className="dataField";
	a.className="dataField";
	b.className="dataField";

	y.innerHTML="<input type='text' class='sqsEnabled' name='product_name"+ ln +"' id='product_name" + ln +"' size='50' maxlength='255' value='' title='' tabindex='3' ><input type='hidden' name='product_id[]' id='product_id" + ln + "' size='20' maxlength='50' value=''>&nbsp;<input title='" + selectButtonTitle + "' accessKey='" + selectButtonKey + "' type='button' tabindex='3' class='button' value='" + selectButtonValue + "' name='btn1' onclick='openZasobPopup(" + ln + ")'>";
	v.innerHTML="<input style='color: grey;' type='text' name='rodzaj"+ ln +"' id='rodzaj" + ln + "' size='20' maxlength='50' value='' title='' tabindex='3' readonly='readonly'>";
	z.innerHTML="<input style='color: grey;' type='text' name='numer"+ ln +"' id='numer" + ln + "' size='20' maxlength='50' value='' title='' tabindex='3' readonly='readonly'>";
	a.innerHTML="<input style='color: grey;' type='text' name='st_godz"+ ln +"' id='st_godz" + ln + "' size='20' maxlength='50' value='' title='' tabindex='3' readonly='readonly'>";
	b.innerHTML="<input style='color: grey;' type='text' name='st_dobowa"+ ln+"' id='st_dobowa" + ln + "' size='20' maxlength='50' value='' title='' tabindex='3' readonly='readonly'>";
	c.innerHTML="<input type='hidden' name='deleted[]' id='deleted" + ln + "' value='0'><input type='button' class='button' value='"+deleteButtonValue+"' tabindex='3' onclick='markProductLineDeleted(" + ln + ")'>";
	
	sqs_objects['EditView_'+'product_name' + ln]={
	    "id":ln,
	    "form":"EditView",
	    "method":"query",
	    "modules":["spec_zasoby"],
	    "group":"or",
	    "field_list":["name", "id", "rodzaj", "stawka_godz", "stawka_dobowa", "numer_inw"],
	    "populate_list":["product_name"+ln, "product_id"+ln, "rodzaj"+ln, "st_godz"+ln, "st_dobowa"+ln, "numer"+ln],
	    "conditions":[{"name":"name","op":"like_custom","begin":"%","end":"%","value":""}],
	    "order":"name",
	    "limit":"30",
	    "post_onblur_function":"qsnumberformat",
	    "no_match_text":"No Match"
	    };
	   QSProcessedFieldsArray["EditView_product_name" +ln] = false;
	   enableQS(false);
	   addToValidateBinaryDependency('EditView', "product_name" +ln, 'alpha', false, "w polu: Nazwa Zasobu", "product_id" +ln) ;
	
	ln++;
	document.getElementById('addProductLine').onclick = function() {
		insertProductLine(ln);
	}
}


/**
 * Mark product line deleted
 */
function markProductLineDeleted(ln)
{
	// collapse product line; update deleted value
	document.getElementById('product_line' + ln).style.display = 'none';
	document.getElementById('deleted' + ln).value = '1';
}


/**
 * Open product popup
 */
function openZasobPopup(ln)
{
	var popupRequestData = {
		"call_back_function" : "setZasobReturn",
		"form_name" : "EditView",
		"field_to_name_array" : {
			"id" : "product_id" + ln,
			"name" : "product_name" + ln,
			"rodzaj":"rodzaj" + ln,
			"numer_inw":"numer" +ln,
			"stawka_godz":"st_godz" +ln,
			"stawka_dobowa":"st_dobowa" +ln
		}
	};
	open_popup('spec_zasoby', 600, 400, '', true, false, popupRequestData);
}

/**
 * The reply data must be a JSON array structured with the following information:
 *  1) form name to populate
 *  2) associative array of input names to values for populating the form
 */
var fromPopupReturn  = false;
function setZasobReturn(popupReplyData)
{
	fromPopupReturn = true;
	var formName = popupReplyData.form_name;
	var nameToValueArray = popupReplyData.name_to_value_array;
	
	
	for (var theKey in nameToValueArray){
		if(theKey == 'toJSON')
		{
			/* just ignore */
		}
		else
		{
			var displayValue = nameToValueArray[theKey].replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');
			if ( theKey.search('st_godz') != -1) {
				document.getElementById(theKey).value = myFormatNumber(displayValue);
			}else{
				if ( theKey.search('st_dobowa') != -1) {
					document.getElementById(theKey).value = myFormatNumber(displayValue);
				}else{
					document.getElementById(theKey).value = displayValue; 				
				}			
			}
		}
		
	}
}



/*
    Custom conversion functions based on SugarCRM native functions
*/
function myFormatNumber(element) {

	return formatNumber(element, num_grp_sep, dec_sep, 2,2);
}

function myUnformatNumber(element) {

	return unformatNumber(element, num_grp_sep, dec_sep);
}

