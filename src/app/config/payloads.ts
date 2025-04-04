import { DeviceInfo } from "ngx-device-detector";

export interface Payloads {
    sessionId: string | null;
    userId:  string | null;
    action: string;
    page: string;
    deviceUsage: DeviceInfo;
    rageClick: string | null;
    errorClick: string | null;
    deadClick: string | null;
    severity: string;
};
