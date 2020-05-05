/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

YAHOO.util.Event.addListener(window, "load", register_hooks);
YAHOO.util.Event.onContentReady(window,register_hooks);

config_actions={
    'Leads':{
                'sectorprofesion_c':{
                       'trigger':
                       {
                               'change':

                               [
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['otrosector_c'],
                                               'expression':
                                                '_getElement("sectorprofesion_c").value == "otros"'
                                       }
                               }
                              ]
                           
                       }
                }
        },

    'Contacts':{
                'sectorprofesion_c':{
                       'trigger':
                       {
                               'change':

                               [
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['otrosectorprofesional_c'],
                                               'expression':
                                                '_getElement("sectorprofesion_c").value == "otros"'
                                       }
                               }
                              ]
                           
                       }
                }
    },
    
    
    'redk_Historico_Relacion_Contactos':{
                'motivobaja_c':{
                       'trigger':
                       {
                               'change':

                               [
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['otrosmotivos_c'],
                                               'expression':
                                                '_getElement("motivobaja_c").value == "otrosMotivos"'
                                       }
                               }
                              ]
                           
                       }
                }  
    },
    
    'redk_Historico_Relacion_Cuentas':{
                'motivobaja_c':{
                       'trigger':
                       {
                               'change':

                               [
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['otrosmotivos_c'],
                                               'expression':
                                                '_getElement("motivobaja_c").value == "otrosMotivos"'
                                       }
                               }
                              ]
                           
                       }
                }  
    },  
    'redk_Formas_de_Pago':{
                'mediopago':{   
                       'trigger':
                       {
                               'change':

                               [
                                        {
                                                'f':fieldHidden,
                                                't':{
                                                      'target':['numerocuenta','numeroiban_c', 'mandato_id_c'],
                                                          'expression':
                                                      '_getElement("mediopago").value == "domiciliacion"'    
                                                    }
                                        },
                                        {
                                                'f':fieldHidden,
                                                't':{
                                                      'target':['numeroreferenciatarjeta','mes_caducidad_tarjeta_c', 'annio_caducidad_tarjeta_c'],
                                                          'expression':
                                                      '_getElement("mediopago").value == "tarjeta"'                    
                    
                                                    }
                                        },
                                        {
                                            'f':togglerequired,
                                            't':{
                                                'target':[ 'numerocuenta','numeroiban_c','mandato_id_c'],
                                                   'expression':
                                                      '_getElement("mediopago").value == "domiciliacion"' 
                                            }
                                        },
                                        {
                                            'f':togglerequired,
                                            't':{
                                                'target':[ 'numeroreferenciatarjeta','mes_caducidad_tarjeta_c','annio_caducidad_tarjeta_c'],
                                                   'expression':
                                                      '_getElement("mediopago").value == "tarjeta"' 
                                            }
                                        },
            
                              ]
                           
                       }
                }
    
        },
    

    'redk_Inscripciones':{
                'necesidadesespeciales':{
                       'trigger':
                       {
                               'change':

                               [
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['descripcionnecesidades'],
                                               'expression':
                                                '_getElement("necesidadesespeciales").value == "1"'
                                       }
                               }
                              ]
                           
                       }
                },
        'estado':{
                       'trigger':
                       {
                               'change':

                               [
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['motivonoparticipa'],
                                               'expression':
                                                '_getElement("estado").value == "noParticipa"'
                                       }
                               },
                               {
                                       'f':fieldHidden,
                                       't':{
                                               'target':['motivorechazado'],
                                               'expression':
                                                '_getElement("estado").value == "rechazado"'
                                       }
                               }
                                
                              ]
                           
                       }
        }
                
    
        },

        

    


    'pri_Finance':{
        'pri_financeountbrand_name':{
            'trigger':
            {
                'change':

                [
                {
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_financeountbrand_name").value'
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_financeountbrand_name").value'

                    }
                }
                ],
                'focus':

                [
                {
                    'eventelement':'window',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_financeountbrand_name").value'

                    }
                }
                ]
            }
        }
    },
   
    'pri_Logistics':{


        'product_returns_after_campaign':{
            'trigger':
            {
                'change':

                [
                {
                    'f':toggledisabled,
                    't':{
                        'target':[ 'return_percentage'],
                        'expression': ' (_getElement("product_returns_after_campaign").value=="Returns to brand up to") '
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':toggledisabled,
                    't':{
                        'target':[ 'return_percentage'],
                        'expression': ' (_getElement("product_returns_after_campaign").value=="Returns to brand up to") '
                    }
                }
                ],
                'focus':

                [
                {
                    'eventelement':'window',
                    'f':toggledisabled,
                    't':{
                        'target':[ 'return_percentage'],
                        'expression': ' (_getElement("product_returns_after_campaign").value=="Returns to brand up to") '
                    }
                }
                ]
            }
        },
        'pri_logistiountbrand_name':{
            'trigger':
            {
                'change':

                [
                {
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_logistiountbrand_name").value'
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_logistiountbrand_name").value'

                    }
                }
                ],
                'focus':

                [
                {
                    'eventelement':'window',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_logistiountbrand_name").value'

                    }
                }
                ]
            }
        }
    },
    'pri_Results':{


        //        'results_status':{
        //            'trigger':
        //            {
        //                'change':
        //
        //                [
        //                {
        //                    'f':setvalue,
        //                    't':{
        //                        'target':[ 'results_status'],
        //                        'expression': ' (_getElement("results_status").value!= config_actions[cmod]["results_status"]["initial_value"] && _getElement("results_status").value!="Wish")?config_actions[cmod]["results_status"]["initial_value"]:null;'
        //                    }
        //                }
        //                ],
        //                'click':
        //
        //                [
        //                {
        //                    'eventelement':'window.document.body',
        //                    'f':setvalue,
        //                    't':{
        //                     'target':[ 'results_status'],
        //                     'expression': 'if (!_getElement("results_status").value== config_actions[cmod]["results_status"]["initial_value"] && _getElement("results_status").value!="Wish"){_getElement("results_status").value= config_actions[cmod]["results_status"]["initial_value"];}'
        //
        //                    }
        //                }
        //                ],
        //                'focus':
        //
        //                [
        //                {
        //                    'eventelement':'window',
        //                    'f':setvalue,
        //                    't':{
        //                            'target':[ 'results_status'],
        //                        'expression': 'if (!_getElement("results_status").value== config_actions[cmod]["results_status"]["initial_value"] && _getElement("results_status").value!="Wish"){_getElement("results_status").value= config_actions[cmod]["results_status"]["initial_value"];}'
        //
        //                    }
        //                }
        //                ]
        //            }
        //        }
        //        ,
        'pri_resultsrtunities_name':{
            'trigger':
            {
                'change':

                [
                {
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_resultsrtunities_name").value'
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_resultsrtunities_name").value'

                    }
                }
                ],
                'focus':

                [
                {
                    'eventelement':'window',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_resultsrtunities_name").value'

                    }
                }
                ]
            }
        }
    },
    'pri_AccountBrand':{


        'pri_account_accounts_name':{
            'trigger':
            {
                'change':

                [
                {
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':
                        	
                        '_getElement("pri_accountri_brands_name").value + " - " + _getElement("pri_account_accounts_name").value '
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_accountri_brands_name").value + " - " + _getElement("pri_account_accounts_name").value '

                    }
                }
                ],
                'focus':

                [
                {
                    'eventelement':'window',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_accountri_brands_name").value + " - " + _getElement("pri_account_accounts_name").value '

                    }
                }
                ]
            }
        },
        'pri_accountri_brands_name':{
            'trigger':
            {
                'change':

                [
                {
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_accountri_brands_name").value + " - " + _getElement("pri_account_accounts_name").value '
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':setvalue,
                    't':{
                        'target':[ 'name'],
                        'expression':

                        '_getElement("pri_accountri_brands_name").value + " - " + _getElement("pri_account_accounts_name").value '

                    }
                }
                ]
            }
        }
    },

    'Opportunities':{
        //            'import_from_planned_c':{
        //
        //            'fldMap':{
        //                            'forecasted_unit_sales_c':'planned_unit_sales_c',
        //                            'forecast_avg_memb_prod_price_c':'planned_avg_member_prd_price_c',
        //                            'forecasted_margin_percentage_c':'planned_margin_percentage_c',
        //                            'forecasted_margin_c':'planned_margin_c'
        //            },
        //            'trigger':
        //            {
        //                'click':
        //
        //                [
        //                {
        //                    'f':setvalue,
        //                    't':{
        //                        'target':[
        //                            'forecasted_unit_sales_c',
        //                            'forecast_avg_memb_prod_price_c',
        //                            'forecasted_margin_percentage_c',
        //                            'forecasted_margin_c'
        //                        ],
        //                        'expression':'(_getElement("import_from_planned_c").checked)?_getElement(config_actions[cmod]["import_from_planned_c"]["fldMap"][arrFlds[i]]).value:null'
        //                    }
        //                }
        //                ]
        //            }
        //        },


        'is_in_calendar_c':{
            'trigger':
            {
                'click':

                [
                {
                    'f':togglerequired,
                    't':{
                        'target':[ 
                        'in_calendar_end_date_c',
                        'in_calendar_start_date_c',
                        'days_online_privalia_web_c',
                        'forecasted_margin_percentage_c',
                        'forecast_avg_memb_prod_price_c',
                        'forecasted_unit_sales_c',
                        'number_of_references_c',
                        'supplier_pictures_ref_c',
                        'retrieved_references_c',
                        'initial_stock_c',
                        'real_number_of_references_c',
                        'forecast_discount_percentage_c',
                        'contribution_margin_forecast_c',
                        'stock_origin_c[]',
                        'shipping_zones_c[]'],
                        'expression':'_getElement("is_in_calendar_c").checked'
                    }
                }
                ]
            }
        },
        'is_planned_c':{
            'trigger':
            {
                'click':

                [
                {
                    'f':togglerequired,
                    't':{
                        'target':[ 'planned_start_date_c','planned_unit_sales_c',
                        'planned_avg_member_prd_price_c',
                        'planned_margin_percentage_c'],
                        'expression':'_getElement("is_planned_c").checked'
                    }
                }
                ]
            }
        },
        'business_units_shared_c':{
            'trigger':
            {
                'change':

                [
                {
                    'f':togglerequired,
                    't':{
                        'target':[ 
                        'start_date_shared_c',
                        'end_date_shared_c',
                        'forecasted_sales_shared_c',
                        'margin_shared_c',
                        ],
                        'expression':'_getElement("business_units_shared_c").value!=""'
                    }
                }
                ]
            }
        },

        //        'in_calendar_start_date_c':{
        //            'trigger':
        //            {
        //                'change':
        //
        //                [
        //                {
        //                    'f':setvalue,
        //                    't':{
        //                        'target':[ 'validated_c'],
        //                        'expression':'_setValidated()'
        //                    }
        //                }
        //                ],
        //                'click':
        //
        //                [
        //                {
        //                    'eventelement':'window.document.body',
        //                    'f':setvalue,
        //                    't':{
        //                        'target':[ 'validated_c'],
        //                        'expression':'_setValidated()'
        //                    }
        //                }
        //                ]
        //            }
        //        },
        //        'forecasted_sales_c':{
        //            'trigger':
        //            {
        //                'change':
        //
        //                [
        //                {
        //                    'f':setvalue,
        //                    't':{
        //                        'target':[ 'validated_c'],
        //                        'expression':'_setValidated()'
        //
        //                    }
        //                }
        //                ]
        //
        //            }
        //        },
        'planned_start_date_c':{
            'trigger':
            {
                'change':

                [
                {
                    'f':setvalue,
                    't':{
                        'target':[ 'planned_quarter_c'],
                        'expression':'_caclulateQuarter(_getElement("planned_end_date_c").value)'
                    }
                }
                ],
                'click':

                [
                {
                    'eventelement':'window.document.body',
                    'f':setvalue,
                    't':{
                        'target':[ 'planned_quarter_c'],
                        'expression':'_caclulateQuarter(_getElement("planned_end_date_c").value)'
                    }
                }
                ]
            }
        }
    }


    
}


var formname='EditView';
var cmod ;
var donehooks ;
function register_hooks(){

    if (typeof donehooks!='undefined'){
        return;
    }
    //var cmod = module_sugar_grp1;//document.getElementsByName('module')[0].value;
    //cmod = (formname)?eval('document.'+formname).module.value:module_sugar_grp1;

    if(typeof eval('document.'+formname) != 'undefined'){
           cmod = (formname)?eval('document.'+formname).module.value:module_sugar_grp1;
       }else{
           if(typeof eval('document.'+_form_id) != 'undefined'){
               formname = _form_id;
               cmod = (_form_id)?eval('document.'+_form_id).module.value:module_sugar_grp1;
           }
       }

    for(var a in config_actions[cmod])

        for  (var b in config_actions[cmod][a]['trigger']){
            for (var c=0;c<config_actions[cmod][a]['trigger'][b].length;c++){


                var el =_getElement(a)
                if (!el) {
                    continue;
                }
                if (!formname) {
                    formname = el.form.getAttribute('name');
                }
                config_actions[cmod][a]['initial_value']=el.value;
                if (config_actions[cmod][a]['trigger'][b][c]['eventelement'])
                {
                    el = eval(config_actions[cmod][a]['trigger'][b][c]['eventelement'])
                }

                var func = config_actions[cmod][a]['trigger'][b][c]['f']
                var args = config_actions[cmod][a]['trigger'][b][c]['t']
                args['trigger']=a
                args['formname']=formname

              
                

                //                for (var i=0; i<document.getElementsByName(a).length;i++){
                //                    el =document.getElementsByName(a)[i]
                var r=YAHOO.util.Event.addListener(el, b, func, args);
                



                    
                func(null,args);

            //                 }
            }
        }

    donehooks = true;
    
//    document.getElementsByName('ipc_texto_c')[0].size = 60;
//    document.getElementsByName('demora_cantidad_c')[0].onchange = spellit;
//    document.getElementsByName('demora_texto_c')[0].size = 60;
//    document.getElementsByName('total_contract_value')[0].onchange = spellit;
//    document.getElementsByName('valor_texto_c')[0].size = 60;
}


function toggledisabled(){

    arrFlds = arguments[1]['target']
    trigger = arguments[1]['trigger']
    formname = arguments[1]['formname']
    var benabled = eval(arguments[1]['expression']);
    for (i=0;i<arrFlds.length;i++){
        var el = _getElement(arrFlds[i]);
        var  el_lbl = _getElement(arrFlds[i]+'_label');


        if (!benabled)
        {
            el.readOnly = true;
            YAHOO.util.Dom.setStyle(el, 'background-color', '#EEE');
            if (!SUGAR.isIE)
                YAHOO.util.Dom.setStyle(el, 'color', '#22');
            if ( el.getAttribute('default') != null
                &&  _getElement(trigger).getAttribute('default')==benabled.toString()
                && _getElement(trigger).getAttribute('default')!=null){
                el.value=el.getAttribute('default')
            } else {

            }

        } else {
            el.readOnly = false;
            YAHOO.util.Dom.setStyle(el, 'background-color', '');
            if (!SUGAR.isIE)
                YAHOO.util.Dom.setStyle(el, 'color', '');
        }
        if ( el.getAttribute('default') == null){
            el.setAttribute('default',el.value)

            _getElement(trigger).setAttribute('default',benabled);
        }
    }

}

function togglevisible(){
    formname = arguments[1]['formname']
}
function setvalue(){
    arrFlds = arguments[1]['target']
    trigger = arguments[1]['trigger']
    formname = arguments[1]['formname']
    for (i=0;i<arrFlds.length;i++){
        var el = _getElement(arrFlds[i]);
        var  el_lbl = _getElement(arrFlds[i]+'_label');

        var calculated_value = eval(arguments[1]['expression']);
        if (typeof calculated_value!='undefined' && calculated_value!=null)
        {
            el.value = calculated_value
        }
           
    }
}

function _setValidated(){

    var init_val = config_actions[cmod]['in_calendar_start_date_c']['initial_value'];
    var current_val = _getElement('in_calendar_start_date_c').value;
    var changed_fact = _getElement('forecasted_sales_c').value != config_actions[cmod]['forecasted_sales_c']['initial_value']   && (config_actions[cmod]['forecasted_sales_c']['initial_value']!=null);
    var cond={
        'apply':(init_val!=current_val || changed_fact),
        'lessandchangedboth':(_getDays(current_val)<45 &&  changed_fact),
        'changedtobigger':(_getDays(current_val)>45 && _getDays(init_val)<=45 && init_val!=current_val),
        'changedtosmaller':(_getDays(current_val)<45 && _getDays(init_val)>=45 && init_val!=current_val)
    }

    if (cond['apply']){
        _getElement(arrFlds[i]).checked
        =
        
        !(cond['lessandchangedboth']
            ||
            cond['changedtobigger']
            ||
            cond['changedtosmaller'])
    }
}

function togglerequired() {

    arrFlds = arguments[1]['target']
    formname = arguments[1]['formname']
    var brequired = eval(arguments[1]['expression']);
    trigger = arguments[1]['trigger']

    for ( var i = 0; i < arrFlds.length; i++) {
        var el = _getElement(arrFlds[i]);
        var el_lbl = _getElement(arrFlds[i].replace('[]', '') + '_label');

        var p = el_lbl;
        if (p != null) {
            var els = YAHOO.util.Dom.getElementsBy(function(e) {
                return e.className == 'req';
            }, "span", p)
            if (els != null && els.length)
                p.removeChild(els[0]);
        }
        fld = _getFormValidate(formname, arrFlds[i]);
        if (!fld) {
            removeFromValidate(formname, arrFlds[i]);
        } else {
            fld[2] = false;
        }

    }// END for
    if ((brequired == true || brequired == 'true'))
        for ( var i = 0; i < arrFlds.length; i++) {
            var el = _getElement(arrFlds[i]);
            var el_lbl = _getElement(arrFlds[i].replace('[]', '') + '_label');

            var node = document.createElement("span");
            node.innerHTML = "<font color='red'>*</font>";
            node.className = "req";
            el_lbl.appendChild(node);
            var fld = _getFormValidate(formname, arrFlds[i]);

            if (!fld) {
                addToValidate(formname, arrFlds[i], 'text', true, arrFlds[i]);
            } else {
                fld[2] = true;
            }
        }// END for
}


function _getFormValidate(formname,field){
    var fld=null
    for (var f=0;f<validate[formname].length;f++){
        if (validate[formname][f][0]==field){

            fld = validate[formname][f]
        }
    }
    return (fld)
}

function _getDays(strD,d2){
    
    if (!d2)
    {
        var dt2 = Date.now()
    }
    else
    {
        //dt2 =Date.parse (SUGAR.util.DateUtils.parse(d2,SUGAR.expressions.userPrefs['datef']))
        dt2 = getDateObject(d2);
    }
    
    var dt1 =(!strD)?dt2:getDateObject(strD)

    var dtret = (dt1-dt2)/24/60/60/1000;
    
    
    
    return dtret
}

function _caclulateQuarter(strDate){

    var dt= new Date(SUGAR.util.DateUtils.parse(strDate,SUGAR.expressions.userPrefs['datef']));
    var ret = 'Q' + Math.ceil( (dt.getMonth()+1)/3)
    if (!strDate) ret=''
    return ret
}

function _getElement(fname)
{

    //var elem = SUGAR.forms.AssignmentHandler.getElement(fname);
    var elem = document.getElementById(fname);

    if (elem && formname){

        if (elem.form){
            if (elem.form.getAttribute('name')!=formname ){
                elem = eval('document.'+formname + '.elements["' +fname +'"]')
        
            }  
        }
    }
    if (!elem && formname){
        elem = eval('document.'+formname + '.elements["' +fname +'"]')
    }

    return elem
    

}

//Función que oculta o muestra los elementos del formulario 
function fieldHidden(){
	
    arrFlds = arguments[1]['target']
    trigger = arguments[1]['trigger']
    formname = arguments[1]['formname']
    var benabled = eval(arguments[1]['expression']);
    for (i=0;i<arrFlds.length;i++){
        var el = _getElement(arrFlds[i]);
        var  el_lbl = _getElement(arrFlds[i]+'_label');


        if (!benabled)
        {
            //Ocultar
            //el.readOnly = true;
            YAHOO.util.Dom.setStyle(el, 'display', 'none');
            if (!SUGAR.isIE)
                YAHOO.util.Dom.setStyle(el, 'display', 'none');
            if ( el.getAttribute('default') != null
                &&  _getElement(trigger).getAttribute('default')==benabled.toString()
                && _getElement(trigger).getAttribute('default')!=null){
                el.value=el.getAttribute('default')
            } else {

            }
            //el_lbl.readOnly = true;
            YAHOO.util.Dom.setStyle(el_lbl, 'visibility', 'hidden');
            if (!SUGAR.isIE)
                YAHOO.util.Dom.setStyle(el_lbl, 'visibility', 'hidden');
            if ( el.getAttribute('default') != null
                &&  _getElement(trigger).getAttribute('default')==benabled.toString()
                && _getElement(trigger).getAttribute('default')!=null){
                el_lbl.value=el_lbl.getAttribute('default')
            } else {

            }

        } else {
            //Mostrar
            //el.readOnly = false;
            YAHOO.util.Dom.setStyle(el, 'display', '');
            if (!SUGAR.isIE)
                YAHOO.util.Dom.setStyle(el, 'display', '');
            
            //el_lbl.readOnly = false;
            YAHOO.util.Dom.setStyle(el_lbl, 'visibility', 'visible');
            if (!SUGAR.isIE)
                YAHOO.util.Dom.setStyle(el_lbl, 'visibility', 'visible');
        }
        
        if ( el.getAttribute('default') == null){
            el.setAttribute('default',el.value)

            _getElement(trigger).setAttribute('default',benabled);
        }
    }
}
