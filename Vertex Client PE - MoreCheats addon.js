/**
*  Library made by peacestorm
*  © 2016
*/

/**
* PART 1 OF THE FUNCTION LIBRARY (DON'T EDIT)
*/

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var Launcher = {
	isBlockLauncher: function() {
		return (ctx.getPackageName() == "net.zhuoweizhang.mcpelauncher" || ctx.getPackageName() == "net.zhuoweizhang.mcpelauncher.pro");
	},
	isToolbox: function() {
		return ctx.getPackageName() == "io.mrarm.mctoolbox";
	},
	isMcpeMaster: function() {
		return ctx.getPackageName() == "com.mcbox.pesdkb.mcpelauncher";
	}
};

/**
* YOUR ADDON CONTENT
*/

//Vertex MoreCheats v1.0 by LPMG and peacestorm
const ADDON_NAME = "MoreCheats";
const ADDON_DESC = "Adds some cheats into Vertex Client PE.";
const ADDON_VERSION = "1.0";
const TARGET_VERSION = "1.0.1";

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
	name: "Heal",
	desc: "Heals you.",
	category: Category.COMBAT,
	type: "Mod",
	isStateMod: function () {
		return false;
	},
	onToggle: function () {
		Entity.setHealth(getPlayerEnt(), Entity.getMaxHealth(getPlayerEnt()));
	}
});

/**
 *	PART 2 OF THE FUNCTION LIBRARY (DON'T EDIT)
 */

function addonLoadHook() {
  if(Launcher.isBlockLauncher() || Launcher.isToolbox()) {
    net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
  }
  if(Launcher.isMcpeMaster()) {
	com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules]);
}
}

function registerModule(obj) {
	obj.source = ADDON_NAME;
	modules.push(obj);
}

function callVertexFunction(functionName, propArray) {
  if(Launcher.isBlockLauncher() || Launcher.isToolbox()) {
  	net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("VertexClientPE." + functionName, propArray);
  }
  if(Launcher.isMcpeMaster()) {
	com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod("VertexClientPE." + functionName, propArray);
}
}
