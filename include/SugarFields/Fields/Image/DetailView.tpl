
<input type="hidden" class="sugar_field" id="{{sugarvar key='name'}}" value="{{sugarvar key='value' string=true}}">
{if isset($displayParams.link)}
<a href='{{$displayParams.link}}'>
{else}
<a href="javascript:SUGAR.image.lightbox(YAHOO.util.Dom.get('img_{{sugarvar key='name'}}').src)">
{/if}
<img
	id="img_{{sugarvar key='name'}}" 
	name="img_{{sugarvar key='name'}}" 
	{{if !empty($vardef.calculated)}}
	   src='{{sugarvar key='value'}}'
	{{else}}
	{if empty({{sugarvar key='value' string=true}})}
	   src='' 	
	{else}
	   src='index.php?entryPoint=download&id={{sugarvar key='value'}}&type=SugarFieldImage&isTempFile=1'
	{/if}
	{{/if}}
	style='
		{if empty({{sugarvar key='value' string=true}})}
			display:	none;
		{/if}
		{if "{{$vardef.border}}" eq ""}
			border: 0; 
		{else}
			border: 1px solid black; 
		{/if}
		{if "{{$vardef.width}}" eq ""}
			width: auto;
		{else}
			width: {{$vardef.width}}px;
		{/if}
		{if "{{$vardef.height}}" eq ""}
			height: auto;
		{else}
			height: {{$vardef.height}}px;
		{/if}
		'		
>
</a>
