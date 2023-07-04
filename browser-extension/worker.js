import './util/browser-polyfill.js';
import {defaultPrefs} from './defaultPrefs.js';

const prefs = defaultPrefs;

browser.storage.onChanged.addListener(updatedPrefs => {
  Object.keys(updatedPrefs).forEach(k => {
    prefs[k] = updatedPrefs[k].newValue;
  });
  
  updateMenus(prefs);
});

// Prefs are only up-to-date on the first run. For all other needs call storage.local.get().then()
const once = () => browser.storage.local.get(defaultPrefs).then(restoredPrefs => {
  Object.assign(prefs, restoredPrefs);
  init(prefs);
});

browser.runtime.onStartup.addListener(once);
browser.runtime.onInstalled.addListener(once);


function updateMenus(prefs) {
  browser.contextMenus.update('url2app-link', {
    'targetUrlPatterns': prefs.allowedUrlPatterns
  });

  browser.contextMenus.update('url2app-page', {
    'documentUrlPatterns': prefs.allowedUrlPatterns
  });
}

function init(prefs) {
  browser.contextMenus.create({
    'id': 'url2app-link',
    'title': 'Open in app',
    'contexts': ['link'],
    'targetUrlPatterns': prefs.allowedUrlPatterns
  });

  browser.contextMenus.create({
    'id': 'url2app-page',
    'title': 'Open in app',
    'contexts': ['page'],
    'documentUrlPatterns': prefs.allowedUrlPatterns
  });
}

browser.action.onClicked.addListener(function (i) {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, ([currentTab]) => {
    browser.tabs.update({ url: 'x-url2app://' + currentTab.url });
  });
});

browser.contextMenus.onClicked.addListener(link => {
  const url = link.linkUrl || link.pageUrl;
  browser.tabs.update({ url: 'x-url2app://' + url });
});
