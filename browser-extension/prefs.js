const defaultPrefs = {
  allowedUrlPatterns: ['*://*/*']
}

const getPrefs = (prefs = defaultPrefs) => chrome.storage.local.get(prefs);

export {
  defaultPrefs,
  getPrefs
};
