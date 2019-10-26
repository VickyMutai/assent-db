import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.css']
})
export class WorkingComponent {
  title = 'app';
  public csvRecords: any[] = [];

  @ViewChild('fileImportInput',{static: false}) fileImportInput: any;

  fileChangeListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        alert('Unable to read ' + input.files[0]);
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = (<string>csvRecordsArray[i]).split(',');

      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (data.length == headerLength) {

        let csvRecord: CSVRecord = new CSVRecord();

        csvRecord.firstName = data[0].trim();
        csvRecord.lastName = data[1].trim();
        csvRecord.Sex = data[2].trim();
        csvRecord.Dob= data[3].trim();

        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }

}

export class CSVRecord {

  public firstName: any;
  public lastName: any;
  public Dob: any;
  public Sex: any;

  constructor() {

  }
  
}

