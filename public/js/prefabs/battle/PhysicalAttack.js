var RPG = RPG || {};

RPG.PhysicalAttack = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.owner = properties.owner;
};

RPG.PhysicalAttack.prototype = Object.create(RPG.Prefab.prototype);
RPG.PhysicalAttack.prototype.constructor = RPG.PhysicalAttack;

RPG.PhysicalAttack.prototype.hit = function(target) {
    "use strict";
    var attack_multiplier = this.game_state.rnd.realInRange(0.8, 1.2);
    var defense_multiplier = this.game_state.rnd.realInRange(0.8, 1.2);

    var damage = Math.max(0, Math.round((attack_multiplier * this.owner.stats.attack) - (defense_multiplier * target.stats.defense)));

    target.receive_damage(damage);

    this.owner.animations.play("attack1");
    this.owner.animations.currentAnim.onComplete.add(this.game_state.next_turn, this.game_state);
};