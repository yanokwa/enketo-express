import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const plugins = [
    resolve( {
        module: true, // Default: true
        main: true, // Default: true
        browser: true, // Default: false
    } ),
    commonjs( {
        include: 'node_modules/**', // Default: undefined
        sourceMap: false, // Default: true
    } ),
    json(),
    builtins(),
    globals(),
];

const onwarn = warning => {
    // Silence circular dependency warning for jszip and rollup-plugin-node-builtins
    if ( warning.code === 'CIRCULAR_DEPENDENCY' &&
        ( warning.importer.indexOf( 'node_modules/jszip/' ) !== -1 || warning.importer.indexOf( 'node_modules/rollup-plugin-node-builtins/' ) !== -1 ) ) {
        return;
    }

    console.warn( `(!) ${warning.message}` );
};

const configs = Object.entries( {
    'public/js/src/main-webform.js': 'public/js/build/enketo-webform-bundle.js',
    'public/js/src/main-webform-edit.js': 'public/js/build/enketo-webform-edit-bundle.js',
    'public/js/src/main-webform-view.js': 'public/js/build/enketo-webform-view-bundle.js',
    'public/js/src/main-offline-fallback.js': 'public/js/build/enketo-offline-fallback-bundle.js'
} ).map( entry => {
    return {
        input: entry[ 0 ],
        output: {
            file: entry[ 1 ],
            format: 'iife',
            strict: false, // due leaflet.draw issue https://github.com/Leaflet/Leaflet.draw/issues/898
        },
        plugins,
        onwarn,
    };
} );

export default configs;
