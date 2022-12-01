const { ethers } = require("ethers");
const ABI = require('./NFTCollectivePurchase.json');
const config = require('./config.json');

let contractAddress = config.contractAddress;

async function sellLot(_contractAddress) {
    const provider = new ethers.providers.InfuraProvider('goerli','8b8bea9fc9ec46ec9762b9fc5e385212 ');
    let wallet = new ethers.Wallet(config.privateKey,provider);
    const contract = new ethers.Contract(_contractAddress,ABI.abi,wallet);
    console.log(await contract.ORACLE_ADDRESS());

    let markeplaceId = ethers.utils.formatBytes32String('OPNS').substring(0,10);

    let sellLot = await contract.sellLot(
        markeplaceId,
        '46349',
        {
            tokenAddress:'0x0000000000000000000000000000000000000000',
            decimals:'18',
            price:'40000000000000000',
            collected:'0',
            occupancy:'0',
            tokenContractAddress:"0x80376c9363Cd51009F1c0397A1c6fD011cd7BBfd",
            tokenId:"15",
            tokenAmount:"0",
            status:'0',
        },
        '0x9bddf7205abd7f9e1b79e16985536dcac8a8ce3b4f8c129fc918f7efb1e1378e00c8380dd72730cc6b9f153ea654d874f281dc12374e0fb97c453ac29a3f020f1c',
        {gasLimit:'300000'}
    );
    console.log(sellLot);
}

sellLot(contractAddress);