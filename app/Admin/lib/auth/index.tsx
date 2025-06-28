import { signinREQUEST } from "../server/server";

export class User {
    // constructor() {
        
    // }

    static async isAuthenticated(){
        // return user sessioned data

    }

    async login(data:any){
        let transaction;
        transaction = await signinREQUEST(data)
        console.log(transaction);
        
    }

}