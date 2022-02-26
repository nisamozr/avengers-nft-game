// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./libraries/Base64.sol";

import "hardhat/console.sol";

contract EpicGame is ERC721 {
    struct CharacterAttributes {
        uint256 characterIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
    }
    

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    CharacterAttributes[] defaultCharacter;
    // to get Nft attribute
    mapping(uint256 => CharacterAttributes) public NftAttributes;

    mapping(address => uint256) public nftHolder;

    constructor(
        string[] memory characterName,
        string[] memory characterImageri,
        uint256[] memory characterHp,
        uint256[] memory characterAttackDamage
    ) ERC721("Heroes", "HERO") {
        for (uint256 i = 0; i < characterName.length; i++) {
            defaultCharacter.push(
                CharacterAttributes({
                    characterIndex: i,
                    name: characterName[i],
                    imageURI: characterImageri[i],
                    hp: characterHp[i],
                    maxHp: characterHp[i],
                    attackDamage: characterAttackDamage[i]
                })
            );
            CharacterAttributes memory c = defaultCharacter[i];
            console.log(
                "Done , name: %s w/ HP: %s w/ img: %s w/ ",
                c.name,
                c.hp,
                c.imageURI
            );
        }
        _tokenId.increment();
    }

    function mintCharacterNFT(uint256 _characterIndex) external {
        uint256 newItemId = _tokenId.current();

        _safeMint(msg.sender, newItemId);
        NftAttributes[newItemId] = CharacterAttributes({
            characterIndex: newItemId,
            name: defaultCharacter[_characterIndex].name,
            imageURI: defaultCharacter[_characterIndex].imageURI,
            hp: defaultCharacter[_characterIndex].hp,
            maxHp: defaultCharacter[_characterIndex].maxHp,
            attackDamage: defaultCharacter[_characterIndex].attackDamage
        });
        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            newItemId,
            _characterIndex
        );

        nftHolder[msg.sender] = newItemId;

        _tokenId.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        CharacterAttributes memory charAttributes = NftAttributes[
            _tokenId
        ];

        string memory strHp = Strings.toString(charAttributes.hp);
        string memory strMaxHp = Strings.toString(charAttributes.maxHp);
        string memory strAttackDamage = Strings.toString(
            charAttributes.attackDamage
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                charAttributes.name,
                " -- NFT #: ",
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
                charAttributes.imageURI,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',
                strHp,
                ', "max_value":',
                strMaxHp,
                '}, { "trait_type": "Attack Damage", "value": ',
                strAttackDamage,
                "} ]}"
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
