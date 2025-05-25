// import { Button } from 'flowbite-react'
import { LuCloudUpload } from 'react-icons/lu'
import Button from './Button'
import { useState } from 'react'
import { Link } from "react-router-dom"
import ModalNFT from './ModalNft';
import Modal from './Modal';
import { IoCloseSharp } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';
import { contextconfig } from "../config/Usecontext";


const Nav = [
    { title: "Market", path: "/strtcamp" },
    { title: "My NFT", path: "/expcam" },
    // { title: "How it Works", path: "/work" },
    // { title: "Rewards", path: "/reward" },
]

const Header = () => {

    const [form, setForm] = useState(false);
    const [modal, setModal] = useState(false);
    const [menu, setMenu] = useState(false);

    const contextValue = contextconfig();
    if (!contextValue) return null;
    const { address, disconnect, connect, isConnected, data } = contextValue;

    const handleModal = () => {
        setModal((prev) => !prev)
    }
    const handleMenu = () => {
        setMenu((prev) => !prev)
    }

    const openForm = () => {
        setForm(prev => !prev);
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
                    Balance: {data?.formatted} {data?.symbol}

                    {isConnected && <Button title="Upload NFT" icon={<LuCloudUpload />} path="" className="bg-blue-500 text-white flex items-center gap-1" onClick={openForm} />}


                    {isConnected && <Button title={`Disconnect Wallet ${address && `${address.slice(0, 6)}...${address.slice(-4)}`}`} icon="" path="" className="from-red-500 via-red-500 to-red-900 bg-gradient-to-r border-0 text-white" onClick={() => disconnect()} />}


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
