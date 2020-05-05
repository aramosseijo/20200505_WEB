function transformSelectsInForms() {

    console.log('Running selectize transforms');
    $emptyString = "[" + SUGAR.language.get('app_strings', 'LBL_EMPTY') + "]";
    //Marcamos los controles que no queremos procesar, para evitar incompatibilidades
    $('table.dateTime select').addClass('no-selectize');
    //Controles de hora
    $('select.datetimecombo_time').addClass('no-selectize');
    //Controles de hora
    $('#inlineSavedSearch select').addClass('no-selectize');
    //Ordenación y selección de columnas
    $('select#mediopago').addClass('no-selectize');
    //omitimos formas de pago por los automatismos..

    //Si no esta cargada la hoja de estilos de selectize, la cargamos
    if ($('#selectize-css').length == 0) {
        $('<link>', {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/css/selectize.legacy.min.css',
            id: 'selectize-css'

        }).appendTo('head')
    }

    //Cargamos el css con nuestras customizaciones    
    if ($('#selectize-css-custom').length == 0) {
        $('<link>', {
            rel: 'stylesheet',
            href: 'custom/themes/default/css/stic_selectize.css',
            id: 'selectize-css-custom'
        }).appendTo('head')
    }

    //Ejecutamos las transformaciones, solo en caso de que se haya cargado el CSS
    if ($('#selectize-css').length == 1 && $('#selectize-css-custom').length == 1) {

        //Aqui definimos los $elementos en los que ha de ejecutarse el selectize
        $Forms = $('#search_form, #popup_query_form');

        $('select', $Forms).each(function () {
            if ($(this).closest('#inlineSavedSearch').length == 0 && !$(this).is('.no-selectize')) {
                //Ponemos un texto a las cadenas vacías
                if ($(this).is('[multiple]')) { $('option[value=""]', $(this)).text($emptyString); }
                $(this).selectize({
                    allowEmptyOption: $(this).is('[multiple]')
                });

            }
        })
        $(".search td[nowrap],.popupBody .edit.view td[nowrap]").removeAttr('nowrap');
    }

    //Incluimos el comportamiento para limpiar los campos selectize
    $(document).ready(function () {
        $('input#search_form_clear.button,input#search_form_clear_advanced.button').on('click', function (event) {
            event.preventDefault();
            var $panel = $(this).closest('.search');
            $("select", $panel).each(function () {
                $select = $(this);
                if ($select.is('.selectized') && $select.attr('id') != "saved_search_select") {
                    $select[0].selectize.clear();
                }

                //Forzamos el valor igual = en los campos de selección de fecha tras limpiar, para que no fallen las búsquedas
                if (($select.attr('id') || ' ').indexOf("_range_choice") >= 0) {
                    //$select.val('=');
                    $select[0].selectize.setValue("=");
                }

            })
        })
    })

    //Mostramos el formulario de búsqueda
    $(".search_form").slideDown(200);
    // Y el formulario de edición
    $("form#EditView").show(200);
    //y los formularios quickcreate
    $(".quickcreate form").show(200);

}
