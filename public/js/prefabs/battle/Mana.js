var RPG = RPG || {};

RPG.Mana = function(game_state, name, position, properties) {
    "use strict";
    RPG.Item.call(this, game_state, name, position, properties);

    this.mana_power = properties.mana_power;
};

RPG.Mana.prototype = Object.create(RPG.Item.prototype);
RPG.Mana.prototype.constructor = RPG.Mana;

RPG.Mana.prototype.use = function(target) {
    "use strict";
    target.stats.mana = Math.min(100, target.stats.mana + this.mana_power);
    console.log(target.name + " mana restored");
}