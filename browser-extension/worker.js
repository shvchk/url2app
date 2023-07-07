import './util/browser-polyfill.js';
import { defaultPrefs, getPrefs } from './prefs.js';

const prefs = defaultPrefs;
const menus = {
  page: { // id suffix, used in contextMenus.create → id
    contexts: ['page'], // ContextType, as in contextMenus.create → contexts
    urlPatternsProp: 'documentUrlPatterns',
    srcProp: 'pageUrl' // OnClickData, as in contextMenus.onClicked event info
  },
  link: {
    contexts: ['link'],
    urlPatternsProp: 'targetUrlPatterns',
    srcProp: 'linkUrl'
  },
  media: {
    contexts: ['image', 'audio', 'video'],
    urlPatternsProp: 'targetUrlPatterns',
    srcProp: 'srcUrl'
  }
};

// Prefs are only up-to-date on the first run. For all other needs call getPrefs().then()
const once = () => getPrefs().then(restoredPrefs => {
  Object.assign(prefs, restoredPrefs);
  createMenus(menus, prefs);
});

function createMenus(menus, prefs) {
  for (const m in menus) {
    browser.contextMenus.create({
      id: `url2app-${m}`,
      title: `Open ${m} in app`,
      contexts: menus[m].contexts,
      [menus[m].urlPatternsProp]: prefs.allowedUrlPatterns[m],
    });
  }
}

function updateMenus(menus, prefs) {
  for (const m in menus) {
    browser.contextMenus.update(`url2app-${m}`, {
      [menus[m].urlPatternsProp]: prefs.allowedUrlPatterns[m]
    });
  }
}

browser.runtime.onStartup.addListener(once);
browser.runtime.onInstalled.addListener(once);

browser.storage.onChanged.addListener(updatedPrefs => {
  Object.keys(updatedPrefs).forEach(k => {
    prefs[k] = updatedPrefs[k].newValue;
  });

  updateMenus(menus, prefs);
});

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
  let mediaTypeHint = '';

  if (menuId === 'media' && prefs.mediaTypeHintEnabled) {
    mediaTypeHint = `###mediaType=${link.mediaType}`;
  }

  browser.tabs.update({ url: 'x-url2app://' + url + mediaTypeHint });
});
