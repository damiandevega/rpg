var RPG = RPG || {};

RPG.LoadingState = function() {
    "use strict";
    Phaser.State.call(this);
};

RPG.LoadingState.prototype = Object.create(Phaser.State.prototype);
RPG.LoadingState.prototype.constructor = RPG.LoadingState;

RPG.LoadingState.prototype.init = function(level_data, next_state, extra_parameters) {
    "use strict";
    this.level_data = level_data;
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;

    var loading_message = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", {font: "48px Kells", fill: "#ffffff"});
    loading_message.anchor.setTo(0.5, 0.5);
};

RPG.LoadingState.prototype.preload = function() {
    "use strict";
    var assets = this.level_data.assets;

    console.log('assets', assets);
    console.log('extra_parameters', this.extra_parameters);
    console.log("TODO: use previous level to map to what background_image to use");

    for (var asset_key in assets) {
        var asset = assets[asset_key];
        switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
        }
    }

    for (var user_input_name in this.level_data.user_input) {
        this.load.text(user_input_name, this.level_data.user_input[user_input_name]);
    }
};

RPG.LoadingState.prototype.create = function() {
    "use strict";
    this.game.state.start(this.next_state, true, false, this.level_data, this.extra_parameters);
};