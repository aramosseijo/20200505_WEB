YAHOO.util.Event.addListener(window, "load", carga_mandato);

YAHOO.util.Event.onContentReady(window, carga_mandato);

mandato_original = '';
console.log("mandato original1: " + mandato_original);
//var carga_mandato_true ;
function carga_mandato() {
    if (typeof carga_mandato_true != 'undefined') {
        return;
    }
    mandato_original = document.getElementById('mandato_id_c').value;
    console.log("mandato original2: " + mandato_original);
    YAHOO.util.Event.addListener(document.getElementById('numerocuenta'), 'change', revisar_mandato);
    carga_mandato_true = true;
}

function revisar_mandato() {
    calcular_mandato();
}

function calcular_mandato() {
    // Si la cuenta es de 20 digitos ya hay un mandato anterior, avisar que se generara uno nuevo con su nueva CCC
    console.log("mandato original3: " + mandato_original);
    if (document.getElementById('numerocuenta').value.length >= 20) {
        if (document.getElementById('mandato_id_c').value != '' && mandato_original != '') {
            if (confirm('Si cambia el número de cuenta se generará un nuevo mandato. ¿Desea generarlo?')) {
                // Si ya hay un mandato avisar antes de cambiarlo
                var mandato = Math.floor((Math.random() * 100000000) + 1);
                document.getElementById('mandato_id_c').value = mandato;
            }
        } else {
            var mandato = Math.floor((Math.random() * 100000000) + 1);
            document.getElementById('mandato_id_c').value = mandato;

        }
    }
}
;