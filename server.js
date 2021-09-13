const expres = require('express');
const app = expres();
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 8000

// moddleware
app.use(expres.static('public'));
app.use(expres.json()); 


app.get('/', (req,res)=>{
      res.sendFile(__dirname + '/public/index.html')
})

app.post('/',(req,res)=>{
      console.log(req.body);

      const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                  user: 'jonathantest7dj@gmail.com',
                  pass: 'sfmtpahudlmpkggc'
            }
      })

      const mailOptions = {
            from: req.body.email,
            to: 'jduranev@gmail.com',
            subject: `${req.body.subject}`,
            text: req.body.message
      }

      transporter.sendMail(mailOptions, (err,info)=>{
            if(err){
                  console.log(err);
                  res.send('error')
            } else {
                  console.log('Email success ');
                  res.send('success')
            }

      })
})

app.listen(PORT,()=>{
      console.log('Server on port',PORT)
})