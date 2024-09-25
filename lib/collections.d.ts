import { Magisat } from './magisat';
import { ListingsResponse, TagsResponse } from './types';
export declare class Collection extends Magisat {
    constructor();
    getAllCollections(params: {
        offset: number;
        limit: number;
        beforeTime?: string;
        sortBy?: string;
    }): Promise<TagsResponse>;
    getCollectionOffers({ slug }: {
        slug: string;
    }): Promise<ListingsResponse>;
    getCollectionFloorPriceHistory(collectionId: string, offset: number, limit: number, timeOrder: "ASC" | "DESC"): Promise<import("./types").TagFloorPriceHistoryResponse[]>;
}
