function doGet(e) {
  // Obtém o parâmetro 'code' da URL
  var code = e.parameter.code;
  
  // Abre a planilha ativa
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Obtém os dados da planilha
  var data = sheet.getDataRange().getValues();
  
  // Variável para armazenar o vídeo encontrado
  var video = {};
  
  // Procura pelos vídeos correspondentes ao código na planilha
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === code) {
      // Cria um objeto para o primeiro vídeo encontrado
      video = {
        type: "video",    // Tipo fixo como "video"
        src: data[i][2]   // Fonte do vídeo (URL do vídeo)
      };
      break; // Sai do loop após encontrar o primeiro vídeo
    }
  }
  
  // Converte o objeto de vídeo para JSON
  var jsonResponse = ContentService.createTextOutput(JSON.stringify(video))
    .setMimeType(ContentService.MimeType.JSON);
  
  return jsonResponse;
}
