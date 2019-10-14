const express = require('express');

const server = express();


server.get('/' , () => console.log("tudo ok"))


server.listen(3000);