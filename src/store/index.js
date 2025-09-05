/**
 * Create a store to manage the state
 * @param {Object} initialState - The initial state
 * @param {(state: any, action: any) => any} reducer - Reducer function
 */
export function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = new Set();

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((l) => l());
    };

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return { getState, dispatch, subscribe };
}
