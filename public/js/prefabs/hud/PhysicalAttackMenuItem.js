var RPG = RPG || {};

RPG.PhysicalAttackMenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
};

RPG.PhysicalAttackMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.PhysicalAttackMenuItem.prototype.constructor = RPG.PhysicalAttackMenuItem;

RPG.PhysicalAttackMenuItem.prototype.select = function() {
    "use strict";
    this.game_state.prefabs.actions_menu.enable(false);
    this.game_state.prefabs.enemy_units_menu.enable(true);

    this.game_state.current_attack = new RPG.PhysicalAttack(this.game_state, this.game_state.current_unit.name + "_attack", {"x": 0, "y": 0}, {group: "attacks", owner: this.game_state.current_unit});
};