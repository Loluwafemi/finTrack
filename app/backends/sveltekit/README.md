# sveltekit

## Executing Backend.

Use the following steps to start the backend
1. Install package dependencies: `npm install`
2. Start development environment/execution: `npm run dev`

> reverse the port on the backend to the port both the admin and android can listen to with (this has been automatically handled. ignore steps):

`portproxy add v4tov4 connectaddress=localhost connectport=8080 listenaddress=127.0.0.1 listenport=8080 protocol=tcp`

1. connector is the custom port: 8080
2. listner is the initial port of the host: 5173

e.g 8080 -> 5173

every request 8080 get reversed to 5173

Note: use 8088



### Excel Key 
`figtrack-enckey`

### Port Managing
Ensure to run the backend before other application

incase port 8080 is already replaced by another application do the following:

use: `netstat -ano` to verify if it is already assigned

use `taskkill /PID <PID> /F` to kill the process


# structure
This system to handle just the backend of an app through API.
With this application, postgres is connected to manage the api transactions and Lucia Auth is integrated to handle Authentications and Authorizations.

The Structure of this API is as follows:
root -> api/
    auth
        /signup
        /login
        /forgot
        [add more]
    service
        /submit-receipt
        /fetch-record
        [add more]

    [add more]

## Building

To create a production version of your app:

```bash
npm run build
```

adb reverse tcp:8080 tcp:8080



## Reverse the port to ensure the emulator gets access accross (ignore steps)


1. to show all configured port proxy rules in netsh, use the command
 `netsh interface portproxy show all`

2. `netsh interface portproxy delete v4tov4 listenport=8080`:
This command specifically deletes the IPv4 port proxy rule listening on port 8080.


3. `netsh interface portproxy reset`: This command resets the portproxy configuration to its default state, effectively deleting all existing rules. 


4. Then reverse the host to a secure one.

> map the backend[PORT:5173] to another port accessible to android and admin PORT:8080

Enter: 
`netsh interface portproxy add v4tov4 connectaddress=127.0.0.1 connectport=5173 listenaddress=127.0.0.1 listenport=8080 protocol=tcp`