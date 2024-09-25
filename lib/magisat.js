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
        this.apiUrl = "https://api.magisat.io";
        this.testnetUrl = "https://api.magisat.io";
        this.signetUrl = "https://api.magisat.io";
        this.apiKey = process.env.MAGISAT_API_KEY || "";
        this.network = process.env.NETWORK_ENV || "mainnet";
        this.client = axios_1.default.create({
            baseURL: this.getUrl(this.network),
            headers: {
                "X-MGST-API-KEY": this.apiKey,
            },
        });
    }
    getUrl(network) {
        switch (network) {
            case "mainnet":
                return this.apiUrl;
            case "testnet":
                return this.testnetUrl;
            case "signet":
                return this.signetUrl;
            default:
                return this.apiUrl;
        }
    }
    request(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client(config);
                return response.data;
            }
            catch (error) {
                (0, utils_1.logServerOperation)("An error occurred while making request", error);
                throw error;
            }
        });
    }
    getTags(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: "/external/v1/tag", params });
        });
    }
    getTagFloorPriceHistory(tagId, offset, limit, timeOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                method: "GET",
                url: "/external/v1/tag/history",
                params: { tagId, offset, limit, timeOrder },
            });
        });
    }
    getTagIdBySlug({ slug }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: `/external/v1/tag/${slug}` });
        });
    }
    getCollections(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: "/external/v1/collections", params });
        });
    }
    // Listing
    getListings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/listing", data });
        });
    }
    getRbfListings(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: `/external/v1/listing/rbf/${txId}` });
        });
    }
    getMessageForBulkListing(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/psbt/listing", data });
        });
    }
    createNewListings(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/listing/bulk", data });
        });
    }
    deleteBulkListings(listingIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                method: "DELETE",
                url: "/external/v1/listing/bulk",
                params: { listingIds: listingIds.join(",") },
            });
        });
    }
    getListingById(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: `/external/v1/listing/${listingId}` });
        });
    }
    deleteListing(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "DELETE", url: `/external/v1/listing/${listingId}` });
        });
    }
    getPreparedMessageForBuying(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({
                method: "GET",
                url: "/external/v1/psbt/prepared",
                params: Object.assign(Object.assign({}, params), { listingIds: params.listingIds.join(",") }),
            });
        });
    }
    postPreparedMessageForBuying(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/prepared", data });
        });
    }
    getBulkBuyingMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/psbt/buying", data });
        });
    }
    postBulkBuyingMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/buying/bulk", data });
        });
    }
    getPendingBuyingsForAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: `/external/v1/buying/pending/${address}` });
        });
    }
    postPsbtOfferCreateMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/psbt/offer/create", data });
        });
    }
    postPsbtOfferAcceptMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/psbt/offer/accept", data });
        });
    }
    createOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/offer", data });
        });
    }
    acceptOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "POST", url: "/external/v1/offer/accept", data });
        });
    }
    listOffers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "GET", url: "/external/v1/offer", params });
        });
    }
    deleteOffers(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request({ method: "DELETE", url: "/external/v1/offer", data });
        });
    }
}
exports.Magisat = Magisat;
//# sourceMappingURL=magisat.js.map