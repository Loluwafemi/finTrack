# sveltekit

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


## Developing
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

<!-- creating certificate for the system: must be private -->

1. openssl genrsa -out ./cert/root-ca.private.pem 2048

or 

1. mkcert figcert https://172.21.208.1:3000
2. openssl req -x509 -new -nodes -days 100 -key ./cert/figcert+1-key.pem -out ./cert/figcert+1.pem -subj "/C=US/O=Debug certificate/CN=localhost" -extensions v3_ca -config ./cert/openssl_config.txt

3. openssl x509 -outform der -in ./cert/server.crt -out ./cert/debug_certificate.crt

<!-- 4. http-server . ==ssl --cert root-ca.cert.pem --key ./cert/root-ca.private.pem -->



First Time Setup: Run `npm install` and then `npm run cert`.


or

npx -y mkcert-cli --outDir ./cert --cert server.crt --key server.key


adb reverse tcp:8080 tcp:8080



## Reverse the port to ensure the emulator gets access accross 


1. to show all configured port proxy rules in netsh, use the command
 `netsh interface portproxy show all`

2. `netsh interface portproxy delete v4tov4 listenport=8080`:
This command specifically deletes the IPv4 port proxy rule listening on port 8080.


3. `netsh interface portproxy reset`: This command resets the portproxy configuration to its default state, effectively deleting all existing rules. 


4. Then reverse the host to a secure one.


netsh interface portproxy add v4tov4 connectaddress=localhost connectport=8080 listenaddress=127.0.0.1 listenport=8080 protocol=tcp