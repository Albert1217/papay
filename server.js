const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectionString = process.env.MONGO_URL;
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, goose) => {
    if (err) console.log("ERROR on connection Mongodb");
    else {
      console.log("Mongodb connection succeedd");
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 3011;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT} `
        );
      });
    }
  }
);
