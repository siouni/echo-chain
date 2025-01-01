import { app, BrowserWindow } from 'electron';
import path from "path";
import { start, stop } from "./server"

let mainWindow: BrowserWindow | null = null;

function createWindow(port?: undefined | number) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    //   contextIsolation: true,
    //   nodeIntegration: false,
    // },
  });

  // 開発モードとプロダクションモードの切り替え
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8081');
  } else {
    // サーバーのローカルホストURLに接続
    mainWindow.loadURL(`http://localhost:${port}`);
  }
  

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (process.env.NODE_ENV === 'development') {
    createWindow();
  } else {
    start().then((port) => {
      createWindow(port);
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('quit', () => {
  if (process.env.NODE_ENV !== 'development') {
    stop();
  }
});