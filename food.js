
// Call Ids

const dataContent = document.getElementById('foodsItem');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', function () {
    errorMessageFunc();
});


//  Error Message

function errorMessageFunc(){
    const foodName = document.getElementById('foodName').value;
    dataContent.innerHTML = '';
    if (foodName === '') {
        errorMessage.style.display = 'block';
    } else {
        getFood(foodName);
        errorMessage.style.display = 'none';
    }
}


//  Fetch function


const displayDetails = foodName => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        })
        .catch((error) => {
            errorMessage.style.display = 'none';
            console.error(errorMessage, error);
          });
};

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

function getFood(foodId) {
    
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foodsItem');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            errorMessage.style.display = 'block'; 
        }
    };
}
