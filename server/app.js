const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/router");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// require("./db/conn");
require("./db/connection");
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true  
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/uploads', express.static('uploads'));

app.use("/api/user",userRouter);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`);
})
