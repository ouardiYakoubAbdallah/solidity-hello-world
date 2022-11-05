// Import Requirements
const { ethers, network } = require('hardhat');
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

// Get ENV Vars
const API_KEY = process.env.API_KEY;
const CONTARCT_ADDRESS = process.env.CONTARCT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider('goerli', API_KEY);

// Signer - The User (me/you)
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract Instance
const helloWorldContract = new ethers.Contract(
    CONTARCT_ADDRESS,
    contract.abi,
    signer
);

async function main() {
    const message = await helloWorldContract.message();
    console.log('The message is: ' + message);

    console.info('Updating the message...');
    const tran = await helloWorldContract.update('New message after update !');
    await tran.wait();

    const newMessage = await helloWorldContract.message();
    console.log('The new message is: ' + newMessage);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
