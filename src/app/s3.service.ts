import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
    providedIn: 'root'
})
export class S3Service {
    private s3: AWS.S3;
    bucket = 'investment-portfolio';
    parsedJson: string |undefined;
    jsonData : string | undefined;

    constructor() {
        AWS.config.update({
            accessKeyId: '***',
            secretAccessKey: '***',
            region: 'us-east-1' // e.g., 'us-west-2'
          });
        this.s3 = new AWS.S3();
    }

    uploadFile(file: File, key: string): Promise<any> {
        const params = {
            Bucket: this.bucket,
            Key: key,
            Body: file
        };

        return this.s3.putObject(params).promise();
    }

    getInsightsFile(){
        const fileKey = 'target_price.json';

        // Download the JSON file from S3
        this.s3.getObject({ Bucket: this.bucket, Key: 'insights/'+ fileKey  }, (err, data) => {
        if (err) {
            console.error('Error retrieving file from S3:', err);
            return;
        }

        // Parse the JSON data
        this.jsonData = data.Body?.toString('utf-8');
        if(this.jsonData){
            this.parsedJson = JSON.parse(this.jsonData);
        }

        // Now you can work with the parsed JSON data
        console.log(this.parsedJson);
        });
    }
}