// Clean incoming URL of x-url2app:// prefix
var url = WScript.arguments(0).replace('x-url2app://', '');
var shell = WScript.CreateObject('WScript.Shell');

if (url === WScript.arguments(0)) {
  shell.Popup('Wrong protocol: ' + url);
  WScript.Quit();
}

if (/.*pdf$/.test(url)) {
  //shell.Run('"C:\\Program Files\\Okular\\bin\\okular.exe" "' + url + '"');

//} else if (/.*(\.avi|mp4|mkv|mov|webm|\.ts)$/.test(url)) {
  //shell.Run('mpv.exe "' + url + '"');

//} else if (/.*(youtu\.be|youtube\.com\/watch).*/.test(url)) {
  //shell.Run('mpv.exe "' + url + '"');

//} else if (/.*(jpg|jpeg|png|webp)$/.test(url)) {
  //shell.Run('"C:\\Program Files\\GIMP 2\\bin\\gimp-2.10.exe" "' + url + '"');

} else {
  shell.Popup('No handler for ' + url + '\n' +
              'You can add one in ' + WScript.ScriptFullName);
}
