
import DBConnection from "Utilities/DB/dbConn.utility";
import EmailVerifierDTO from "Models/EmailVerifierDTO";

export default class EmailVerifierDAO{
    
    private static _collectionName : string = 'email-verifier-stash';

    public static async getEmailVerificationToken(userEmailId : string) : Promise<EmailVerifierDTO>{
        try{
            let dbToken = await DBConnection.getDb().collection(this._collectionName).findOne({emailId : userEmailId});
            let tokenDTO : EmailVerifierDTO;
            if(!dbToken){
                tokenDTO = new EmailVerifierDTO({});
                return tokenDTO;
            }
            tokenDTO = new EmailVerifierDTO({emailId : dbToken.emailId, token : dbToken.token, tokenDate : dbToken.tokenDate});
            return tokenDTO;
        }
        catch(err){
            console.log('')
            console.log(err);
            throw(err);
        }
    }

    public static async setEmailVerificationToken(tokenObject : EmailVerifierDTO) : Promise<boolean>{
        try{
            await DBConnection.getDb().collection(this._collectionName).insertOne(tokenObject);
            return true;
        }
        catch(err){
            console.log('Error at setEmailVerificationToken() -> ');
            console.log(err);
            throw(err);
        }
    }

}
