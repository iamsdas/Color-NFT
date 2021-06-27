// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721Enumerable {
    string[] public colors;
    mapping(string => bool) color_exists;

    constructor() ERC721("Color", "COL") {}

    function mint(string memory _color) public {
        require(!color_exists[_color], "color exists!");

        colors.push(_color);
        uint256 id = colors.length - 1;
        _mint(msg.sender, id);
        color_exists[_color] = true;
    }
}
