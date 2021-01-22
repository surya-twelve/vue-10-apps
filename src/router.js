import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";

const routes = [
  { path: "/", component: Home },
  { path: "/heros", component: Hero },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
