import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Calculator from "./pages/Calculator";
import ReusableModal from "./pages/ReusableModal";
import Chat from "./pages/Chat";
import Crud from "./pages/Crud";
import Tensorflow from "./pages/Tensorflow";

const routes = [
  { path: "/", component: Home },
  { path: "/heros", component: Hero },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator, meta: { middleware: "auth" } },
  { path: "/reusable-modal", component: ReusableModal },
  {
    path: "/realtime-chat",
    component: Chat,
    meta: { middleware: "auth" },
  },
  { path: "/crud-app", component: Crud },
  { path: "/tensorflow", component: Tensorflow },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    }
  } else {
    next();
  }
});

export default router;
