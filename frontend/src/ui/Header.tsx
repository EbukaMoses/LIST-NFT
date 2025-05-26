// import { Button } from 'flowbite-react'
import { LuCloudUpload } from 'react-icons/lu'
import Button from './Button'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom"
import ModalNFT from './ModalNft';
import Modal from './Modal';
import { IoCloseSharp } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';
import { contextconfig } from "../config/Usecontext";
import { config } from '../config/Config';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';



const Nav = [
    { title: "Market", path: "/" },
    { title: "My NFT", path: "/mtnft" },
    // { title: "How it Works", path: "/work" },
    // { title: "Rewards", path: "/reward" },
]

const Header = () => {

    const [form, setForm] = useState(false);
    const [modal, setModal] = useState(false);
    const [menu, setMenu] = useState(false);
    const [discountBtn, setDiscountBtn] = useState(false)

    const chainId = config?.chains[0]?.id;

    const contextValue = contextconfig();
    if (!contextValue) return null;
    const { address, disconnect, connect, isConnected, data } = contextValue;

    const handleModal = () => {
        setModal((prev) => !prev)
        console.log(chainId)
    }
    const handleMenu = () => {
        setMenu((prev) => !prev)
    }

    const openForm = () => {
        setForm(prev => !prev);
    }

    const handleCopy = async () => {
        try {

            if (address) {
                await navigator.clipboard.writeText(address);
                toast.success("Address Copied!");

            }
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        setDiscountBtn(prev => !prev)
        toast.success("You are Disconnected!");
    }



    return (
        <section className="bg-[#162328] shadow-lg">
            <div className="py-5 flex items-center justify-between px-10">
                <h1 className='text-2xl text-white font-extrabold'>NFT MARKET</h1>

                {/* nav  */}
                <div className={menu ? "flex flex-col items-center justify-center gap-10 py-8 absolute right-0 top-[100%] bg-[#2c1d50]  w-full" : "hidden lg:flex gap-6"}>
                    {Nav.map(({ title, path }) => (
                        <Link to={path} className='text-white'>{title}</Link>
                    ))}
                </div>
                {/* <Button>Hello</Button> */}
                <div className='flex items-center justify-center gap-5'>

                    {isConnected && <Button title="Upload NFT" icon={<LuCloudUpload />} path="" className="bg-green-500 text-white flex items-center gap-1" onClick={openForm} />}



                    {isConnected && (<div className="relative">
                        <span className="flex whitespace-nowrap gap-1 text-md font-bold lg:font-semibold items-center capitalize border-0 rounded-lg py-2 px-4 bg-gradient-to-b from-red-500 via-red-600 to-red-700 text-white flex items-center gap-1 cursor-pointer" onClick={() => setDiscountBtn(prev => !prev)}>
                            {address && `${address.slice(0, 6)}...${address.slice(-4)}`} <span className="text-3xl">{!discountBtn ? <MdArrowDropDown /> : <MdArrowDropUp />}</span>
                        </span>
                        {discountBtn && <div className="absolute !z-20 w-40 top-[48px] rounded-md right-0 flex flex-col py-3 bg-white shadow-md">
                            <span className='text-sm text-green-500 py-2 px-3 hover:bg-[#e6e6e6]'><strong>Bal:</strong> {data?.formatted ? Number(data.formatted).toFixed(6) : '0'} {data?.symbol}</span>

                            <span className='text-sm py-2 px-3 hover:bg-[#e6e6e6] cursor-pointer' onClick={() => {
                                handleCopy();
                                setDiscountBtn(prev => !prev);
                            }}>{address && `${address.slice(0, 9)}...${address.slice(-6)}`}</span>

                            <span className='cursor-pointer py-2 px-3 hover:bg-red-500 text-red-500 hover:text-white flex items-center gap-2 font-bold' onClick={handleDisconnect}> <RiLogoutCircleRLine className='font-bold' /> Disconnect</span>
                        </div>}

                    </div>)}

                    {/* {isConnected && <Button title={`Disconnect Wallet ${address && `${address.slice(0, 6)}...${address.slice(-4)}`}`} icon="" path="" className="from-red-500 via-red-500 to-red-900 bg-gradient-to-r border-0 text-white" onClick={() => disconnect()} />} */}


                    {!isConnected && <Button title="Connect Wallet" icon="" path="" className="from-red-500 via-yellow-500 to-blue-500 bg-gradient-to-r border-0 text-white" onClick={handleModal} />}


                </div>
                {menu ? (
                    <IoCloseSharp className='text-white text-3xl cursor-pointer block lg:hidden' onClick={handleMenu} />
                ) : (
                    <HiMenu className='text-white text-3xl cursor-pointer lg:hidden block' onClick={handleMenu} />
                )}
            </div>
            {form && <ModalNFT onClick={openForm} />}
            {modal && <Modal handleModal={handleModal} />}
        </section>
    )
}

export default Header
