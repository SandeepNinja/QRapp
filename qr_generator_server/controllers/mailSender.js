const nodemailer = require('nodemailer');

module.exports.mailSender = async (emailToSend, mailTitle, mailBody, randomCode) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true, // true for 465 and false for other port
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS,
            },
            tls: {
              rejectUnauthorized: true,
            }
        });
        
        var mailOptions = {
          from: '"QRCODE Generator" <codewithsandeep140@gmail.com>',
          to: emailToSend,
          subject: mailTitle,
          text:  `Your QRCODE Generator id's new password is ${randomCode}`,
          html: mailBody,  
        };
        
        transporter.sendMail(mailOptions, function(error, info){
         if (error) {
                console.log(error);
                reject({
                    status:false,
                    error
                }); // Reject the Promise if there's an error
            } else {
                console.log('Email sent: ' + info.response);
                resolve({ // Resolve the Promise with the email sending response
                    status: true,
                    info: info.response
                });
            }
        });
    })
  }

  module.exports.mailBody = (content, otp) => {
    return(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QRCODE Generator</title>
        <style>
          /* Styles for the email body */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
        
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           text-align: center;
          }
        
          h1 {
            color: #333333;
            margin-top: 0;
            text-align: center;
          }
        
          p {
            color: #666666;
          }
        
          .otp{
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            border-radius: 5px;
            margin-top: 20px;
          }
        
        </style>
        </head>
        <body>
        
        <div class="container">
          <div>
            <h1>Welcome to Our QRCODE Generator</h1>
          <p>${content}</p>
          <p>Your one time OTP mentiond below don't share with anyOne</p>
          </div>
          
          <div class="otp">${otp}</div>
        </div>
        
        </body>
        </html>`
    )
  }
  