# File Transfer

## Window (powershell) to Raspberry Pi (Bash)

Using SCP (Secure Copy Protocol): Uses SSH to ensure secure (encrypted) file/ transfer between local machines or transferring data between servers.

1. Single File

   ```powershell
   scp file.txt username@hostname:destination
   ```

   ```powershell
   scp Desktop/README.md Prox@RaspberryPi:/home/Prox/Desktop
   ```

2. Folder: add `-r` after `scp` to include the directory and the content it contain

   ```powershell
   scp -r Desktop/snake Prox@RaspberryPi:/home/Prox/Desktop
   ```

   

## Raspberry Pi to Windows

Using SCP:

1. Make sure `ssh` server is install on windows in `Optional Features` in Windows settings.

2. Start running `sshd`: `start-Service sshd` 
   - Make sure the shell is running administrator
   - `get-service sshd` to check if sshd is running or in task manager in details

3. Connect to the laptop ssh

   ```bash
   ssh username@ip_address
   ```

   - The ip_address is the ethernet (10.0.0.1)

4. The password is the password set in `sign-in option` under account setting

5. Transfer file

   - Single File: 

     `scp Desktop/file.txt username@ip_address:/Users/username/...`

   - Folder

     `scp test username@ip_address:/.../...`

### Notes

- Use `whoami` to get the laptop username
- Make sure password is set in `sign-in option` in settings
