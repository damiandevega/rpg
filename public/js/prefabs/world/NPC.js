var RPG = RPG || {};

RPG.NPC = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5, 0.5);

    this.message = this.game_state.game.cache.getText(properties.message);

    this.game_state.physics.arcade.enable(this);
    this.body.immovable = true;
};

RPG.NPC.prototype = Object.create(RPG.Prefab.prototype);
RPG.NPC.prototype.constructor = RPG.NPC;

RPG.NPC.prototype.update = function() {
    "use strict";
    this.game_state.physics.arcade.collide(this, this.game_state.groups.players, this.talk, null, this);
};

RPG.NPC.prototype.talk = function(npc, player) {
    "use strict";
    player.stop();
    this.game_state.current_message_box = new RPG.MessageBox(this.game_state, this.name + "_message_box", {x: 0, y: this.game_state.game.world.height * 0.75}, {group: "hud", texture: "message_box_image", message: this.message});

    this.game_state.user_input.set_input(this.game_state.user_inputs.talking_user_input);
};