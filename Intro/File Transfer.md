# File Transfer

## Window (powershell) to Raspberry Pi (Bash)

Using SCP (Secure Copy Protocol): Uses SSH to ensure secure (encrypted) file/ transfer between local machines (laptop) or transferring data between servers (RP).

1. Single File

   ```powershell
   scp {file/folder path} {server_username}@{server_hostname/server_address}:{destination_path}
   ```

   ```powershell
   scp Desktop/README.md Prox@RaspberryPi:/home/Prox/Desktop
   ```

2. Folder: add `-r` after `scp` to include the directory and the content it contain

   ```powershell
   scp -r Desktop/snake Prox@RaspberryPi:/home/Prox/Desktop
   ```

   

## Raspberry Pi to Windows

1. Make sure `ssh` server is install on windows in `Optional Features` in Windows settings.

2. Start running `sshd`: `start-Service sshd` if not on
   - Make sure the shell is running administrator
   - `get-service sshd` to check if sshd is running or in task manager in details
   - Make sure password is set in `sign-in option` in settings for SSH work for laptop

Option 1 (prob preferred):

1. `scp {local_ipaddress}:{server_path} {local_destination_path}`

    ```bash
    scp 10.0.0.2:/Desktop/test.txt Users/jaybi/Desktop
    ```

Option 2 (Connecting to local ssh):

1. Single File:

    `scp {server_path} {local_username}@{local_ip_address}:{local_destination_path}`
   
   ```bash
   scp test.txt jaybi@10.0.0.1:/Users/jaybi/Desktop
   ```

- Use `whoami` to get the laptop username (local_username) if unsure
