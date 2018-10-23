var RPG = RPG || {};

RPG.EnemyUnit = function(game_state, name, position, properties) {
    "use strict";
    RPG.Unit.call(this, game_state, name, position, properties);

    this.target_units = properties.target_units;
    this.attack = new RPG.PhysicalAttack(this.game_state, this.name + "_attack", {"x": 0, "y": 0}, {group: "attacks", owner: this});
};

RPG.EnemyUnit.prototype = Object.create(RPG.Unit.prototype);
RPG.EnemyUnit.prototype.constructor = RPG.EnemyUnit;

RPG.EnemyUnit.prototype.kill = function() {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    var menu_item = this.game_state.prefabs[this.name + "_item"];
    menu_item.kill();
};

RPG.EnemyUnit.prototype.act = function() {
    "use strict";
    var target;

    this.game_state.prefabs.show_player_unit.show(false);
    
    target = this.choose_target();

    this.attack.hit(target);
};

RPG.EnemyUnit.prototype.choose_target = function() {
    "use strict";
    var target;
    var target_index = this.game_state.rnd.between(0, this.game_state.groups[this.target_units].countLiving() - 1);

    var alive_player_unit_index = 0;
    this.game_state.groups[this.target_units].forEachAlive(function(alive_unit) {
        if (alive_player_unit_index === target_index) {
            target = alive_unit;
        }
        alive_player_unit_index += 1;
    }, this);
    return target;
};