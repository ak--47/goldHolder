# The Gold Holder

This is a robot based on [discord.js](https://discord.js.org/#/) that will help you keep track of Gold and other group loot in a D&D game. It is very simple, and the code is pretty basic. Here are the commands

  - `!help` - see a list of commands
  - `!status` - see all the group loot
  - `+gold` or `-gold` - add or subtrack party loot
  - `+inv` or `-inv` - add an item to the bag of holding

# Installation

  - Clone it here, make sure node.js is installed
  - Do an `npm install` to fetch depedencies
  - [Register your application with discord](https://discordapp.com/developers/docs/intro), to get a key/secret/token
  - Create an auth.json file like so:
  `{
    "clientID": "FOOBAR",
    "clientSecret": "BAZBUX",
    "username": "DUDEMANBRO",
    "token": "GOGETATOKEN"
}`
  - Create a stash.json file like so:
`{
  "gold": 400,
  "bagOfHolding": [
  	"item A",
    "item B",
    "item C"
  ],
  "foo": "bar"
}`
_(there are example JSON files in the repo if you have trouble)_
- Start the server with `node index.js` (or `npm start` if you have nodemon installed)



### To Dos

 - code cleanup
 - dev/production mode
 - a bunch of other things...

Heroku:
 https://polar-hollows-28550.herokuapp.com/ | https://git.heroku.com/polar-hollows-28550.git


