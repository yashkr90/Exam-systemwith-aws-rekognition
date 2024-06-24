import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import userRoute from "./routes/v1/userRoute.js"
const port = process.env.PORT || 3000;

const app = express();
// app.use(bodyParser.json());



dotenv.config();

app.use(express.json());
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());


const corsOptions = {
  origin: '*', // replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: '*',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//only frontend will comminicate with backend ,chage it in prod\
app.use(cors(corsOptions));
app.options('*', cors(corsOptions), (req, res) => {
  res.sendStatus(200);
});

app.use("/",userRoute);


const MONGOURL = process.env.MONGOURL;



Connection(MONGOURL).then((res) => {
    console.log(res);
    if (res === "success") {
      app.listen(port || process.env.PORT, () =>
        console.log(`Server is running on PORT ${port}`)
      );
    }
  });