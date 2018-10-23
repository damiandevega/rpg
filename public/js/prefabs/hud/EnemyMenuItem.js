var RPG = RPG || {};

RPG.EnemyMenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);

    this.enemy = this.game_state.prefabs[properties.enemy_name];
};

RPG.EnemyMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.EnemyMenuItem.prototype.constructor = RPG.EnemyMenuItem;

RPG.EnemyMenuItem.prototype.select = function() {
    "use strict";
    this.game_state.current_attack.hit(this.enemy);

    this.game_state.prefabs.enemy_units_menu.enable(false);
};