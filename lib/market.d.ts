import { Magisat } from './magisat';
import { ListingsResponse } from './types';
export declare class Market extends Magisat {
    constructor();
    getActiveCollectionOffers({ slug, offset, limit }: {
        slug: string;
        offset?: number;
        limit?: number;
    }): Promise<ListingsResponse>;
}
