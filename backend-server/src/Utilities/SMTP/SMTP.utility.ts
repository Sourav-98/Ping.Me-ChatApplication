
import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
// import {ExpressHandlebars} from 'express-handlebars';

export default class SMTP{

    private static _testAccount : nodemailer.TestAccount;

    private static _emailTransporter : nodemailer.Transporter;

    static async init(){
        try{
            this._testAccount = await nodemailer.createTestAccount();
            this._emailTransporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                // port: 587,
                // auth: {
                //     user: 'lvqz7lydu5wabb7s@ethereal.email',
                //     pass: '1bZ1NjRenn24qsHJf9'
                // }
                service : 'gmail',
                auth : {
                    user : 'tomar.chaurasia@gmail.com',
                    pass : 'Sourav1998$'
                }
            });
            // this._emailTransporter.use('compile', hbs({
            //     viewEngine : {
            //         extname : '.hbs',
            //         'partialsDir' : path.join(__dirname , '..' , '..' , 'Views'),
            //         layoutsDir : path.join(__dirname , '..' , '..' , 'Views')
            //     },
            //     viewPath : path.join(__dirname , '..',  '..'  ,'Views'),
            //     extName : '.hbs'
            // }));
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
