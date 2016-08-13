WalletHub-FrontEnd Angular test
==============================

## Development
To setup and run this project, do the following:

```
npm install
grunt setup
grunt build
grunt devel
```

## Deploy
To create a final version to be deployed.  The code will be source from the `build` directory and only the needed
files are copied and minified to the `dist` directory.

```
grunt deploy
```

