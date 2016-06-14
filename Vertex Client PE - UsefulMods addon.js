//Vertex UsefulMods addon v1.0
const ADDON_NAME = "UsefulMods";
const ADDON_DESC = "Adds a few handy modules into Vertex Client PE.";
const ADDON_VERSION = "1.0";
const TARGET_VERSION = "1.0";

var modules = [];

const Category = {
	COMBAT: 0,
	BUILDING: 1,
	MOVEMENT: 2,
	CHAT: 3,
	MISC: 4
}

/**
 *	CUSTOM MODULES
 */

registerModule({
	name: "AutoLevitate",
	desc: "Automatically makes you fly up in the sky.",
	category: Category.MOVEMENT,
	type: "Mod",
	state: false,
	isStateMod: function() {
		return true;
	},
	onToggle: function() {
		this.state = !this.state;
	},
	onTick: function() {
		setVelY(Player.getEntity(), + 0.07);
	}
});

/**
 *	FUNCTION LIBRARY (DON'T EDIT)
 */

function addonLoadHook() {
	net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
}

function registerModule(obj) {
	obj.source = ADDON_NAME;
	modules.push(obj);
}
