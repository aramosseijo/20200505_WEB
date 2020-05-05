
<img
	id="img_{$vardef.name}" 
	name="img_{$vardef.name}" 
	{if empty($vardef.value)}
	   src='' 	
	{else}
	   src='index.php?entryPoint=download&id={$vardef.value}&type=SugarFieldImage&isTempFile=1'
	{/if}	
	style='
		{if empty($vardef.value)}
			display:	none;
		{/if}
		{if $vardef.border eq ""}
			border: 0; 
		{else}
			border: 1px solid black; 
		{/if}
		{if $vardef.width eq ""}
			width: auto;
		{else}
			width: {$vardef.width}px;
		{/if}
		{if $vardef.height eq ""}
			height: auto;
		{else}
			height: {$vardef.height}px;
		{/if}
		'		
/>