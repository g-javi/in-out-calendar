export class MessageHandlers {
  server = null;
  
  constructor(server: any) {
    this.server = server;
  }

  // REQUEST HANDLERS
  login(ws, msg) {
    if (!msg.hasOwnProperty("userId")) {
      this.server.broadcastToUser(ws, JSON.stringify({
        response: "login",
        success: false,
        reason: "No userId provided"
      }));
    }

    const userId = msg.userId.toString();
    
    if (!this.server.connectedUsers.hasOwnProperty(userId)) {
      this.server.connectedUsers[userId] = ws;
    } else {
      // Check if already authenticated?
    }

    ws.userId = userId;

    this.server.broadcastToUser(ws, JSON.stringify({
      response: "login",
      success: true,
      userId: userId,
      calendar: this.server.database.getCalendar() // TODO
    }));

    this.server.broadcastToAll(JSON.stringify({
      event: "userStatus",
      type: "login",
      userId: userId
    }), userId);
  }

  logout(ws, msg) {
    if (!ws.hasOwnProperty("userId")) {
      return;
    }
    const userId = ws.userId;
    if (this.server.connectedUsers.hasOwnProperty(userId)) {
      delete this.server.connectedUsers[userId];
      this.server.broadcastToAll(JSON.stringify({
        event: "userStatus",
        type: "logout",
        userId: userId
      }), userId);
      ws.close();
    }
  }
}
