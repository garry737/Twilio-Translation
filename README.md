# Twilio-Translation
This application was a group project developed for MLH (Major League Hacking) Local Hack Day October 12 2019. It is a project implementing Twilio written in Javascript. We ran our javascript code through the online tool Glitch and used the Google Cloud Translate API as our translation tool.

The project allows users to text a number with a language code and a sentence to have it translated. The sentence provided from the user will be auto-detected for its language before translating. The format for using this program is as such.

> [Language] "String"
  
Language can follow [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) or the English name of the language.

Note: Since we are using Twilio Free Trial, only authorized numbers can use this service
