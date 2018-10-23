var RPG = RPG || {};

RPG.TitleState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
        
    this.prefab_classes = {
        background: RPG.Prefab.prototype.constructor,
        text: RPG.TextPrefab.prototype.constructor
    }
};

RPG.TitleState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.TitleState.prototype.constructor = RPG.TitleState;

RPG.TitleState.prototype.preload = function () {
    "use strict";
    this.game.load.text("default_data", "assets/levels/default_data.json");
}

RPG.TitleState.prototype.create = function () {
    "use strict";
    RPG.JSONLevelState.prototype.create.call(this);
    this.default_data = JSON.parse(this.game.cache.getText("default_data"));
};

RPG.TitleState.prototype.login = function () {
    "use strict";
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        
        firebase.auth().signInWithPopup(provider)
            .then(this.on_login.bind(this))
            .catch(this.handle_error.bind(this));
    } else {
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value")
            .then(this.retrieve_data.bind(this));
    }
};

RPG.TitleState.prototype.on_login = function (result) {
    "use strict";
    firebase.database().ref("/users/" + result.user.uid).once("value").then(this.retrieve_data.bind(this));
};

RPG.TitleState.prototype.retrieve_data = function (snapshot) {
    "use strict";
    var user_data = snapshot.val();
    if (!user_data) {
        this.game.party_data = this.default_data.party_data;
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/party_data")
            .set(this.game.party_data)
            .then(this.start_game.bind(this));
    } else {
        this.game.party_data = user_data.party_data || this.default_data.party_data;

        var items = user_data.items || this.default_data.items;

        for (var item_key in items) {
            this.game.inventory.collect_item(this, items[item_key], item_key);
        }

        this.start_game();
    }
};

RPG.TitleState.prototype.start_game = function () {
    "use strict";
    this.game.state.start("BootState", true, false, "assets/levels/town.json", "WorldState");
};

RPG.TitleState.prototype.handle_error = function (error) {
    "use strict";
    console.log(error);
};