import { createApp } from "vue";
import { createStore } from "vuex";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

const store = createStore({
    state() {
        return {
            usr_config: localStorage.getItem('usr_config') || '',
        };
    },
    mutations: {
        update(state, data) {
            state.usr_config = data.config;
            localStorage.setItem("usr_config", state.usr_config);
        },
    },
});
app.use(store);

app.use(ElementPlus);
app.mount("#app");
