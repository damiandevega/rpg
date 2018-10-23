var RPG = RPG || {};

RPG.InventoryMenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
};

RPG.InventoryMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.InventoryMenuItem.prototype.constructor = RPG.InventoryMenuItem;

RPG.InventoryMenuItem.prototype.select = function() {
    "use strict";
    if (this.game_state.game.inventory.has_items()) {
        this.game_state.prefabs.actions_menu.enable(false);
        this.game_state.prefabs.items_menu.enable(true);
    }
};