// @flow

const React = require('react')

const CanonicalLink = (props/*: { href: string } */) => (
    React.createElement('link', { rel: 'canonical', href: props.href })
)

module.exports = CanonicalLink