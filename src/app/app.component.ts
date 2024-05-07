import { Component, OnInit } from '@angular/core';
import { S3Service } from './s3.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import {MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule,MatIconModule,NgIf,MatCardModule,MatTableModule],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'AIM';
  selectedFile: File | undefined;

  displayedColumns = [
    'Symbol',
    'Latest Price',
    'Target Mean Price',
    'Target Median Price',
    'Target High Price',
    'Mean Price Difference',
    'Median Price Difference',
    'High Price Difference',
    'Recommendation',
    'Risk',
    'Mean Price Profitability %',
    'High Price Profitability %'
  ];
  dataSource:StockData[] = [];
  isUpload = false;
  columns: string[] | undefined;

    constructor(private s3Service: S3Service, private http:HttpClient) { }

    ngOnInit(): void {
      this.loadData();
      console.log(this.dataSource);
    }  

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }

    onUpload() {
        if (this.selectedFile) {
            this.s3Service.uploadFile(this.selectedFile, this.selectedFile.name)
                .then(data => {
                    console.log('Upload successful:', data);
                    this.isUpload = true;
                })
                .catch(error => {
                    console.error('Upload error:', error);
                });
        }
        // this.s3Service.getInsightsFile();
    }
    
    loadData(): void {
      this.http.get<any[]>('./assets/target_price.json').subscribe({
        next: (data) => { this.dataSource = data; console.log(this.dataSource[0]["Symbol"]);},
        error: (error) => { console.log('error'); },
        complete: () => { console.log('successful'); }
      });
    }

}

export interface StockData {
  'Symbol': string;
  'Latest Price': number;
  'Target Mean Price': number;
  'Target Median Price': number;
  'Target High Price': number;
  'Mean Price Difference': number;
  'Median Price Difference': number;
  'High Price Difference': number;
  'Recommendation': string;
  'Risk': number;
  'Mean Price Profitability %': number;
  'High Price Profitability %': number;
}
