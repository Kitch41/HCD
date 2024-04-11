
const categorylist = document.getElementById("categorylist");
const categoryitem = document.querySelector("#categorylist li:first-of-type button")
const cardsContainer = document.querySelector('.cards');
var noItemsMessage = document.getElementById('noitems');
const searchInput = document.getElementById("searchInput");

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

    if (inputmode == true) {
        searchInput.focus();
    } else {
        categoryitem.focus();
    }

    filterCards(e)
}


const shirtscategorybtn = document.getElementById("shirtscategory");
const pantscategorybtn = document.getElementById("pantscategory");
const jacketcategorybtn = document.getElementById("jacketcategory");
const vestcategorybtn = document.getElementById("vestcategory");



function showclothes(item) {
    const cards = document.querySelectorAll('.cards .cardlink');

  var visibleCardsCount = 0; // Initialize visible cards count

    cards.forEach(function(card) {
    const cardCategoryElement = card.querySelector('.soort');
    if (!cardCategoryElement) {
      console.error('Category element not found in card:', card);
      return;
    }
    
    const cardCategory = cardCategoryElement.textContent.toLowerCase();
    console.log('Card category:', cardCategory);

    // Check if the card's category matches the specified item
    if (cardCategory === item.toLowerCase()) {
      console.log('Match found for', item, ':', cardCategory);
      card.style.display = 'block'; // Show the card
      visibleCardsCount++;
    } else {
      console.log('No match for', item, ':', cardCategory);
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

// Add event listeners to category buttons
shirtscategorybtn.addEventListener("click", function() {
  showclothes('shirt');
});

pantscategorybtn.addEventListener("click", function() {
  showclothes('broek');
});

jacketcategorybtn.addEventListener("click", function() {
  showclothes('jacket');
});

vestcategorybtn.addEventListener("click", function() {
  showclothes('vest');
});