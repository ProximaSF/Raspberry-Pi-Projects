# Raspberry Pi Setup Remote Access

How to access Raspberry Pi (RP) files since I'm too broke to buy a monitor using SSH.  

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
		To connect to any workstation or Raspberry Pi it needs three parameters:
1. Unique IP address - on local network
2. Gateway - for non-local network
3. Subnet Mask - define local network

	

### SSH (Secure Shell) Process

- <u>RP not connected to Wifi (using ethernet):</u>
  - Connect ethernet on both end (RP and laptop)
  - Go to `view network connection` on windows
  - Select the wifi the laptop is connected to
  - Press `properties `and go to `sharing `tab
  - Select `Allow other network users to connect...`
  - Select the ethernet in the dropdown menu and press `okay`
  - Try ping: `ping {RP_hostname.local}` to see if it works
  - Access RP directory:
    - `ssh  username@RP_hostname.local` or `username@rp_ip_address`
  - Might need to edit `sshd_config` file or set up a IP Address to keep ssh alive for a while.

<hr>

- <u>RP connected to a Wifi:</u>
  - Simply ping the IP address of RP
  - Access RP directory:
    - In terminal type: `ssh {username}@ip_address`
      - `ssh jay@xxx.xxx.x.xxx` 
- Enable SSH config for Raspberry IP OS in <u>Raspberry Imager</u>



## Notes:

1. `Sudo`: Mean **<u>Superuser do</u>**

   -  Let the user run command with security privilege (like a admin)

2. `nano`: Is a text editor for the command line.

   - Often used to config files

3. `sudo nano /etc/ssh/sshd_config` to edit the ssh config file

   - Add: 

     ```bash
     ClientAliveInterval 300
     ClientAliveCountMax 2
     ```

     After 300s (5 minutes) of inactivity, server will send a keep-alive msg to the client (will happen 2 times).

4. When pinging laptop through RP, might need to turn off firewall first on the laptop. 
