import { Injectable } from '@angular/core';
import { SplunkLogger } from '../../config/splunklogger';
import { createStream } from 'splunk-bunyan-logger';
import { Logger } from 'splunk-logging';
import { Payload } from '../../config/payload';
import bunyan from 'bunyan';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, timer } from 'rxjs';
import { promises, writeFileSync } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class SplunkService {
  splunkRequests: any = new Array();
  constructor(private http: HttpClient, private splunklogger: SplunkLogger) {}
  /*
    Approach 1 - send logs to splunk using HTTP Event Collector
  */
  sendLogToSplunkApprach(action: string, logtype: string) {
    const message = this.splunklogger.buildMessage(action, logtype);
    const log = new Logger(message.config);
    // Enable SSL certificate validation
    log.requestOptions.strictSSL = true;
    log.error = (err, context)=>{
      // Handle errors here
      console.log("error", err, "context", context);
    };
    log.send(message.payload, (err, resp, body)=> {
      // If successful, body will be { text: 'Success', code: 0 }
      console.log("Response from Splunk", err, resp, body);
    });
  }

  /*
    Approach 2 - send logs to splunk using Univerisal Forwarder
  */
  sendLogToSplunkHTTPApproach(action: string, logtype: string) {
    const message = this.splunklogger.buildHTTPMessage(action, logtype);
    console.log(message);
    this.splunkRequests.push(message);
    console.log(this.splunkRequests)
    
    interval(30000).subscribe(() => {
      if(this.splunkRequests.length != 0) {
        const payloads = {
          "payloads": this.splunkRequests
        }
        this.callLogApi(payloads);
     }
    })
  } 
  callLogApi(message: any) {
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBTDg4MjkzIiwiZ2VuZXJhdGVUb2tlbiI6dHJ1ZSwicHJpb3JpdHlSb2xlSWQiOjMsImludGVybmFsRmxhZyI6dHJ1ZSwiYXV0aG9yaXRpZXMiOlsiQ2FyZWxvbiBBZG1pbmlzdHJhdG9yIl0sInByaW9yaXR5Um9sZU5hbWUiOiJDYXJlbG9uIEFkbWluaXN0cmF0b3IiLCJpYXQiOjE3Mjg0Njg3NzUsImV4cCI6MTcyODQ3MjM3NX0.gFNFzclN4tGh7cO_5be6rhKAr5n93C-CGuRFV78Hz1Lb0Fa7lrfWC_KcSa2MpXo7Tjr41w6JXRWwfHeEIhX4_A', 
    'loginType': 'Internal',
    'clientId': '59'};

    this.http.post<any>('http://localhost:8080/api/v1/pad/ui/log', message, { headers }).subscribe({
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.info("complete");
        this.splunkRequests = new Array();
      },
  })
  }

    /*
    Approach 3 - send logs to splunk using Univerisal Forwarder log to file
  */
    sendLogToSplunkLogApproach(action: string, logtype: string) {
      console.log("Start Write")
      promises.writeFile("file.txt", "test", {
       flag: "w"
      }).then(() => {
        console.log("Finish Write")
      })
      console.log("Continue Working")
    } 
}
