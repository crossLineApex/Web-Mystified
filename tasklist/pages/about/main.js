


export default function About() {

  return {
    render(){

        return `
          <div class="card">
            <h1 id="about-title">About</h1>

            <p>This is single page application routing.</p>

            <button id="bgBtn">Change Bg</button>

          </div>  `;

    },

    mount(){

        const btn = document.getElementById("bgBtn");

        btn.addEventListener("click", () => {
          document.body.style.background =
            document.body.style.background === "purple"
              ? "#111827"
              : "purple";
        });

    }
  }




}
