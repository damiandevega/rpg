var RPG = RPG || {};

RPG.Item = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.item_texture = properties.item_texture;
};

RPG.Item.prototype = Object.create(RPG.Prefab.prototype);
RPG.Item.prototype.constructor = RPG.Item;

RPG.Item.prototype.use = function(target) {
    "use strict";
    console.log("using item in target " + target.name);
}