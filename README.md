<img src="https://herp.app/herp-logo.svg" width="200">

# hERP Service TypeScript Skeleton

This is an empty service you can start from to create your own service for [hERP](https://herp.app). 

If you are not familiar with Services read the [documentation here](https://herp.app/docs/services/hello-world-service/) to get started.

## Features

This skeleton does already:

* Starts a webserver with necessary endpoints **/do** and **/install**
* Stores user credential of the service user
* Configuration via josn file or environmental variables

## How to use

### Develop

To start the development do the following:

```
git clone git@github.com:herp-app/herp-service-skeleton-typescript.git
cd herp-service-skeleton-typescript
npm install
npm start -- --service:herp_uri "http://localhost:5050"
```

This starts a development server that will reload on file changes automatically. Use the **process.ts** file to start your custom code from. It is necessary to tell the service die **herp_ui**. This is happening here with arguments but is also possible in the config.json file under configurations.

### Build

To build and start the builded application use `npm run start:build --service:herp_uri "http://localhost:5050"`

To just build use `npm run build`.
