var RPG = RPG || {};

RPG.BootState = function() {
    "use strict";
    Phaser.State.call(this);
};

RPG.BootState.prototype = Object.create(Phaser.State.prototype);
RPG.BootState.prototype.constructor = RPG.BootState;

RPG.BootState.prototype.init = function(level_file, next_state, extra_parameters) {
    "use strict";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.level_file = level_file;
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;

    console.log('level_file', level_file);
    console.log('next_state', next_state);
    console.log('extra_parameters', extra_parameters);
    if ((level_file !== 'assets/levels/battle.json' && next_state !== 'BattleState') || 
        (level_file !== 'assets/levels/title_screen.json' && next_state !== 'TitleState')) {
        // save level_data to db
        var level_data = {
            level_file: level_file,
            next_state: next_state
        }
        if (firebase.auth().currentUser) {
            firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/level_data")
            .set(level_data);
        }
    }
};

RPG.BootState.prototype.preload = function() {
    "use strict";
    this.load.text("level_file", this.level_file);
};

RPG.BootState.prototype.create = function() {
    "use strict";
    var level_data = JSON.parse(this.game.cache.getText("level_file"));
    this.game.state.start("LoadingState", true, false, level_data, this.next_state, this.extra_parameters);
};