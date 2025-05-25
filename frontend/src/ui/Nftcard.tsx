import nft from "/nft.jpg"

const Nftcard = () => {
    return (
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 p-4">
            <img className="w-full rounded-xl" src={nft} alt="NFT Image" />
            <div className="pt-4">
                <h2 className="text-xl font-semibold text-gray-800">CyberPunk #123</h2>
                <p className="text-gray-600 text-sm mt-1">A unique collectible from the CyberPunk collection.</p>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <img src={nft} className="w-8 h-8 rounded-full" alt="Creator avatar" />
                        <span className="text-sm text-gray-700">by <strong>0xCreator</strong></span>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-xs">Price</p>
                        <p className="text-sm font-bold text-indigo-600">0.25 ETH</p>
                    </div>
                </div>

                <button className="mt-5 w-full from-red-500 via-yellow-500 to-blue-500 bg-gradient-to-r text-white py-2 rounded-md hover:border-white transition">
                    Buy Now
                </button>
            </div>
        </div>

    )
}

export default Nftcard
