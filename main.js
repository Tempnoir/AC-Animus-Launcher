const { app, BrowserWindow, ipcMain } = require('electron');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Persistent config path in Windows %APPDATA%
const configPath = path.join(app.getPath('userData'), 'config.json');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Allows loading local assets smoothly
    }
  });

  mainWindow.setMenuBarVisibility(false);

  // Make sure this matches your exact HTML file name in the folder
  mainWindow.loadFile('ACLauncherV3.html');
}

app.whenReady().then(createWindow);

// IPC Handlers for Settings Persistence
ipcMain.handle('get-settings', () => {
  try {
    if (fs.existsSync(configPath)) {
      const rawData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(rawData);
    }
  } catch (err) {
    console.error('Error reading settings config:', err);
  }
  return null;
});

ipcMain.handle('save-settings', (event, newSettings) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(newSettings, null, 2), 'utf8');
    return { success: true };
  } catch (err) {
    console.error('Error saving settings config:', err);
    return { success: false, error: err.message };
  }
});

// IPC Handler for launching games safely via executable path or URI
ipcMain.on('launch-game', (event, gamePath) => {
  if (gamePath.startsWith('steam://') || gamePath.startsWith('http://') || gamePath.startsWith('https://')) {
    exec(`start "" "${gamePath}"`, (error) => {
      if (error) {
        console.error(`Failed to launch URI: ${error}`);
      }
    });
  } else {
    const gameDir = path.dirname(gamePath);
    const gameProcess = spawn(gamePath, [], {
      cwd: gameDir,
      detached: true,
      stdio: 'ignore'
    });
    gameProcess.unref();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});