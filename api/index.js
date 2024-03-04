const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const authRouter = require("./routes/auth");
const employeeRouter = require("./routes/employee")

dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongodb"))
.catch((err)=> console.timeLog(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res) => {
    res.status(200).json("file has been uploaded");
});

app.use("/api/auth/",authRouter);
app.use("/api/employee/",employeeRouter);

app.listen(5000,()=>{
    console.log("connected to 5000")
})