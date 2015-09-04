'use strict';

var Promise = require( 'q' ).Promise;
var config = require( './config-model' ).server;

function getManifest() {
    // returning Promise in case we'd like to cache this later
    return new Promise( function( resolve, reject ) {
        var manifest = {
            // deliberately omitting the "name" property 
            // because we want the browser to default to the HTML title
            short_name: config[ 'app name' ],
            icons: [ {
                src: '/images/icon_57x57.png',
                type: 'image/png',
                density: 0.75
            }, {
                src: '/images/icon_76x76.png',
                type: 'image/png',
                density: 1.5
            }, {
                src: '/images/icon_60x60@2x.png',
                type: 'image/png',
                density: 2.0
            }, {
                src: '/images/icon_76x76@2x.png',
                type: 'image/png',
                density: 3.0
            }, {
                src: '/images/icon_256x256.png',
                type: 'image/png',
                density: 4.0
            } ],
            display: 'standalone',
            orientation: 'portrait'
        };
        resolve( manifest );
    } );
}

module.exports = {
    get: getManifest
};
