import serverless from "serverless-http";
import express from "express";
import next from "next";
const app = next({ dev });
const handle = app.getRequestHandler();

const startServer = async () => {
  try {
    await app.prepare();
    const server = express();

    //server.use(cookieParser());

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(8000, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:8000`);
    });
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
};

//startServer();

exports.handler = serverless(startServer);
