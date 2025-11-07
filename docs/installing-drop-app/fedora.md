# Installing drop-app on Fedora

## Installing `libayatana-appindicator-gtk3`

This library is dependency of drop-app. Without it, drop-app will crash on start up.

```bash
sudo dnf install libayatana-appindicator-gtk3
```

## Installing drop-app

To install drop-app on Fedora, [simply download the rpm package](https://github.com/Drop-OSS/drop-app/releases/download/v0.3.3/Drop.Desktop.Client-0.3.3-1.x86_64.rpm) and open the downloaded file.
It will open it in the Software app. You can click Install on this page.

![Installing drop-app on the Fedora Software app](installing-drop-app-on-fedora-software.png)

## Uninstalling drop-app

You can uninstall `libayatana-appindicator-gtk3` if no other applications depend on it,
or if you simply want to get rid of it, you can do so with the following:

```bash
sudo dnf remove libayatana-appindicator-gtk3
```

You can then uninstall drop with the following command:

```bash
sudo dnf remove drop-desktop-client
```
