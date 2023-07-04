$name = "url2app"
$protocol = "x-$name"

$handlerDir = "${env:LocalAppData}\${name}"
$handlerPath = "${handlerDir}\{$name}.js"
$handlerUrl = "https://github.com/shvchk/url2app/raw/main/host/windows/url2app.sh"

$protocolDir = "HKCU:\SOFTWARE\Classes\$protocol"
$protocolCmdDir = "${protocolDir}\shell\open\command"
$protocolCmd = "wscript ""$handlerPath"" ""%1"""


try {
  New-Item -Path "$handlerDir" -Force
  Invoke-WebRequest "$handlerUrl" -OutFile "$handlerPath"

  New-Item -Path "$protocolDir" -Force
  New-Item -Path "$protocolCmdDir" -Force
  New-ItemProperty -Path "$protocolDir" -Name "(Default)" -Value "URL:$protocol" -Force
  New-ItemProperty -Path "$protocolDir" -Name "URL Protocol" -Force
  New-ItemProperty -Path "$protocolCmdDir" -Name "(Default)" -Value "$protocolCmd" -Force
} catch {
  Write-Error $_.Exception.ToString()
  Read-Host -Prompt "Press Enter to exit"
}
