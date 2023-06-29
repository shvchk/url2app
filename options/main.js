import {defaultPrefs} from '../defaultPrefs.js';

const info = document.getElementById('info');

function restore() {
  chrome.storage.local.get(defaultPrefs, prefs => {
    document.getElementById('allowedUrlPatterns').value = prefs.allowedUrlPatterns.join('\n');
  });
}

function save() {
  chrome.storage.local.set({
    allowedUrlPatterns: document.getElementById('allowedUrlPatterns').value
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter((h, i, l) => h && l.indexOf(h) === i),
  }, () => {
    info.textContent = "Saved";
    restore();
    window.setTimeout(() => info.textContent = '', 1000);
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
