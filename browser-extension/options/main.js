import '../util/browser-polyfill.min.js';
import {defaultPrefs} from '../defaultPrefs.js';

const info = document.getElementById('info');

function restore() {
  browser.storage.local.get(defaultPrefs).then(prefs => {
    document.getElementById('allowedUrlPatterns').value = prefs.allowedUrlPatterns.join('\n');
  });
}

function save() {
  browser.storage.local.set({
    allowedUrlPatterns: document.getElementById('allowedUrlPatterns').value
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter((h, i, l) => h && l.indexOf(h) === i),
  }).then(() => {
    info.textContent = 'Saved';
    restore();
    window.setTimeout(() => info.textContent = '', 1000);
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
