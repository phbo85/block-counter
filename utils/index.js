import ERC20ABI from '../abi/ERC20.abi.json';

export const NetworkConfig = {
  137: {
    explorer: 'https://api.polygonscan.com',
    rpc: 'https://polygon-rpc.com/',
    abi: ERC20ABI,
    symbol: 'MATIC',
    color: 'purple',
    logo: '/polygon-logo.png',
    stable: {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
    },
  },
  43114: {
    explorer: 'TODO',
    rpc: 'https://api.avax.network/ext/bc/C/rpc',
    abi: ERC20ABI,
    symbol: 'AVAX',
    color: 'red',
    logo: '/avax-logo.png',
    stable: {
      address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
      name: 'Tether',
      symbol: 'USDT',
      decimals: 6,
    },
  },
};

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str;

// export const fetcher = (library: Web3Provider, abi?: any) => (...args) => {
//   const [arg1, arg2, ...params] = args
//   // it's a contract
//   if (isAddress(arg1)) {
//     const address = arg1
//     const method = arg2
//     const contract = new Contract(address, abi, library.getSigner())
//     return contract[method](...params)
//   }
//   // it's a eth call
//   const method = arg1
//   return library[method](arg2, ...params)
// }
