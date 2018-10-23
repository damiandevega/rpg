var RPG = RPG || {};

RPG.Unit = function(game_state, name, position, properties) {
    "use strict";
    var attack1_animation, attack2_animation, hit_animation;
    RPG.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.animations.add("idle", properties.animations.idle.frames, properties.animations.idle.fps, true);
    attack1_animation = this.animations.add("attack1", properties.animations.attack1.frames, properties.animations.attack1.fps);
    attack1_animation.onComplete.add(this.back_to_idle, this);
    attack2_animation = this.animations.add("attack2", properties.animations.attack2.frames, properties.animations.attack2.fps);
    attack2_animation.onComplete.add(this.back_to_idle, this);
    hit_animation = this.animations.add("hit", properties.animations.hit.frames, properties.animations.hit.fps);
    hit_animation.onComplete.add(this.back_to_idle, this);

    this.animations.play("idle");

    this.stats = properties.stats;
};

RPG.Unit.prototype = Object.create(RPG.Prefab.prototype);
RPG.Unit.prototype.constructor = RPG.Unit;

RPG.Unit.prototype.back_to_idle = function() {
    "use strict";
    this.animations.play("idle");
};

RPG.Unit.prototype.calculate_act_turn = function(current_turn) {
    "use strict";
    this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
};

RPG.Unit.prototype.receive_damage = function(damage) {
    "use strict";
    this.stats.health -= damage;
    this.animations.play("hit");
    if (this.stats.health <= 0) {
        this.stats.health = 0;
        this.kill();
    }

    var damage_text = this.game_state.game.add.text(this.x, this.y - 50, "" + damage, {font: "bold 24px Kells", fill: "#FF0000"}, this.game_state.groups.hud);
    var kill_timer = this.game_state.time.create();
    kill_timer.add(1 * Phaser.Timer.SECOND, damage_text.kill, damage_text);
    kill_timer.start();
};