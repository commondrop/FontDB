const fontCardTemplate = document.querySelector("[data-font-template]");
const fontCardContainer = document.querySelector("[data-font-cards-container]");
const searchInput = document.querySelector("[data-search]");
const fontModal = document.getElementById("font-modal");
const modalName = document.querySelector("[data-modal-name]");
const modalExample = document.querySelector("[data-modal-example]");
const closeModal = document.querySelector(".close");
const light = document.getElementById("light");
const lightbtn = document.querySelector(".bgtoggle");
const header = document.querySelector('h2');
const a = document.querySelectorAll("a");
const searchlight = document.getElementById("search");
const cardlight = document.querySelectorAll(".card");
const body = document.body;
const svg = document.querySelectorAll(".svg");

let fonts = [];

const prefersLightMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

if (prefersLightMode) {
    body.classList.add("light-mode");
}

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();
    fonts.forEach(font => {
        const isVisible = font.name.toLowerCase().includes(value);
        font.element.classList.toggle("hide", !isVisible);
    });
});

fetch("data.txt")
    .then(res => res.json())
    .then(data => {
        fonts = data.map(font => {
            const card = fontCardTemplate.content.cloneNode(true).children[0];
            const name = card.querySelector("[data-name]");
            const example = card.querySelector("[data-example]");
            const download = card.querySelector("[data-download]");

            
            example.style.fontFamily = font.name;

            name.textContent = font.name;
            example.textContent = font.example;
            download.href = font.download;

            fontCardContainer.append(card);

            card.addEventListener("click", () => {
                modalName.textContent = font.name;
                modalExample.textContent = font.example;
            
                
                modalExample.style.fontFamily = font.name;
            
                fontModal.classList.add("show");
            });
            
            
            
            closeModal.addEventListener("click", () => {
                fontModal.classList.remove("show");
            });
            
            
            window.addEventListener("click", (e) => {
                if (e.target === fontModal) {
                    fontModal.classList.remove("show");
                }
            });
            

            return { 
                name: font.name, 
                example: font.example, 
                element: card 
            };
        });
    })
    .catch(err => console.error("Error loading fonts:", err));

    lightbtn.addEventListener("click", () => {
        body.classList.toggle("light-mode"); // Toggle light/dark mode on body
        const isLightMode = body.classList.contains("light-mode");
    
        // Adjust the icon based on the mode
        if (isLightMode) {
            lightbtn.classList.add("light");
        } else {
            lightbtn.classList.remove("light");
        }
        a.forEach(e => {
            e.classList.toggle("light");
        })
        svg.forEach(e => {
            e.classList.toggle("light");
        })
    });