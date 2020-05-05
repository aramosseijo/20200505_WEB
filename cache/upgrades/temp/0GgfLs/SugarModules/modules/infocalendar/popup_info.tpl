<table border="0" >
<tr>
<td valign="top" align="left" >
<img src='{$imageModule}' border="1">
</td><td></td></tr>
<tr>
<td valign="top" align="left">

<table border="0">
{foreach from=$elements key=label item=value}
	<tr>
	<td align="left" width="100px">
	{$label}:
	</td><td>&nbsp;&nbsp;</td>
	<td align="left">
	<b>{$value}</b>
	</td>
	</tr>
{/foreach}
</table>

</td><td></td>

</tr>
</table>