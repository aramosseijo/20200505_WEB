
// Sobrecarga la función de validación de datos para incluir la validación de los campos de las formas de pago
(function () {
    var tmpCheckFields = check_fields;
    check_fields = function () {
                        if (tmpCheckFields) return (tmpCheckFields() && validateIBAN());
                        return validateIBAN();
                   }
})();
    
// Adapta el formulario en función del valor de la periodicidad    
function adaptaPeriodicidad() {
    
	var o_periodicidad = document.getElementById('redk_Formas_de_Pago___periodicidad');   // Recupera el elemento html de periodicidad
    var v_periodicidad = o_periodicidad.options[o_periodicidad.selectedIndex].value;
	var o_mediopago = document.getElementById('redk_Formas_de_Pago___mediopago');   // Recupera el elemento html de medio de pago
	var v_mediopago = o_mediopago.options[o_mediopago.selectedIndex].value;
	
    // Si la periodicidad tiene un valor y no es puntual marca el medio de pago como 'Domiciliación' 
    if (v_periodicidad && v_periodicidad != 'puntual' && v_mediopago == 'tarjeta' ) {
		if (confirm(redk_Formas_de_pago_LBL_PERIODICIDAD_PUNTUAL)) {
			setSelectValue(o_mediopago, 'domiciliacion');
			adaptaMedioPago();
		} else {
			setSelectValue(o_periodicidad, o_periodicidad.prev_value);
			return false;
		}
    } 
	
	o_periodicidad.prev_value = v_periodicidad;
}

// Adapta el formulario en función del valor del medio de pago
function adaptaMedioPago() {
	var o_mediopago = document.getElementById('redk_Formas_de_Pago___mediopago');   // Recupera el elemento html de medio de pago
    var v_mediopago = o_mediopago.options[o_mediopago.selectedIndex].value;
	var o_periodicidad = document.getElementById('redk_Formas_de_Pago___periodicidad');   // Recupera el elemento html de periodicidad
    var v_periodicidad = o_periodicidad.options[o_periodicidad.selectedIndex].value;

	// Si el medio de pago ha cambiado a tarjeta, comprueba la periodicidad
	if (v_mediopago == 'tarjeta' && v_periodicidad && v_periodicidad != 'puntual') {
		if (confirm(redk_Formas_de_pago_LBL_MEDIOPAGO_PUNTUAL)) {
			// Si se quiere continuar, se indica periodicidad puntual
			setSelectValue(o_periodicidad, 'puntual');
		} else {
			setSelectValue(o_mediopago, o_mediopago.prev_value);
			return false;
		}
	}
	
    // Si el medio de pago es una domiciliación muestra el campo numero de cuenta y lo marca como requerido
    if (v_mediopago == 'domiciliacion') {
    	showField('redk_Formas_de_Pago___numerocuenta');
        add_required('redk_Formas_de_Pago___numerocuenta');
    } else {
    	hideField('redk_Formas_de_Pago___numerocuenta');
        remove_required('redk_Formas_de_Pago___numerocuenta');
    } 
	o_mediopago.prev_value = v_mediopago;
}
