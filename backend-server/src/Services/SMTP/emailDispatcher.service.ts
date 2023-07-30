import path from 'path';
import SMTP from "../../Utilities/SMTP/SMTP.utility";

import handlebars from 'handlebars';

import fs from 'fs';

export const sendUserVerificationEmail = async(toEmailId : string, tokenEncrypted : string) => {

    let emailVerificationTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname, '..', '..', 'Views', 'EmailTemplates', 'EmailVerification.html')).toString());

    let emailVerifierData = {
        verifyLink : "http://localhost:3000/email-verify/" + tokenEncrypted
    }

    let emailMessage = {
        from : "Ping.Me",
        sender : "notifications@ping.me",
        to : toEmailId,
        subject : "Your New Ping.Me Acount Verification",
        text : emailVerifierData.verifyLink,
        attachments : [
            {
                filename : 'pingMeLogo.png',
                path : path.join(__dirname, '..', '..', 'assets', 'pingMeLogo.png'),
                cid : 'pingMeLogo'
            }
        ],
        html : emailVerificationTemplate(emailVerifierData)
    }
        // call smtp service to email the verification token link
    SMTP.getEmailTransporter().sendMail(emailMessage);
}

export const sendUserRegistrationConfirmationEmail = async(toEmailId : string) => {

}

export const sendUserPasswordResetEmail = async(toEmailId : string) => {

}


