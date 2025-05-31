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
