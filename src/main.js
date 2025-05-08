import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/css/main.css";

// FontAwesome setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { APIService } from "@/http/APIService";

// Initialize API Service
const apiService = new APIService();

// Add FontAwesome icons
library.add(faTrash, faPencil, faPlus);

// Create single Vue instance
const app = createApp(App);

// Configure plugins
app.use(store);
app.use(router);

// Setup API interceptors
apiService.setupInterceptors(store);

// Register global components
app.component("font-awesome-icon", FontAwesomeIcon);

// Mount the app
app.mount("#app");
