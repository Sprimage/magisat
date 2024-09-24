
import axios from "axios";
import { constructUrl, logServerOperation } from "./utils";
import "dotenv/config";


export class Magisat {
    private apiUrl: string = "https://api.bestinslot.xyz/v3";
    private testnetUrl: string = "https://testnet.api.bestinslot.xyz/v3";
    private signetUrl: string = "https://signet.api.bestinslot.xyz/v3";
    private network: string;
    private apiKey: string;

    constructor() {
        try {
            this.apiKey = process.env.MAGISAT_API_KEY || "";
            this.network = process.env.NETWORK_ENV || "mainnet";
          } catch (e) {
            console.log("An error occured: ", e);
          }
    }

  async _call(path, method, data = null) {
    const reqHeaders = {
      "x-api-key": this.apiKey,
    };

    logServerOperation("making a " + method + " request to: ", path);
    try {
      const response = await axios({
        url: path,
        method: method,
        headers: reqHeaders,
        data,
      });
      if (response.status == 200){
      const payload = response?.data;
      logServerOperation(
        "response payload for request to " + path,
        JSON.stringify(payload)
      );
      return {
        statusCode: 200,
        data: payload.data,
      };
    } else {
      logServerOperation(
        "An error occured while making request to: " + path, response.status );
      throw Error("Could not fulfil request");
    }
    } catch (error) {
      logServerOperation(
        "An error occured while making request to: " + path,
        error
      );
      throw Error(error);
    }
  }
}