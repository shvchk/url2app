import '../util/browser-polyfill.js';
import { defaultPrefs, getPrefs } from '../prefs.js';

function restore() {
  return getPrefs().then(prefs => {
    document.getElementById('allowedUrlPatterns').value = prefs.allowedUrlPatterns.join('\n');
    document.getElementById('mediaTypeHintEnabled').checked = prefs.mediaTypeHintEnabled;
  });
}

function save() {
  return browser.storage.local.set({
    allowedUrlPatterns: document.getElementById('allowedUrlPatterns').value
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter((h, i, l) => h && l.indexOf(h) === i),
    mediaTypeHintEnabled: document.getElementById('mediaTypeHintEnabled').checked,
  });
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
