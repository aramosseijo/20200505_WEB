/*
 Copyright (c) 2010, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.com/yui/license.html
 version: 3.3.0
 build: 3167
 */
YUI.add('slider-base',function(Y){var INVALID_VALUE=Y.Attribute.INVALID_VALUE;function SliderBase(){SliderBase.superclass.constructor.apply(this,arguments);}
Y.SliderBase=Y.extend(SliderBase,Y.Widget,{initializer:function(){this.axis=this.get('axis');this._key={dim:(this.axis==='y')?'height':'width',minEdge:(this.axis==='y')?'top':'left',maxEdge:(this.axis==='y')?'bottom':'right',xyIndex:(this.axis==='y')?1:0};this.publish('thumbMove',{defaultFn:this._defThumbMoveFn,queuable:true});},renderUI:function(){var contentBox=this.get('contentBox');this.rail=this.renderRail();this._uiSetRailLength(this.get('length'));this.thumb=this.renderThumb();this.rail.appendChild(this.thumb);contentBox.appendChild(this.rail);contentBox.addClass(this.getClassName(this.axis));},renderRail:function(){var minCapClass=this.getClassName('rail','cap',this._key.minEdge),maxCapClass=this.getClassName('rail','cap',this._key.maxEdge);return Y.Node.create(Y.substitute(this.RAIL_TEMPLATE,{railClass:this.getClassName('rail'),railMinCapClass:minCapClass,railMaxCapClass:maxCapClass}));},_uiSetRailLength:function(length){this.rail.setStyle(this._key.dim,length);},renderThumb:function(){this._initThumbUrl();var imageUrl=this.get('thumbUrl');return Y.Node.create(Y.substitute(this.THUMB_TEMPLATE,{thumbClass:this.getClassName('thumb'),thumbShadowClass:this.getClassName('thumb','shadow'),thumbImageClass:this.getClassName('thumb','image'),thumbShadowUrl:imageUrl,thumbImageUrl:imageUrl}));},bindUI:function(){this._bindThumbDD();this._bindValueLogic();this.after('disabledChange',this._afterDisabledChange);this.after('lengthChange',this._afterLengthChange);},_bindThumbDD:function(){var config={constrain:this.rail};config['stick'+this.axis.toUpperCase()]=true;this._dd=new Y.DD.Drag({node:this.thumb,bubble:false,on:{'drag:start':Y.bind(this._onDragStart,this)},after:{'drag:drag':Y.bind(this._afterDrag,this),'drag:end':Y.bind(this._afterDragEnd,this)}});this._dd.plug(Y.Plugin.DDConstrained,config);},_bindValueLogic:function(){},_uiMoveThumb:function(offset){if(this.thumb){this.thumb.setStyle(this._key.minEdge,offset+'px');this.fire('thumbMove',{offset:offset});}},_onDragStart:function(e){this.fire('slideStart',{ddEvent:e});},_afterDrag:function(e){var thumbXY=e.info.xy[this._key.xyIndex],railXY=e.target.con._regionCache[this._key.minEdge];this.fire('thumbMove',{offset:(thumbXY-railXY),ddEvent:e});},_afterDragEnd:function(e){this.fire('slideEnd',{ddEvent:e});},_afterDisabledChange:function(e){this._dd.set('lock',e.newVal);},_afterLengthChange:function(e){if(this.get('rendered')){this._uiSetRailLength(e.newVal);this.syncUI();}},syncUI:function(){this._dd.con.resetCache();this._syncThumbPosition();},_syncThumbPosition:function(){},_setAxis:function(v){v=(v+'').toLowerCase();return(v==='x'||v==='y')?v:INVALID_VALUE;},_setLength:function(v){v=(v+'').toLowerCase();var length=parseFloat(v,10),units=v.replace(/[\d\.\-]/g,'')||this.DEF_UNIT;return length>0?(length+units):INVALID_VALUE;},_initThumbUrl:function(){if(!this.get('thumbUrl')){var skin=this.getSkinName()||'sam',base=Y.config.base;if(base.indexOf('http://yui.yahooapis.com/combo')===0){base='http://yui.yahooapis.com/'+Y.version+'/build/';}
this.set('thumbUrl',base+'slider/assets/skins/'+
skin+'/thumb-'+this.axis+'.png');}},BOUNDING_TEMPLATE:'<span></span>',CONTENT_TEMPLATE:'<span></span>',RAIL_TEMPLATE:'<span class="{railClass}">'+'<span class="{railMinCapClass}"></span>'+'<span class="{railMaxCapClass}"></span>'+'</span>',THUMB_TEMPLATE:'<span class="{thumbClass}" tabindex="-1">'+'<img src="{thumbShadowUrl}" '+'alt="Slider thumb shadow" '+'class="{thumbShadowClass}">'+'<img src="{thumbImageUrl}" '+'alt="Slider thumb" '+'class="{thumbImageClass}">'+'</span>'},{NAME:'sliderBase',ATTRS:{axis:{value:'x',writeOnce:true,setter:'_setAxis',lazyAdd:false},length:{value:'150px',setter:'_setLength'},thumbUrl:{value:null,validator:Y.Lang.isString}}});},'3.3.0',{requires:['widget','substitute','dd-constrain']});YUI.add('slider-value-range',function(Y){var MIN='min',MAX='max',VALUE='value',round=Math.round;function SliderValueRange(){this._initSliderValueRange();}
Y.SliderValueRange=Y.mix(SliderValueRange,{prototype:{_factor:1,_initSliderValueRange:function(){},_bindValueLogic:function(){this.after({minChange:this._afterMinChange,maxChange:this._afterMaxChange,valueChange:this._afterValueChange});},_syncThumbPosition:function(){this._calculateFactor();this._setPosition(this.get(VALUE));},_calculateFactor:function(){var length=this.get('length'),thumbSize=this.thumb.getStyle(this._key.dim),min=this.get(MIN),max=this.get(MAX);length=parseFloat(length,10)||150;thumbSize=parseFloat(thumbSize,10)||15;this._factor=(max-min)/(length-thumbSize);},_defThumbMoveFn:function(e){var previous=this.get(VALUE),value=this._offsetToValue(e.offset);if(previous!==value){this.set(VALUE,value,{positioned:true});}},_offsetToValue:function(offset){var value=round(offset*this._factor)+this.get(MIN);return round(this._nearestValue(value));},_valueToOffset:function(value){var offset=round((value-this.get(MIN))/ this._factor);return offset;},getValue:function(){return this.get(VALUE);},setValue:function(val){return this.set(VALUE,val);},_afterMinChange:function(e){this._verifyValue();this._syncThumbPosition();},_afterMaxChange:function(e){this._verifyValue();this._syncThumbPosition();},_verifyValue:function(){var value=this.get(VALUE),nearest=this._nearestValue(value);if(value!==nearest){this.set(VALUE,nearest);}},_afterValueChange:function(e){if(!e.positioned){this._setPosition(e.newVal);}},_setPosition:function(value){this._uiMoveThumb(this._valueToOffset(value));},_validateNewMin:function(value){return Y.Lang.isNumber(value);},_validateNewMax:function(value){return Y.Lang.isNumber(value);},_setNewValue:function(value){return round(this._nearestValue(value));},_nearestValue:function(value){var min=this.get(MIN),max=this.get(MAX),tmp;tmp=(max>min)?max:min;min=(max>min)?min:max;max=tmp;return(value<min)?min:(value>max)?max:value;}},ATTRS:{min:{value:0,validator:'_validateNewMin'},max:{value:100,validator:'_validateNewMax'},value:{value:0,setter:'_setNewValue'}}},true);},'3.3.0',{requires:['slider-base']});YUI.add('clickable-rail',function(Y){function ClickableRail(){this._initClickableRail();}
Y.ClickableRail=Y.mix(ClickableRail,{prototype:{_initClickableRail:function(){this._evtGuid=this._evtGuid||(Y.guid()+'|');this.publish('railMouseDown',{defaultFn:this._defRailMouseDownFn});this.after('render',this._bindClickableRail);this.on('destroy',this._unbindClickableRail);},_bindClickableRail:function(){this._dd.addHandle(this.rail);this.rail.on(this._evtGuid+Y.DD.Drag.START_EVENT,Y.bind(this._onRailMouseDown,this));},_unbindClickableRail:function(){if(this.get('rendered')){var contentBox=this.get('contentBox'),rail=contentBox.one('.'+this.getClassName('rail'));rail.detach(this.evtGuid+'*');}},_onRailMouseDown:function(e){if(this.get('clickableRail')&&!this.get('disabled')){this.fire('railMouseDown',{ev:e});}},_defRailMouseDownFn:function(e){e=e.ev;var dd=this._resolveThumb(e),i=this._key.xyIndex,length=parseFloat(this.get('length'),10),thumb,thumbSize,xy;if(dd){thumb=dd.get('dragNode');thumbSize=parseFloat(thumb.getStyle(this._key.dim),10);xy=this._getThumbDestination(e,thumb);xy=xy[i]-this.rail.getXY()[i];xy=Math.min(Math.max(xy,0),(length-thumbSize));this._uiMoveThumb(xy);e.target=this.thumb.one('img')||this.thumb;dd._handleMouseDownEvent(e);}},_resolveThumb:function(e){return this._dd;},_getThumbDestination:function(e,node){var offsetWidth=node.get('offsetWidth'),offsetHeight=node.get('offsetHeight');return[(e.pageX-Math.round((offsetWidth / 2))),(e.pageY-Math.round((offsetHeight / 2)))];}},ATTRS:{clickableRail:{value:true,validator:Y.Lang.isBoolean}}},true);},'3.3.0',{requires:['slider-base']});YUI.add('range-slider',function(Y){Y.Slider=Y.Base.build('slider',Y.SliderBase,[Y.SliderValueRange,Y.ClickableRail]);},'3.3.0',{requires:['slider-base','clickable-rail','slider-value-range']});YUI.add('slider',function(Y){},'3.3.0',{use:['slider-base','slider-value-range','clickable-rail','range-slider']});