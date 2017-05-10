const RawScript             = require('./RawScript')
const React                 = require('react')
const serializeJavascript   = require('serialize-javascript')

/*:
type ClientModulesPropsType = {
    modules : { [string]: Array<any> },
    defer   : ?boolean,
}
*/

const ClientModules = (props/*: ClientModulesPropsType */) => {
    if (null == props.modules || Object.keys(props.modules).length === 0) {
        return null
    }
    const modules_serialized = serializeJavascript(props.modules, { isJSON: true })
    return React.createElement(RawScript, {
        source: `window.Proof__client_modules = ${ modules_serialized };`
    })
}

module.exports = ClientModules
