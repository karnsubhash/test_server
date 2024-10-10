//DECLARATION THIRD PARTY
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express(); // serve up production assets
const path = require("path");
const fs = require("fs");
const http = require("http");
const cors = require("cors");

//DECLARATION USER DEFINED FUNCTIONS

const HOSTING_PORT = process.env.SELF_PORT || 8017;
let GEOGRAPHY_JSON_DATA = fs.readFile(
  "./api/data/geography.json",
  (err, data) => {
    if (err) {
      return [];
    } else {
      return JSON.parse(data);
    }
  }
);
let CURRENT_AFFAIRS_JSON_DATA = fs.readFile(
  "./api/data/currentAffairs.json",
  (err, data) => {
    if (err) {
      return [];
    } else {
      return JSON.parse(data);
    }
  }
);
let IMPORTANT_POINTS_JSON_DATA = [];

const SELF_IP = process.env.SELF_IP || "localhost";
const allowedOrigins = [
  "http://" + SELF_IP + ":" + HOSTING_PORT,
  "http://" + SELF_IP + ":3017",
  "http://localhost:" + HOSTING_PORT,
  "http://localhost:3017",
];
//-----------------Create Storage---------------//
const createGeographyImagesStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "api/geographyImages");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const createCurrentAffairsImagesStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "api/currentAffairsImages");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

//---------------------------------Upload Code---------------------------//
const uploadGeographyImages = multer({
  storage: createGeographyImagesStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadCurrentImages = multer({
  storage: createCurrentAffairsImagesStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

//---------------------------------VAPT CODE START 1---------------------------//
app.disable("x-powered-by");
app.use((_, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});
app.use((_, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  next();
});
//console.log("app.use(cors) allowedOrigins   is", allowedOrigins);
app.use(
  cors({
    origin: function (origin, callback) {
      // //console.log("origin is", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//---------------------------------VAPT CODE END 1---------------------------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/themeAssets", express.static(path.join(__dirname, "themeAssets")));
app.use(
  "/api/geographyImages",
  express.static(path.join(__dirname, "/api/geographyImages"))
);
app.use(
  "/api/currentAffairsImages",
  express.static(path.join(__dirname, "/api/currentAffairsImages"))
);
app.use("/Output", express.static(path.join(__dirname, "Output")));
app.use("/", express.static(path.join(__dirname, "build")));
//---------------------------------VAPT CODE START 2---------------------------//
app.get("/latest/meta-data/", (req, res) => {
  res.writeHead(403, { "Content-Type": "text/plain" });
  res.end("Access Denied"); // You can customize the response as needed
});

app.get("/._darcs", (req, res) => {
  res.writeHead(403, { "Content-Type": "text/plain" });
  res.end("Access Denied"); // You can customize the response as needed
});
app.get("/.bzr", (req, res) => {
  res.writeHead(403, { "Content-Type": "text/plain" });
  res.end("Access Denied"); // You can customize the response as needed
});
app.get("/.hg", (req, res) => {
  res.writeHead(403, { "Content-Type": "text/plain" });
  res.end("Access Denied"); // You can customize the response as needed
});
app.get("/BitKeeper", (req, res) => {
  res.writeHead(403, { "Content-Type": "text/plain" });
  res.end("Access Denied"); // You can customize the response as needed
});

//---------------------------------VAPT CODE END 2---------------------------//

app.get("/getgeoGraphyJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/geography.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      // console.log("geography.json -> ", JSON.parse(data));
      GEOGRAPHY_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getCurrentAffairsJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/currentAffairs.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      // console.log("geography.json -> ", JSON.parse(data));
      CURRENT_AFFAIRS_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getImportantPointsjson", (req, res) => {
  fs.readFile("./importantPoints.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      //console.log("geography.json -> ", JSON.parse(data));
      IMPORTANT_POINTS_JSON_DATA = JSON.parse(data);
    }
  });
});

/********************* Upload Files ********************/

app.post("/uploadGeographyImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadGeographyImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const geographyJsonData = req.body;

  // console.log("geographyJsonData", geographyJsonData);

  const data = JSON.parse(geographyJsonData.metaData);
  const finalData = [
    ...GEOGRAPHY_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./api/data/geography.json", jsonString, (err) => {
    try {
      if (err) {
        console.log("Error writing file", err);
        res.status(501).send(err);
      } else {
        //console.log("Successfully wrote file");
        GEOGRAPHY_JSON_DATA = finalData;
        res.status(200).send(GEOGRAPHY_JSON_DATA);
      }
    } catch (e) {}
  });
});

app.post("/uploadCurrentAffairsImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadCurrentImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const currentAffairsJsonData = req.body;

  // console.log("geographyJsonData", geographyJsonData);

  const data = JSON.parse(currentAffairsJsonData.metaData);
  const finalData = [
    ...CURRENT_AFFAIRS_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./api/data/currentAffairs.json", jsonString, (err) => {
    try {
      if (err) {
        console.log("Error writing file", err);
        res.status(501).send(err);
      } else {
        //console.log("Successfully wrote file");
        CURRENT_AFFAIRS_JSON_DATA = finalData;
        res.status(200).send(CURRENT_AFFAIRS_JSON_DATA);
      }
    } catch (e) {}
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const HostServer = http.createServer(app);

HostServer.listen(HOSTING_PORT, async () => {});

module.exports = app;
