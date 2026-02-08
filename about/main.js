console.log("About loaded");

const btn = document.getElementById("bgBtn");

btn.addEventListener("click", () => {
  document.body.style.background =
    document.body.style.background === "purple"
      ? "#111827"
      : "purple";
});
