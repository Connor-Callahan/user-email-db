# Sandbox Description
A RESTful API with Node.js, Express, and PostgreSQLation with postgres and express. 

# Requirements: 
- Docker

# STEPS:

1. Download the folder
2. In your ~ directory, create a file called sandbox.docker.env that contains `DD_API_KEY=<Your API Key>` if one does not already exist to avoid adding an API key in plain text to a repo. 
3. Run `docker-compose build` to build the docker image
4. Run `docker-compose up` to spin up the containers
5. Open Chrome and hit `http://localhost:3000/api/`
6. Use curl to add data (name && email) or from the form in the frontend app

```
curl -X POST \
  http://localhost:3000/api/users/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: f032b670-b8e0-409a-b817-37ae6cac1868' \
  -H 'cache-control: no-cache' \
  -d 'name=Spongebob&email=@bikinibottom.com'
 ```

8. See traces in your account

Run `docker-compose down` to stop and remove the containers

# Notes

## Logging with Winston 

```
const { createLogger, transports, format } = require("winston");

const LoggerService = createLogger({
  level: "info",
  format: format.combine(
    format.json(),
    format.timestamp()
  ),
  defaultMeta: { service: "user-email-db"},
  transports: [new transports.Console()],e
});

module.exports = LoggerService
```

## Useful Links
https://hashinteractive.com/blog/docker-compose-up-with-postgres-quick-tips/

https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications

