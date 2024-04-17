document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const itemId = urlParams.get('id'); // Extract item ID from URL hash

    if (itemId) {
        fetch('kleren.json') // Assuming 'kleren.json' is your JSON file path
            .then(response => response.json())
            .then(data => {
                const item = data.Kledingstukken[itemId];

                if (item) {
                    // Fill details section with item data
                    const mainSection = document.getElementById('main');
                    mainSection.querySelector('h1').textContent = item.Beschrijving;
                    mainSection.querySelector('p.soort').textContent = `Soort: ${item.Soort}`;
                    mainSection.querySelector('p.kleur').textContent = `Kleur: ${item.Kleur}`;
                    mainSection.querySelector('p.beschrijving').textContent = `Beschrijving: ${item.Beschrijving}`;

                    // Generate match cards based on item's matches
                    const matchesSection = document.getElementById('matches');
                    const ul = matchesSection.querySelector('ul');
                    
                    item.Matches.forEach(matchId => {
                        const matchItem = data.Kledingstukken[matchId];
                        if (matchItem) {
                            const li = document.createElement('li');
                            li.textContent = `${matchItem.Soort}: ${matchItem.Beschrijving}`;
                            ul.appendChild(li);
                        }
                    });
                } else {
                    console.error(`Item with ID '${itemId}' not found in the data.`);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error('No item ID found in URL.');
    }
});