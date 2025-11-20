# Installing drop-app on Debian

## Installing `libayatana-appindicator3-1`

This library is dependency of drop-app. Without it, drop-app will crash on start up.

```bash
sudo apt install libayatana-appindicator3-1

```

## Installing drop-app

To install drop-app on Debian, [simply download the deb package](https://github.com/Drop-OSS/drop-app/releases/download/v0.3.4/Drop.Desktop.Client_0.3.4_amd64.deb) and open the downloaded file.
It will open it in the Software app. You can click Install on this page.

![Installing drop-app on the Debian Software app](installing-drop-app-on-debian-software.png)

## Uninstalling drop-app

You can uninstall `libayatana-appindicator3-1` if no other applications depend on it,
or if you simply want to get rid of it, you can do so with the following:

```bash
sudo apt remove libayatana-appindicator3-1
```

You can then uninstall drop with the following command:

```bash
sudo apt remove drop-desktop-client
```
