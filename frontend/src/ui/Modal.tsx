import { contextconfig } from "../config/Usecontext";
import m1 from "/m1.svg"
import m2 from "/m1.svg"
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import type { Connector } from 'wagmi';

interface ModalProps {
    handleModal: () => void;
}

const Modal = ({ handleModal }: ModalProps) => {


    const contextValue = contextconfig();
    if (!contextValue) return null;
    const { connectors, connect, data, switchChain, chainID } = contextValue;

    const handleConnect = async (connector: Connector) => {
        // alert(`ChainID: ${chainID}, Data ChainId: ${data}`);
        try {
            if (chainID != 4202) {
                toast.error("You are not connected to Chain");
                if (switchChain) switchChain(chainID);
                return;
            }

            await connect({ connector });



        } catch (err) {
            toast.error('Connection failed');
            console.error(err);
        }
    };


    return (
        // modal overlay 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 " onClick={handleModal}>
            {/* main modal  */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] py-6 lg:w-[50%] flex flex-col  justify-center p-2 lg:p-8 rounded-lg shadow-lg">
                {/* close modal button  */}
                <span onClick={handleModal} className="text-lg font-bold mb-4 cursor-pointer absolute top-3 right-5"><IoClose className="text-2xl !z-50 text-purple-950 font-extrabold" /></span>
                <div className="flex flex-col lg:flex-row">
                    {/* left side  */}
                    <div className="w-full flex flex-col items-center justify-center lg:w-[40%] border-r-2 border-gray-300 px-4 lg:pr-10">
                        <h2 className="text-lg font-bold ">Connect a Wallet</h2>
                        <h6 className="text-sm text-blue-500 font-semibold mb-10">Installed</h6>

                        {/* List/map of available wallets on the browser */}
                        <div className='flex flex-col gap-6 mb-10'>
                            <div className="flex flex-col gap-2">
                                {connectors.map((connector: any) => (
                                    <button key={connector.id} onClick={() => handleConnect(connector)} className='flex items-center gap-2 px-4 py-2 hover:bg-[#e6e6e6] hover:shadow-2xl border-white text-black font-semibold'>
                                        <img src={connector.icon} className="w-6 h-6" alt="" />  {connector.name}

                                    </button>
                                ))}
                            </div>
                            <button onClick={handleModal} className='mb-5 lg:mb-24 px-4 py-2 bg-[#781515] rounded-lg  shadow-2xl  text-white font-bold'>Cancel Connect</button>
                        </div>
                        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Connect with MetaMask
                </button> */}
                    </div>
                    {/* right side  */}
                    <div className="w-full lg:w-[60%] px-12 gap-20 hidden  lg:flex flex-col items-center justify-center">
                        <div className=" flex flex-col items-center justify-center">
                            <h2 className="text-lg font-bold">What is a Wallet?</h2>
                            <div className="flex items-center gap-4 mb-10 justify-center">
                                <img src={m1} className="w-10 h-10" alt="" />
                                <div>
                                    <h4 className="text-md font-bold">A Home for your Digital Assets</h4>
                                    <p>Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-center">
                                <img src={m2} className="w-10 h-10" alt="" />
                                <div>
                                    <h4 className="text-md font-bold">A New Way to Log In</h4>
                                    <p>Instead of creating new accounts and passwords on every website, just connect your wallet.</p>
                                </div>
                            </div>
                        </div>
                        {/* <img src={img} alt="" className="w-[80%]" /> */}
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Get a Wallet
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal
