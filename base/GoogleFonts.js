// @flow

const React = require('react')

/*:
type GoogleFontsPropsType = {
    fonts: { [string]: Array<string|number> },
}
*/

const GoogleFonts = (props/*: GoogleFontsPropsType */) => {
    const font_list = Object.keys(props.fonts).map( name => {
        return `${ name }:${ props.fonts[name].map( weight => weight.toString() ).join(',') }`
    })

    const font_url = `https://fonts.googleapis.com/css?family=${ font_list.join('|') }`

    return React.createElement('link', {
        rel  : 'stylesheet',
        type : 'text/css',
        href : font_url,
    })
}

module.exports = GoogleFonts
