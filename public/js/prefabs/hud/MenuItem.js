var RPG = RPG || {};

RPG.MenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.events.onInputDown.add(this.select, this);
};

RPG.MenuItem.prototype = Object.create(RPG.Prefab.prototype);
RPG.MenuItem.prototype.constructor = RPG.MenuItem;

RPG.MenuItem.prototype.select = function() {
    "use strict";
    console.log(this.name + " selected");
};