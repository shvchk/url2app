const defaultPrefs = {
  allowedUrlPatterns: ['*://*/*'],
  mediaTypeHintEnabled: false
}

const getPrefs = (prefs = defaultPrefs) => chrome.storage.local.get(prefs);

export {
  defaultPrefs,
  getPrefs
};
