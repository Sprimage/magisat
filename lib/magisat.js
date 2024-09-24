"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magisat = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
require("dotenv/config");
class Magisat {
    constructor() {
        this.apiUrl = "https://api.bestinslot.xyz/v3";
        this.testnetUrl = "https://testnet.api.bestinslot.xyz/v3";
        this.signetUrl = "https://signet.api.bestinslot.xyz/v3";
        try {
            this.apiKey = process.env.MAGISAT_API_KEY || "";
            this.network = process.env.NETWORK_ENV || "mainnet";
        }
        catch (e) {
            console.log("An error occured: ", e);
        }
    }
    _call(path, method, data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqHeaders = {
                "x-api-key": this.apiKey,
            };
            (0, utils_1.logServerOperation)("making a " + method + " request to: ", path);
            try {
                const response = yield (0, axios_1.default)({
                    url: path,
                    method: method,
                    headers: reqHeaders,
                    data,
                });
                if (response.status == 200) {
                    const payload = response === null || response === void 0 ? void 0 : response.data;
                    (0, utils_1.logServerOperation)("response payload for request to " + path, JSON.stringify(payload));
                    return {
                        statusCode: 200,
                        data: payload.data,
                    };
                }
                else {
                    (0, utils_1.logServerOperation)("An error occured while making request to: " + path, response.status);
                    throw Error("Could not fulfil request");
                }
            }
            catch (error) {
                (0, utils_1.logServerOperation)("An error occured while making request to: " + path, error);
                throw Error(error);
            }
        });
    }
}
exports.Magisat = Magisat;
//# sourceMappingURL=magisat.js.map