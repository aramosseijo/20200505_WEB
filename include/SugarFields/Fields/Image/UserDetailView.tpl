
{if isset($displayParams.link)}
<a href='{$displayParams.link}'>
{/if}

<img
	id="img_picture" 
	name="img_picture" 
	{if empty($picture_value)}
	   src='' 	
	{else}
	   src='index.php?entryPoint=download&id={$picture_value}&type=SugarFieldImage&isTempFile=1&isProfile=1'
	{/if}	
	style='
		{if empty($picture_value)}
			display:	none;
		{/if}
		{if "$vardef.border" eq ""}
			border: 0; 
		{else}
			border: 1px solid black; 
		{/if}
		{if "$vardef.width" eq ""}
			width: auto;
		{else}
			width: {$vardef.width}px;
		{/if}
		{if "$vardef.height" eq ""}
			height: auto;
		{else}
			height: {$vardef.height}px;
		{/if}
		'		
>

{if isset($displayParams.link)}
</a>
{/if}