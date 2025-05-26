import { http, createConfig } from 'wagmi'
import { liskSepolia } from 'wagmi/chains'

export const config = createConfig({
    chains: [liskSepolia],
    multiInjectedProviderDiscovery: true,
    transports: {
        [liskSepolia.id]: http("https://rpc.sepolia-api.lisk.com"),
    },
})