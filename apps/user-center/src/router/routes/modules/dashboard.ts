import {RouteRecordItem} from "@dtjoy/types/src";

const dashboard: RouteRecordItem = {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/dashboard/analysis",
    children: [
        {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () => import(/* webpackChunkName: "dashboard" */'@/pages/dashboard/analysis.vue'),
        },
        {
            path: "/dashboard/workbench",
            name: "workbench",
            component: () => import(/* webpackChunkName: "dashboard" */'@/pages/dashboard/workbench.vue'),
        },
    ]
}

export default dashboard;