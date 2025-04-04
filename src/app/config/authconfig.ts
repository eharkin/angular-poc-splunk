export interface Config {
    token: string;
    url: string;
    batchInterval: number,
    maxBatchCount: number,
    maxBatchSize: number,
    maxRetries: number
}