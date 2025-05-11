- `cat file_name` to read the raw text of that file 
  - Better than using `sudo nano` which will allow editing if only want to read

- `sudo redir` to remove a empty directory
  - `sudo rm -r` remove directory and the content

- `sudo nmtui` - like Windows network setting, shows a interactive interface to adjust connections.
- `sudo rm /path...` - remove/delete file 
- To manually set <u>dhcp</u>: `sudo ifconifg {interface} x.x.x.x netmask x.x.x.x` 

- To check if <u>dhcp</u> is config run `sudo dhclient {interface} -v`

- `-v` is a option stand for verbose. It print each command or input line as it's read.
  - Useful to log info. 
- `route -n` or `netstat -rn` should show the routing table
- `sudo systemctl status NetworkManager` - check which network management service is being used
- `nmcli` - used for network connections and devices via NetworkManager
- `nmcli device` - show available interfaces and their status
  - Similar to `ifconfig` but does not show address, just their status as clearly shown. 
- `apt-get` is a packet manager
  - `sudo apt-get install packet_name` to install a package
  - `sudo apt-get -h` to a list of command for apt-get






