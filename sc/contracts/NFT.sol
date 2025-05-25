// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NFT {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // ---------ERC721-----------
    uint256 private tokenId;
    string private _baseURI;
    mapping(uint256 => address) private _ownerOf;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        totalSupply = 0;
    }

    event Mint(address indexed to, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );
    event NftMinted(address indexed to, uint256 tokenId);

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function transfer(
        address to,
        uint256 amount
    ) public returns (bool success) {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Invalid amount");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        success = true;
        emit Transfer(msg.sender, to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool success) {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Invalid amount");
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(
            allowance[from][msg.sender] >= amount,
            "Insufficient allowance"
        );
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        success = true;
        emit Transfer(from, to, amount);
    }

    function approve(
        address spender,
        uint256 amount
    ) public returns (bool success) {
        require(spender != address(0), "Invalid address");
        require(amount > 0, "Invalid amount");
        allowance[msg.sender][spender] = amount;
        success = true;
        emit Approval(msg.sender, spender, amount);
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Invalid amount");
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Mint(to, amount);
    }

    function rewardCreator(address to, uint256 amount) internal {
        _mint(to, amount);
    }

    // ERC721---------
    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        require(_ownerOf[_tokenId] != address(0), "Token does not exist");
        string memory base = getBaseURI();
        return
            bytes(base).length > 0
                ? string.concat(base, _toString(_tokenId))
                : "";
    }

    function setBaseURI(string memory newBaseURI) public {
        _baseURI = newBaseURI;
    }

    function getBaseURI() internal view returns (string memory) {
        return _baseURI;
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        require(_ownerOf[_tokenId] != address(0), "Token does not exist");
        return _ownerOf[_tokenId];
    }

    function _mintNft(address to) public {
        require(to != address(0), "Invalid Address");
        uint256 id = tokenId;
        _ownerOf[id] = to;
        rewardCreator(to, 1e9);
        tokenId++;
        emit NftMinted(to, id);
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
