var dog, happyDog;
var dogImg, happyDogImg;
var database;
var foodS;
var foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj;

function preload() {
  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(1000, 500);

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", readLastFed);

  dog = createSprite(750, 250, 10, 10);
  dog.addImage("dog", dogImg);
  dog.addImage("happyDog", happyDogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  feedButton = createButton("Feed Draco");
  feedButton.position(500, 90);
  feedButton.mousePressed(() => {
    deductFood(foodS);
    dog.changeImage("happyDog");
  });

  addFoodButton = createButton("Add Food for Draco");
  addFoodButton.position(600, 90);
  addFoodButton.mousePressed(() => {
    foodObj.updateFoodStock();
  });
}

function draw() {
  background(46, 139, 87);
  drawSprites();

  push();
  // translate(-165, 0);
  textSize(16);
  fill("white");
  if (lastFed >= 12) {
    text("Last Fed : " + (lastFed % 12) + " PM", 400, 20);
  } else if (lastFed == 0) {
    text("Last Fed : 12 AM", 450, 20);
  } else {
    text("Last Fed : " + lastFed + " AM", 450, 20);
  }
  pop();

  if (lastFed + 2 >= hour()) {
    dog.changeImage("happyDog");
  } else {
    dog.changeImage("dog");
  }

  foodObj.display();
}

function readStock(data) {
  foodS = data.val();
}

function readLastFed(data) {
  lastFed = data.val();
}

function deductFood(food_available) {
  if (food_available <= 0) {
    food_available = 0;
  } else {
    food_available = food_available - 1;
  }

  database.ref("/").update({
    Food: food_available,
    FeedTime: hour(),
  });
}
