import './util/browser-polyfill.js';
import {defaultPrefs} from './defaultPrefs.js';

const prefs = defaultPrefs;
const menus = {
  'page': { // id suffix, used in contextMenus.create → id
    'contexts': ['page'], // ContextType, as in contextMenus.create → contexts
    'srcProp': 'pageUrl' // OnClickData, as in contextMenus.onClicked event info
  },
  'link': {
    'contexts': ['link'],
    'srcProp': 'linkUrl'
  },
  'media': {
    'contexts': ['image', 'audio', 'video'],
    'srcProp': 'srcUrl'
  }
}

browser.storage.onChanged.addListener(updatedPrefs => {
  Object.keys(updatedPrefs).forEach(k => {
    prefs[k] = updatedPrefs[k].newValue;
  });
  
  updateMenus(menus, prefs);
});

// Prefs are only up-to-date on the first run. For all other needs call storage.local.get().then()
const once = () => browser.storage.local.get(defaultPrefs).then(restoredPrefs => {
  Object.assign(prefs, restoredPrefs);
  createMenus(menus, prefs);
});

browser.runtime.onStartup.addListener(once);
browser.runtime.onInstalled.addListener(once);


function updateMenus(menus, prefs) {
  for (const m in menus) {
    browser.contextMenus.update(`url2app-${m}`, {
      'targetUrlPatterns': prefs.allowedUrlPatterns
    });
  }
}

function createMenus(menus, prefs) {
  for (const m in menus) {
    browser.contextMenus.create({
      'id': `url2app-${m}`,
      'title': `Open ${m} in app`,
      'contexts': menus[m].contexts,
      'targetUrlPatterns': prefs.allowedUrlPatterns
    });
  }
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
  const menuId = link.menuItemId.replace('url2app-', '');
  const url = link[menus[menuId].srcProp];
  browser.tabs.update({ url: 'x-url2app://' + url });
});
