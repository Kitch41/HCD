function filterCards() {
    var searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    var cards = document.querySelectorAll('.cards .cardlink');
    
    cards.forEach(function(card) {
        var title = card.querySelector('.titel').innerText.toLowerCase();
        var description = card.querySelector('.description').innerText.toLowerCase();
        var color = card.querySelector('.color').innerText.toLowerCase();
        
        var titleMatches = title.split(' ').some(word => word.startsWith(searchInput));
        var descriptionMatches = description.split(' ').some(word => word.startsWith(searchInput));
        var colorMatches = color.split(' ').some(word => word.startsWith(searchInput));
        
        if (titleMatches || descriptionMatches || colorMatches) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}



const submitsearch = document.getElementById("searchButton");

submitsearch.addEventListener("click", filterCards)