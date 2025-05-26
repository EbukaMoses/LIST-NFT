// context/createContext.js
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
// import { useAccount, useConnect } from 'wagmi';
import type { Connector } from 'wagmi';
import { useAccount, useConnectors, useChainId, useConnect, useDisconnect, useSwitchChain, useBalance } from 'wagmi'


interface ContextValue {
    address: `0x${string}` | undefined;
    connectors: readonly Connector[];
    connect: any;
    isPending: boolean;
    disconnect: () => void;
    isConnected: boolean;
    data: {
        formatted: string;
        symbol: string;
        chainId: number;
    } | undefined;
    switchChain: any;
    chainID: number | undefined;
}

const context = createContext<ContextValue | undefined>(undefined);

interface ContextApiProps {
    children: ReactNode;
}

export const ContextApi = ({ children }: ContextApiProps) => {
    const { address, isConnected } = useAccount();
    const chainID = useChainId();
    const { connectors, connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const { switchChain } = useSwitchChain();

    const { data } = useBalance({
        address,
        chainId: 4202, // Optional: defaults to mainnet
    });

    const value = {
        connectors,
        connect,
        isPending,
        disconnect,
        address,
        isConnected,
        data,
        switchChain,
        chainID,
    };

    return <context.Provider value={value}>{children}</context.Provider>;
};

export const contextconfig = () => {
    return useContext(context);
};
