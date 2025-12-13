const { app, BrowserWindow } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 360,
    height: 490,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Always load React dev server in development
  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
