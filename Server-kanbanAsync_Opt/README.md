# set up MongoDB (do once)
$ sudo apt-get install mongodb-org

# start server
1. Launch MongoDB
$ sudo mongod --bind_ip=$IP --dbpath=/data/db --nojournal

2. If the launch fails, type the following 3 commands to re-launch it
$ sudo rm /data/db/mongod.lock
$ mongod --dbpath /data/db --repair
$ sudo mongod --bind_ip=$IP --dbpath=/data/db --nojournal

3. Open another terminal and launch Express.JS server
$ node server.js

# access server
To update a card, the React.JS code needs to send the PUT request to /api/
cards/<card id>

## Database address for access:
The URL format from c9.io is https://<workspace-name>-<username>.c9users.io
So the API_URL = "https://mongo-server-lisali.c9users.io:8080/api".