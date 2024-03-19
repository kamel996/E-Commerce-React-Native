import express from "express";
import dotenv from "dotenv";


if(process.env.NODE_ENV === "production"){
    console.log('running on production mode');
    dotenv.config({path: '.prod.env'});
}else{
    console.log('running on development mode');
    dotenv.config({path: '.dev.env'});
}

const {PORT} = process.env;

const app = express();

app.use(express.json());

import shopRouter from "./shop";

app.use(shopRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});