const defaultPrefs = {
  allowedUrlPatterns: {
    page: ['*://*/*'],
    link: ['*://*/*'],
    media: ['*://*/*'],
  },
  mediaTypeHintEnabled: false
}

const getPrefs = (prefs = defaultPrefs) => browser.storage.local.get(prefs);

export {
  defaultPrefs,
  getPrefs
};
