
// Load data
const searchFood = () => {
    const foodNameInput = document.getElementById('foodName').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodNameInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.meals))
        .catch(error => errorMessage('No Food Found'))

}

// Display data
const displayFoods = foods => {
    const foodsDiv = document.getElementById('foodsItem');
    foodsDiv.innerText = '';
    foods.forEach(foodElement => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'col-md-3';
        foodDiv.innerHTML = `<div onclick="displayDetails('${foodElement.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img class="img-fluid rounded-top" src="${foodElement.strMealThumb}" alt="">
        <h4 class="h5 py-4 px-2 mb-0">${foodElement.strMeal}</h4>
        </div>`
        foodsDiv.appendChild(foodDiv);
    });
}


// Load details
const displayDetails = foodName => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        })

};


// Pop Up
const renderFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h4 class="pt-3 pb-2">Recipe:-</h4>
    <ul class="list-unstyled mb-0">
        <li>1 :- ${food.strMeasure1}, ${food.strIngredient1}</li>
        <li>2 :- ${food.strMeasure2}, ${food.strIngredient2}</li>
        <li>3 :- ${food.strMeasure3}, ${food.strIngredient3}</li>
        <li>4 :- ${food.strMeasure4}, ${food.strIngredient4}</li>
        <li>5 :- ${food.strMeasure5}, ${food.strIngredient5}</li>
    </ul>

`;
};


// Error message
const errorMessage = error => {
    const errorTag = document.getElementById('errorMes');
    errorTag.innerText = error;
}
