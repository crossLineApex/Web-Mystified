import Home from "../pages/home/main"
import About from "../pages/about/main";
import Task from "../pages/task/main";

const routes = {
  "/": Home,
  "/about": About,
  "/task": Task
};

export function router() {
  const path = location.pathname;

  const page = routes[path] || Home;

  const result = page();

  document.getElementById("app").innerHTML = result.render();
  result.mount();
}
