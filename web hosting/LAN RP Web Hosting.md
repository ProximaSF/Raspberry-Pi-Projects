# LAN HHTP Web Hosting

Using Simple Web Server application to host a http web server. 

- Using main laptop to host server and use RP to connect to the site using `curl`, `wget`, `lynx`

- Host http on RP only using the terminal for main laptop to connect

- Using a switch to connect laptop two and host another http server.  

  

## Main Laptop Hosting

### Using Simple Web Server Application

- Open Simple Web Hosting and start a new server with a folder that have the `index.html` file

  - Allow LAN connection in the option setup

- visit `http://10.0.0.1:8080`

- On RP: `curl http://10.0.0.1:8080`

  - Will display the raw text file of the html

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        ...
     </head>
    <body>
        HOWDY<br>☺
    </body>
    ```

- on RP: `getw http://address:port`: NOTE RECOMMENED

  - Will download the `html `file to the active directory

- on RP `lynx http://address:port`

  - Need to download the package: `sudo apt-get install lynx`
  
  - A more interactive version and represent the html page better
  
    

### Using Python http.server module (default and script version)

Below approach process is the same for both RP and laptop.

**<u>Option 1</u>**: Using default

- Navigate to the directory with the html file
- Run `python -m http.server 8000`
  - This will host the server on the device : `localhost:8000` similar to `npm run dev` for node.js
  - It can also be visited using the IP address via the ethernet: `10.0.0.x:8000`
    - Might need to turn off network sharing if on

<u>**Option 2:**</u> Using script

- Simply run `python main.py` in the terminal
  - Make sure the active directory have the script

<hr>
## Notes:



