const nodemailer = require("nodemailer");
const publicIp = require('public-ip')




let currentIP = "142.127.190.201";
    let check = async () => {
        setTimeout(async () => {


  try {
    let ip = await publicIp.v4();
    console.log(ip);
     if(ip == currentIP) {
        console.log("Same IP");

     }
     else {
        console.log("IP Changed");
        currentIP = ip;
        await main(ip);
     }
      check();  } catch(err) {
    console.log(err); // TypeError: failed to fetch
    check();
  }


            
                }, 5000);      
    
    }
    check();
   
    

    async function main(ip) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
      
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
           host: "smtp-mail.outlook.com",
            secureConnection: false, 
            port: 587, 
            auth: {
                user: "",
                pass: ""
            },
            tls: {
                ciphers:'SSLv3'
            }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"" <>', // sender address
          to: "", // list of receivers
          subject: "IP has changed", // Subject line
          text: `New IP = ${ip}`, // plain text body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
     