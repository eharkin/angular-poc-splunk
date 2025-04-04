import { DeviceInfo } from "ngx-device-detector";

export interface Payload {
        message: {
            sessionId: string;
            userId: string;
            action: string;
            page: string;
            deviceUsage: DeviceInfo;
            location: any;
            rageClick: number;
            errorClick: number;
            deadClick: number;
        };
        metadata: {
            source: string;
            sourcetype: string;
            index: string;
            host: string;
        };
        severity: string;
}