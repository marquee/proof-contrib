const React = require('react')

const MetaViewport = () => (
    React.createElement('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0',
    })
)

module.exports = MetaViewport