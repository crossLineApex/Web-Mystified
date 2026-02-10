export default function Home() {
    return{
        
        render(){
            return `
            <h1 id="title">Home</h1>
        `;
        },

        mount(){
            const title = document.getElementById("title");
            title.addEventListener("click", () => {
            title.style.color =
                title.style.color === "red" ? "black" : "red";
            });
        }
    }
}
