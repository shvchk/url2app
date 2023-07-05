import '../util/browser-polyfill.js';
import { defaultPrefs, getPrefs } from '../prefs.js';

const info = document.getElementById('info');

function restore() {
  getPrefs().then(prefs => {
    document.getElementById('allowedUrlPatterns').value = prefs.allowedUrlPatterns.join('\n');
    document.getElementById('mediaTypeHintEnabled').checked = prefs.mediaTypeHintEnabled;
  });
}

function save() {
  browser.storage.local.set({
    allowedUrlPatterns: document.getElementById('allowedUrlPatterns').value
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter((h, i, l) => h && l.indexOf(h) === i),
    mediaTypeHintEnabled: document.getElementById('mediaTypeHintEnabled').checked,
  }).then(() => {
    info.textContent = 'Saved';
    restore();
    window.setTimeout(() => info.textContent = '', 1000);
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
