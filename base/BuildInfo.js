const React                 = require('react')
const serializeJavascript   = require('serialize-javascript')

const BuildInfo = () => (
    React.createElement('script', {
        id: '_build_info',
        type: 'application/json',
        dangerouslySetInnerHTML: {
            __html: serializeJavascript({
                commit      : global.build_info.commit,
                assets      : global.build_info.asset_hash,
                publication : global.config.PUBLICATION_SHORT_NAME,
                env         : process.env.NODE_ENV,
            }, { isJSON: true })
        }
    })
)

module.exports = BuildInfo