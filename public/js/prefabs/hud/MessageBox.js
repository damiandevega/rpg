var RPG = RPG || {};

RPG.MessageBox = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.message_text = new RPG.TextPrefab(this.game_state, this.name + "_message", {x: this.x + (this.width / 2), y: this.y + 50}, {group: "hud", text: properties.message, style: Object.create(this.game_state.TEXT_STYLE)});

    this.message_text.anchor.setTo(0.5, 0.5);
};

RPG.MessageBox.prototype = Object.create(RPG.Prefab.prototype);
RPG.MessageBox.prototype.constructor = RPG.MessageBox;

RPG.MessageBox.prototype.kill = function() {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    this.message_text.kill();
};