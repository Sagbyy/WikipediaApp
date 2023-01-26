// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error_message');
const loader = document.querySelector('.loader');
const resultDisplay = document.querySelector('.result_display');

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault();

    if(input.value === "") {
        errorMsg.textContent = "Recherche un truc quand même !";
    } else {
        errorMsg.textContent = "";
        loader.style.display = "flex";
        resultDisplay.textContent = "";
        wikiApiCall(input.value);
    }
}

async function wikiApiCall(searchInput) {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);

        if (!response.ok) {
            errorMsg.textContent = `Erreur ${response.status}`;
        } else {
            const data = await response.json();
            createCard(data.query.search);
        }
    } catch (error) {
        errorMsg.textContent = `${error}`;
        loader.style.display = "none"
    }

}

function createCard(data) {
    if (!data.length) {
        errorMsg.textContent = "Pas de résultat !";
    } else {
        data.forEach(el => {
            const url = `https://en.wikipedia.org/?curid=${el.pageid}`

            const card = document.createElement("div");

            card.className = "result_item";

            card.innerHTML = `<h3 class="result_title">
                                <a class="${url}" target="_blank">${el.title}</a>
                            </h3>
                            <a href="${url}" class="result_link" target="_blank">${url}</a>
                            <span class="result_snippet">${el.snippet}</span>
                            `;
            resultDisplay.appendChild(card)
        })
    }
    loader.style.display = "none";
}