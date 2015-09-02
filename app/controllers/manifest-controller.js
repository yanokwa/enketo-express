'use strict';

var cacheManifest = require( '../models/cache-manifest-model' ),
    appManifest = require( '../models/app-manifest-model' ),
    Promise = require( 'q' ).Promise,
    express = require( 'express' ),
    router = express.Router(),
    debug = require( 'debug' )( 'manifest-controller' );

module.exports = function( app ) {
    app.use( '/_', router );
};

router
    .get( '/manifest.appcache*', function( req, res, next ) {
        // the * wildcard allows testing of manifest generation without interference by the stored applicationCache
        getCacheManifest( req, res )
            .then( function( manifestContent ) {
                res
                    .set( 'Content-Type', 'text/cache-manifest' )
                    .send( manifestContent );
            } )
            .catch( next );
    } )
    .get( '/manifest.json', function( req, res, next ) {
        getAppManifest( req, res )
            .then( function( manifestContent ) {
                res.json( manifestContent );
            } )
            .catch( next );
    } );

/**
 * Generates an applicationCache manifest
 * 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getCacheManifest( req, res ) {
    return new Promise( function( resolve, reject ) {
        res.render( 'surveys/webform', {
            manifest: '/_/manifest.appcache'
        }, function( err, html ) {
            if ( err ) {
                reject( err );
            } else {
                cacheManifest.get( html, req.i18n.lng() )
                    .then( resolve )
                    .catch( reject );
            }
        } );
    } );
}

/**
 * Generates an application manifest
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getAppManifest( req, res ) {
    return new Promise( function( resolve, reject ) {
        appManifest.get()
            .then( resolve )
            .catch( reject );
    } );
}
