const { ethers } = require("ethers");
const ABI = require('./NFTCollectivePurchase.json');
const config = require('./config.json');

let contractAddress = config.contractAddress;

async function buyLot(_contractAddress) {
    const provider = new ethers.providers.InfuraProvider('goerli','8b8bea9fc9ec46ec9762b9fc5e385212 ');
    let wallet = new ethers.Wallet(config.privateKey,provider);
    const contract = new ethers.Contract(_contractAddress,ABI.abi,wallet);
    console.log(await contract.ORACLE_ADDRESS());

    let markeplaceId = ethers.utils.formatBytes32String('OPNS').substring(0,10);

    let buyLot = await contract.buyLot(
        markeplaceId,
        '36419',
        '30000000000000',
        {
            tokenAddress:'0x0000000000000000000000000000000000000000',
            decimals:'18',
            price:'300000000000000',
            collected:'0',
            occupancy:'0',
            tokenContractAddress:"0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b",
            tokenId:"838945",
            tokenAmount:"0",
            status:'0',
        },
        "0x00000000000000000000000000000000000000000000000000000000000000400000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000d7383c3c94a1e2f1224ec54b06db9fae5352d375000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000632cec290000000000000000000000000000000000000000000000000000000063a385193000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ef18d8bed01e20ff0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000f5de760f2e916647fd766b4ad9e85ff943ce3a2b00000000000000000000000000000000000000000000000000000000000ccd2100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010a06f698c80000000000000000000000000000000000000000000000000000010a06f698c800000000000000000000000000d7383c3c94a1e2f1224ec54b06db9fae5352d375000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006d23ad5f800000000000000000000000000000000000000000000000000000006d23ad5f8000000000000000000000000000000a26b00c1f0df003000390027140000faa7190000000000000000000000000000000000000000000000000000000000000040c1875cd81bc123f280c4d77dd9560c300b949d9ec0206dcf82019bd17687c2cb173ce4c42835110ca23ff65506b20baceb3d0377f8322cb4a61eeb5107b397eb",
        '0xdcfe7f75ac08899d45947c86ed4dc97524517fdb834f6e6bc7182d43d4aa40bf02e98a7ac57fbdaef34e4ff1aa2d7fe2dd663e0a69120d9c918dc7db728bfb941c',
        {value:'30000000000000',gasLimit:'1000000'}
    );
    console.log(buyLot);
}

buyLot(contractAddress);