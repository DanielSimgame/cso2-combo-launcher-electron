interface LauncherConfig {
    username: string
    password: string
    server: {
        id: number
        name: string
        translation: string
        unavailable: boolean
    }
    launcherLanguage: string
    advancedCommand?: string
    gameLanguage?: string
    gameResolution?: string
    gameFullscreen?: boolean
    gameShowFps?: boolean
}
