/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
export const serialPromise = (funcs, currentIterationCallback) => {
    let iteration = 0
    return funcs.reduce((promise, func) => {
            return promise.then(
                result => func
                    .then((element) => {
                        iteration ++
                        currentIterationCallback(iteration)
                        return element
                    })
                    .then(Array.prototype.concat.bind(result))
            )
        }, Promise.resolve([])
    )
}

