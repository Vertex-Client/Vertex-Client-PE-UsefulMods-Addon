//Vertex MoreCheats v1.0 by LPMG and peacestorm
const ADDON_NAME = "MoreCheats";
const ADDON_DESC = "Adds some cheats into Vertex Client PE.";
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
var heal = {
	name: "Heal",
	desc: "Heals you.",
	category: Category.COMBAT,
	type: "Mod",
	isStateMod: function() {
		return false;
	},
	onToggle: function() {
	  Entity.setHealth(getPlayerEnt(), Entity.getMaxHealth(getPlayerEnt()));
	}
};

registerModule(heal);

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





