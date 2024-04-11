console.log("js loaded")

const inputmode = false;

if (inputmode == true) {
  categorylist.style.display = "none"
} else {
  searchInput.style.display = "none"
}


fetch('kleren.json')
  .then(response => response.json())
  .then(data => {
    generateCards(data.Kledingstukken);
  })
  .catch(error => console.error('Error fetching data:', error));

function generateCards(kledingstukken) {
    

    Object.keys(kledingstukken).forEach((kledingstuk) => {
        const item = kledingstukken[kledingstuk];
        const cardLink = document.createElement('a');
        cardLink.href = '/pages/details.html';
        cardLink.className = 'cardlink';

        const card = document.createElement('li');
        card.className = 'card';

        // const image = document.createElement('img');
        // image.src = './images/placeholder.png';
        // image.alt = 'Avatar';
        // image.style.width = '100%';

        const container = document.createElement('div');
        container.className = 'container';

        const title = document.createElement('h3');
        title.className = 'titel';
        title.innerHTML = `<b>${kledingstuk}</b>`;

        const soort = document.createElement('p');
        soort.className = 'soort';
        soort.innerHTML = `${item.Soort}`;

        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = truncateText(item.Beschrijving, 10);

        const color = document.createElement('p');
        color.className = 'color';
        color.textContent = item.Kleur;

        container.appendChild(title);
        container.appendChild(soort);
        container.appendChild(description);
        container.appendChild(color);

        // card.appendChild(image);
        card.appendChild(container);

        cardLink.appendChild(card);

        cardsContainer.appendChild(cardLink);
    });
}

function truncateText(text, maxLength) {
    const words = text.split(' ');
    if (words.length > maxLength) {
        return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
}