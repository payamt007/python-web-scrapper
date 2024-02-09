/* Core */
import {
    configureStore,
    type ConfigureStoreOptions,
    type ThunkAction,
    type Action,
} from '@reduxjs/toolkit'
import {
    useSelector as useReduxSelector,
    useDispatch as useReduxDispatch,
    type TypedUseSelectorHook,
} from 'react-redux'

import {redirectToLoginMiddleware, rtkQueryErrorLogger} from "@/lib/redux/middleware"

/* Instruments */
import {reducer} from './rootReducer'
import {middleware} from './middleware'
import {feedsApi} from '../services/feed'

const configreStoreDefaultOptions: ConfigureStoreOptions = {reducer}

export const makeReduxStore = (
    options: ConfigureStoreOptions = configreStoreDefaultOptions
) => {
    const store = configureStore(options)

    return store
}

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(middleware)
            .concat(rtkQueryErrorLogger)
            .concat(feedsApi.middleware)
    },

})
export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action
>