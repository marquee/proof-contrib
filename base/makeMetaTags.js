// @flow
const React = require('react')

function makeMetaTags (meta/*: { [string]: string } */) {
    return Object.keys(meta).map( key => {
        let attribute
        if ('og' === key.split(':')[0]) {
            attribute = 'property'
        } else {
            attribute = 'name'
        }
        return React.createElement('meta', {
            [attribute]: key,
            content: meta[key],
            key: key,
        })
    })
}

module.exports = makeMetaTags