const commonFoods = [
    { name: 'Milk', shelfLife: 7 },
    { name: 'Eggs', shelfLife: 21 },
    { name: 'Bread', shelfLife: 7 },
    { name: 'Chicken', shelfLife: 2 },
    { name: 'Beef', shelfLife: 3 },
    { name: 'Cheese', shelfLife: 14 },
    { name: 'Yogurt', shelfLife: 14 },
    { name: 'Apples', shelfLife: 30 },
    { name: 'Bananas', shelfLife: 7 },
    { name: 'Carrots', shelfLife: 21 },
    { name: 'Lettuce', shelfLife: 7 },
    { name: 'Tomatoes', shelfLife: 7 },
    { name: 'Potatoes', shelfLife: 60 },
    { name: 'Onions', shelfLife: 30 },
];

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

    // Update inventory
    updateInventory();
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

        // Update inventory
        updateInventory();

        // Clear form
        document.getElementById('food-form').reset();
    }
});

// Suggest expiration date based on common foods
document.getElementById('food-name').addEventListener('input', (e) => {
    const foodName = e.target.value;
    const food = commonFoods.find(item => item.name.toLowerCase() === foodName.toLowerCase());

    if (food) {
        const today = new Date();
        const expiryDate = new Date(today.getTime() + food.shelfLife * 24 * 60 * 60 * 1000);
        document.getElementById('expiration-date').value = expiryDate.toISOString().split('T')[0];
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

// Calculate days until expiry
function calculateDaysUntilExpiry(expirationDate) {
    const today = new Date();
    const expiryDate = new Date(expirationDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Update fridge inventory
function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    const foods = JSON.parse(localStorage.getItem('foods')) || [];
    inventoryList.innerHTML = '';

    foods.forEach(food => {
        const li = document.createElement('li');
        const daysUntilExpiry = calculateDaysUntilExpiry(food.date);
        li.textContent = `${food.name} - ${daysUntilExpiry} days until expiry`;
        inventoryList.appendChild(li);
    });
}