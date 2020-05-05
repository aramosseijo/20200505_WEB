// Sobrecarga la función de validación de datos para incluir la validación de los campos de las formas de pago
(function () {
    var tmpCheckFields = check_fields;
    check_fields = function () {
                        if (tmpCheckFields) return (tmpCheckFields() && validateIBAN());
                        return validateIBAN();
                   }
})();
    
// Adapta el formulario en función del valor del medio de pago
function adaptaMedioPago(o_mediopago) {
	
	// Recupera el elemento html de medio de pago
    var v_mediopago = o_mediopago.options[o_mediopago.selectedIndex].value;

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
