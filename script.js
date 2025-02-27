// Load food items from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const foodList = document.getElementById('food-list');
    const foods = JSON.parse(localStorage.getItem('foods')) || [];
  
    // Display existing food items
    foods.forEach(food => {
      addFoodToDOM(food);
    });
  
    // Check for expired or near-expired items
    checkExpirations(foods);
  });
  
  // Add food item to the list
  document.getElementById('food-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const foodName = document.getElementById('food-name').value;
    const expirationDate = document.getElementById('expiration-date').value;
  
    if (foodName && expirationDate) {
      const food = { name: foodName, date: expirationDate };
  
      // Add to localStorage
      const foods = JSON.parse(localStorage.getItem('foods')) || [];
      foods.push(food);
      localStorage.setItem('foods', JSON.stringify(foods));
  
      // Add to DOM
      addFoodToDOM(food);
  
      // Clear form
      document.getElementById('food-form').reset();
    }
  });
  
  // Add food item to the DOM
  function addFoodToDOM(food) {
    const foodList = document.getElementById('food-list');
    const li = document.createElement('li');
    li.textContent = `${food.name} - Expires on ${food.date}`;
    foodList.appendChild(li);
  }
  
  // Check for expired or near-expired items
  function checkExpirations(foods) {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
    foods.forEach(food => {
      const expirationDate = new Date(food.date);
  
      if (expirationDate < today) {
        alert(`⚠️ ${food.name} has expired!`);
      } else if (expirationDate <= oneWeekFromNow) {
        alert(`⚠️ ${food.name} is expiring soon!`);
      }
    });
  }