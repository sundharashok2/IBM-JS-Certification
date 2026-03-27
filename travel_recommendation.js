// FETCH DATA
async function fetchData() {
    try {
        const response = await fetch("./travel_recommendation_api.json");
        return await response.json();
    } catch (error) {
        console.error(error);
        alert("Error loading JSON. Use Live Server.");
    }
}

// SEARCH
async function searchPlaces() {
    const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    const data = await fetchData();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    // ✅ CASE 1: If user types "countries"
    if (keyword === "countries") {
        let count = 0;

        data.forEach(country => {
            if (count < 2) {   // show at least 2 countries
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${country.imageUrl}">
                    <h3>${country.name}</h3>
                    <p>${country.description}</p>
                `;

                resultsDiv.appendChild(card);
                count++;
            }
        });

        return; // stop further execution
    }

    // ✅ NORMAL SEARCH
    data.forEach(country => {

        // COUNTRY SEARCH
        if (country.name.toLowerCase().includes(keyword)) {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${country.imageUrl}">
                <h3>${country.name}</h3>
                <p>${country.description}</p>
            `;

            resultsDiv.appendChild(card);
        }

        // CITY SEARCH
        country.cities.forEach(city => {
            if (
                (keyword === "beach" && city.category === "beach") ||
                (keyword === "temple" && city.category === "temple")
            ) {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${city.imageUrl}">
                    <h3>${city.name}</h3>
                    <p>${city.description}</p>
                `;

                resultsDiv.appendChild(card);
            }
        });

    });

    // NO RESULT
    if (resultsDiv.innerHTML === "") {
        resultsDiv.innerHTML = "<h3>No results found</h3>";
    }
}
// CLEAR
function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}