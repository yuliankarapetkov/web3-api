// mockDB
function initDatabase() {
  const walletMap: Map<string, { address: string; chainId: number }> = new Map(
    []
  );

  const getAll = () => {
    return [...walletMap.values()];
  };

  const getOne = (address: string) => {
    return walletMap.get(address.toLowerCase());
  };

  const add = (address: string, chainId: number) => {
    walletMap.set(address.toLowerCase(), { address, chainId });
  };

  const remove = (address: string) => {
    walletMap.delete(address.toLowerCase());
  };

  return {
    getAll,
    getOne,
    add,
    remove,
  };
}

const db = initDatabase();

interface Wallet {
  address: string;
  chainId: number;
}

// Ignore the userId as it is a mock
export const walletsService = {
  getUserWallets: (userId: string) => db.getAll(),
  getUserWallet: (userId: string, address: string) => db.getOne(address),
  addUserWallet: (userId: string, wallet: Wallet) =>
    db.add(wallet.address, wallet.chainId),
  removeUserWallet: (userId: string, address: string) => db.remove(address),
};
