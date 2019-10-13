require('dotenv').config() 
const express = require('express')
const bodyParser = require('body-parser');
const app = express() 
const twilio = require('./twilio.js')


//instantiate the translate api (found on npmjs.com)
const translate = require('@vitalets/google-translate-api');
 

app.use(bodyParser.urlencoded({extended: true })); //this function parses the incoming request (message)

const port = process.env.PORT || 3000


// this line of code has nothing to do with the functionality of the app
// it just shows the Twilio logo on Glitch! 

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));



//no idea
app.post('/', (req, res) => {
  
  //retrieve and store the user's phone number
  const phoneNumber = req.body.From
  
  //retrieve and store the user's text that was sent to us
  const message = req.body.Body;
  const wordArray = message.split(" ");
  
  //slice the message's first two characters, this is the language that the users want
  //their text to be translated to. this is a prototype that we agree with the user
  const language = wordArray[0].toLowerCase();
  console.log(language);
  
  //the part of the message that we will translate (the entire text except the first 2 characters)
  const translating = wordArray.slice(1).join(" ");
  
  //the translate function imported from the API. parameter: message - text that needs translation. language - language
  translate(translating, {to: language}).then(res => {
    const translatingLanguage = `Translating from ${res.from.language.iso} to ${language}....\n`
    console.log(res.text);
    //=> I speak English
    console.log(language);
    //=> nl
    // Please insert the correct format [Languagecode] "insert text here". For all the language cases, type !languages
    twilio.sendMessage(phoneNumber, translatingLanguage.concat(res.text));

    }).catch(err => {
        console.error(err);
        twilio.sendMessage(phoneNumber, "Please insert the correct format [LanguageCode] \"insert text here\".");

    });
  //var index = Math.floor(Math.random() * (arrayMessage.length - 1));
  res.writeHead(200, {'Content-Type': 'plain/text'});
  
  console.log(message);
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
