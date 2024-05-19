/*
 require(dotenv).config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const {email, company, industry, interest, location} = req.body;

    // Create a transporter object using SMTP transport

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // email options

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Form Submission',
        text: `You have a new form submission:
        Email: ${email}
        Company: ${company}
        Industry: ${industry}
        Interest: ${interest}
        Location: ${location} `
    };

    // send email

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
*/