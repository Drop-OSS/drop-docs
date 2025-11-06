# Installing the drop-app client on Bazzite/SteamOS (Steam Deck)

To install the client app, you will need to use distrobox which allows
us to install packages from other distributions inside a container.

The first thing you'll need to do is open a terminal application.

```bash
# Download the client package
wget https://github.com/Drop-OSS/drop-app/releases/download/v0.3.3/Drop.Desktop.Client_0.3.3_amd64.deb
# Create the distrobox container called drop-app
distrobox create --image ubuntu drop-app
# Install dependencies
distrobox enter drop-app -- sudo apt install --yes libwebkit2gtk-4.1-0 libayatana-appindicator3-1
# Install drop-app and delete the client package file
distrobox enter drop-app -- sudo dpkg -i Drop.Desktop.Client_0.3.3_amd64.deb --yes && rm Drop.Desktop.Client_0.3.3_amd64.deb
# Make drop-app available to the host OS
distrobox enter drop-app -- distrobox-export --app drop-app
# Delete the client package
rm Drop.Desktop.Client_0.3.3_amd64.deb
```

The drop-app application should be be in your application menu.

# Uninstall the drop-app client

The following command will delete the distrobox container and delete the drop-app application from your system.

```bash
distrobox rm drop-app --force
```
