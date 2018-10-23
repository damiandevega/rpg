var RPG = RPG || {};

RPG.JSONLevelState = function() {
    "use strict";
    Phaser.State.call(this);
};

RPG.JSONLevelState.prototype = Object.create(Phaser.State.prototype);
RPG.JSONLevelState.prototype.constructor = RPG.JSONLevelState;

RPG.JSONLevelState.prototype.init = function(level_data) {
    "use strict";
    this.level_data = level_data;
};

RPG.JSONLevelState.prototype.create = function() {
    "use strict";
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};
    for (var prefab_name in this.level_data.prefabs) {
        var prefab_data = this.level_data.prefabs[prefab_name];
        this.create_prefab(prefab_name, prefab_data);
    }

    if (this.level_data.user_input) {
        this.user_input = this.game.plugins.add(RPG.UserInput, this);
        this.user_inputs = {};
        for (var user_input_name in this.level_data.user_input) {
            this.user_inputs[user_input_name] = JSON.parse(this.game.cache.getText(user_input_name));
        }
        this.user_input_data = JSON.parse(this.game.cache.getText(this.level_data.initial_user_input));
        this.user_input.set_input(this.user_input_data);
    }
};

RPG.JSONLevelState.prototype.create_prefab = function(prefab_name, prefab_data) {
    "use strict";
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        var prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
    return prefab;
};