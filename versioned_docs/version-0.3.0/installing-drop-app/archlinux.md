# Installing the drop-app client on Archlinux

To install the client application on your system,
you will need to be able to install packages from the [AUR](https://aur.archlinux.org/).
This is usually done using `yay` or `paru` package managers.
These extend the default package manager `pacman` with the ability
to download and install packages from the AUR.
If you do not have one installed, you can [install yay](https://github.com/Jguer/yay).

## Installing `libayatana-appindicator`

This library is dependency of drop-app. Without it, drop-app will crash on start up.

```bash
yay -S libayatana-appindicator
```

## Installing drop-app

```bash
yay -S drop-oss-app-bin
```

### Uninstalling drop-app

```bash
yay -R drop-oss-app-bin libayatana-appindicator
```
