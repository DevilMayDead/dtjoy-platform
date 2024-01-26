import type {RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw} from "vue-router";

export function getRawRoute(
    route: RouteLocationNormalized,
): RouteLocationNormalized {
    if (!route) return route
    const {matched, ...opt} = route
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                meta: item.meta,
                name: item.name,
                path: item.path,
            }))
            : undefined) as RouteRecordNormalized[],
    }
}

export function loadRoutesFromModules(modules: Record<string, { default: any }>): RouteRecordRaw[] {
    const routeModuleList: RouteRecordRaw[] = [];
    for (let key in modules) {
        const mod = modules[key].default || {};
        const modList = Array.isArray(mod) ? [...mod] : [mod];
        routeModuleList.push(...modList);
    }

    return routeModuleList;
}