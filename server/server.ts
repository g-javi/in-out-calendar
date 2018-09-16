import * as https from 'https';
import * as fs from 'fs';
import * as WebSocket from 'ws';
import { Database } from "./database";
import { MessageHandlers } from "./handlers";

// WebSocket Server
const privateKey  = fs.readFileSync('keys/privkey1.pem', 'utf8');
const certificate = fs.readFileSync('keys/cert1.pem', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate
};
const httpsServer = https.createServer(credentials, function (request, response) {
  console.log("Req = " + request);
});
httpsServer.listen(8080);

class Server {
  connectedUsers = null;
  database: Database = null;
  messageHandlers: MessageHandlers = null;
  requests = null;
  wss: WebSocket.Server = null;

  constructor() {
    this.wss = new WebSocket.Server({
      server: httpsServer
    });

    this.connectedUsers = {};

    this.database = new Database(this);
    this.messageHandlers = new MessageHandlers(this);

    this.requests = {
        "login": this.messageHandlers.login,
        "logout": this.messageHandlers.logout
    };

    this.setupWss();
  }
  
  setupWss() {
    const that = this;
    this.wss.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
        const msg = JSON.parse(message.toString());
        if (!that.requests.hasOwnProperty(msg.request)) {
          that.broadcastToUser(ws, JSON.stringify({
            response: "Unknown request"
          }));
        } else {
          that.requests[msg.request](ws, msg);
        }
      });
      that.broadcastToUser(ws, JSON.stringify({
        response: "Connected to server"
      }));
    });
  }

  broadcastToUser(ws, msg) {
    try {
      ws.send(msg);
    } catch (err) {
      console.log("Couldn't send message");
    }
  }

  broadcastToAll(msg, senderId) {
    const allConnectedUsers = JSON.parse(JSON.stringify(this.connectedUsers));
    delete allConnectedUsers[senderId];
    for (const user in allConnectedUsers) {
      this.broadcastToUser(this.connectedUsers[user], msg);
    }
  }
}
