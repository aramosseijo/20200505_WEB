/*
File for the unconditional validation of bank accounts, for use when the CRM constant SEPA_VALIDATE_IBAN is set to 0 at the time of generating the form.
*/

function validateIBAN() {
    // Si el medio de pago no es domiciliación no hay que validar el IBAN
    if (document.getElementById('redk_Formas_de_Pago___mediopago').value == 'domiciliacion') {
        var numeroCuentaEl = document.getElementById('redk_Formas_de_Pago___numerocuenta');
        if (numeroCuentaEl == null) { // Si no hay número de cuenta dará error
            return false;
        } 
    }
    return true;
}