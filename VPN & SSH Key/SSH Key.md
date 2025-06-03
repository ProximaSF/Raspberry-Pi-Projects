# Adding SSH Key to RP

Generate a SSH key to better protection/authentication when signing into Raspberry Pi, especially over different internets. 

1. On laptop, enter .ssh folder: `cd .ssh`

2. Generate a desire ssh key based on a algorithm. Visit this site for guide: https://www.ssh.com/academy/ssh/keygen
   - Simply use the keyword `ssh-genkey` will automatically generate a key before asking for the name of the key it will be and if you want to set a password or not.

   - `-t` argument is the type of algorithm it will use to generate the key

   - `-b`: argument for the size of the key

     

3. Once created, `scp` the created key (`{key_name.pub}`) to Raspberry. 
   - `scp {key_name}.pub Username@IP_Address`

4. Once transferred, log into RP, create a `.ssh` folder in the home directory do not exist.
   - `sudo mkdir .ssh`

5. Move the key file into .ssh
   - `touch .ssh/authorized_keys`: to create a new/empty file if do not exist, else update timestamp
   - `cat <file.pub> >> .ssh/authorized_keys`: takes the contents of a file and appends (`>>`) it to the `authorized_keys` file.
   - Using single `>` will overwrite the entire file rather appending

6. Locate `sshd_config` and edit some properties in RP
   - `sudo nano /etc/ssh/sshd_config`
   - Once in, turn the following property to `true`
     1. `PermitRootLogin ` → `false`
     2. `PubkeyAuthentication ` → `yes` 
     3. `PasswordAuthantication` → `no` Prevent login using root password without the key

7. Reset RP system for ssh
   - `sudo systemctl restart ssh`

8. Try login (local) `ssh -i {ssh_key_file} Username@IP_Address_of_RP`



## Connecting to RP on Different Network

1. Go to the router administrator login: `http://{router_IP_Address}`

   - The same router RP is connected to

2. Find Port Forwarding

3. Create a new Rule for the RP

   - Name the application to something
   - Set original port to 22 (default for TCP)
   - Set protocol to TCP (required for ssh)
   - Set forward address as the RP's IP address
   - Set Forward Port to 22
   - Set interval/schedule to always
   - Save/add rule

4. Check if you can connect to the RP

   - Try login from outside of network: `ssh -i {ssh_key_file} Username@IP_Address_of_RP`
     - Might need to enter password for the key if was set.
   
   - Can check if can connect to router: `telent {public_ip_address} 22`

