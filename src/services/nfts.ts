import { User } from "@models/User";
import { walletsService } from "./wallets";
import { openSeaApi } from "@utils/openSeaApi";

function initService() {
  // This is obviously not the best way to implement this as there's no separation of concerns.
  // However, this is a mock API so it's a good enough solution.
  const formatAsset = (asset: any, user: User) => {
    const { owner, creator } = asset;

    const isOwner = !!walletsService.getUserWallet(user.id, owner.address);
    const isCreator = !!walletsService.getUserWallet(user.id, creator.address);

    return {
      ...asset,
      owner: {
        ...owner,
        real_user: isOwner ? user : null,
      },
      creator: {
        ...creator,
        real_user: isCreator ? user : null,
      },
    };
  };

  return {
    getOne: async (contractAddress: string, tokenId: string, user: User) => {
      const url = `/asset/${contractAddress}/${tokenId}`;

      const { data: asset } = await openSeaApi.get(url);

      return formatAsset(asset, user);
    },
    getAllForCollection: async (collection: string, user: User) => {
      const url = `/assets?collection=${collection}`;

      const { data } = await openSeaApi.get(url);

      return {
        ...data,
        assets: data.assets.map((a: any) => formatAsset(a, user)),
      };
    },
  };
}

export const nftsService = initService();
