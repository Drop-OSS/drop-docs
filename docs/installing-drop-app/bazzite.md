# Installing the drop-app client on Bazzite

To install the client app, you will need to use distrobox which allows
us to install packages from other distributions inside a container.

The first thing you'll need to do is open a terminal application.
In the terminal, you need to create a distrobox container.
This container will be created using the archlinux image.

```bash
# Create the distrobox container called drop-app
distrobox create --image archlinux drop-app
distrobox enter drop-app
```

It will take a few seconds to prepare the container.
Once ready, you need to install the `yay` package manager to be able to install packages from the [AUR](https://aur.archlinux.org/).

```bash
# This enables the multilib repository which is needed to install umu-run and drop-app
sudo sh -c 'printf "\n\n[multilib]\nInclude = /etc/pacman.d/mirrorlist\n" >> /etc/pacman.conf'
# Updates repositories and system
sudo pacman -Syu --noconfirm
sudo pacman -S --needed --noconfirm base-devel git
git clone https://aur.archlinux.org/yay.git
cd yay
# This will build and install yay
makepkg -si --noconfirm
# We can now delete the yay folder
cd .. && rm -rf ./yay
```

Next, you can install drop and its dependencies:

- `libayatana-appindicator` is the library needed to display drop-app in the systray.
- `umu-run` is needed to start windows games in drop-app.
  If you only intend on installing Linux native games, then you can remove it from the next command.

You will be asked to choose between a few providers.
You can choose `gnu-free-fonts` when asked about `ttf-font`,
and you can choose `lib32-vulkan-radeon` when asked about `lib32-vulkan-driver`.

```
📦[deck@drop-app ~]$ yay -S libayatana-appindicator umu-run drop-oss-app-bin
Sync Explicit (1): umu-launcher-1.2.9-1
resolving dependencies...
:: There are 11 providers available for ttf-font:
:: Repository extra
   1) gnu-free-fonts  2) noto-fonts  3) ttf-bitstream-vera  4) ttf-croscore  5) ttf-dejavu  6) ttf-droid  7) ttf-ibm-plex  8) ttf-input  9) ttf-input-nerd
   10) ttf-liberation  11) ttf-roboto

Enter a number (default=1):
:: There are 10 providers available for lib32-vulkan-driver:
:: Repository multilib
   1) lib32-nvidia-utils  2) lib32-vulkan-asahi  3) lib32-vulkan-dzn  4) lib32-vulkan-freedreno  5) lib32-vulkan-gfxstream  6) lib32-vulkan-intel
   7) lib32-vulkan-nouveau  8) lib32-vulkan-radeon  9) lib32-vulkan-swrast  10) lib32-vulkan-virtio

Enter a number (default=1): 8
```

Once the installation is complete, you will need to export `umu-run` and then `drop-app` to SteamOS.

```bash
distrobox-export --bin /usr/bin/umu-run
distrobox-export --app drop-app
# Go back to SteamOS
exit
```

The drop-app application should be appear in your application menu.

## Update drop-app

In the terminal, you need to enter the drop-app container and update system packages within in.

```bash
distrobox enter drop-app
yay
exit
```

## Uninstall the drop-app client

The following command will delete the distrobox container and delete the drop-app application from your system.

```bash
distrobox rm drop-app --force
```
