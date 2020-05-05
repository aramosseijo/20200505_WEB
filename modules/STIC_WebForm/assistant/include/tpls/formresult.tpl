{*
/*********************************************************************************
 Plantilla de formulario generado
 ********************************************************************************/
*}
<html {$MAP.LANGHEADER}>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!-- css -->
		{foreach from=$MAP.FORM.CSS item=CSS}
			<link rel="stylesheet" type="text/css" media="all" href="{$CSS}">
		{/foreach}
		{literal}
		<style>

		    body, td, pre {color:#000; font-family:Verdana, Arial, Helvetica, sans-serif; font-size:10px; margin:8px;}
			body {background:#FFF;}
			h1 {font-size: 2em}
			h2 {font-size: 1.5em}
			h3 {font-size: 1.17em}
			h4 {font-size: 1em}
			h5 {font-size: .83em}
			h6 {font-size: .75em}
			img {border:0;}
			table {cursor:default}
			table td, table th {cursor:text}
			ins {border-bottom:1px solid green; text-decoration: none; color:green}
			del {color:red; text-decoration:line-through}
			cite {border-bottom:1px dashed blue}
			acronym {border-bottom:1px dotted #CCC; cursor:help}
			abbr {border-bottom:1px dashed #CCC; cursor:help}
			
			tbody.section {
		    	display: table-row-group;
			    vertical-align: middle;
		    }
		    
		</style>
		{/literal}
		<!-- // css -->
		
		<!-- js scripts -->
		{foreach from=$MAP.FORM.SCRIPTS item=SCRIPT}
			<script type="text/javascript" src="{$SCRIPT}"></script>
		{/foreach}
		<!-- // js scripts -->
	</head>
	<body>
		{if $MAP.FORM.NUM_ATTACHMENT == 0}
			<form action="{$MAP.FORM.URL}" name="{$MAP.FORM.NAME|default:"WebToLeadForm"}" method="POST" id="{$MAP.FORM.ID|default:"WebToLeadForm"}">
		{/if}
		{if $MAP.FORM.NUM_ATTACHMENT > 0}
			<form action="{$MAP.FORM.URL}" name="{$MAP.FORM.NAME|default:"WebToLeadForm"}" method="POST" id="{$MAP.FORM.ID|default:"WebToLeadForm"}" enctype="multipart/form-data">
		{/if}

		{$MAP.HTML}
		</form>		
		<script type="text/javascript">
		<!-- js embedded scripts -->
		{foreach from=$MAP.LANG_VARS key=KEY item=TEXT}
			var {$KEY} = "{$TEXT|escape 'javascript'}";
		{/foreach}
		{$MAP.EMBEDDED_JS}
		<!-- // js scripts -->
		</script>
	</body>
</html>
