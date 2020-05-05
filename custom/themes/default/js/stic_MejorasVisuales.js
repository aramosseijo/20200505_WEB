/**
 * La funcion runCheckInterval crea un intervalo que comprueba cada 200ms que no hay ningún proceso de SUGAR (SUGAR_callsInProgress) pendiente de acabar. 
 * Esto es así para asegurar que el formulario de búsqueda está completo antes de llamar a showSearchActiveFilters(), ya que si no es así fallará.
 * Una vez que SUGAR_callsInProgress devuelve 0 , se lanza la funciòn y se elimina el intervalo.
 */
function runCheckInterval() {
    $searchForm = $('#search_form, #popup_query_form');
    var checkIfSearchPaneIsLoaded = setInterval(function () {
        // $searchForm.hide();
        if (SUGAR_callsInProgress === 0) {
            showSearchActiveFilters();
            transformSelectsInForms();
            appendModuleName();

            clearInterval(checkIfSearchPaneIsLoaded);


        }
    }, 200);

    //Mostramos el formulario de búsqueda
    $(".search_form").slideDown(200);
    //y los formularios quickcreate
    $(".quickcreate form").show(200);
}

/** 
 * Recorre  los campos existentes en el formulario de búsqueda para ver cuales tienen algún valor asignado y les cambia el background-color para que sea más facil identificarlos visualmente
 */
function showSearchActiveFilters() {
    $searchForm = $('#search_form, #popup_query_form');

    //Procesamos los select
    $('select', $searchForm).each(function () {
        var $this = $(this);
        if (($this.attr('id') || '').indexOf('_advanced_range_choice') > 0 || ($this.attr('id') || '').indexOf('_basic_range_choice') > 0) {
            $this.addClass('no-filter');
            //Si el select es del tipo selector de periodos, añadimos clase no-filter para procesar despues
            if (['=', 'between', 'greater_than', 'less_than', 'not_equal'].indexOf($this.val()) === -1) {
                //Si el valor seleccionado es un valor que no requiere elegir una o dos fechas, marcamos com active-filter
                $this.addClass('active-filter');
            } else {
                $this.removeClass('active-filter');
            }
        }
    });

    //Procesamos los input
    $('input[type=text]:not([name=saved_search_name]),textarea', $searchForm).each(function () {
        var $this = $(this);
        if ($this.val() !== '') {
            $this.addClass('active-filter');
        } else {
            $this.removeClass('active-filter');
        }
    });

    //Procesamos los select que no hemos marcado como "no-filter"
    $('select:not(#saved_search_select):not(.no-filter)', $searchForm).each(function () {
        var $this = $(this);
        if ($this.val()) {
            $this.addClass('active-filter');
        } else {
            $this.removeClass('active-filter');
        }
    });
}

//Añade el noombre del módulo (extraido de los enlaces generados por el CRM al principìo del nombre del elemento principal mostrado en la página)
function appendModuleName() {
    var lnk = $('#ajaxHeader #shortcuts a:first').attr('href');
    if (lnk) {
        var moduleName = lnk.split('?')[1].split('&')[0].split('=')[1];
        moduleName = $('#subModuleList').find('[module=' + moduleName + ']:first').text();
        if ($('#content .moduleTitle h2').text().indexOf(moduleName) == -1) {
            $('<span>', {
                class: 'pointer'
            }).text('»').prependTo($('#content .moduleTitle h2'));
            $('<span>', {
                class: 'module-name'
            }).text(moduleName).prependTo($('#content .moduleTitle h2'));
        }
    }
}

$(document).ready(function () {


    /*Para evitar sobreescribir posible customizaciones de las entidades cargamos el css desde un archivo diferente a style.css*/
    var cssId = 'custom_stic_css';
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'custom/themes/default/css/stic_style.css';
        link.media = 'all';
        head.appendChild(link);
    }



    //Asociamos al evento change de los campos del formulario de búsqueda la llamada a la funcion showSearchActiveFilters
    $('body').on('change', '#search_form textarea, #search_form input,#search_form select,#popup_query_form input,#popup_query_form select', function () {
        showSearchActiveFilters();
    });

    $('body').on('click', '#search_form_clear_advanced,#search_form_clear', function () {
        runCheckInterval();
    });

    //Asociamos al evento click de los enlaces la llamada a la funcion runChechInterval
    $('body').on('click', 'a', function () {
        runCheckInterval();
    });
    //Cuando abrimos un formulario de busqueda emergente (y solo en ese caso) lanzamos un setInterval que llama a la showSearchActiveFilters() cada 2s
    //Esto puede mejorarse para que el setInterval no quede indefinidamente 
    $('body').on('click', '#search_form .id-ff button.firstChild, #popup_query_form .id-ff button.firstChild,', function () {

        setInterval(function () {
            showSearchActiveFilters();
        }, 2000);

    });
    runCheckInterval();
});
