# Phone Book
Phone Book beeing developed with the knowledge obtained from the course in Udemy: "Curso de JavaScript moderno do básico ao avançado" from the professor Luiz Otávio Miranda

How do you could make this site works?

With this repository already copied to your computer, you will need install the node_modules with "npm i"

You'll need add your firebase web sdk informations in a archive called: firebaseconfig.js.
the information that need to have this structure:

----------------------------------------------------------------------------------------------------------------------------------------------------------------

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "<yourApiKey>",
    authDomain: "<yourAuthDomain>",
    projectId: "<yourProjectId>",
    storageBucket: "<yourStorageBucked>",
    messagingSenderId: "<yourMessagingSenderId>",
    appId: "<yourAppId>"
  };

firebase.initializeApp(firebaseConfig);

module.exports = firebase
    
----------------------------------------------------------------------------------------------------------------------------------------------------------------
  
All the information in "const firebaseConfig" are give in the firebase web sdk.
  
after it, you will need open the prompt and use the command:

cd <to your copied repository>
npx nodemon 'server.js'
  
----------------------------------------------------------------------------------------------------------------------------------------------------------------
    
After it, the server is running, and you will be able to access all the pages inside it.
  
The pages already available are:
home // localhost:3000/home
login // localhost:3000/login
  In this page, you will be able to post the form to: register or login. This page don't make nothing more than it yet, it make some validations but does not
  store the information in a database yet.
