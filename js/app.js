
// --------------------------------------------------------------------------------------------
// A) CLASSES // CONSTRUCTORS // PROPERTIES // METHODS
// --------------------------------------------------------------------------------------------
class Calorietracker {
    
    constructor () {
        this._calorieLimit = 2000;
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
    // A.1) APP User Actions (Public Methods)
    // --------------------------------------------------------------------------------------------
    addMeal (meal) {
        this._meals.push(meal)
        this._totalCalories += meal.calories;
        this._render();
        console.log(`-----> ${meal.name} with a total of ${meal.calories} calories was consumed`)
    }

    addWorkOut (workout) {
        this._workouts.push(workout)
        this._totalCalories -= workout.calories;
        this._render();
        console.log(`-----> ${workout.calories} calories were burned with ${workout.name}`)
    }

    // --------------------------------------------------------------------------------------------
    // A.2) UPDATE changes to the DOM Elements (Private Methods)
    // --------------------------------------------------------------------------------------------
    // A.2.1) Update Values
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

    // --------------------------------------------------------------------------------------------
    // A.2.2) Update Progress Bar
    // --------------------------------------------------------------------------------------------
    _displayCaloriesProgress () {
        const progressBarEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories/this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        console.log(`${width}%`);

        progressBarEl.style.width = `${width}%`;
        progressBarEl.innerText = `${width}%`
    }

    // --------------------------------------------------------------------------------------------
    // A.3) RENDER those changes to the DOM (Private Methods)
    // --------------------------------------------------------------------------------------------
    _render () {
        this._displaycaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    
    }
}


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


// --------------------------------------------------------------------------------------------
// F O R    L O G G I N G    A N D    T E S T I N G    T H E    M O D U L E    A B O V E    
// --------------------------------------------------------------------------------------------
// B) OBJECTS INSTATIATIONS
// --------------------------------------------------------------------------------------------
// B.1) App
// --------------------------------------------------------------------------------------------
const tracker = new Calorietracker ();

// --------------------------------------------------------------------------------------------
// B.2) Meals
// --------------------------------------------------------------------------------------------
const breakfast = new Meal ('Breakfast', 400)
const lunch = new Meal ('Lunch', 350)

// --------------------------------------------------------------------------------------------
// B.3) Workouts
// --------------------------------------------------------------------------------------------
const run = new Workout ('Morning Run', 320)

// --------------------------------------------------------------------------------------------
// C) ACTIONS PERFORMED ON APP OBJECT
// --------------------------------------------------------------------------------------------
// tracker.addMeal(breakfast)
// tracker.addMeal(lunch)
// tracker.addWorkOut(run)