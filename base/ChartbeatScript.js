// @flow

const React     = require('react')
const RawScript = require('./RawScript')

const ChartbeatStart = () => (
    React.createElement(RawScript, { source: 'window._sf_startpt = Date.now();' })
)

const ChartbeatScript = (props/*: { id: ?string, domain: ?string } */) => {
    if (null == props.id || null == props.domain) {
        return null
    }
    return React.createElement(RawScript, {
        source: `
            (function(window) {
                window._sf_async_config = { uid: "${ props.id }", domain: "${ props.domain }", useCanonical: true };
                window.addEventListener(function () {
                    window._sf_endpt = Date.now();
                    var el = document.createElement('script');
                    el.src = '//static.chartbeat.com/js/chartbeat.js';
                    document.body.appendChild(el);
                });
            })(window);
        `
    })
}

module.exports = ChartbeatScript
module.exports.Start = ChartbeatStart