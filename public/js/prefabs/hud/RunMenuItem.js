var RPG = RPG || {};

RPG.RunMenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);

    this.run_chance = properties.run_chance;
};

RPG.RunMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.RunMenuItem.prototype.constructor = RPG.RunMenuItem;

RPG.RunMenuItem.prototype.select = function() {
    "use strict";
    var random_number = this.game_state.rnd.frac();
    if (random_number < this.run_chance) {
        this.game_state.back_to_world();
    } else {
        this.game_state.next_turn();
    }
};