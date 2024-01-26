import {createRouter, createWebHashHistory, Router} from "vue-router";
import {loadRoutesFromModules} from "@dtjoy/utils";

const routes = import.meta.glob("./modules/**/**.ts", {eager: true}) as any;

export function InitRouter(base: string): Router {
    return createRouter({
        history: createWebHashHistory(base),
        routes: loadRoutesFromModules(routes),
        scrollBehavior: (() => ({left: 0, top: 0}))
    });
}