function listPdfFilesToSpecificSheet() {
  var folderId = "ID_FOLDER_KAMU"; // Ganti dengan ID folder kamu
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var pdfFiles = [];

  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() === MimeType.PDF) {
      var name = file.getName();
      var numberPrefix = parseInt(name.split("-")[0]);

      pdfFiles.push({
        number: isNaN(numberPrefix) ? 99999 : numberPrefix,
        name: name,
        url: file.getUrl()
      });
    }
  }

  // Urutkan berdasarkan angka di awal nama
  pdfFiles.sort(function(a, b) {
    return a.number - b.number;
  });

  // Ambil sheet dengan nama tertentu
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("NAMA_SHEET"); // Ganti dengan nama sheet yang kamu mau

  // Kalau sheet tidak ditemukan, tampilkan pesan error
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet tidak ditemukan!");
    return;
  }

  sheet.clear(); // Bersihkan isinya dulu
  sheet.appendRow(["Nama File", "Link File"]);

  pdfFiles.forEach(function(fileData) {
    sheet.appendRow([fileData.name, fileData.url]);
  });
}
