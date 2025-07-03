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
const { execSync } = require("child_process");
const moment = require("moment");
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

let ANCIENT_HISTORY_JSON_DATA = fs.readFile(
  "./api/data/ancientHistory.json",
  (err, data) => {
    if (err) {
      return [];
    } else {
      return JSON.parse(data);
    }
  }
);

let MEDIEVAL_HISTORY_JSON_DATA = fs.readFile(
  "./api/data/medievalHistory.json",
  (err, data) => {
    if (err) {
      return [];
    } else {
      return JSON.parse(data);
    }
  }
);

let ECONOMICS_IR_JSON_DATA = fs.readFile(
  "./api/data/economicsIr.json",
  (err, data) => {
    if (err) {
      return [];
    } else {
      return JSON.parse(data);
    }
  }
);

let ENVIRONMENT_JSON_DATA = fs.readFile(
  "./api/data/environment.json",
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

const createAncientImagesStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "api/ancientHistoryImages");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const createMedievalImagesStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "api/medievalHistoryImages");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const createEconomicsIrStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "api/economicsIrImages");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const createEnvironmentImagesStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "api/environmentImages");
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

const uploadAncientHistoryImages = multer({
  storage: createAncientImagesStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadMedievalHistoryImages = multer({
  storage: createMedievalImagesStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadEconomicsImages = multer({
  storage: createEconomicsIrStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadEnvironmentImages = multer({
  storage: createEnvironmentImagesStorage(),
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
  "/api/ancientHistoryImages",
  express.static(path.join(__dirname, "/api/ancientHistoryImages"))
);
app.use(
  "/api/medievalHistoryImages",
  express.static(path.join(__dirname, "/api/medievalHistoryImages"))
);
app.use(
  "/api/economicsIrImages",
  express.static(path.join(__dirname, "/api/economicsIrImages"))
);
app.use(
  "/api/environmentImages",
  express.static(path.join(__dirname, "/api/environmentImages"))
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

app.get("/getAncientHistoryJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/ancientHistory.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      // console.log("geography.json -> ", JSON.parse(data));
      ANCIENT_HISTORY_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getMedievalHistoryJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/medievalHistory.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      // console.log("geography.json -> ", JSON.parse(data));
      MEDIEVAL_HISTORY_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getEconomicsIrJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/economicsIr.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      // console.log("geography.json -> ", JSON.parse(data));
      ECONOMICS_IR_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getEnvironmentJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/environment.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(200).send(JSON.parse(data));
      ENVIRONMENT_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getCurrentAffairsJsonFromBackend", (req, res) => {
  fs.readFile("./api/data/currentAffairs.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(200).send(JSON.parse(data));
      CURRENT_AFFAIRS_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/getImportantPointsjson", (req, res) => {
  fs.readFile("./api/data/importantPoints.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(200).send(JSON.parse(data));
      IMPORTANT_POINTS_JSON_DATA = JSON.parse(data);
    }
  });
});

app.get("/shutDown/:password", (req, res) => {
  const { password } = req.params;
  // console.log("SHUT DOWn API Called", password);

  try {
    if (password === moment().format("MMDDYYYY")) {
      // console.log("SHUT DOWn API Called 2", password);
      execSync(`shutdown now`, { stdio: "pipe" });
    }
  } catch (e) {
    console.log("Error", e);
  }
});

app.get("/clearFirefox/:password", (req, res) => {
  console.log("Clear firefox API Called");
  const { password } = req.params;
  try {
    if (password === moment().format("MMDDYYYY")) {
      console.log("Clear firefox API Called 2", password);
      console.log(execSync("which rm").toString());

      const profilePath =
        "/home/subhashkarn/.mozilla/firefox/jzbtire6.default-release";

      const targets = [
        "cache2",
        "offlineCache",
        "storage",
        "webappsstore.sqlite",
        "cookies.sqlite",
      ];

      for (const target of targets) {
        const fullPath = `${profilePath}/${target}`;
        try {
          // execSync(`rm -rf "${fullPath}"`);
          execSync(`/usr/bin/rm -rf "${fullPath}"`, { stdio: "pipe" });

          console.log(`✅ Deleted: ${fullPath}`);
        } catch (err) {
          console.error(`❌ Failed to delete: ${fullPath}`, err.message);
        }
      }

      // console.log(process.env.HOME);
      // const firefoxProfile = "jzbtire6.default-release";
      // const profilePath = `${process.env.HOME}/.mozilla/firefox/${firefoxProfile}`;
      // const path =
      //   "/home/subhashkarn/.mozilla/firefox/jzbtire6.default-release"; // manually set

      // console.log("Checking profile path:", profilePath);
      // console.log("Current user:", process.env.USER); // will be 'root'

      // if (fs.existsSync(profilePath)) {
      //   console.log("✅ Profile directory exists");
      // } else {
      //   console.error("❌ Profile directory NOT found");
      // }

      // execSync(
      //   `bash -c 'rm -rf ~/.mozilla/firefox/jzbtire6.default-release/{cache2,offlineCache,storage,webappsstore.sqlite,cookies.sqlite}'`,
      //   { stdio: "pipe" }
      // );
      // execSync(
      //   `rm -rf "${profilePath}"/{cache2,offlineCache,storage,webappsstore.sqlite,cookies.sqlite}`
      //   // { stdio: "pipe" }
      // );
      // execSync(
      //   "rm -rf ~/.mozilla/firefox/jzbtire6.default-release/{cache2,offlineCache,storage,webappsstore.sqlite,cookies.sqlite}",
      //   { stdio: "pipe" }
      // );
    }
  } catch (e) {
    console.log("Error", e);
  }
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

app.post("/uploadAncientHistoryImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadAncientHistoryImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const ancientHistoryJsonData = req.body;

  const data = JSON.parse(ancientHistoryJsonData.metaData);
  const finalData = [
    ...ANCIENT_HISTORY_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./api/data/ancientHistory.json", jsonString, (err) => {
    try {
      if (err) {
        console.log("Error writing file", err);
        res.status(501).send(err);
      } else {
        //console.log("Successfully wrote file");
        ANCIENT_HISTORY_JSON_DATA = finalData;
        res.status(200).send(ANCIENT_HISTORY_JSON_DATA);
      }
    } catch (e) {}
  });
});

app.post("/uploadMedievalHistoryImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadMedievalHistoryImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const medievalHistoryJsonData = req.body;

  const data = JSON.parse(medievalHistoryJsonData.metaData);
  const finalData = [
    ...MEDIEVAL_HISTORY_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./api/data/medievalHistory.json", jsonString, (err) => {
    try {
      if (err) {
        console.log("Error writing file", err);
        res.status(501).send(err);
      } else {
        //console.log("Successfully wrote file");
        MEDIEVAL_HISTORY_JSON_DATA = finalData;
        res.status(200).send(MEDIEVAL_HISTORY_JSON_DATA);
      }
    } catch (e) {}
  });
});

app.post("/uploadEconomicsIrImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadEconomicsImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const economicsIrJsonData = req.body;

  const data = JSON.parse(economicsIrJsonData.metaData);
  const finalData = [
    ...ECONOMICS_IR_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./api/data/economicsIr.json", jsonString, (err) => {
    try {
      if (err) {
        console.log("Error writing file", err);
        res.status(501).send(err);
      } else {
        //console.log("Successfully wrote file");
        ECONOMICS_IR_JSON_DATA = finalData;
        res.status(200).send(ECONOMICS_IR_JSON_DATA);
      }
    } catch (e) {}
  });
});

app.post("/uploadEnvironmentImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadEnvironmentImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const environmentJsonData = req.body;

  const data = JSON.parse(environmentJsonData.metaData);
  const finalData = [
    ...ENVIRONMENT_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./api/data/environment.json", jsonString, (err) => {
    try {
      if (err) {
        console.log("Error writing file", err);
        res.status(501).send(err);
      } else {
        ENVIRONMENT_JSON_DATA = finalData;
        res.status(200).send(ENVIRONMENT_JSON_DATA);
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
