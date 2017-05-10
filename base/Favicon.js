// @flow

const React = require('react')
const mime  = require('mime')

const Favicon = (props/*: { name: string } */) => (
    React.createElement('link', {
        rel: 'icon',
        type: mime.lookup(props.name),
        href: `${ global.ASSET_URL }${ props.name }`,
    })
)

Favicon.defaultProps = {
    name: 'favicon.ico',
}

module.exports = Favicon
