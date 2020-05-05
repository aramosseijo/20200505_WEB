var estadoOriginal = $("#estado").val();

$("#estado").change(function() {
  if(estadoOriginal == 'generada' && ($("#estado").val() == 'abierta' || $("#estado").val() == '')){
      alert(SUGAR.language.get('redk_Remesas','LBL_CAMBIONOPERMITIDO'));
      $("#estado").val(estadoOriginal);      
  }
  if(estadoOriginal == 'enviada' && ($("#estado").val() == 'abierta' || $("#estado").val() == 'generada'|| $("#estado").val() == 'generada' || $("#estado").val() == '')){
      alert(SUGAR.language.get('redk_Remesas','LBL_CAMBIONOPERMITIDO'));
      $("#estado").val(estadoOriginal);      
  }
});