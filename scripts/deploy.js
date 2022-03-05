const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("EpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Bojack", "Princess carolyn", "Mr Peanut butter"],
    [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5XchwUGs75xIyfJ5XJsemrOVM_DdJna9rw9PtEuEA3GMkqWuKI004sW-JCQequI6e_g&usqp=CAU", // Images
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTv35ki3PrwK3ikMDMBZ15dZY3LyEB3eWseyh8epi_1RCXEpekqGFSE4kfKzqZ-MLkCdQ&usqp=CAU",
      "https://i.pinimg.com/474x/bf/0f/19/bf0f19dc0c6893fba26d8307dcfbef85--bojack-animation-character.jpg",
    ],
    [100, 200, 300],
    [100, 50, 25],
    "Beatrice Horseman",
    "https://static.wikia.nocookie.net/villains/images/2/21/Beatrice_Horseman_Now.png/revision/latest?cb=20200725032320",
    10000,
    50
  );
  await gameContract.deployed();
  console.log("contract deployed to:", gameContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();