# url2app

Browser extension to open any page / link / URL in any external app using `url2app://` protocol handler. **No** running native client required.


## Installation

1. Install browser extension

    - [Firefox](https://addons.mozilla.org/firefox/addon/url2app)

    - Chrome and Chromium-based: [load unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) for now

2. Create `url2app://` protocol handler script and register it with your host OS, see [Host-side installation](#Host-side-installation) section.

3. Right-click on any page or link → Open in app.

    Clicking extension icon in the toolbar does the same for the current page.

    On the first time, browser will ask for confirmation, you can check "Always allow..." to open links without confimation in future.

4. By default, 'Open in app' menu entry shows on all pages and for all links. You can change this in extension options, providing your own list of [host match patterns](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Match_patterns).


## Host-side installation

### Linux / FreeBSD

- **Automatic**

  - Review [install script](host/nix/install.sh)

  - Download and run it:
    ```sh
    wget -O- https://github.com/shvchk/url2app/raw/main/host/nix/install.sh | bash
    ```

  This will do everything described in **Manual** subsection below, automatically.

  Example script `~/.local/bin/url2app.sh` has several handlers, but only one active: `notify-send` — which will just show you a notification with a URL. Uncomment, change or add handlers as you like.

- **Manual**

  <details>
  <summary>Show</summary>

  - Create a script (e.g. `~/.local/bin/url2app.sh`) to redirect incoming links to actual apps, see [example `url2app.sh`](host/nix/url2app.sh)

  - Create a `.desktop` file (e.g. `~/.local/share/applications/url2app.desktop`) to run that script, see [example `url2app.desktop`](host/nix/url2app.desktop)

  - Register that `.desktop` file as a `url2app://` protocol handler:
    ```sh
    xdg-mime default ~/.local/share/applications/url2app.desktop x-scheme-handler/url2app
    ```

  - Rebuild database of MIME types handlers:
    ```sh
    update-desktop-database ~/.local/share/applications
    ```
  </details>


### Windows

Coming soon...
