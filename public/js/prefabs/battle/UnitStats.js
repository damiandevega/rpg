var RPG = RPG || {};

RPG.UnitStats = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.stats = Object.create(properties.stats);
    this.face_texture = properties.face_texture;
};

RPG.UnitStats.prototype = Object.create(RPG.Prefab.prototype);
RPG.UnitStats.prototype.constructor = RPG.UnitStats;