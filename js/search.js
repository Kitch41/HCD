function filterCards(e) {
    e.preventDefault();

    var searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    var cards = document.querySelectorAll('.cards .cardlink');
    var visibleCardsCount = 0; // Initialize visible cards count

    cards.forEach(function(card) {
        var title = card.querySelector('.titel').innerText.toLowerCase();
        var description = card.querySelector('.description').innerText.toLowerCase();
        var color = card.querySelector('.color').innerText.toLowerCase();
        
        var titleMatches = title.split(' ').some(word => word.startsWith(searchInput));
        var descriptionMatches = description.split(' ').some(word => word.startsWith(searchInput));
        var colorMatches = color.split(' ').some(word => word.startsWith(searchInput));
        
        if (titleMatches || descriptionMatches || colorMatches) {
            card.style.display = 'block'; // Show the card
            visibleCardsCount++; // Increment visible cards count
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });

    // Get the element you want to show/hide (noitems message)
    var noItemsMessage = document.getElementById('noitems');

    noItemsMessage.addEventListener("click", clearSearch)

    // Check if there are no visible cards
    if (visibleCardsCount === 0) {
        // Display the 'noitems' message
        noItemsMessage.style.display = 'block';
    } else {
        // Hide the 'noitems' message
        noItemsMessage.style.display = 'none';
    }
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", filterCards);
} else {
    console.log("No search bar present");
}

function clearSearch(e) {
    e.preventDefault();

    var searchInput = document.getElementById('searchInput');
    var cards = document.querySelectorAll('.cards .cardlink');
    var noItemsMessage = document.getElementById('noitems');

    searchInput.value = null;

    cards.forEach(function(card) {
        card.style.display = "flex";
    })
    
    noItemsMessage.style.display = "none";

    searchInput.focus();
    

    filterCards()
}