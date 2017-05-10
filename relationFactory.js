const default_relation_names = {
    parent: 'parent',
    child: 'child',
}
function makeRelations (parent, property, names) {
    if (null == names) {
        names = default_relation_names
    }
    return parent[property].map( child => ({
        [names.parent]: parent,
        [names.child]: child,
    }))
}
function relationFactory (parent_name, property, child_name) {
    if (null == property && null == child_name) {
        property    = parent_name
        parent_name = 'parent'
        child_name  = 'child'
    }
    return (parent, i, enumeration) => (
        makeRelations(parent, property, { parent: parent_name, child: child_name })
    )
}

module.exports = relationFactory
module.exports.makeRelations = makeRelations