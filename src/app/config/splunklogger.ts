import { Payload } from "./payload";
import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Config } from "./authconfig";
import { Router } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { Payloads } from "./payloads";

@Injectable({
    providedIn: 'root'
})
export class SplunkLogger {
    constructor(private deviceDectorService: DeviceDetectorService, private router : Router){}

    buildMessage(action: string, logtype: string) { 
        const auth: Config = {
          token: "952cd92a-ec54-4758-abd6-eaddae5809e5",
          url: "http://localhost:8088",
          batchInterval: 1000, // will batch request into one every one second
          maxBatchCount: 10, // only 10 messages can be batched at one
          maxBatchSize: 1024, // size of 1kb
          maxRetries: 10 //if splunk is down it will retry 10 times
        };

        const payload: Payload = {
          // Message can be anything, doesn't have to be an object
          message: {
            sessionId: "test",
            userId:  "test",
            page: this.router.url,
            action: action,
            deviceUsage: this.deviceDectorService.getDeviceInfo(),
            location: true,
            rageClick: 1,
            errorClick: 1,
            deadClick: 1
        },
        // Metadata is optional
        metadata: {
            source: "test",
            sourcetype: "test",
            index: "main",
            host: "local",
        },
        // Severity is also optional
        severity: logtype,
      }

      const payload2: Payload = {
        // Message can be anything, doesn't have to be an object
        message: {
          sessionId: "test",
          userId:  "test",
          page: this.router.url,
          action: action,
          deviceUsage: this.deviceDectorService.getDeviceInfo(),
          location: true,
          rageClick: 1,
          errorClick: 1,
          deadClick: 1
      },
      // Metadata is optional
      metadata: {
          source: "test",
          sourcetype: "test",
          index: "main",
          host: "local",
      },
      // Severity is also optional
      severity: logtype,
    }
      return {
        config: auth,
        payload: payload,
        payload2: payload2
    };
  }

  buildHTTPMessage(action: string, logtype: string) { 
      const payload: Payloads = {
          sessionId: sessionStorage.getItem("id"),
          userId:  sessionStorage.getItem("usrId"),
          page: this.router.url,
          action: action,
          deviceUsage: this.deviceDectorService.getDeviceInfo(),
          rageClick: sessionStorage.getItem("rageClick"),
          errorClick: sessionStorage.getItem("errorClick"),
          deadClick: sessionStorage.getItem("deadClick"),
          severity: logtype
    };
    return payload;
  }
}
