function URLCleaner () {
    // Clean analytics parameters from URL, for a nice, clean feeling. Also, keeps
    // people from sharing URLs that were tracking specific sources and skewing the
    // stats. Based on: http://wistia.com/blog/fresh-url
    // `utm` parameters are used by Google Analytics and others, as well as
    // internal reference tracking.

    // Remove any parameters that start with `utm_` using replaceState.
    function _stripParameters () {
        if (null != window.history && null != window.history.replaceState) {
            const cleaned_search = window.location.search.replace(/utm_[^&]+&?/g, '').replace(/ref=[^&]+&?/g, '').replace(/&$/, '').replace(/^\?$/, '')
            window.history.replaceState({}, '', window.location.pathname + cleaned_search)
        }
    }

    // Google Analytics is present, so add the strip function to its queue
    // so it can extract the data it needs first.
    if (null != window._gaq) {
        window._gaq.push(_stripParameters)
    } else {
        _stripParameters()
    }
}

module.exports = URLCleaner
require('./client_modules').register('URLCleaner', module.exports)