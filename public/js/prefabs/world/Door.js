var RPG = RPG || {};

RPG.Door = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5, 0.5);

    this.next_level = properties.next_level;

    this.game_state.physics.arcade.enable(this);
    this.body.immovable = true;
};

RPG.Door.prototype = Object.create(RPG.Prefab.prototype);
RPG.Door.prototype.constructor = RPG.Door;

RPG.Door.prototype.update = function() {
    "use strict";
    this.game_state.physics.arcade.collide(this, this.game_state.groups.players, this.enter, null, this);
};

RPG.Door.prototype.enter = function() {
    "use strict";
    this.game_state.game.state.start("BootState", true, false, this.next_level, "WorldState");
};