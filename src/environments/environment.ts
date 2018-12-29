// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  firebase: {
    apiKey: "AIzaSyC3u4xAaVLoMVjZL_xWBvbJtANtxRTNKjk",
    authDomain: "pm-summit.firebaseapp.com",
    databaseURL: "https://pm-summit.firebaseio.com",
    projectId: "pm-summit",
    storageBucket: "pm-summit.appspot.com",
    messagingSenderId: "401009594899"
  }
};

/*

 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.