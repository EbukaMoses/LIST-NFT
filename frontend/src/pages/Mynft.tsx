import { contextconfig } from "../config/Usecontext";
import Container from "../ui/Container";
import Nftcard from "../ui/Nftcard";


const Mynft = () => {

    const contextValue = contextconfig();
    if (!contextValue) return null;
    const { address, isConnected } = contextValue;


    return (
        <div>
            <div className="w-full bg-[#66A9B8] flex items-center justify-center py-10">
                <h1 className="text-2xl font-extrabold">NFT OWNED BY {address && `${address.slice(0, 6)}...${address.slice(-4)}`}</h1>
            </div>
            {isConnected ? <Container className="grid grid-cols-4 gap-4">
                {[...Array(20)].map((_, index) => (
                    <Nftcard key={index} />
                ))}
            </Container> : <div className="flex h-[50vh] bg-white items-center justify-center py-10 m-20 rounded-md shadow-md">
                <h1 className="text-3xl font-bold">Connect Wallet to see your NFT🚀🚀🚀!</h1>
            </div>}

        </div>
    )
}

export default Mynft
