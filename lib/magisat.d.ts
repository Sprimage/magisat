import "dotenv/config";
export declare class Magisat {
    private apiUrl;
    private testnetUrl;
    private signetUrl;
    private network;
    private apiKey;
    constructor();
    _call(path: any, method: any, data?: any): Promise<{
        statusCode: number;
        data: any;
    }>;
}
