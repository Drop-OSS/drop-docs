# Installing the drop-app client on archlinux

To install the client application on your system,
you will need to be able to install packages from the [AUR](https://aur.archlinux.org/).
This is usually done using `yay` or `paru` package managers.
These extend the default package manager `pacman` with the ability
to download and install packages from the AUR.
If you do not have one installed, you can [install yay](https://github.com/Jguer/yay).

## Installing rust-nightly-bin

`rust-nightly-bin` is needed in order to build the drop-app client.

```bash
git clone https://aur.archlinux.org/rust-nightly-bin.git
```

There's some errors in the `PKGBUILD` that will prevent you from installing the package.
The next thing to do is to fix the `PBKBUILD`.

```bash
cd rust-nightly-bin
nvim PKGBUILD
```

Replace the content of the file with the following:

```PKGBUILD
# Contributor: micsproul at large search corporation's mail service.
# Contributor: Mohammad Alsaleh <msal@tormail.org>
# Maintainer: Steven Allen <steven@stebalien.com>

pkgname=rust-nightly-bin
pkgver=1.93.0_2025.11.04
pkgrel=1
arch=('i686' 'x86_64')
pkgdesc='Fast, concurrent, safe. The Rust programming language and its package manager, Cargo.'
url='https://www.rust-lang.org/'
license=("Apache-2.0 OR MIT")
provides=('rust' 'rust-nightly' 'cargo' 'cargo-nightly' 'rust-docs')
conflicts=('rust' 'rust-git' 'rust-nightly' 'cargo-nightly-bin' 'cargo' 'cargo-git' 'cargo-nightly' 'cargo-nightly-bin' 'rust-docs')
depends=('gcc-libs' 'llvm' 'zlib' 'sh' 'python' )
source=("rust-nightly-${pkgver}-${CARCH}-unknown-linux-gnu.tar.gz::https://static.rust-lang.org/dist/rust-nightly-${CARCH}-unknown-linux-gnu.tar.gz"
)

sha256sums=('SKIP')
options=(staticlibs !debug)

pkgver() {
  cd ${srcdir}/rust-nightly-${CARCH}-unknown-linux-gnu
  ver="$(expr "$(cat version)" : '\(.*\)-nightly')"
  date="$(expr "$(cat version)" : '.* \(.*\))')"
  echo "${ver}_${date//\-/.}"
}

package() {
    # Rust, Cargo and Documentation.
    cd rust-nightly-${CARCH}-unknown-linux-gnu
    ./install.sh \
        --disable-ldconfig \
        --destdir="${pkgdir}" \
        --prefix=/usr/ \
        --components=rustc,cargo,llvm-tools-preview,rust-std-${CARCH}-unknown-linux-gnu,rust-docs,rust-analysis-x86_64-unknown-linux-gnu


    install -dm755 "${pkgdir}/usr/share/bash-completion/"
    mv "${pkgdir}/usr/etc/bash_completion.d/" "${pkgdir}/usr/share/bash-completion/completions/"
    rm -r "${pkgdir}/usr/etc/"

    install -dm755 "${pkgdir}/usr/share/licenses/rust-nightly-bin/"

    mv "${pkgdir}"/usr/share/doc/rust/COPYRIGHT* "${pkgdir}/usr/share/licenses/rust-nightly-bin/"
    mv "${pkgdir}"/usr/share/doc/rust/licenses/* "${pkgdir}/usr/share/licenses/rust-nightly-bin/"

    # Remove cruft.
    rm "${pkgdir}/usr/lib/rustlib/"{manifest-*,install.log,uninstall.sh,components,rust-installer-version}
    #This is where the dependency on llvm git pops up
    rm  $pkgdir/usr/lib/libLLVM-*.so
    # Remove duplicate .so libraries and symlink to them.
    # https://github.com/rust-lang/rust/issues/37971
    find "${pkgdir}/usr/lib/rustlib/" -name "*.so" -exec ln -rfs -t "${pkgdir}/usr/lib/" {} +
}
```

After modifying the file, you can run the following command to install `rust-nightly-bin`:

```bash
makepkg -si
```

Once the installation is complete, you can delete the `rust-nightly-bin` folder:

```bash
cd ..
rm -r rust-nightly-bin
```

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
yay -R drop-oss-app-bin libayatana-appindicator rust-nightly-bin
```
