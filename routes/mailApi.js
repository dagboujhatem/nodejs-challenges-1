const express = require('express');
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();

router.get('/sendMail', async(req,res)=>{

    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "hatem.dagbouj@fivepoints.fr, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world with text?", // plain text body
        // html: "<b>Hello world with HTML?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.json({message: 'Mail send.', url : nodemailer.getTestMessageUrl(info)})
});

router.get('/sendMailV2', async(req,res)=>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dagboujhatem@gmail.com',
            pass: 'admingmail'
        }
    });

    const templatePath = path.resolve('./mail_templates','register.html'); 
    // console.log(templatePath);
    const registerTemplate = fs.readFileSync(templatePath, {encoding: 'utf-8'});
    // console.log(registerTemplate);

    const render = ejs.render(registerTemplate, {name: "hatem"});
    // console.log(render);

    let info = await transporter.sendMail({
        from: '"DAGBOUJ Hatem 👻" <dagboujhatem@gmail.com>',
        to: "hatem.dagbouj@fivepoints.fr, dagboujhatem@gmail.com",
        subject: "Hello ✔",
        // html: registerTemplate,
        html: render,
        attachments: [
            {
                filename: 'image.jpg',
                path: './mail_templates/attachments/image.jpg'
            },
            {
                filename: 'ramadan.jpg',
                path: './mail_templates/attachments/ramadan.jpg'
            }
        ]
    });

    res.json({message: 'Mail send.'})
});

module.exports = router;