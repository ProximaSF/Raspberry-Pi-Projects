import http.server
import socketserver
import socket

PORT = 3000

hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
#print(hostname, local_ip)

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print('Serving on port: ', PORT)
    print(f'Hostname: {hostname} using local_ip: {local_ip}')
    httpd.serve_forever()