
// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
// A)  C L A S S E S  //  C O N S T R U C T O R S  //  M E T H O D S
// --------------------------------------------------------------------------------------------
// A.1) MAIN CLASS
// --------------------------------------------------------------------------------------------
class Calorietracker {
    constructor () {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displaycaloriesLimit();
        this._displaycaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

    // --------------------------------------------------------------------------------------------
    // A.1.1) APP User Actions (Public Methods)
    // --------------------------------------------------------------------------------------------
    addMeal (meal) {
        this._meals.push(meal)
        this._totalCalories += meal.calories;
        this._displayNewMeal(meal);
        this._render();
        console.log(`-----> ${meal.name} with a total of ${meal.calories} calories was consumed`)
    }

    addWorkOut (workout) {
        this._workouts.push(workout)
        this._totalCalories -= workout.calories;
        this._displayNewWorkout(workout);
        this._render();
        console.log(`-----> ${workout.calories} calories were burned with ${workout.name}`)
    }

    removeMeal (id) {
        const index = this._meals.findIndex((meal) => meal.id === id)
        
        if (index !== -1) {
            const meal = this._meals[index]
            this._totalCalories -= meal.calories;
            this._meals.splice(index, 1);
            this._render();
        }
    }

    removeWorkout (id) {
        const index = this._workouts.findIndex((workout) => workout.id === id)
        
        if (index !== -1) {
            const workout = this._workouts[index]
            this._totalCalories += workout.calories;
            this._workouts.splice(index, 1);
            this._render();
        }
    }

    reset () {
        this._meals = [];
        this._workouts = [];
        this._totalCalories = 0;
        this._render();
    }

    setLimit (calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit)
        this._displaycaloriesLimit();
        this._render();
    }

    // --------------------------------------------------------------------------------------------
    // A.1.2) UPDATE changes to the DOM Elements (Private Methods)
    // --------------------------------------------------------------------------------------------
    // A.1.2.1) Update Values
    // --------------------------------------------------------------------------------------------
    _displaycaloriesLimit () {
        console.log(`Calorie Limit: ${this._calorieLimit}`);
        const calorieLimitEl = document.getElementById('calories-limit').innerText = this._calorieLimit
    }

    _displaycaloriesTotal () {
        console.log(`Total Calories - Gain/Loss (Consumed - Burned): ${this._totalCalories}`);
        const totalCaloriesEl = document.getElementById('calories-total').innerText = this._totalCalories
    }

    _displayCaloriesConsumed () {
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        console.log(`Calories Consumed: ${consumed}`);  

        const caloriesConsumedEl = document.getElementById('calories-consumed').innerText = consumed;
    }

    _displayCaloriesBurned () {
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        console.log(`Calories Burned: ${burned}`);  

        const caloriesBurnedEl = document.getElementById('calories-burned').innerText = burned;
    }

    _displayCaloriesRemaining () {
        const caloriesRemaining = this._calorieLimit - this._totalCalories;
        console.log(`Calories Remaining: ${caloriesRemaining}`); 

        const caloriesRemainingEl = document.getElementById('calories-remaining').innerText = caloriesRemaining;
        const progressBarEl = document.getElementById('calorie-progress');

        if (caloriesRemaining <= 0) {
            document.getElementById('calories-remaining').parentElement.parentElement.classList.remove('bg-light');
            document.getElementById('calories-remaining').parentElement.parentElement.classList.add('bg-danger');

            progressBarEl.classList.remove('bg-success')
            progressBarEl.classList.add('bg-danger')

        } else {
            document.getElementById('calories-remaining').parentElement.parentElement.classList.add('bg-light');
            document.getElementById('calories-remaining').parentElement.parentElement.classList.remove('bg-danger');

            progressBarEl.classList.remove('bg-danger')
            progressBarEl.classList.add('bg-success')
        }
    }

    _displayNewMeal (meal) {
        const mealsEl = document.getElementById('meal-items')
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2') ;
        mealEl.setAttribute('data-id', meal.id)

        mealEl.innerHTML = 
        `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">${meal.calories}</div>
                <button class="delete btn btn-danger btn-sm mx-2"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
        `
        mealsEl.appendChild(mealEl);
    }

    _displayNewWorkout (workout) {
        const workoutsEl = document.getElementById('workout-items')
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2') ;
        workoutEl.setAttribute('data-id', workout.id)

        workoutEl.innerHTML = 
        `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">${workout.calories}</div>
                <button class="delete btn btn-danger btn-sm mx-2"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
        `
        workoutsEl.appendChild(workoutEl);
    }

    // --------------------------------------------------------------------------------------------
    // A.1.2.2) Update Progress Bar
    // --------------------------------------------------------------------------------------------
    _displayCaloriesProgress () {
        const progressBarEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories/this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        console.log(`${width}%`);

        progressBarEl.style.width = `${width}%`;
        progressBarEl.innerText = `${width.toFixed(2)}%`
    }

    // --------------------------------------------------------------------------------------------
    // A.1.3) RENDER those changes to the DOM (Private Methods)
    // --------------------------------------------------------------------------------------------
    _render () {
        this._displaycaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

// --------------------------------------------------------------------------------------------
// A.2) MODEL CLASSES
// --------------------------------------------------------------------------------------------
class Meal {
    constructor (name, calories) {
        this.id = Math.random().toString(16).slice(2)
        this.name = name;
        this.calories = calories;
    }
}


class Workout {
    constructor (name, calories) {
        this.id = Math.random().toString(16).slice(2)
        this.name = name;
        this.calories = calories;
    }
}
// ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
// A)  C L A S S E S  //  C O N S T R U C T O R S  //  M E T H O D S
// --------------------------------------------------------------------------------------------




// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
// B)  M A I N  A P P
// --------------------------------------------------------------------------------------------
class App {
    constructor () {
        this._tracker = new Calorietracker();

        document
            .getElementById('meal-form')
            .addEventListener('submit', this._newItem.bind(this, 'meal'));

        document
            .getElementById('workout-form')
            .addEventListener('submit', this._newItem.bind(this, 'workout'));

        document
            .getElementById('meal-items')
            .addEventListener('click', this._removeItem.bind(this, 'meal'));

        document
            .getElementById('workout-items')
            .addEventListener('click', this._removeItem.bind(this, 'workout'));

        document
            .getElementById('filter-meals')
            .addEventListener('keyup', this._filterItems.bind(this, 'meal'))

        document
            .getElementById('filter-workouts')
            .addEventListener('keyup', this._filterItems.bind(this, 'workout'))

        document
            .getElementById('reset')
            .addEventListener('click', this._reset.bind(this))

        document
            .getElementById('limit-form')
            .addEventListener('submit', this._setLimit.bind(this))
    }

    _newItem(type, e) {
        e.preventDefault();
        // console.log(this);

        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        // Validate Inputs
        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
        }

        if (type === 'meal') {
            const meal = new Meal(name.value, parseInt(calories.value));
            this._tracker.addMeal(meal);
        } else {
            const workout = new Workout(name.value, parseInt(calories.value));
            this._tracker.addWorkOut(workout);
        }

        name.value = '';
        name.calories = '';

        const collapseItem = document.getElementById(`collapse-${type}`);
        new bootstrap.Collapse(collapseItem, {
            toggle:true
        });        
    }

    _removeItem(type, e) {
        // console.log(this);

        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if (confirm('Are your sure?')) {
                const id = e.target.closest('.card', 'my-2').getAttribute('data-id');
                
                type === 'meal' 
                    ? this._tracker.removeMeal(id) 
                    : this._tracker.removeWorkout(id) 

                e.target.closest('.card', 'my-2').remove();
            }
        }
    }

    _filterItems (type, e) {
        const text = e.target.value.toLowerCase();
        console.log(text)

        document.querySelectorAll(`#${type}-items .card`)
            .forEach ((item) => {
                const name = item.firstElementChild.firstElementChild.textContent;

                if (name.toLowerCase().indexOf(text) !== -1) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none'
                }
            })
    }

    _reset () {
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _setLimit (e) {
        e.preventDefault();
        const limit = document.getElementById('limit');
        
        if (limit.value === '') {
            alert('Please add a limit');
            return;
        }
        
        this._tracker.setLimit(parseInt(limit.value));
        limit.value = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }
}
// ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
// B)  M A I N  A P P
// --------------------------------------------------------------------------------------------




// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
// C)  P E R S I S T E N C E
// --------------------------------------------------------------------------------------------
class Storage {
    static getCalorieLimit (defaultLimit = 2000) {
        let calorieLimit;

        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit (calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit)
    }
}



// ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
// C)  P E R S I S T E N C E
// --------------------------------------------------------------------------------------------


const app = new App();






// // --------------------------------------------------------------------------------------------
// // F O R    L O G G I N G    A N D    T E S T I N G    T H E    M O D U L E    A B O V E    
// // --------------------------------------------------------------------------------------------
// // Z) OBJECTS INSTATIATIONS
// // --------------------------------------------------------------------------------------------
// // Z.1) App
// // --------------------------------------------------------------------------------------------
// const tracker = new Calorietracker ();

// // --------------------------------------------------------------------------------------------
// // Z.2) Meals
// // --------------------------------------------------------------------------------------------
// const breakfast = new Meal ('Breakfast', 400)
// const lunch = new Meal ('Lunch', 350)

// // --------------------------------------------------------------------------------------------
// // Z.3) Workouts
// // --------------------------------------------------------------------------------------------
// const run = new Workout ('Morning Run', 320)

// // --------------------------------------------------------------------------------------------
// // C) ACTIONS PERFORMED ON APP OBJECT
// // --------------------------------------------------------------------------------------------
// tracker.addMeal(breakfast)
// tracker.addMeal(lunch)
// tracker.addWorkOut(run)
