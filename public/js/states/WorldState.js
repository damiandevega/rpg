var RPG = RPG || {};

RPG.WorldState = function() {
    "use strict";
    RPG.JSONLevelState.call(this);

    this.prefab_classes = {
        player: RPG.Player.prototype.constructor,
        door: RPG.Door.prototype.constructor,
        npc: RPG.NPC.prototype.constructor,
        enemy_spawner: RPG.EnemySpawner.prototype.constructor,
        equipment: RPG.Equipment.prototype.constructor
    };
    this.TEXT_STYLE = {font: "14px Kells", fill: "#FFFFFF"};
};

RPG.WorldState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.WorldState.prototype.constructor = RPG.WorldState;

RPG.WorldState.prototype.init = function(level_data) {
    "use strict";
    RPG.JSONLevelState.prototype.init.call(this, level_data);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
};

RPG.WorldState.prototype.preload = function() {
    "use strict";
    for (var npc_message_name in this.level_data.npc_messages) {
        this.load.text(npc_message_name, this.level_data.npc_messages[npc_message_name]);
    }
    for (var enemy_encounter_name in this.level_data.enemy_encounters) {
        this.load.text(enemy_encounter_name, this.level_data.enemy_encounters[enemy_encounter_name]);
    }
};

RPG.WorldState.prototype.create = function() {
    "use strict";
    this.map = this.game.add.tilemap(this.level_data.map.key);
    var tileset_index = 0;
    this.map.tilesets.forEach(function(tileset) {
        this.map.addTilesetImage(tileset.name, this.level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);

    this.layers = {};
    this.map.layers.forEach(function(layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) {
            this.map.setCollisionByExclusion([-1], true, layer.name);
        }
    }, this);
    this.layers[this.map.layer.name].resizeWorld();

    RPG.JSONLevelState.prototype.create.call(this);

    for (var object_layer in this.map.objects) {
        this.map.objects[object_layer].forEach(this.create_object, this);
    }
};

RPG.WorldState.prototype.create_object = function(object) {
    "use strict";
    var position = {x: object.x + (object.width / 2), y: object.y + (object.height / 2)};
    var prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
};

RPG.WorldState.prototype.end_talk = function() {
    "use strict";
    this.current_message_box.kill();
    this.user_input.set_input(this.user_inputs.world_map_user_input);
};

RPG.WorldState.prototype.pause_game = function() {
    "use strict";
    this.game.state.start("BootState", true, false, "assets/levels/pause_screen.json", "PauseState", {previous_level: this.level_data.level_file});
};