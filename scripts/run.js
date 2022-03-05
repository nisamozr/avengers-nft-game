const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory("EpicGame");
    const gameContract = await gameContractFactory.deploy(                        
        ["Chevrolet Camaro", "classic muscle", "contessa classic", "car craft"],       
        ["QmRxfJF933aN2yxngHswVwMz1QmEjbzJHdZ7Kn7xsp1UA7", 
        "QmQ7CZrNhbF5uiQGwYN9YE4bByGoVLHa2W4Uwymf6akG1W", 
        "Qmd2iYmcdLKVB4J7PtiLTFfa4YsrXeGucXe6cc1x1Jbxs8",
        "Qme92siKe97nQqYhmmWNSLFyLqwxMv3o5qusX9RUHaDngF"],
        [200, 200, 200,200],                    
        [50, 50,50, 25],
        "Cyber Truck",
        "QmRm5yid8PJ5dZPPBYDo9cJEeSKKk9EoPdJrQsWEk4FVUJ",
        2000,
        50
      );
    
    await gameContract.deployed();
    console.log("contact address", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
runMain();