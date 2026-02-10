import { router } from "./router";
import "./style.css";

document.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState(null, "", e.target.href);
    router();
  }
});

window.addEventListener("popstate", router);

router();
