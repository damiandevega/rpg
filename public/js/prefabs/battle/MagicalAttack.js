var RPG = RPG || {};

RPG.MagicalAttack = function(game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.owner = properties.owner;
    this.mana_cost = properties.mana_cost;
};

RPG.MagicalAttack.prototype = Object.create(RPG.Prefab.prototype);
RPG.MagicalAttack.prototype.constructor = RPG.MagicalAttack;

RPG.MagicalAttack.prototype.hit = function(target) {
    "use strict";
    var attack_multiplier = this.game_state.rnd.realInRange(0.9, 1.3);
    var defense_multiplier = this.game_state.rnd.realInRange(0.8, 1.2);

    var damage = Math.max(0, Math.round((attack_multiplier * this.owner.stats.magic_attack) - (defense_multiplier * target.stats.defense)));

    target.receive_damage(damage);

    this.owner.stats.mana -= this.mana_cost;

    this.owner.animations.play("attack2");
    this.owner.animations.currentAnim.onComplete.add(this.game_state.next_turn, this.game_state);
};