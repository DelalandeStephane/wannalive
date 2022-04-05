const mailer = require('nodemailer');
const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user :'x33ue2wrjvcsebht@ethereal.email',
    pass: '3rv7GkUUTfFjW5TMD7'
  }
};

const transporter = mailer.createTransport(mailConfig);

exports.sendForgetPasswordMail = (req,res, next) => {

    transporter.sendMail({
        from: 'x33ue2wrjvcsebht@ethereal.email', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <style>
            .nav-logo {
                display: flex;
                font-weight: bold;
                font-size: 1.2rem;
                p {
                    margin-left: -10px;
                    margin-top: 26px;
                }
            }
            .icon-model {
                width: 50px;
                height: 50px;
            }
        </style>
        <a class="nav-logo" ><img class="icon-model" src="http://localhost:3000/assets/image/icon/concert.svg" alt="logo"><p>WannaLive</p></a>
        <h1>Bonjour, ${req.body.userName}</h1>
        <p>Bah alors ! on a oublié son mot de passe ??<br> pas de problème vous trouvez ci dessous votre nouveau mot de passe</p>
        <p>Votre nouveau de passe est <b>${req.body.newPassword}</b></p>
        `,

    });

}