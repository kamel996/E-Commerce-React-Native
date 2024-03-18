import { config } from "dotenv";
import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres";
import {migrate} from "drizzle-orm/postgres-js/migrator"

if(process.env.NODE_ENV === "production"){
    console.log('running on production mode');
    config({path: '.prod.env'});
}else{
    console.log('running on development mode');
    config({path: '.dev.env'});
}

const {DATABASE_URL} = process.env;

const databaseUrl = drizzle(postgres(DATABASE_URL!, {ssl: 'require', max: 1}));

const main = async () => {
    try {
        await migrate(databaseUrl, {migrationsFolder: 'drizzle'});
        console.log("migration successful");
    } catch (error) {
        console.log(error)
    }
    process.exit(0);
};

main();

