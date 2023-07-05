// Clean incoming URL of x-url2app:// prefix
var url = WScript.arguments(0).replace('x-url2app://', '');
var shell = WScript.CreateObject('WScript.Shell');

if (url === WScript.arguments(0)) {
  shell.Popup('Wrong protocol: ' + url);
  WScript.Quit();
}

// Process media type hint
var mediaTypeHint = url.slice(url.indexOf('###mediaType='));
var mediaType = mediaTypeHint.replace(/.*=/, '');
url = url.replace(/###mediaType=.*/, '');


// Example media type hint handling, enable / edit as needed
//switch(mediaType) {
//  case 'image':
//    shell.Run('"C:\\Program Files\\GIMP 2\\bin\\gimp-2.10.exe" "' + url + '"');
//    WScript.Quit();
//    break;
//
//  case 'audio':
//    shell.Run('mpv.exe --force-window --keep-open "' + url + '"');
//    WScript.Quit();
//    break;
//
//  case 'video':
//    shell.Run('mpv.exe --keep-open "' + url + '"');
//    WScript.Quit();
//    break;
//}


// Hints didn't help or are off, now we have to guess by URL only
// Example URL handling, enable / edit as needed
//if (/.*pdf$/.test(url)) {
//  shell.Run('"C:\\Program Files\\Okular\\bin\\okular.exe" "' + url + '"');
//
//} else if (/.*(\.avi|mp4|mkv|mov|webm|\.ts)$/.test(url)) {
//  shell.Run('mpv.exe --keep-open "' + url + '"');
//
//} else if (/.*(youtu\.be|youtube\.com\/watch).*/.test(url)) {
//  shell.Run('mpv.exe --keep-open "' + url + '"');
//
//} else if (/.*(jpg|jpeg|png|webp)$/.test(url)) {
//  shell.Run('"C:\\Program Files\\GIMP 2\\bin\\gimp-2.10.exe" "' + url + '"');
//
//} else {
  shell.Popup('Good news! x-url2app:// protocol handler is working fine!\n' +
              '\n' +
              'This URL has no handler defined, though: ' + url + '\n' +
              'You can add one in ' + WScript.ScriptFullName, 0, 'url2app');
//}
