/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative index.jspaths to URLs. */
var map = {
    'firebase': 'hatApp/vendor/firebase/lib/firebase-web.js',
    'angularfire2': 'hatApp/vendor/angularfire2',
    '@angular2-material': 'hatApp/vendor/@angular2-material',
    'lodash': 'hatApp/vendor/lodash/lodash.js'
};
/** User packages configuration. */
var packages = {
    angularfire2: {
        defaultExtension: 'js',
        main: 'angularfire2.js',
    }, lodash: { main: 'index.js',
        defaultExtension: 'js'
    }
};
// put the names of any of your Material components here
var materialPkgs = [
    'core',
    'button',
    'card',
    'input',
    'radio',
    'checkbox',
    'toolbar',
    'icon',
    'sidenav',
    'list',
    'grid-list',
    'progress-bar',
    'progress-circle',
    'slide-toggle',
    'tabs'
];
materialPkgs.forEach(function (pkg) {
    packages[("@angular2-material/" + pkg)] = { main: pkg + ".js" };
});
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'hatApp/vendor/@angular',
        'rxjs': 'hatApp/vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map