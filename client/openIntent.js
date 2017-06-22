// Opens a web intent pop-up window. Typically used for posting to
// Twitter or Facebook.


const WINDOW_OPTIONS = {
    scrollbars  : 'yes',
    resizable   : 'yes',
    toolbar     : 'no',
    location    : 'yes',
    width       : 550,
    height      : 420,
}

function openIntent (href, options={}) {
    const _options = Object.assign({}, WINDOW_OPTIONS, options)
    const _options_string = Object.keys(_options).map( key => (
            `${ key }=${ _options[key].toString() }`
        )).join(',')
    window.open(
        href,
        'intent',
        _options_string,
    )
}

module.exports = openIntent
