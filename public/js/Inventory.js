var RPG = RPG || {};

RPG.Inventory = function () {
    "use strict";    
    this.item_classes = {
        "potion": RPG.Potion.prototype.constructor,
        "mana": RPG.Mana.prototype.constructor
    };

    this.items = {};
};

RPG.Inventory.prototype.collect_item = function (game_state, item_object, database_key) {
    "use strict";
    if (this.items[item_object.type]) {
        this.items[item_object.type].amount += 1;
    } else {
        var item = new this.item_classes[item_object.type](game_state, item_object.type, {x: 0, y: 0}, item_object.properties);
        this.items[item_object.type] = {prefab: item, amount: 1, database_keys: []};
    }
    
    if (database_key) {
        this.items[item_object.type].database_keys.push(database_key);
    } else {
        var item_database_ref = firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/items").push(item_object);
        this.items[item_object.type].database_keys.push(item_database_ref.key);
    }
};

RPG.Inventory.prototype.create_menu = function (game_state, items_menu) {
    "use strict";
    var item_position = new Phaser.Point(items_menu.x, items_menu.y);
    for (var item_type in this.items) {
        switch (item_type) {
            case "potion":
              item_position.y = 350;
              break;
            case "mana":
              item_position.y = 400;
              break;
        }
        var item_prefab = this.items[item_type].prefab;
        var item_amount = this.items[item_type].amount;
        var menu_item = new RPG.ItemMenuItem(game_state, item_type + "_menu_item", {x: item_position.x, y: item_position.y}, {group: "hud", texture: item_prefab.item_texture, item_name: item_type, amount: item_amount});
        items_menu.menu_items.push(menu_item);
    }
    
    items_menu.enable(false);
};

RPG.Inventory.prototype.has_items = function () {
    "use strict";
    var item_type;
    for (item_type in this.items) {
        if (this.items[item_type].amount > 0) {
            return true;
        }
    }
    return false;
};

RPG.Inventory.prototype.use_item = function (item_type, target) {
    "use strict";
    this.items[item_type].prefab.use(target);
    this.items[item_type].amount -= 1;
    
    var item_database_key = this.items[item_type].database_keys.pop();
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/items/" + item_database_key).remove();
};

RPG.Inventory.prototype.has_item = function (item_type) {
    "use strict";
    return this.items[item_type].amount > 0;
};