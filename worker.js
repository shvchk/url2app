import {defaultPrefs} from './defaultPrefs.js';

const prefs = defaultPrefs;

chrome.storage.onChanged.addListener(updatedPrefs => {
  Object.keys(updatedPrefs).forEach(k => {
    prefs[k] = updatedPrefs[k].newValue;
  });
  
  updateMenus(prefs);
});

// Prefs are only up-to-date on the first run. For all other needs call storage.local.get().then()
const once = () => chrome.storage.local.get(defaultPrefs).then(restoredPrefs => {
  Object.assign(prefs, restoredPrefs);
  init(prefs);
});

chrome.runtime.onStartup.addListener(once);
chrome.runtime.onInstalled.addListener(once);


function updateMenus(prefs) {
  chrome.contextMenus.update("url2app-link", {
    "targetUrlPatterns": prefs.allowedUrlPatterns
  });

  chrome.contextMenus.update("url2app-page", {
    "documentUrlPatterns": prefs.allowedUrlPatterns
  });
}

function init(prefs) {
  chrome.contextMenus.create({
    "id": "url2app-link",
    "title": "Open in app",
    "contexts": ['link'],
    "targetUrlPatterns": prefs.allowedUrlPatterns
  });

  chrome.contextMenus.create({
    "id": "url2app-page",
    "title": "Open in app",
    "contexts": ['page'],
    "documentUrlPatterns": prefs.allowedUrlPatterns
  });
}

chrome.action.onClicked.addListener(function (i) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, ([currentTab]) => {
    chrome.tabs.update({ url: 'url2app://' + currentTab.url });
  });
});

chrome.contextMenus.onClicked.addListener(link => {
  const url = link.linkUrl || link.pageUrl;
  chrome.tabs.update({ url: 'url2app://' + url });
});
