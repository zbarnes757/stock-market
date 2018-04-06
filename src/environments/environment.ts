// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: 'AIzaSyATJyW15dOHLHtwO8PuS6g_GRODTZcragI',
    authDomain: 'stock-market-7dcd0.firebaseapp.com',
    databaseURL: 'https://stock-market-7dcd0.firebaseio.com',
    projectId: 'stock-market-7dcd0',
    storageBucket: 'stock-market-7dcd0.appspot.com',
    messagingSenderId: '715693255866'
  }
};
