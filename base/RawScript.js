// @flow

/*
A wrapper around `<script>` that will minify its inline script code in
the production environment.
*/

const React     = require('react')
const UglifyJS  = require('uglify-js')

const RawScript = (props/*: { source: string } */) => {
    let script_str = props.source
    if ('production' === process.env.NODE_ENV) {
        script_str = UglifyJS.minify(script_str).code
    }
    return React.createElement('script', {
        dangerouslySetInnerHTML: {
            __html: script_str
        }
    })
} 

module.exports = RawScript