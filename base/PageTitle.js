// @flow
const React = require('react')

/*::
type PageTitlePropsType = {
    title_text  : ?string,
    delimiter   : string,
    base        : ?string,
    title       : ?string,
}
*/

const PageTitle = (props/*: PageTitlePropsType */) => {
    const title = []
    if (null != props.title_text) {
        title.push(props.title_text)
    } else {
        if (null != props.base && props.base.length > 0) {
            title.unshift(props.base)
        }
        if (null != props.title && props.title.length > 0) {
            title.unshift(props.title)
        }
    }
    return React.createElement('title', null, title.join(props.delimiter))
}

PageTitle.defaultProps = {
    delimiter: ' | ',
    title_text: null,
}

module.exports = PageTitle