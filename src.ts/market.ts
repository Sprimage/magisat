import { Magisat } from './magisat';
import { ListingsResponse } from './types';

export class Market extends Magisat {
  constructor() {
    super();
  }

  async getActiveCollectionOffers({slug, offset = 0, limit = 50}:{slug: string, offset?: number, limit?: number}): Promise<ListingsResponse> {
    const collectionId = await this.getTagIdBySlug({slug});
    const listings = await this.getListings({ offset, limit, tagId: collectionId.id });
    return {
      ...listings,
      results: listings.results.filter(listing => listing.status === "DECORATED")
    };
  }


  
}
