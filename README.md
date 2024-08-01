# Script Google Apps para Fornecimento de Vídeos com Base em Código

Este script Google Apps é projetado para fornecer URLs de vídeo armazenados em uma planilha do Google Sheets com base em um código fornecido na URL de uma solicitação GET. O script retorna os dados do vídeo em formato JSON.

## Funcionalidades

1. **Busca por Código:** Obtém o código de um parâmetro da URL e procura por um vídeo correspondente na planilha ativa.
2. **Retorno em JSON:** Retorna a URL do vídeo encontrado em formato JSON.

## Configuração

1. **Planilha:**
   - O script assume que a planilha ativa possui os dados organizados da seguinte forma:
     - **Coluna A:** Código do vídeo.
     - **Coluna C:** URL do vídeo.
   - Certifique-se de que os dados estejam na planilha ativa do Google Sheets em que o script está configurado.

2. **Publicação como Web App:**
   - Para que o script funcione como um serviço web, você precisa publicá-lo como um Web App:
     1. No Google Apps Script, clique em `Implantar` -> `Nova implantação`.
     2. Escolha `Tipo de implantação` como `Aplicativo da Web`.
     3. Configure as permissões de acesso como necessário.
     4. Clique em `Implantar` e copie a URL fornecida. 

## Como Usar

1. **Solicitação GET:**
   - Envie uma solicitação GET para a URL do Web App com o parâmetro `code` especificando o código do vídeo desejado. Por exemplo:
     ```
     https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?code=YOUR_CODE
     ```
   - Substitua `YOUR_SCRIPT_ID` pela ID do seu script e `YOUR_CODE` pelo código do vídeo que você deseja buscar.

2. **Resposta:**
   - O script retornará um JSON com a estrutura:
     ```json
     {
       "type": "video",
       "src": "URL_DO_VÍDEO"
     }
     ```
   - Se o código não for encontrado, o JSON retornado será:
     ```json
     {
       "type": "video",
       "src": ""
     }
     ```

## Código

```javascript
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
