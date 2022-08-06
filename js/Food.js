class Food {
  constructor() {
    this.milkImg = loadImage("../images/milk.png");
    this.foodStock;
    this.lastFed;
    this.database = firebase.database();
  }

  getFoodStock() {
    foodStock = this.database.ref("Food");
    foodStock.on("value", (data) => (this.foodStock = data.val()));
  }

  updateFoodStock() {
    this.database.ref("/").update({
      Food: 20,
    });
  }

  display() {
    this.getFoodStock();

    var x = 80,
      y = 140;

    if (this.foodStock != 0) {
      for (var i = 0; i < this.foodStock; i++) {
        if (i % 10 == 0) {
          x = 80;
          y = y + 50;
        }
        image(this.milkImg, x, y, 50, 50);
        x = x + 30;
      }
    }
  }
}
