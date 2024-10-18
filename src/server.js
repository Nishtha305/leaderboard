const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const Player = require('./model/player');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

//connection to mongodb
mongoose.connect('mongodb://localhost:27017/leaderboard');

const PORT = process.env.PORT || 3000;

// Update player score
app.post('/update-score/:playerId/score', async (req, res) => {
  const { playerId} = req.params;
  const { score } = req.body;

  const player = await Player.findOneAndUpdate(
    { playerId : playerId },
    { score },
    { new: true, upsert: true }
  );
  updateLeaderboard();

  res.status(200).json(player);
});

// Get top players
app.get('/leaderboard', async (req, res) => {
  const topPlayers = await Player.find()
    .sort({ score: -1 })
    .limit(100);
  res.status(200).json(topPlayers);
});

// Function to update the leaderboard and emit to clients
async function updateLeaderboard() {
    try{
        const topPlayers = await Player.find()
        .sort({ score: -1 })
        .limit(100);
    
        io.emit('leaderboardUpdate', topPlayers);
        return topPlayers;
    } catch(error){
        console.log('Error Updating Leaderboard', error);
    }
}

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send the current leaderboard to the new client
  updateLeaderboard();

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
