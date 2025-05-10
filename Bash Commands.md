- `sudo nmtui` - like Windows network setting, shows a interactive interface to adjust connections.
- `sudo rm /path...` - remove/delete file 
- To manually set <u>dhcp</u>: `sudo ifconifg {interface} x.x.x.x netmask x.x.x.x` 

- To check if <u>dhcp</u> is config run `sudo dhclient {interface} -v`

- `-v` is a option stand for verbose. It print each command or input line as it's read.
  - Useful to log info. 
- `route -n` or `netstat -rn` should show the routing table
- `sudo systemctl status NetworkManager` - check which network management service is being used
- `nmcli` - used for network connections and devices via NetworkManager
- `nmcli device status` - show available interfaces and their status
  - Similar to `ifconfig` but does not show address, just their status as clearly shown. 





