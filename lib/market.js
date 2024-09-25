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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Market = void 0;
const magisat_1 = require("./magisat");
class Market extends magisat_1.Magisat {
    constructor() {
        super();
    }
    getActiveCollectionOffers({ slug, offset = 0, limit = 50 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectionId = yield this.getTagIdBySlug({ slug });
            const listings = yield this.getListings({ offset, limit, tagId: collectionId.id });
            return Object.assign(Object.assign({}, listings), { results: listings.results.filter(listing => listing.status === "DECORATED") });
        });
    }
}
exports.Market = Market;
//# sourceMappingURL=market.js.map