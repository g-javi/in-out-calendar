import { MongoClient, ObjectId } from "mongodb";

export class Database {
  server = null;
  
  constructor(server: any) {
    this.server = server;
  }

  async connect() {
    MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;

      const calendar = db.db("calendar");
    });
  }
}
