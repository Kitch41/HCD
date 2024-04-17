document.addEventListener('DOMContentLoaded', () => {
    const itemId = getParameterFromUrl('id');

    if (itemId) {
        fetch('../kleren.json')
            .then(response => response.json())
            .then(data => {
                const kledingstukken = data.Kledingstukken;
                let itemFound = false;

                // Iterate through each item in the kledingstukken object
                for (const key in kledingstukken) {
                    if (Object.hasOwnProperty.call(kledingstukken, key)) {
                        const item = kledingstukken[key];
                        
                        // Check if the item's id matches the requested itemId
                        if (item.id === itemId) {
                            itemFound = true;
                            
                            // Populate details with item data and pass 'data' object
                            populateItemDetails(item, data);
                            break; // Exit loop once item is found
                        }
                    }
                }

                if (!itemFound) {
                    console.error(`Item with ID '${itemId}' not found.`);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error('No item ID found in URL.');
    }
});


function populateItemDetails(item, data) {
    const mainSection = document.getElementById('main');

    // Set the title of the item (key) in the <h1> element
    const title = getKeyByValue(data.Kledingstukken, item);
    mainSection.querySelector('h1').textContent = title;

    // Set other details (Soort, Kleur, Beschrijving) in corresponding <p> elements
    mainSection.querySelector('p.soort').textContent = `Soort: ${item.Soort}`;
    mainSection.querySelector('p.kleur').textContent = `Kleur: ${item.Kleur}`;
    mainSection.querySelector('p.beschrijving').textContent = `Beschrijving: ${item.Beschrijving}`;

    // Generate match cards based on item's matches
    const matchesSection = document.getElementById('matches');
    const ul = matchesSection.querySelector('ul');
    
    // Clear existing content in the matches <ul> element
    ul.innerHTML = ''; // Clear existing content before adding new match cards
    
    if (Array.isArray(item.Matches)) {
        item.Matches.forEach(matchId => {
            const matchItem = findItemById(matchId, data.Kledingstukken);
            if (matchItem) {
                // Create a new card <li> element
                const li = document.createElement('li');
                
                // Create card content with necessary data
                const cardTitle = document.createElement('h3');
                cardTitle.textContent = getKeyByValue(data.Kledingstukken, matchItem); // Use key as title
                const cardSoort = document.createElement('p');
                cardSoort.textContent = `Soort: ${matchItem.Soort}`;
                const cardKleur = document.createElement('p');
                cardKleur.textContent = `Kleur: ${matchItem.Kleur}`;
                const cardBeschrijving = document.createElement('p');
                cardBeschrijving.textContent = `Beschrijving: ${matchItem.Beschrijving}`;
                
                // Append card content to the <li> element
                li.appendChild(cardTitle);
                li.appendChild(cardSoort);
                li.appendChild(cardKleur);
                li.appendChild(cardBeschrijving);
                
                // Append the card <li> to the <ul> element
                ul.appendChild(li);
            }
        });
    } else {
        console.error('Matches data is not an array or is null.');
    }
}


// Function to get key (title) by value (item) in an object
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


function findItemById(id, kledingstukken) {
    for (const key in kledingstukken) {
        if (kledingstukken.hasOwnProperty(key)) {
            const item = kledingstukken[key];
            if (item.id === id) {
                return item;
            }
        }
    }
    return null; // Return null if item with the specified ID is not found
}

function getParameterFromUrl(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}
