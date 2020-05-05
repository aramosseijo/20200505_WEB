var modulo = "stic_Sessions";

var start_date;
var end_date;
var difference;


// -------- Start Date Management ------

/**
 * Calculate the start date from the related form fields
 */
function buildStartDate() {
	var start = $("#start_date_date").val().split('/');
	return new Date(start[2],start[1],start[0], $("#start_date_hours").val(), $("#start_date_minutes").val());
}

/**
 * Set the events for the fields that make up the start date 
 */
$('BODY').on('change', '#start_date_date, #start_date_hours, #start_date_minutes', function() {
	startDateChange();
})
$('BODY').on('click', '#container_start_date_trigger a' , function() {
	startDateChange();
})
	

/**
 * If the start date is greater than the end date, then we update the end date with the value of the start date and remove the error styles
 */
function startDateChange(){

	difference = calculateDifferenceBetweenDates();
	
	if (difference <= 0){
		//setea end_date con el valor de start_day + 1h
		var indice = $("#start_date_hours option:selected").index();
		var valor = setNextIndex(indice);

		$("#end_date_date").val($("#start_date_date").val()); 
		$("#end_date_hours option[value="+ valor +"]").attr("selected",true);
		$("#end_date_minutes").val($("#start_date_minutes").val()); 
		end_date = buildEndDate();
	}    
	$("#validation_end_date").remove();
};


/**
 * Select the following index from the drop-down
 */
function setNextIndex(indice){
    if (indice < 10) valor = "0" + indice;
	else if(indice == 24) valor = "00";
	else valor = indice;

	return valor;
}


// -------- End Date Management ------

/**
 * Calculate the end date from the related form fields 
 */
function buildEndDate() {
	var end = $("#end_date_date").val().split('/');
	return new Date(end[2],end[1],end[0], $("#end_date_hours").val(), $("#end_date_minutes").val());
}

/**
 * If the end date is after the start date, then delete the error styles
 */
function endDateChange(){
	difference = calculateDifferenceBetweenDates();
	if (difference > 0) $("#validation_end_date").remove();  
}


/**
 * Set the events for the fields that make up the end date 
 */

$('BODY').on('change', '#end_date_date, #end_date_hours, #end_date_minutes', function() {
	endDateChange();
})
$('BODY').on('click', '#container_end_date_trigger a' , function() {
	endDateChange();
})




// -------- Form Validation --------

/**
 * Calculate the difference between the end date and the start date
 */
function calculateDifferenceBetweenDates() {
	start_date = buildStartDate();
	end_date = buildEndDate();
	difference = end_date.getTime() - start_date.getTime();
	return difference;
}


/**
* Check if the end_date field is less than start_date 
*/
function checkEndDateSession() {
	difference = calculateDifferenceBetweenDates();
	if (difference <= 0){
		if($("#validation_end_date").length == 0){
			$("#end_date_minutes").after("<span id='validation_end_date' style='color:red; font-weight:bold'> " + SUGAR.language.get(modulo, 'LBL_END_DATE_ERROR') + "</span>");
		}
		return false;  
	}

	return true;
}


/**
 * Validate the end date before submitting the form 
 */
function customCheckForm() {
    return checkEndDateSession();
}
