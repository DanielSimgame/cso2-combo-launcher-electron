import { app, BrowserWindow, shell, ipcMain, globalShortcut } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import Misc from '../utils/Misc'
import * as fs from "fs";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
let config: LauncherConfig

/**
 * @function getConfigJson
 * @description 获取配置文件
 * */
const getConfigJson = () => {
  // remove last path segment by '/'
  const execPath = app.getPath('exe').split('/').slice(0, -1).join('/')
  const configPath = execPath + '/config.json'
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    // config = require(configPath)
  }
  catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('no config file')
      const newConfig: LauncherConfig = {
        username: '',
        password: '',
        server: 'shanghai',
        launcherLanguage: 'zhCN',
      }
      // create config.json file
      fs.writeFile(configPath, JSON.stringify(newConfig), err => {
        if (err) console.log(err)
        // send error to renderer
        win?.webContents.send('error', err)
      })
    }
  }
}

/**
 * @function windowDrag
 * @description 窗口拖拽
 * */
const windowDrag = (pos: number[]) => {
  // make window move with mouse
  const [x, y] = pos || [0, 0]
  win?.setPosition(x + 1, y + 1, false)
  win?.setPosition(x, y, false)
}

/**
 * @function windowEventHandler
 * @description 自定义的窗口事件处理
 * */
const windowEventHandler = (event, args: CustomWindowEvent) => {
  const eventFuncMap = new Map([
    ['quit', () => app.quit()],
    ['minimize', () => win?.minimize()],
    ['drag', () => windowDrag(args.pos)],
  ])
  if (eventFuncMap.get(args.name) === undefined) return
  eventFuncMap.get(args.name)?.()
}

/**
 * @function pullQq
 * @description 拉起QQ，加入群聊
 * @param _ 窗口事件
 * @param args {string} QQ群号
 * */
const pullQq = (_, args) => {
  const groupUrl = `tencent://groupwpa/?subcmd=all&param=${Misc.stringToHex('groupUin:' + args)}`
  shell.openExternal(groupUrl)
      .then(_ => {})
      .catch(e => console.log('catch',e))
}

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    width: 800,
    height: 500,
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    webPreferences: {
      // devTools: false,
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  getConfigJson()

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344

  ipcMain.on('window-event', windowEventHandler)

  ipcMain.on('pull-qq', pullQq)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  globalShortcut.register('f5', () => {})
  globalShortcut.register('CommandOrControl+R', () => {})
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
