var RPG = RPG || {};

RPG.MagicalAttackMenuItem = function(game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);

    this.MANA_COST = 10;
};

RPG.MagicalAttackMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.MagicalAttackMenuItem.prototype.constructor = RPG.MagicalAttackMenuItem;

RPG.MagicalAttackMenuItem.prototype.select = function() {
    "use strict";
    if (this.game_state.current_unit.stats.mana >= this.MANA_COST) {
        this.game_state.prefabs.actions_menu.enable(false);
        this.game_state.prefabs.enemy_units_menu.enable(true);

        this.game_state.current_attack = new RPG.MagicalAttack(this.game_state, this.game_state.current_unit.name + "_attack", {"x": 0, "y": 0}, {group: "attacks", owner: this.game_state.current_unit, mana_cost: this.MANA_COST});
    }
};