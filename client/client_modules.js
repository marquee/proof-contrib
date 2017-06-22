/*

Inside Base:
```
<ClientModules modules={ props.client_modules } />
```

On <Base>:

```
client_modules={
    onscroll: [{'.ArticleIndex__ ._Sidebar__': { top: 60, attrs: { 'data-fixed': true } }}],
    emailsubscribe: [],
}
```

Inside modules to be selectively activated:

```
require('proof-sdk/client/client_modules').register('menu', activateMenu)
module.exports = activateMenu
```

*/

const DATA_PAYLOAD_NAME     = 'Proof__client_modules'
const unregistered_modules  = {}
const module_set            = {}

window.MODULE_SET = module_set

function register (module_name, module_) {
    if (null != module_set[module_name]) {
        throw new Error(`Module '${ module_name }' already registered`)
    }
    module_set[module_name] = module_
}

function activate (reactivating=false) {
    const modules_to_activate = window[DATA_PAYLOAD_NAME]
    if (null == modules_to_activate) {
        return
    }
    Object.keys(modules_to_activate).forEach( module_name => {
        if (null == module_set[module_name]) {
            throw new Error(`No module registered for '${ module_name }'`)
        }
        if (reactivating && !module_set[module_name].safe_to_reactivate) {
            return
        }
        console.info(`${ reactivating ? 'Reactivating' : 'Activating' } module ${ module_name }…`)
        const ModuleToActivate = module_set[module_name]
        if (null != ModuleToActivate.activate) {
            ModuleToActivate.activate(...modules_to_activate[module_name])
        } else {
            new ModuleToActivate(...modules_to_activate[module_name])
        }
    })
}


module.exports = {
    activate    : activate,
    reactivate  : function () { activate(true) },
    register    : register,
}
