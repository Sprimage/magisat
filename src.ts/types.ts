// Interfaces
export interface TagsResponse {
    results: Tag[];
    count: string;
  }
  
  export interface Tag {
    id: string;
    name: string;
    slug: string;
    picture: string;
    isCategory: boolean;
    priority: number;
    totalVolume: string;
    floorPrice: string;
    beforeFloorPrice: string | null;
    isVirtual?: boolean;
  }
  
  export interface TagFloorPriceHistoryResponse {
    timestamp: string;
    floor: string;
  }
  
  export interface TagIdInfo {
    id: string;
    name: string;
    picture: string;
  }
  
  export interface GetListingsArgs {
    offset: number;
    limit: number;
    tagIds?: string[];
    utxos?: string[];
    minPrice?: string;
    maxPrice?: string;
    minUpdatedAt?: string;
    maxUpdatedAt?: string;
    orderByColumnWithDirection?: Array<"PRICE_ASC" | "PRICE_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC">;
  }
  
  export interface ListingsResponse {
    results: Listing[];
    count: string;
  }
  
  export interface Listing {
    id: string;
    utxo: string;
    price: string;
    sellerAddress: string;
    sellerPublicKey: string;
    sellerReceiveAddress: string;
    sellerSignature: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    tags: Tag[];
  }
  
  
  export interface RbfListingsResponse {
    results: RbfListing[];
    count: string;
    isPlatformTransaction: boolean;
  }
  
  export interface RbfListing {
    id: string;
    utxo: string;
    price: string;
    sellerAddress: string;
    sellerPublicKey: string;
    sellerReceiveAddress: string;
    sellerSignature: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    tags: Tag[];
    buying: ListingBuying[];
  }
  
  export interface ListingBuying {
    id: string;
    buyerAddress: string;
    buyerPublicKey: string;
    buyerReceiveAddress: string;
    buyerSignature: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PsbtBulkListingsArgs {
    sellerAddress: string;
    sellerPublicKey: string;
    sellerPaymentAddress?: string;
    sellerPaymentPublicKey?: string;
    listings: ListingItemSellInfo[];
  }
  
  export interface ListingItemSellInfo {
    utxo: string;
    price: string;
    sellerReceiveAddress: string;
  }
  
  export interface NewBulkListingArgs {
    sellerAddress: string;
    sellerPublicKey: string;
    sellerPaymentAddress?: string;
    sellerPaymentPublicKey?: string;
    sellerSignature: string;
    listings: ListingItemSellInfo[];
  }
  
  export interface NewBulkListingResponse {
    results: Listing[];
  }
  
  export interface DeleteListingResponse {
    deleted: boolean;
  }
  
  export interface PreparedPsbtResponse {
    psbtToHex: string;
    psbtToBase64: string;
  }
  
  export interface PreparedMessageArgs {
    preparedMessage: string;
    signature: string;
  }
  
  export interface BroadcastPreparedMessageResponse {
    txId: string;
  }
  
  
  export interface PsbtBuyingBulkArgs {
    listings: ListingItemBuyInfo[];
    buyerAddress: string;
    buyerPublicKey: string;
    feeRateTier: FeeRateTier;
    feeRate?: number;
    optimizationLevel?: number;
    receiveAddress?: string;
    overrideDisableSpendables?: boolean;
  }
  
  export interface ListingItemBuyInfo {
    listingId: string;
    receiveAddress: string;
    replace?: boolean;
  }
  
  export type FeeRateTier = "fastestFee" | "halfHourFee" | "hourFee" | "minimumFee";
  
  export interface BuyingPsbtResponse {
    psbtToHex: string;
    psbtToBase64: string;
  }
  
  export interface BulkBuyingArgs {
    buyerAddress: string;
    buyerPublicKey: string;
    buyerSignature: string;
    listings: ListingItemBuyInfo[];
  }
  
  export interface BulkBuyingResponse {
    results: BuyingResponse[];
  }

  export interface BuyingResponse {
    id: string;
    listingId: string;
    buyerAddress: string;
    buyerPublicKey: string;
    buyerReceiveAddress: string;
    buyerSignature: string;
    createdAt: string;
    updatedAt: string;
    txId: string | null;
  }
  
  
  export interface PendingBuyingsResponse {
    data: PendingTxBuying[];
    count: number;
  }
  
  export interface PendingTxBuying {
    [txId: string]: PendingBuying[];
  }
  
  export interface PendingBuying {
    id: string;
    createdAt: string;
    txId: string | null;
    broadcastStatus: "PENDING" | "FAILED" | "SUCCESS";
    listing: Listing & {
      buying: ListingBuying[];
    };
  }

  export interface PsbtOfferCreateArgs {
    listingId: string;
    makerAddress: string;
    makerPublicKey: string;
    makerReceiveAddress: string;
    price: string;
    duration: string;
    feeRateTier: FeeRateTier;
    feeRate?: number;
    optimizationLevel?: number;
    overrideDisableSpendables?: boolean;
  }
  
  export interface PsbtOfferCreateResponse {
    psbtToBase64: string;
    listingId: string;
  }
  
  export interface PsbtOfferAcceptArgs {
  offerId: string;
  takerAddress: string;
  takerPublicKey: string;
  takerReceiveAddress: string;
  feeRateTier: FeeRateTier;
  feeRate?: number;
  optimizationLevel?: number;
  overrideDisableSpendables?: boolean;
}
  
  export interface PsbtOfferAcceptResponse {
    psbtToBase64: string;
    offerId: string;
  }
  
  export interface OfferCreateArgs {
    listingId: string;
    makerAddress: string;
    makerPublicKey: string;
    makerReceiveAddress: string;
    makerSignature: string;
    price: string;
    duration: string;
  }
  
  export interface OfferCreateResponse {
    id: string;
    utxo: string;
    listingId: string;
    status: "NEW" | "PENDING_PURCHASE" | "MEMPOOL_CANCELED" | "MEMPOOL_FINALIZED" | "CANCELLED" | "FINALIZED" | "SPENT" | "PAYMENT_SPENT";
    makerAddress: string;
    makerPublicKey: string;
    makerReceiveAddress: string;
    makerSignature: string;
    takerAddress: string;
    takerPublicKey: string | null;
    takerReceiveAddress: string;
    takerSignature: string;
    txId: string;
    price: string;
    makerFee: string;
    takerFee: string;
    networkFee: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    offerPaymentUtxos: OfferPaymentUtxo[];
  }
  
  export interface OfferPaymentUtxo {
    id: string;
    offerId: string;
    utxo: string;
    isActive: boolean;
  }

  export interface OfferAcceptArgs {
    offerId: string;
    takerAddress: string;
    takerPublicKey: string;
    takerSignature: string;
  }
  
  export interface OfferAcceptResponse extends OfferCreateResponse {
    buyingId: string;
  }
  
  export interface OfferListArgs {
    utxo: string;
    makerAddress: string;
    offset: number;
    limit: number;
    minPrice?: string;
    maxPrice?: string;
    minUpdatedAt?: string;
    maxUpdatedAt?: string;
    orderByColumnWithDirection?: Array<"PRICE_ASC" | "PRICE_DESC" | "UPDATED_AT_ASC" | "UPDATED_AT_DESC">;
  }
  
  export interface OfferListResponse {
    results: OfferCreateResponse[];
    count: string;
  }
  
  export interface DeleteOfferArgs {
    offerId: string;
  }
  
  export interface DeleteOfferResponse {
    deleted: boolean;
  }