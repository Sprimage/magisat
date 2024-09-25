import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { constructUrl, logServerOperation } from "./utils";
import "dotenv/config";
import {
  TagsResponse,
  TagFloorPriceHistoryResponse,
  TagIdInfo,
  GetListingsArgs,
  ListingsResponse,
  RbfListingsResponse,
  PsbtBulkListingsArgs,
  NewBulkListingArgs,
  NewBulkListingResponse,
  DeleteListingResponse,
  PreparedPsbtResponse,
  PreparedMessageArgs,
  BroadcastPreparedMessageResponse,
  PsbtBuyingBulkArgs,
  BuyingPsbtResponse,
  BulkBuyingArgs,
  BulkBuyingResponse,
  PendingBuyingsResponse,
  PsbtOfferCreateArgs,
  PsbtOfferCreateResponse,
  PsbtOfferAcceptArgs,
  PsbtOfferAcceptResponse,
  OfferCreateArgs,
  OfferCreateResponse,
  OfferAcceptArgs,
  OfferAcceptResponse,
  OfferListArgs,
  OfferListResponse,
  DeleteOfferArgs,
  DeleteOfferResponse,
  FeeRateTier
} from './types';

export class Magisat {
  private apiUrl: string = "https://api.magisat.io";
  private testnetUrl: string = "https://api.magisat.io";
  private signetUrl: string = "https://api.magisat.io";
  private network: string;
  private client: AxiosInstance;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.MAGISAT_API_KEY || "";
    this.network = process.env.NETWORK_ENV || "mainnet";
    this.client = axios.create({
      baseURL: this.getUrl(this.network),
      headers: {
        "X-MGST-API-KEY": this.apiKey,
      },
    });
  }

  getUrl(network: string) {
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

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client(config);
      return response.data;
    } catch (error) {
      logServerOperation("An error occurred while making request", error);
      throw error;
    }
  }

  async getTags(params?: { isCategory?: string; beforeTime?: string; includeIsVirtual?: string }): Promise<TagsResponse> {
    return this.request<TagsResponse>({ method: "GET", url: "/external/v1/tag", params });
  }

  async getTagFloorPriceHistory(tagId: string, offset: number, limit: number, timeOrder: "ASC" | "DESC"): Promise<TagFloorPriceHistoryResponse[]> {
    return this.request<TagFloorPriceHistoryResponse[]>({
      method: "GET",
      url: "/external/v1/tag/history",
      params: { tagId, offset, limit, timeOrder },
    });
  }

  async getTagIdBySlug({slug}:{slug: string}): Promise<TagIdInfo> {
    return this.request<TagIdInfo>({ method: "GET", url: `/external/v1/tag/${slug}` });
  }

  async getCollections(params: { offset: number; limit: number; beforeTime?: string; sortBy?: string }): Promise<TagsResponse> {
    return this.request<TagsResponse>({ method: "GET", url: "/external/v1/collections", params });
  }

  // Listing
  async getListings(data: GetListingsArgs): Promise<ListingsResponse> {
    return this.request<ListingsResponse>({ method: "POST", url: "/external/v1/listing", data });
  }

  async getRbfListings(txId: string): Promise<RbfListingsResponse> {
    return this.request<RbfListingsResponse>({ method: "GET", url: `/external/v1/listing/rbf/${txId}` });
  }

  async getMessageForBulkListing(data: PsbtBulkListingsArgs): Promise<{ psbtHex: string; psbtBase64: string }> {
    return this.request<{ psbtHex: string; psbtBase64: string }>({ method: "POST", url: "/external/v1/psbt/listing", data });
  }

  async createNewListings(data: NewBulkListingArgs): Promise<NewBulkListingResponse> {
    return this.request<NewBulkListingResponse>({ method: "POST", url: "/external/v1/listing/bulk", data });
  }

  async deleteBulkListings(listingIds: string[]): Promise<DeleteListingResponse> {
    return this.request<DeleteListingResponse>({
      method: "DELETE",
      url: "/external/v1/listing/bulk",
      params: { listingIds: listingIds.join(",") },
    });
  }

  async getListingById(listingId: string): Promise<ListingsResponse> {
    return this.request<ListingsResponse>({ method: "GET", url: `/external/v1/listing/${listingId}` });
  }

  async deleteListing(listingId: string): Promise<DeleteListingResponse> {
    return this.request<DeleteListingResponse>({ method: "DELETE", url: `/external/v1/listing/${listingId}` });
  }

  async getPreparedMessageForBuying(params: {
    buyerAddress: string;
    buyerPublicKey: string;
    feeRateTier: FeeRateTier;
    feeRate?: number;
    listingIds: string[];
    optimizationLevel?: number;
    overrideDisableSpendables?: boolean;
  }): Promise<PreparedPsbtResponse> {
    return this.request<PreparedPsbtResponse>({
      method: "GET",
      url: "/external/v1/psbt/prepared",
      params: {
        ...params,
        listingIds: params.listingIds.join(","),
      },
    });
  }

  async postPreparedMessageForBuying(data: PreparedMessageArgs): Promise<BroadcastPreparedMessageResponse> {
    return this.request<BroadcastPreparedMessageResponse>({ method: "POST", url: "/external/v1/prepared", data });
  }

  async getBulkBuyingMessage(data: PsbtBuyingBulkArgs): Promise<BuyingPsbtResponse> {
    return this.request<BuyingPsbtResponse>({ method: "POST", url: "/external/v1/psbt/buying", data });
  }

  async postBulkBuyingMessage(data: BulkBuyingArgs): Promise<BulkBuyingResponse> {
    return this.request<BulkBuyingResponse>({ method: "POST", url: "/external/v1/buying/bulk", data });
  }

  async getPendingBuyingsForAddress(address: string): Promise<PendingBuyingsResponse> {
    return this.request<PendingBuyingsResponse>({ method: "GET", url: `/external/v1/buying/pending/${address}` });
  }

  async postPsbtOfferCreateMessage(data: PsbtOfferCreateArgs): Promise<PsbtOfferCreateResponse> {
    return this.request<PsbtOfferCreateResponse>({ method: "POST", url: "/external/v1/psbt/offer/create", data });
  }

  async postPsbtOfferAcceptMessage(data: PsbtOfferAcceptArgs): Promise<PsbtOfferAcceptResponse> {
    return this.request<PsbtOfferAcceptResponse>({ method: "POST", url: "/external/v1/psbt/offer/accept", data });
  }

  async createOffers(data: OfferCreateArgs): Promise<OfferCreateResponse> {
    return this.request<OfferCreateResponse>({ method: "POST", url: "/external/v1/offer", data });
  }

  async acceptOffers(data: OfferAcceptArgs): Promise<OfferAcceptResponse> {
    return this.request<OfferAcceptResponse>({ method: "POST", url: "/external/v1/offer/accept", data });
  }

  async listOffers(params: OfferListArgs): Promise<OfferListResponse> {
    return this.request<OfferListResponse>({ method: "GET", url: "/external/v1/offer", params });
  }

  async deleteOffers(data: DeleteOfferArgs[]): Promise<DeleteOfferResponse> {
    return this.request<DeleteOfferResponse>({ method: "DELETE", url: "/external/v1/offer", data });
  }
}