import type {PropType as VuePropType} from 'vue'
import type {RouteRecordItem as IRouteRecordItem} from './router'

declare global {
    // router
    type RouteRecordItem = IRouteRecordItem

    // vue
    type PropType<T> = VuePropType<T>

    interface ImportMetaEnv extends ViteEnv {
        __: never
    }
}

export {};