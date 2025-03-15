//DECLARATION THIRD PARTY
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express(); // serve up production assets
const path = require("path");
const fs = require("fs");
const http = require("http");
const colorNameList = require("css-color-names"); // Import color name list
//const https = require("https");
const cors = require("cors");

//DECLARATION USER DEFINED FUNCTIONS

const HOSTING_PORT = process.env.SELF_PORT || 8017;
const geographyFilePath = path.join(__dirname, "data", "geography.json");
const ancientHistoryFilePath = path.join(
  __dirname,
  "data",
  "ancientHistory.json"
);
const medievalHistoryFilePath = path.join(
  __dirname,
  "data",
  "medievalHistory.json"
);
const economicsFilePath = path.join(__dirname, "data", "economicsIr.json");
const environmentFilePath = path.join(__dirname, "data", "environment.json");

const currentAffairsFilePath = path.join(
  __dirname,
  "data",
  "currentAffairs.json"
);
const importantPointsFilePath = path.join(
  __dirname,
  "data",
  "importantPoints.json"
);

const SELF_IP = process.env.SELF_IP || "localhost";
const allowedOrigins = [
  "http://" + SELF_IP + ":" + HOSTING_PORT,
  "http://" + SELF_IP + ":3017",
  "http://localhost:" + HOSTING_PORT,
  "http://localhost:3017",
  "https://test-ui-sand.vercel.app",
];

//---------------------------------VAPT CODE START 1---------------------------//
app.disable("x-powered-by");
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self';"
//   );
//   next();
// });
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
  "/geographyImages",
  express.static(path.join(__dirname, "geographyImages"))
);
app.use(
  "/ancientHistoryImages",
  express.static(path.join(__dirname, "ancientHistoryImages"))
);
app.use(
  "/medievalHistoryImages",
  express.static(path.join(__dirname, "medievalHistoryImages"))
);
app.use(
  "/economicsIrImages",
  express.static(path.join(__dirname, "economicsIrImages"))
);
app.use(
  "/environmentImages",
  express.static(path.join(__dirname, "environmentImages"))
);

app.use(
  "/currentAffairsImages",
  express.static(path.join(__dirname, "currentAffairsImages"))
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
  fs.readFile(geographyFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/getAncientHistoryJsonFromBackend", (req, res) => {
  fs.readFile(ancientHistoryFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/getMedievalHistoryJsonFromBackend", (req, res) => {
  fs.readFile(medievalHistoryFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/getEconomicsIrJsonFromBackend", (req, res) => {
  fs.readFile(economicsFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/getEnvironmentJsonFromBackend", (req, res) => {
  fs.readFile(environmentFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/getCurrentAffairsJsonFromBackend", (req, res) => {
  fs.readFile(currentAffairsFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("/getImportantPointsjson", (req, res) => {
  fs.readFile(importantPointsFilePath, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const HostServer = http.createServer(app);

HostServer.listen(HOSTING_PORT, async () => {});

module.exports = app;
