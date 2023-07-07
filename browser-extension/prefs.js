const defaultPrefs = {
  allowedUrlPatterns: ['*://*/*'],
  mediaTypeHintEnabled: false
}

const getPrefs = (prefs = defaultPrefs) => browser.storage.local.get(prefs);

export {
  defaultPrefs,
  getPrefs
};
