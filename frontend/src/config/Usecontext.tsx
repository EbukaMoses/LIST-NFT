// context/createContext.js
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
// import { useAccount, useConnect } from 'wagmi';
import type { Connector } from 'wagmi';
import { useAccount, useConnectors, useConnect, useDisconnect, useSwitchChain, useBalance } from 'wagmi'


interface ContextValue {
    address: `0x${string}` | undefined;
    connectors: readonly Connector[];
    connect: any;
    isPending: boolean;
}

const context = createContext<ContextValue | undefined>(undefined);

interface ContextApiProps {
    children: ReactNode;
}

export const ContextApi = ({ children }: ContextApiProps) => {
    const { address, isConnected } = useAccount();
    const { connectors, connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();

    const { data } = useBalance({
        address,
        chainId: 1, // Optional: defaults to mainnet
        watch: true, // Optional: auto-refreshes on new blocks
    });

    const value = {
        connectors,
        connect,
        isPending,
        disconnect,
        address,
        isConnected,
        data,
    };

    return <context.Provider value={value}>{children}</context.Provider>;
};

export const contextconfig = () => {
    return useContext(context);
};
