import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { IoClose } from 'react-icons/io5';
import Button from './Button';
import { LuCloudUpload } from 'react-icons/lu';

interface ModalNFTProps {
    onClick: () => void;
}

const ModalNFT = ({ onClick }: ModalNFTProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClick}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] py-6 lg:w-[50%] flex flex-col justify-center p-2 lg:p-8 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <span onClick={onClick} className="text-lg font-bold mb-4 cursor-pointer absolute top-3 right-5 !z-[999]"><IoClose className="text-2xl text-purple-950 font-extrabold" /></span>
                <div className="flex flex-col lg:flex-row">


                    {/* left side  */}
                    <div className="w-full flex flex-col items-center justify-center  lg:w-[40%] border-r-2 border-gray-300 px-4 lg:pr-10">
                        {previewUrl && <img src={previewUrl} className='rounded-md shadow-md w-full h-full' alt="" />}
                        {!previewUrl && <input type="file" className='mx-auto' onChange={handleFileChange} />}
                    </div>
                    {/* right side  */}
                    <div className="w-full lg:w-[60%] px-6 gap-20 hidden lg:flex flex-col  justify-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">Upload Your NFT</h2>
                            <input
                                type="text"
                                placeholder="Enter your NFT Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-none"
                            />

                            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-xs focus:outline-none" placeholder='NFT Description' rows={5}></textarea>

                            <Button title="Upload NFT" icon={<LuCloudUpload />} path="" className="bg-blue-500 text-white flex items-center gap-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNFT;
