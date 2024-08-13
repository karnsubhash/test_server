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
let MAP_DATA = [];
let THEME_SETTING_DATA = {};
let GEOGRAPHY_JSON_DATA = [];

const SELF_IP = process.env.SELF_IP || "localhost";
const allowedOrigins = [
  "http://" + SELF_IP + ":" + HOSTING_PORT,
  "http://" + SELF_IP + ":3017",
  "http://localhost:" + HOSTING_PORT,
  "http://localhost:3017",
];

// const allowedOrigins = [
//   "https://" + SELF_IP + ":" + HOSTING_PORT,
//   "https://" + SELF_IP + ":5000",
//   "https://localhost:" + HOSTING_PORT,
//   "https://localhost:5000",
// ];

//MAIN CODE FLOW
////console.log("CIKMS SERVER VERSION 1.0.0 ");
//console.log("WVM (UI) IP ", SELF_IP);
//console.log("WVM (UI) PORT ", HOSTING_PORT);
const createStorage = (filename) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "themeAssets");
    },
    filename: (req, file, cb) => {
      cb(null, filename + path.extname(file.originalname));
    },
  });
};

const createGeographyImagesStorage = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "geographyImages");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const createDeviceImageStorage = (filename) => {
  //console.log("createDeviceImageStorage imageName", filename);
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/device");
    },
    filename: (req, file, cb) => {
      cb(null, filename);
    },
  });
};
// Function to handle file upload
const uploadDeviceImage = (imageName) => {
  //console.log("uploadDeviceImage imageName", imageName);
  return multer({
    storage: createDeviceImageStorage(imageName),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  }).single("file");
};

const uploadGeographyImages = multer({
  storage: createGeographyImagesStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadEmptyImage = multer({
  storage: createStorage("empty"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLoginLogoImage = multer({
  storage: createStorage("loginLogo"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadHelpImage = multer({
  storage: createStorage("help"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadSidebarTopLogoImage = multer({
  storage: createStorage("sideBarTopLogo"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLoginBackgroundImage = multer({
  storage: createStorage("loginBackground"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC1Image = multer({
  storage: createStorage("lc1"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC2Image = multer({
  storage: createStorage("lc2"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC3Image = multer({
  storage: createStorage("lc3"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC4Image = multer({
  storage: createStorage("lc4"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC5Image = multer({
  storage: createStorage("lc5"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC6Image = multer({
  storage: createStorage("lc6"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC7Image = multer({
  storage: createStorage("lc7"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC8Image = multer({
  storage: createStorage("lc8"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

const uploadLC9Image = multer({
  storage: createStorage("lc9"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
}).single("file");

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
// app.use(
//   "/geographyImages",
//   express.static(path.join(__dirname, "geographyImages"))
// );
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
app.get("/getThemeSettingFromBackend", (req, res) => {
  fs.readFile("./themeSetting.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // //console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      //console.log("themeSetting.json -> ", JSON.parse(data));
      THEME_SETTING_DATA = JSON.parse(data);
    }
  });
});

app.get("/getgeoGraphyJsonFromBackend", (req, res) => {
  fs.readFile("./geography.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      //console.log("geography.json -> ", JSON.parse(data));
      GEOGRAPHY_JSON_DATA = JSON.parse(data);
    }
  });
});

app.post("/uploadGeographyImagesToBackend", async (req, res) => {
  //console.log("req, res", req.body);

  await uploadGeographyImages(req, res, (err) => {
    if (err) {
      // return res.status(400).send({ message: err.message });
    }
    // res.send({ message: "File uploaded successfully" });
  });

  const geographyJsonData = req.body;

  console.log("geographyJsonData", geographyJsonData);

  const data = JSON.parse(geographyJsonData.metaData);
  const finalData = [
    ...GEOGRAPHY_JSON_DATA,
    { fileName: data.fileName, titleName: data.titleName },
  ];

  const jsonString = JSON.stringify(finalData);
  fs.writeFile("./geography.json", jsonString, (err) => {
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

  //console.log("req, res, after", req);
});

app.post("/uploadImageToBackend/:id", (req, res) => {
  const { id } = req.params;
  switch (parseInt(id)) {
    case 1:
      uploadEmptyImage(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 2:
      uploadLoginLogoImage(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 3:
      uploadHelpImage(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 4:
      uploadSidebarTopLogoImage(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 5:
      uploadLoginBackgroundImage(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 6:
      //RESERVER FOR FUTURE
      break;
    case 71:
      uploadLC1Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 72:
      uploadLC2Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 73:
      uploadLC3Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 74:
      uploadLC4Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 75:
      uploadLC5Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 76:
      uploadLC6Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 77:
      uploadLC7Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 78:
      uploadLC8Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
    case 79:
      uploadLC9Image(req, res, (err) => {
        if (err) {
          return res.status(400).send({ message: err.message });
        }
        res.send({ message: "File uploaded successfully" });
      });
      break;
  }
});

app.post("/uploadDeviceImageToBackend/:imageName", (req, res) => {
  const { imageName } = req.params;
  //console.log("/uploadDeviceImageToBackend imageName", imageName);
  const upload = uploadDeviceImage(imageName);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    res.send({ message: "File uploaded successfully" });
  });
});
app.post("/postThemeSettingToBackend", (req, res) => {
  const themeData = req.body;
  //console.log("/postThemeSettingToBackend ->CURRENT ->  themeData ", themeData);
  //console.log(
  //   "/postThemeSettingToBackend ->ORIGINAL -> THEME_SETTING_DATA ",
  //   THEME_SETTING_DATA
  // );

  const jsonString = JSON.stringify(themeData);
  fs.writeFile("./themeSetting.json", jsonString, (err) => {
    if (err) {
      //console.log("Error writing file", err);
      res.status(501).send(err);
    } else {
      //console.log("Successfully wrote file");
      THEME_SETTING_DATA = themeData;
      res.status(200).send(THEME_SETTING_DATA);
    }
  });
});

// app.post("/postGeographyJsonToBackend", (req, res) => {
//   const geographyJsonData = req.body;
//   //console.log("/postThemeSettingToBackend ->CURRENT ->  themeData ", themeData);
//   //console.log(
//   //   "/postThemeSettingToBackend ->ORIGINAL -> THEME_SETTING_DATA ",
//   //   THEME_SETTING_DATA
//   // );

//   const index = [...GEOGRAPHY_JSON_DATA, { fileName: "", titleName: " " }];

//   const jsonString = JSON.stringify(geographyJsonData);
//   fs.writeFile("./geography.json", jsonString, (err) => {
//     if (err) {
//       //console.log("Error writing file", err);
//       res.status(501).send(err);
//     } else {
//       //console.log("Successfully wrote file");
//       GEOGRAPHY_JSON_DATA = geographyJsonData;
//       res.status(200).send(GEOGRAPHY_JSON_DATA);
//     }
//   });
// });

app.get("/getFontFamilyForThemeSetting", (req, res) => {
  res.status(200).send({ data: [{ value: "Lexend", label: "Lexend" }] });
});

app.get("/getSysConfig", (req, res) => {
  fs.readFile("./configuration.json", (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      // //console.log("Sending Data to Client", JSON.parse(data));
      res.status(200).send(JSON.parse(data));

      //console.log("WCM (Middleware) IP ", JSON.parse(data).WCM_IP);
      //console.log("WCM (Middleware) PORT ", JSON.parse(data).WCM_PORT);
    }
  });

  //res.status(200).send(CONFIG_DATA);
  // fs.readFile(
  //   process.env.CONFIGURATION_FILE_PATH +
  //     "/" +
  //     process.env.CONFIGURATION_FILE_NAME,
  //   (err, data) => {
  //     if (err) {
  //       res.status(501).send(err);
  //     } else {
  //       // //console.log("Sending Data to Client", JSON.parse(data));
  //       res.status(200).send(JSON.parse(data));
  //     }
  //   }
  // );
});

app.get("/getMapListFromBackend", (req, res) => {
  res.status(200).send({
    data: [
      { value: "1", label: "INDIA_ONLY" },
      { value: "2", label: "INDIA_WITH_SURROUNDING" },
      { value: "3", label: "TAMIL_NADU_STATE" },
      { value: "4", label: "DELHI_NCR" },
    ],
  });
});

// Function to get the filename based on the route parameter
const getFilename = (id) => {
  switch (id) {
    case "1":
      return "./INDIA_ONLY.json";
    case "2":
      return "./INDIA_WITH_SURROUNDING.json";
    case "3":
      return "./TAMIL_NADU_STATE.json";
    case "4":
      return "./DELHI_NCR.json";
    // Add more cases as needed
    default:
      return null;
  }
};

app.get("/getMapJson/:id", (req, res) => {
  const { id } = req.params;

  const filename = getFilename(id);

  if (!filename) {
    return res.status(404).send({ error: "File not found" });
  }
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      MAP_DATA = JSON.parse(data);
      ////console.log("Sending Data to Client", MAP_DATA);

      res.status(200).send(MAP_DATA);
    }
  });
});

// Utility function to validate hex color codes
const isValidHexColor = (hex) => {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;
  return regex.test(hex);
};

// Utility function to check if color name is valid
const isValidColorName = (color) => {
  return colorNameList.hasOwnProperty(color.toLowerCase());
};

// Utility function to read and modify the SVG file content
// const modifySvgColor = (filePath, color) => {
//   //console.log("modifySvgColor color", color);
//   const svgContent = fs.readFileSync(filePath, "utf8");
//   return svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
// };

// Utility function to read and modify the SVG file content
const modifySvgColor = (filePath, color) => {
  let svgContent = fs.readFileSync(filePath, "utf8");
  if (isValidHexColor(color) || isValidColorName(color)) {
    // Replace all fill attributes with the new color
    svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
  }
  return svgContent;
};

app.get("/images/device/:imageFileName", (req, res) => {
  //console.log("req.query.color", req.query.color);
  const actualColor = req.query.color.split("?")[0];
  //console.log("actualColor", actualColor);
  const color = actualColor.toUpperCase() || "gray"; // Default color is gray
  //console.log("finalColor", color);
  const { imageFileName } = req.params;
  const svgPath = path.join(__dirname, "/images/device/" + imageFileName);
  //console.log("svgPath", svgPath);
  const modifiedSvg = modifySvgColor(svgPath, color);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(modifiedSvg);
});

// app.get("/getMapJson_INDIA_WITH_SURROUNDING", (_, res) => {
//   fs.readFile("./INDIA_WITH_SURROUNDING.json", (err, data) => {
//     if (err) {
//       res.status(501).send(err);
//     } else {
//       MAP_DATA = JSON.parse(data);
//       ////console.log("Sending Data to Client", MAP_DATA);

//       res.status(200).send(MAP_DATA);
//     }
//   });
// });

app.get("/geographyImages", (req, res) => {
  //console.log("req.query.color", req.query.color);
  // const actualColor = req.query.color.split("?")[0];
  //console.log("actualColor", actualColor);
  // const color = actualColor.toUpperCase() || "gray"; // Default color is gray
  //console.log("finalColor", color);
  const { imageFileName } = req.params;
  const svgPath = path.join(__dirname, "/images/device/" + imageFileName);
  //console.log("svgPath", svgPath);
  const modifiedSvg = modifySvgColor(svgPath, color);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(modifiedSvg);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const HostServer = http.createServer(app);
//const HostServer = https.createServer(
//  {
//    key: fs.readFileSync("certificates/private.key"),
//   cert: fs.readFileSync("certificates/private.crt"),
//   passphrase: "",
// },
// app
//);

HostServer.listen(HOSTING_PORT, async () => {
  //console.log(`server running on https port ${HOSTING_PORT}`);
  //await signalFetchData();
  //await pointFetchData();
});
