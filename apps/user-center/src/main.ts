import {createApp} from "vue";
import "./style.css";
import App from "./App.vue";
import naive from "./init-component";
import {InitRouter} from "@/router";

const app = createApp(App);
app.use(naive);
app.use(InitRouter("/"));
app.mount("#app");
