var RPG = RPG || {};

RPG.ShowStatWithBar = function (game_state, name, position, properties) {
    "use strict";
    RPG.TextPrefab.call(this, game_state, name, position, properties);
    
    this.unit_data = this.game_state.prefabs[properties.prefab];
    this.stat = properties.stat;
    this.bar_sprite = this.game_state.game.add.sprite(this.x, this.y + 24, properties.bar_texture);
};

RPG.ShowStatWithBar.prototype = Object.create(RPG.TextPrefab.prototype);
RPG.ShowStatWithBar.prototype.constructor = RPG.ShowStatWithBar;

RPG.ShowStatWithBar.prototype.update = function () {
    "use strict";
    this.current_stat = this.unit_data.stats[this.stat];
    this.bar_sprite.scale.setTo(this.current_stat / 100, 1.0);
};

RPG.ShowStatWithBar.prototype.show = function (show) {
    "use strict";
    this.visible = show;
    this.bar_sprite.visible = show;
};