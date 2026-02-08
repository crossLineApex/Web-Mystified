console.log("Home loaded");
const title = document.getElementById("title");

title.addEventListener("click", () => {
  title.style.color =
    title.style.color === "red" ? "black" : "red";
});
