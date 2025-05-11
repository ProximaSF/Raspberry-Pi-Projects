# Raspberry Pi Setup Remote Access

How to access Raspberry Pi (RP) files using SSH (secure shell) since I'm too broke to buy a monitor.  

## Raspberry Pi Networking

All of the three methods uses <u>TCP/IP</u> 

- TCP (Transmission Control Protocol) - a communication protocol that provides reliable and ordered delivery of data between application across a network. 
	- Breaks data into packets 
	- Retransmits any lost packets for reliable delivery
	- Handles error
- IP (Internet Protocol) - enables communication across networks. Responsible for addressing and routing data packets from source to destination. 
	- Assigns unique IP address
	- Determine the best path for packet to travel across interconnected networks.
	- Versions are IPv4 (32-bit) and IPv6 (128-bit). 
	  - IPv4 is running out of addresses hence the IPv6
	  - IPv6 improves performance and security but does not support in all infrastructure yet. 
	
	- To connect to any workstation or Raspberry Pi it needs three parameters:
	
	  1. Unique IP address - on local network
	
	  2. Gateway - for non-local network3
	  3. Subnet Mask - define local network
	
	  

### SSH (Secure Shell) Process

- <u>RP not connected to Wifi ([using ethernet](#Ways to setup IP addresses for static ethernet connection)):</u> 
  - Connect ethernet on both end (RP and laptop)
  - Go to `view network connection` on windows
  - Select the wifi the laptop is connected to
  - Press `properties `and go to `sharing `tab
  - Select `Allow other network users to connect...`
  - Select the ethernet in the dropdown menu and press `okay`
    - Might be required to prevent ssh closing
    - This step might not be required... ping stops working when network sharing is on
  - Try ping: `ping {RP_hostname.local}`
  - Access RP directory:
    - `ssh  username@RP_hostname.local` or `ssh username@rp_ip_address`

<hr>

- Make sure SSH config for Raspberry IP OS in <u>Raspberry Imager</u> is enabled
- <u>RP connected to a Wifi:</u>
  - Simply ping the IP address of RP
  - Access RP directory:
    - In terminal type: `ssh {username}@ip_address`
      - `ssh jay@xxx.xxx.x.xxx` 

## Notes:

1. Be sure `ssh` is installed in `optional features` in windows settings

   - So the command `ssh` client works in **PowerShell** 
     - Mind as wel install ssh server also so RP can also connect to windows using ssh.
   - Should be fine in Git Bash since it comes with it (ssh client)

2. `Sudo`: Mean **<u>Superuser do</u>**

   -  Let the user run command with security privilege (like a admin)

3. `nano`: Is a text editor for the command line.

   - Often used to config files

4. `sudo nano /etc/ssh/sshd_config` to edit the ssh config file

   - Add: 

     ```bash
     ClientAliveInterval 300
     ClientAliveCountMax 2
     ```

     After 300s (5 minutes) of inactivity, server will send a keep-alive msg to the client (will happen 2 times).



### Ways to setup IP addresses for static ethernet connection

1. Using `nmtui`

   - `sudo nmtui` will shows a interface that can be used to navigate to edit connections
   - Will need to reset the connection after saving.
     - Deactivate connection, turn off RP and than turn and should IP should be config.

2. Type it manually in one command (2 steps):

   ```bash
   sudo nmcli connection modify "{CONNECTION}" ipv4.addresses 10.0.0.2/24 ipv4.gateway 10.0.0.1 ipv4.method manual
   ```

   Than reset the connection

   ```bash
   sudo nmcli connection down "{CONNECTION}" && sudo nmcli connection up "{CONNECITON}"
   ```

   - Use `nmcli device status` to find the *CONNECTION* for the ethernet device (look under the column "CONNECTION") 

3. Using `ifconfig`

   ```bash
   sudo ifconifg {interface} x.x.x.x netmask x.x.x.x
   ```

   - Than set gateway/route

     ```bash
     sudo ip route add {laptop_address/32} dev eth0
     ```

     This will remove the gateway, preventing packet transfer from both end

     ```bash
     sudo ip route del {laptop_address/32} dev eth0
     ```
