import { http, createConfig } from 'wagmi'
import { liskSepolia } from 'wagmi/chains'

export const config = createConfig({
    chains: [liskSepolia],
    transports: {
        [liskSepolia.id]: http(),
    },
})