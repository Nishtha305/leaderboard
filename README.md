# leaderboard
# technologies used
- Node.js
- Express
- MongoDB
- Socket.io

## Getting started
## Installation
1. clone Repository:
 ``` bash
 git clone https://github.com/Nishtha305/leaderboard.git
 cd leaderboard
 ```

2. install dependencies:
 ``` bash
 npm install
 ```

3. run the application:
``` bash
 node src/server.js
 ```

## API Endpoints
1. Update Score
 URL: http://localhost:3000/update-score/:playerId/score'
 Method: POST
 request-body: { "score" : 115 }

2. Get top players
 URL: http://localhost:3000/leaderboard'
 Method: GET

## Web Socket
 Event: updateLeaderboard
 Description: Emits the updated leaderboard to all connected clients whenever a score is updated.

## Testing
 For testing you can use Postman
