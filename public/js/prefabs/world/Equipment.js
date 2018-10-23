var RPG = RPG || {};

RPG.Equipment = function (game_state, name, position, properties) {
    "use strict";
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.scale.setTo(0.3, 0.3);
    this.anchor.setTo(0.5, 0.5);
    
    this.unit_name = properties.unit_name;
    this.body_part = properties.body_part;
    this.stat = properties.stat;
    this.bonus = +properties.bonus;
    this.texture_name = properties.texture;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

RPG.Equipment.prototype = Object.create(RPG.Prefab.prototype);
RPG.Equipment.prototype.constructor = RPG.Equipment;

RPG.Equipment.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.players, this.collect, null, this);
};

RPG.Equipment.prototype.collect = function () {
    "use strict";
    var unit_data;
    unit_data = this.game_state.game.party_data[this.unit_name];
    
    if (unit_data.equipment[this.body_part].name !== this.name) {
        unit_data.equipment[this.body_part] = {name: this.name, texture: this.texture_name};
        unit_data.stats_bonus[this.stat] = this.bonus;
        this.kill();
        
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/party_data")
            .set(this.game.party_data);
    }
};