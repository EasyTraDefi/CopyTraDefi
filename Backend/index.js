import { Helius } from "helius-sdk";
import { config } from "dotenv";

config();

const HELIUS_URL = process.env.HELIUS_API;


const helius = new Helius(HELIUS_URL);


const getAssetsByOwner = async () => {
    const response = await helius.rpc.getAssetsByOwner({
        ownerAddress: "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
        page: 1,
    });
    console.log(response.items);
}

getAssetsByOwner();