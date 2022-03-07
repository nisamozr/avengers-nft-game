const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("EpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Iron Man ", "Captain America", "Hulk", "Thor","Doctor Strange", "Black Panther"],
    [
      "https://www.redwolf.in/image/catalog/designer-Images/themes/iron-man-artist-image.png", 
      "https://wallpapercave.com/wp/wp1808958.jpg",
      "https://wallpapercave.com/wp/xFMDu2w.jpg",
      "https://cdn.wionews.com/sites/default/files/2021/01/22/179571-8.jpg",
      "https://cdn.vox-cdn.com/thumbor/7K3uPy1iLOC4ovn73AY28U_-FGg=/0x0:1920x1079/1200x800/filters:focal(1085x298:1391x604)/cdn.vox-cdn.com/uploads/chorus_image/image/64773806/ply_dr_strange_graded.0.jpg",
      "https://www.sideshow.com/product-asset/910233"
    ],
    [200, 200, 300,200,200,2000],
    [25, 25, 50,25, 25,25],
    "Thanos",
    "https://wallpapercave.com/wp/wp4295149.jpg",
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