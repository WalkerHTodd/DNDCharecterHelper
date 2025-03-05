document.addEventListener("DOMContentLoaded", () => {
    loadCharacters();
});

function saveCharacter() {
    const name = document.getElementById("name").value;
    const charClass = document.getElementById("class").value;
    const level = document.getElementById("level").value;
    const stats = document.getElementById("stats").value;

    if (!name || !charClass || !level || !stats) {
        alert("Please fill out all fields!");
        return;
    }

    const newCharacter = { name, class: charClass, level, stats };
    const characters = JSON.parse(localStorage.getItem("dndCharacters")) || [];
    characters.push(newCharacter);

    localStorage.setItem("dndCharacters", JSON.stringify(characters));
    displayCharacters();
    clearInputs();
}

function displayCharacters() {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = "";
    const characters = JSON.parse(localStorage.getItem("dndCharacters")) || [];

    characters.forEach((char, index) => {
        const charDiv = document.createElement("div");
        charDiv.classList.add("character-card");
        charDiv.innerHTML = `
            <p><strong>${char.name}</strong> - ${char.class} (Level ${char.level})</p>
            <p>${char.stats}</p>
            <button onclick="deleteCharacter(${index})">Delete</button>
        `;
        characterList.appendChild(charDiv);
    });
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("class").value = "";
    document.getElementById("level").value = "";
    document.getElementById("stats").value = "";
}

function deleteCharacter(index) {
    const characters = JSON.parse(localStorage.getItem("dndCharacters")) || [];
    characters.splice(index, 1);
    localStorage.setItem("dndCharacters", JSON.stringify(characters));
    displayCharacters();
}

function exportCharacters() {
    const characters = localStorage.getItem("dndCharacters") || "[]";
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(characters);
    const downloadAnchor = document.createElement("a");

    downloadAnchor.href = dataStr;
    downloadAnchor.download = "dnd_characters.json";
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

function importCharacters() {
    const file = document.getElementById("import-file").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            localStorage.setItem("dndCharacters", JSON.stringify(importedData));
            displayCharacters();
        } catch (error) {
            alert("Invalid file format");
        }
    };
    reader.readAsText(file);
}

function loadCharacters() {
    displayCharacters();
}
