const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('./services/redis');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const http = require('http').createServer(app);

const socket = require('socket.io')(http);

socket.on('connection', function(socket){
    console.log('an user connected');
});

// import anything from services
// require()

require('./routes/qrRoutes')(app, redis, socket);

if (process.env.ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000;

http.listen(PORT);