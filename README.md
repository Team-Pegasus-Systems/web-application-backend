# web-application-backend

first create config folder and inside that create default.json with port number (key is "port").

ex: 
{
    "port": 5000
}

this file may contains sensitive data like credentials so this file is excluded

for module installation, open cmd in root folder, and run "npm init" (make sure package.json and package-lock.json is present)

after installation, run "npm start" to deploy server

to deploy server as dev environment, run "npm run dev"