"use strict";const e=require("electron"),o=require("path");let n=e.BrowserWindow|null;const r=()=>{n=new e.BrowserWindow({webPreferences:{devTools:!0,contextIsolation:!1,nodeIntegration:!0}}),e.app.isPackaged?(console.log("__dirname:",__dirname),n.loadFile(o.join(__dirname,"../index.html"))):(console.log("process.env:",process.env),n.loadURL(`${process.env.VITE_DEV_SERVER_URL}`))};e.app.whenReady().then(r);