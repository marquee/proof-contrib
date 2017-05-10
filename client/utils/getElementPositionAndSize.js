
function getElementPositionAndSize (el) {
    let node    = el
    let left    = 0
    let top     = 0
    let width   = node.offsetWidth
    let height  = node.offsetHeight
    while (null != node.offsetParent) {
        left += node.offsetLeft
        top += node.offsetTop
        node = node.offsetParent
    }
    return { left, top, width, height }
}

module.exports = getElementPositionAndSize