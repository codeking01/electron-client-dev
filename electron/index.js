import {app, BrowserWindow} from 'electron'
import path from 'path'
//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。

let win = BrowserWindow | null;
//定义全局变量获取 窗口实例

const createWindow = () => {
    win = new BrowserWindow({
        //
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            nodeIntegration: true
            //允许html页面上的javaScript代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })
    console.log("app.isPackaged:", app.isPackaged)
    if (app.isPackaged) {
        console.log("__dirname:", __dirname)
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
    else if (process.env.NODE_ENV !== 'development') {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    } else {
        console.log("process.env:", process.env)
        //VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME。
        // VITE_DEV_SERVER_URL("vite-plugin-electron": "^0.11.1")
        win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)
        // win.loadURL(`http://${process.env['VITE_DEV_SERVER_URL']}:${process.env['VITE_DEV_SERVER_PORT']}`)
    }
}
//isPackage 不好使换下面的 配合 cross-env去设置
// console.log("process.env,"ssss")
//  if(process.env.NODE_ENV != 'development'){
//  win.loadFile(path.join(__dirname, "../index.html"));
//  }else{
//  win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOSTNAME']}:${process.env['VITE_DEV_SE//RVER_PORT']}`)
// win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)
// }

//在Electron完成初始化时被触发
app.whenReady().then(createWindow)