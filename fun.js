function myFunction() {

  /*data シートの値を配列で返す*/
  function getDatas() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('データ');

    let startRow = 1;
    let startCol = 1;
    let rowNum = 2;
    let colNum = 2;
    let datas = sheet.getRange(startRow, startCol, rowNum, colNum).getValues();
    return datas;
  }
  
  /*GETリクエストの場合のレスポンス*/
  function doGet(e) {
    // ログシートに記録
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('get_log');
    let params = e.parameter;
    sheet.appendRow([new Date(), params]);

    // データを取得
    let responseAry = getDatas();

    // レスポンス
    let output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify( responseAry ));
    return output;
  }

  /**POSTリクエストの場合のレスポンス*/
  function doPost(e) {
    // ログシートに記録
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('post_log');
    let json = e.postData.getDataAsString();
    let params = JSON.parse(json);
    sheet.appendRow([new Date(), params]);

    // データを取得
    let responseAry = getDatas();

    // レスポンス
    let output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify( responseAry ));
    return output;
  }
}
