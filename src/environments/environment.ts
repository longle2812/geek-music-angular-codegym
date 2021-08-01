// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyAjLupXuHNXTvdNp8PpaDncQ3zW_3wqpC4",
    authDomain: "geekmusic-1834d.firebaseapp.com",
    projectId: "geekmusic-1834d",
    storageBucket: "geekmusic-1834d.appspot.com",
    messagingSenderId: "965529405237",
    appId: "1:965529405237:web:0fe5a95b5eb956f6e42e7c"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
