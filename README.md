# TUTORIAL PENGGUNAAN _SCRIPT_ UNTUK MENYALIN _LINK GOOGLE DRIVE_ KE _GOOGLE SHEETS_ SECARA OTOMATIS

## Contoh Studi Kasus
**Mengumpulkan Sertifikat berbentuk _link Google Drive_ di _Google Sheets_**

## Persiapan
1. Siapkan folder _Google Drive_ yang berisi **Sertifikat** (saya menggunakan format penamaan "1-namasertifikat" dengan _type file **PDF**_)
2. Siapkan _Google Sheets_ untuk memuat _link Google Drive_

## Tahapan
1. Siapkan Folder Google Drive yang berisi sertifikat
![image](https://github.com/user-attachments/assets/ca936548-6fb5-4c9f-9c50-1a9b9da6ea6e)

2. Siapkan Google Sheets kosong
![image](https://github.com/user-attachments/assets/5dc45424-ea81-41b9-b91e-914c277d6169)

3. Selanjutnya buka _tab **Extensions**_, lalu pilih _**App Script**_
![image](https://github.com/user-attachments/assets/5dc5470b-b3ba-4aec-bbc8-991f25462019)

4. Setelah terbuka, ubah nama _**"Untitled project"**_ menjadi **"_Copy_ Sertifikat"**
![image](https://github.com/user-attachments/assets/a7325a0f-5686-485a-b6b9-cf8b818421d8)

5. Isi **Code.gs** dengan _copy paste_ kode berikut:
```
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
```
6. Ubah **ID_FOLDER_KAMU** sesuai dengan yang anda miliki di Folder Google Drive anda. <br>
   Misal di Folder Google Drive saya, yaitu:
   ![image](https://github.com/user-attachments/assets/7f25a340-aead-444a-917a-8e0cb86c0da6)
   <br>
   dan ubah **NAMA_SHEETS** sesuai dengan yang anda miliki di Google Sheets anda. <br>
   Misal di Google Sheets saya, yaitu:
   ![image](https://github.com/user-attachments/assets/3b3ca943-f9b6-430e-bea8-b6463ea6e19a)

7. Save code nya, lalu klik _**Run**_

8. Jika muncul pesan **Authorization required**, klik saja **Review permissions**
   ![image](https://github.com/user-attachments/assets/4ef5f2f9-62f2-4b8c-b1c5-5157e2d22d22)
   Pilih **Advanced** lalu klik **Go To Copy Sertifikat (unsafe)**
   ![image](https://github.com/user-attachments/assets/02ff93e2-3fe5-4261-9937-ad677a5595af)
   Klik **Select all** dan klik **Continue**
   ![image](https://github.com/user-attachments/assets/f1f720e3-d22c-4a25-8d7c-7d3d1b88feae)

9. Jika di **Execution log** terdapat pesan **Execution Started**, berarti script berfungsi dan jika sudah ada pesan **Execution completed** berarti script sudah selesai
   ![image](https://github.com/user-attachments/assets/28f397ae-2e09-4921-989c-0bd2073392a5)

10. Buka kembali Google Sheets anda dan link sertifikat Google Drive sudah berada di Sheet anda (sertifikat berurutan sesuai dengan nomor)
    ![image](https://github.com/user-attachments/assets/ced96602-5239-47a2-af55-761d88c22cbd)
