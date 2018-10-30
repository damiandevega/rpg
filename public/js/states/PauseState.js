var RPG = RPG || {};

RPG.PauseState = function () {
    "use strict";
    RPG.JSONLevelState.call(this);
    
    this.prefab_classes = {
        background: RPG.Prefab.prototype.constructor,
        unit_stats: RPG.UnitStats.prototype.constructor,
        show_player_unit: RPG.ShowPlayerUnitInPauseScreen.prototype.constructor
    };
};

RPG.PauseState.prototype = Object.create(RPG.JSONLevelState.prototype);
RPG.PauseState.prototype.constructor = RPG.PauseState;

RPG.PauseState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    RPG.JSONLevelState.prototype.init.call(this, level_data, extra_parameters);
    
    this.previous_level = extra_parameters.previous_level;
};

RPG.PauseState.prototype.create = function () {
    "use strict";
    RPG.JSONLevelState.prototype.create.call(this);
    
    for (var player_unit_name in this.game.party_data) {
        var unit_data = this.game.party_data[player_unit_name];
        var stats_bonus = this.game.party_data[player_unit_name].stats_bonus;
        this.prefabs[player_unit_name].stats = {};
        for (var stat_name in unit_data.stats) {
            this.prefabs[player_unit_name].stats[stat_name] = unit_data.stats[stat_name] + stats_bonus[stat_name];
        }
        
        this.prefabs[player_unit_name].experience = unit_data.experience;
        this.prefabs[player_unit_name].current_level = unit_data.current_level;
    }
};

RPG.PauseState.prototype.back_to_world = function () {
    "use strict";
    this.game.state.start("BootState", true, false, this.previous_level, "WorldState", {});
};