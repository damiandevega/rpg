var RPG = RPG || {};

RPG.BossUnit = function(game_state, name, position, properties) {
    "use strict";
    RPG.EnemyUnit.call(this, game_state, name, position, properties);

    this.SPECIAL_ATTACK_THRESHOLD = 0.5;
    this.special_attack = new RPG.MagicalAttack(this.game_state, this.name + "_special_attack", {x: 0, y: 0}, {group: "attacks", owner: this});

    this.max_health = this.stats.health;
    this.enraged = false;

    this.current_state = "default";
};

RPG.BossUnit.prototype = Object.create(RPG.EnemyUnit.prototype);
RPG.BossUnit.prototype.constructor = RPG.BossUnit;

RPG.BossUnit.prototype.kill = function() {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    // var menu_item = this.game_state.prefabs[this.name + "_item"];
    // menu_item.kill();
};

RPG.BossUnit.prototype.act = function() {
    "use strict";
    switch (this.current_state) {
        case "default":
            this.default_act();
            break;
        case "special":
            this.special_act();
            break;
        case "enraged":
            this.enraged_act();
            break;
    }
    this.next_state();
};

RPG.BossUnit.prototype.next_state = function() {
    switch (this.current_state) {
        case "default":
            console.log(this.stats.health);
            console.log(this.max_health);
            if ((this.stats.health < 0.5 * this.max_health) && !this.enraged) {
                this.enraged = true;
                this.current_state = "enraged";
            } else {
                var random_number = this.game_state.rnd.frac();
                if (random_number < this.SPECIAL_ATTACK_THRESHOLD) {
                    this.current_state = "special";
                }
            }
            break;
        case "special":
            this.current_state = "default";
            break;
        case "enraged":
            this.current_state = "default";
            break;        
    }

    console.log("next state ", this.current_state);
};

RPG.BossUnit.prototype.default_act = function() {
    "use strict";
    console.log("default act");
    this.game_state.prefabs.show_player_unit.show(false);
    
    var target = this.choose_target();

    this.attack.hit(target);
};

RPG.BossUnit.prototype.special_act = function() {
    "use strict";
    console.log("special act");
    this.game_state.prefabs.show_player_unit.show(false);
    
    var target = this.choose_target();

    this.special_attack.hit(target);
};

RPG.BossUnit.prototype.enraged_act = function() {
    "use strict";
    console.log("enraged act");
    this.game_state.prefabs.show_player_unit.show(false);

    this.game_state.groups[this.target_units].forEachAlive(function(target) {
        this.special_attack.hit(target);
    }, this);
};
