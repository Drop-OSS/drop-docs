# Troubleshooting

## I'm on Linux, with Nvidia proprietary drivers, and Drop won't launch

Add `WEBKIT_DISABLE_DMABUF_RENDERER=1` to the Drop .desktop file:

1. Open `/usr/share/applications/Drop\ Desktop\ Client.desktop` with your preferred editor
2. Add `env WEBKIT_DISABLE_DMABUF_RENDERER=1` before `drop-app` on the `Exec=drop-app` line

## libappindicator and / or libayatana-appindicator is not present on my system

This is due to dynamic linking of the libappindicator library in tauri. We are currently working to find a workaround for this

For a temporary fix, either running any binary with `NO_TRAY_ICON=true drop-app`, or compiling from source with `NO_TRAY_ICON=true yarn tauri build` (compiling from source will compile with a disabled tray icon) will disable the tray icon, and thereby disable dependency on libappindicator.


## "Server's and client's time is out of sync..." or HTTP 0

The server and client must be within 30 seconds of each other for security reasons. Drop uses short-lived tokens to authenticate securely, and they are valid for those 30 seconds. If you are the server administrator, please ensure both your server and client have the correct time. If you are a user, please double check your own system before asking your admin.

## Default Apps / Deep Links not registering

On Windows, it appears that Deep Links are not updating between Drop releases. To resolve this issue, navigate to your Default Apps in
Settings and press "Reset Default Apps". This will, however, result in resetting all of your default apps.

## I'm using the AppImage on GNOME/Wayland, but I can not interact with the window

If your Drop window behaves strangely, i.e clicking in it makes the previously interacted window pop up on top of drop, then you might want to build the AppImage yourself.
See the [Building Drop OSS](../advanced/building.md#building-drop-app-desktop-companion-app) page.
