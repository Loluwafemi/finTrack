import { verceldb, db as localdb, type dbInterface } from "../db";

const environment: "development" | "production" = process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log('environment:', environment);

let db:dbInterface;

switch (environment) {
    case 'production':
        try {
            if(await verceldb.query.user.findFirst()){
                db = verceldb
                console.log("cloud connection established Established");
            }else{
                throw new Error('Can not connect to the cloud: USER'); 
            }
        } catch (error) {
            
        }
    break;
    case 'development':

        db = localdb
        console.log("local connection established Established, Connecting locally:USER.");
    break;
}



export default db;