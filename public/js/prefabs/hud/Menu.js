var RPG = RPG || {};

RPG.Menu = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.menu_items = [];
    for (var menu_item_name in properties.menu_items) {
        var new_item = this.game_state.create_prefab(menu_item_name, properties.menu_items[menu_item_name]);
        this.menu_items.push(new_item);
    }

    this.enable(false);
};

RPG.Menu.prototype = Object.create(RPG.Prefab.prototype);
RPG.Menu.prototype.constructor = RPG.Menu;

RPG.Menu.prototype.enable = function(enable) {
    "use strict";
    this.menu_items.forEach(function(menu_item) {
        if (menu_item.alive) {
            menu_item.inputEnabled = enable;
            menu_item.visible = enable;
        }
    }, this);
};