# About CIKMS UI SERVER
This is Configuration And Web Server for TELECOM NMS UI

## Prerequisites

- nodejs v16.16.0
- npm 8.11.0
- git 2.42.0+
- configuration.json must have REST API and WEBSOCKET URL configured for WCM CONNECTION
 


## Step to Run (Development Mode)

- $ git clone http://gitlab.crldomain.com/web_tech/cikms_UI_server.git
- $ cd cikms_UI_server
- $ sudo chmod -R 777 *
- $ npm install
- $ sudo chmod -R 777 *
- $ npm start

## Steps for Run (Production Mode)
- Copy build of (cikms_ui) here
- npm run build (it will create cikms_ui exe)
- ./cikms_ui
 
