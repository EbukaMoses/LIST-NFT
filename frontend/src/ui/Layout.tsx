import { Toaster } from "react-hot-toast";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from "./Header";
import Footer from "./Footer";
import { config } from "../config/Config";
import { ContextApi } from "../config/Usecontext";

const queryClient = new QueryClient()

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#e6e6e6]">
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <ContextApi>
                        <Header />
                        {children}
                        <Footer />
                    </ContextApi>
                </QueryClientProvider>
            </WagmiProvider>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                toastOptions={{
                    style: {
                        backgroundColor: "black",
                        color: "white",
                    },
                }}
            />
        </div >
    );
};

export default Layout;