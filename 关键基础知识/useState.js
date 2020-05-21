
// useState
const React = (
    function () {
        let stateValue

        return Object.assign(React, {
            useState(initialStateValue) {
                stateValue = stateValue || initialStateValue

                function setState(value) {
                    stateValue = value
                }

                return [stateValue, setState]
            }
        })
    }
)()


//useEffect
const React = (function () {
    let deps

    return Object.assign(React, {
        useEffect(callback, depsArray) {
            const shouldUpdate = !depsArray

            const depsChange = deps ? !deps.every((depItem, index) => depItem === depsArray[index]) : true

            if (shouldUpdate || depsChange) {
                callback()

                deps = depsArray || []
            }
        }
    })
})()