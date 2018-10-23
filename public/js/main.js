var RPG = RPG || {};

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBW7Ni_rZEAlkf6dx7u8OUSanu7uJ6Bl-M",
    authDomain: "phaser-rpg-fdb04.firebaseapp.com",
    databaseURL: "https://phaser-rpg-fdb04.firebaseio.com",
    projectId: "phaser-rpg-fdb04",
    storageBucket: "phaser-rpg-fdb04.appspot.com",
    messagingSenderId: "297479066222"
  };
  firebase.initializeApp(config);

var game = new Phaser.Game(640, 480, Phaser.CANVAS);

game.inventory = new RPG.Inventory();

game.state.add("BootState", new RPG.BootState());
game.state.add("LoadingState", new RPG.LoadingState());
game.state.add("TitleState", new RPG.TitleState());
game.state.add("WorldState", new RPG.WorldState());
game.state.add("BattleState", new RPG.BattleState());
game.state.add("PauseState", new RPG.PauseState());
game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");
