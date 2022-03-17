import { throws } from 'assert';
import nodemailer from 'nodemailer';

export default class SMTP{

    private static _testAccount : nodemailer.TestAccount;

    private static _emailTransporter : nodemailer.Transporter;

    static async init(){
        try{
            this._testAccount = await nodemailer.createTestAccount();
            this._emailTransporter = nodemailer.createTransport({
                host : "smtp.ethereal.email",
                port : 587,
                secure : false,
                auth : {
                    user : 'mqfv526u74riy4oh@ethereal.email',
                    pass : 'xwHqqs7ApjMmSn87t8'
                }
            })
        }
        catch(err){
            console.error("Failed to initialize SMTP service : " + JSON.stringify(err));
        }
        
    }

    static getTestAccount() : nodemailer.TestAccount{
        if(!this._testAccount){
            this.init();
        }
        return this._testAccount
    }

    static getEmailTransporter() : nodemailer.Transporter {
        if(!this._emailTransporter){
            this.init();
        }
        return this._emailTransporter;
    }
}
