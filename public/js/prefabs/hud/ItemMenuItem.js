var RPG = RPG || {};

RPG.ItemMenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);

    this.item_name = properties.item_name;
};

RPG.ItemMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.ItemMenuItem.prototype.constructor = RPG.ItemMenuItem;

RPG.ItemMenuItem.prototype.select = function() {
    "use strict";
    if (this.game_state.game.inventory.has_item(this.item_name)) {
        this.game_state.prefabs.items_menu.enable(false);

        this.game_state.game.inventory.use_item(this.item_name, this.game_state.current_unit);

        if (!this.game_state.game.inventory.has_item(this.item_name)) {
            this.kill();
        }

        this.game_state.next_turn();
    }
};