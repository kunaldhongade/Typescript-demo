const express = require("express");
const upload = require("express-fileupload");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// using upload middleware
app.use(upload());
app.use(express.json());

// s3 config
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // your AWS access id
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // your AWS access key
    region: process.env.AWS_REGION
});

// actual function for uploading file
async function uploadFile(file) {
    const params = {
        Bucket: process.env.AWS_BUCKET, // bucket you want to upload to
        Key: `fileupload/scanskill-${Date.now()}-${file.name}`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
        Body: file.data,
        ACL: "public-read",
    };
    const data = await s3.upload(params).promise();
    return data.Location; // returns the url location
}

app.post("/upload", async (req, res) => {
    // the file when inserted from form-data comes in req.files.file
    const fileLocation = await uploadFile(req.files.file);

    // returning fileupload location
    return res.status(200).json({ location: fileLocation });
});

// starts the express server in the designated port
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));