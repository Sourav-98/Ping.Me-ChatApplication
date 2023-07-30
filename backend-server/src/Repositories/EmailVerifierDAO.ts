
import DBConnection from "../Utilities/DB/dbConn.utility";
import EmailVerifierDTO from "../Models/EmailVerifierDTO";

export default class EmailVerifierDAO{
    
    private static _collectionName : string = 'email-verifier-stash';

    public static async getEmailVerificationToken(userEmailId : string) : Promise<EmailVerifierDTO | null>{
        try{
            let dbToken = await DBConnection.getDb().collection(this._collectionName).findOne({_emailId : userEmailId});
            let tokenDTO : EmailVerifierDTO;
            if(!dbToken){
                return null;
            }
            tokenDTO = new EmailVerifierDTO({emailId : dbToken._emailId, token : dbToken._token, tokenDate : dbToken._tokenDate});
            return tokenDTO;
        }
        catch(err){
            console.log('Error at EmailVerifierDAO : getEmailVerificatioinToken() ->');
            console.error(err);
            throw(err);
        }
    }

    public static async insertEmailVerificationTokenIntoStash(tokenObject : EmailVerifierDTO) : Promise<boolean | void>{
        try{
            await DBConnection.getDb().collection(this._collectionName).insertOne(tokenObject);
            return true;
        }
        catch(err){
            console.log('Error at setEmailVerificationToken() -> ');
            console.log(err);
            // throw(err);
        }
    }

    public static async deleteTokenFromStash(tokenString : string) : Promise<void>{
        try{
            await DBConnection.getDb().collection(this._collectionName).deleteOne({ _token : tokenString});
        }
        catch(err){
            console.error('Error at deleteTokenFromStash ->');
            console.error(err);
            throw(err);
        }
    }

}
