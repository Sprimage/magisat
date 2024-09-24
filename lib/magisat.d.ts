import "dotenv/config";
import { TagsResponse, TagFloorPriceHistoryResponse, TagIdInfo, GetListingsArgs, ListingsResponse, RbfListingsResponse, PsbtBulkListingsArgs, NewBulkListingArgs, NewBulkListingResponse, DeleteListingResponse, PreparedPsbtResponse, PreparedMessageArgs, BroadcastPreparedMessageResponse, PsbtBuyingBulkArgs, BuyingPsbtResponse, BulkBuyingArgs, BulkBuyingResponse, PendingBuyingsResponse, PsbtOfferCreateArgs, PsbtOfferCreateResponse, PsbtOfferAcceptArgs, PsbtOfferAcceptResponse, OfferCreateArgs, OfferCreateResponse, OfferAcceptArgs, OfferAcceptResponse, OfferListArgs, OfferListResponse, DeleteOfferArgs, DeleteOfferResponse, FeeRateTier } from './types';
export declare class Magisat {
    private apiUrl;
    private testnetUrl;
    private signetUrl;
    private network;
    private client;
    private apiKey;
    constructor();
    getUrl(network: string): string;
    private request;
    getTags(params?: {
        isCategory?: string;
        beforeTime?: string;
        includeIsVirtual?: string;
    }): Promise<TagsResponse>;
    getTagFloorPriceHistory(tagId: string, offset: number, limit: number, timeOrder: "ASC" | "DESC"): Promise<TagFloorPriceHistoryResponse[]>;
    getTagIdBySlug(slug: string): Promise<TagIdInfo>;
    getCollections(params: {
        offset: number;
        limit: number;
        beforeTime?: string;
        sortBy?: string;
    }): Promise<TagsResponse>;
    getListings(data: GetListingsArgs): Promise<ListingsResponse>;
    getRbfListings(txId: string): Promise<RbfListingsResponse>;
    getMessageForBulkListing(data: PsbtBulkListingsArgs): Promise<{
        psbtHex: string;
        psbtBase64: string;
    }>;
    createNewListings(data: NewBulkListingArgs): Promise<NewBulkListingResponse>;
    deleteBulkListings(listingIds: string[]): Promise<DeleteListingResponse>;
    getListingById(listingId: string): Promise<ListingsResponse>;
    deleteListing(listingId: string): Promise<DeleteListingResponse>;
    getPreparedMessageForBuying(params: {
        buyerAddress: string;
        buyerPublicKey: string;
        feeRateTier: FeeRateTier;
        feeRate?: number;
        listingIds: string[];
        optimizationLevel?: number;
        overrideDisableSpendables?: boolean;
    }): Promise<PreparedPsbtResponse>;
    postPreparedMessageForBuying(data: PreparedMessageArgs): Promise<BroadcastPreparedMessageResponse>;
    getBulkBuyingMessage(data: PsbtBuyingBulkArgs): Promise<BuyingPsbtResponse>;
    postBulkBuyingMessage(data: BulkBuyingArgs): Promise<BulkBuyingResponse>;
    getPendingBuyingsForAddress(address: string): Promise<PendingBuyingsResponse>;
    postPsbtOfferCreateMessage(data: PsbtOfferCreateArgs): Promise<PsbtOfferCreateResponse>;
    postPsbtOfferAcceptMessage(data: PsbtOfferAcceptArgs): Promise<PsbtOfferAcceptResponse>;
    createOffers(data: OfferCreateArgs): Promise<OfferCreateResponse>;
    acceptOffers(data: OfferAcceptArgs): Promise<OfferAcceptResponse>;
    listOffers(params: OfferListArgs): Promise<OfferListResponse>;
    deleteOffers(data: DeleteOfferArgs[]): Promise<DeleteOfferResponse>;
}
