/**
 * Registers an empty service worker to enable Chrome's Add-To-Homescreen banner.
 */

'use strict';

if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register( '/js/src/module/worker.js' ).then( function( reg ) {
        console.log( '◕‿◕', reg );
    }, function( err ) {
        console.log( 'ಠ_ಠ', err );
    } );
}
