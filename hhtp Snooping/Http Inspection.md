# Sniffing

Checking for raw validation input value of a http website using Wireshark and a custom Python script. 

Hosting the backend validation site through RP. 

## Setup

1. Transfer backend file folder to RP from laptop using `SCP`
2. Install node using npm using nvm
   - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
   - `nvm install --lts` for the latest stable node version
3. Might need to rebuild some packages since the files transfer bycrypt dependencies is for window, not Linux
   - `npm rebuild {packet_name}`
   - Else delete node_modules folder (`sudo rm -r`)and reinstall the required dependencies
4. Install MariaDB and create a SQL database table: same process when setting up AWS EC2 

5. `npm run dev` should work in RP terminal
6. Check if laptop can connect to `http://10.0.0.2:4000/homepage`

## Wireshark

1. Singup or login to an account
2. In Wireshark, filter `hhtp` and look for the packet that have `POST` request
3. Right click the packet and select *follow* and than *http* 
4. Since the site is HTTP, all the text is raw, not encrypted when the packet sent to 10.0.0.2 after valid inputs



## Scapy Script

1. Contain one function that will run in a infinite loop to check for TCP packets only and with the correct port value (contain http and 4000). 
2. If found one, save the packet to a list. After 20 capture, iterate over the list to check if have Raw layer (may contain binary, text/ASCII, application data, etc). 
3. If so, check if it have the text `/login` or `/signin` (html file path). 
4. Finally it check if that the word `password`. If so, grab the validation values and write to the text file. 

