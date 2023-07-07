import '../util/browser-polyfill.js';
import { defaultPrefs, getPrefs } from '../prefs.js';

function restore() {
  return getPrefs().then(prefs => {
    if (! prefs.allowedUrlPatterns.hasOwnProperty('page')) {
      prefs.allowedUrlPatterns = defaultPrefs.allowedUrlPatterns;
    }
    document.getElementById('allowedUrlPatterns-page').value = prefs.allowedUrlPatterns.page.join('\n');
    document.getElementById('allowedUrlPatterns-link').value = prefs.allowedUrlPatterns.link.join('\n');
    document.getElementById('allowedUrlPatterns-media').value = prefs.allowedUrlPatterns.media.join('\n');
    document.getElementById('mediaTypeHintEnabled').checked = prefs.mediaTypeHintEnabled;
  });
}

function save() {
  return browser.storage.local.set({
    allowedUrlPatterns: {
      page: processTextList('allowedUrlPatterns-page'),
      link: processTextList('allowedUrlPatterns-link'),
      media: processTextList('allowedUrlPatterns-media'),
    },
    mediaTypeHintEnabled: document.getElementById('mediaTypeHintEnabled').checked,
  });
}

function processTextList(id) {
  return document.getElementById(id).value
          .split(/[,\n]/)
          .map(s => s.trim())
          .filter((h, i, l) => h && l.indexOf(h) === i)
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', event => {
  save().then(() => {
    const origTargetText = event.target.textContent;
    event.target.textContent = '👌 Saved';
    restore();
    window.setTimeout(() => event.target.textContent = origTargetText, 1000);
  });
});
