document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const cardsContainer = document.querySelector('.cards');
  const noItemsMessage = document.getElementById('noitems');
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const startButton = document.getElementById('start');
  let resetButton;
  let cardsDisplayed = false;

  function filterCards() {
      const searchText = searchInput.value.trim().toLowerCase();
      const selectedCategory = getSelectedCategory();

      const cards = document.querySelectorAll('.cards .cardlink');
      let visibleCardsCount = 0;

      cards.forEach(function(card) {
          const title = card.querySelector('.titel').innerText.toLowerCase();
          const description = card.querySelector('.description').innerText.toLowerCase();
          const color = card.querySelector('.color').innerText.toLowerCase();
          const cardCategory = card.querySelector('.soort').textContent.toLowerCase();

          const titleMatches = title.includes(searchText);
          const descriptionMatches = description.includes(searchText);
          const colorMatches = color.includes(searchText);
          const categoryMatches = (selectedCategory === 'all' || cardCategory === selectedCategory);

          if (categoryMatches && (titleMatches || descriptionMatches || colorMatches)) {
              card.style.display = 'flex'; // Show the card
              visibleCardsCount++; // Increment visible cards count
          } else {
              card.style.display = 'none'; // Hide the card
          }
      });

      if (visibleCardsCount === 0) {
          const searchValue = searchInput.value.trim();
          const categoryLabel = getSelectedCategoryLabel(selectedCategory);
          const message = `Geen items gevonden met "${searchValue}" en Categorie ${categoryLabel}. Klik hier om terug te gaan.`;
          noItemsMessage.querySelector('h2').innerHTML = message;
          toggleNoItemsMessage(true); // Show 'no items found' message
      } else {
          toggleNoItemsMessage(false); // Hide 'no items found' message
      }

      updateResetButtonVisibility(visibleCardsCount > 0);
      cardsDisplayed = true;
  }

  function getSelectedCategory() {
      let selectedCategory = 'all';
      categoryRadios.forEach(function(radio) {
          if (radio.checked) {
              selectedCategory = radio.value;
          }
      });
      return selectedCategory;
  }

  function getSelectedCategoryLabel(category) {
      switch (category) {
          case 'shirt':
              return 'Shirt';
          case 'broek':
              return 'Broek';
          case 'jacket':
              return 'Jacket';
          case 'vest':
              return 'Vest';
          default:
              return 'Alle';
      }
  }

  function toggleNoItemsMessage(show) {
      noItemsMessage.style.display = show ? 'block' : 'none';
  }

  function updateResetButtonVisibility(show) {
      if (!resetButton) {
          resetButton = document.createElement('button');
          resetButton.textContent = 'Dit was het laatste kleding item, Klik hier om een andere zoekopdracht te maken';
          resetButton.classList.add('reset-button');
          resetButton.addEventListener('click', clearSearch);
          cardsContainer.parentElement.appendChild(resetButton);
      }
      resetButton.style.display = show ? 'block' : 'none';
  }

  function clearSearch() {
      searchInput.value = '';
      categoryRadios.forEach(radio => radio.checked = false);

      cardsContainer.style.display = 'none';
      cardsContainer.querySelectorAll('.cardlink').forEach(card => {
          card.style.display = 'none';
      });

      toggleNoItemsMessage(false);
      resetButton.style.display = 'none';
      cardsDisplayed = false;

      searchInput.focus();
  }

  startButton.addEventListener('click', function() {
      cardsContainer.style.display = 'flex';
      filterCards();
  });

  searchInput.addEventListener('input', function() {
      if (cardsDisplayed) {
          filterCards();
      }
  });

  categoryRadios.forEach(radio => {
      radio.addEventListener('change', function() {
          if (cardsDisplayed) {
              clearSearch();
          }
      });
  });

  noItemsMessage.addEventListener('click', function() {
      clearSearch();
  });

  cardsContainer.style.display = 'none';
  noItemsMessage.style.display = 'none';
});