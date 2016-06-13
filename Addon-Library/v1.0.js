/**
*  Library made by peacestorm
*  © 2016
*/

const ADDON_NAME = "Example addon"; //Your addon's name
const ADDON_DESC = "Adds example modules into Vertex Client PE."; //Your addon's description
const ADDON_VERSION = "1.0"; //Your addon's version
const TARGET_VERSION = "1.0"; //Your addon's target Vertex Client PE version (in this case we use Vertex Client PE v1.0)

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

/*
var exampleModule = {
	name: "Example toggleable module",
	desc: "Example description.",
	category: Category.MOVEMENT,
	type: "Mod",
	state: false,
	isStateMod: function() {
		return true;
	},
	onToggle: function() {
		this.state = !this.state;
		if(this.state) {
			//do something when this module is enabled
		} else {
			//do something when this module is disabled
		}
	},
	onTick: function() {
		//this will get called in modTick when the mod is enabled, also possible: onUseItem, onAttack, onHurt, onChat etcetera (add these functions separated by a comma, like what I did with onUseItem in this module)
	},
	onUseItem: function(x, y, z, itemId, blockId, side, blockDamage) {
		//add your useItem code for this mod here
	}
};

registerModule(exampleModule);

***************************************************************************************************************

Other parameters you can add to your modules are the following:

getSettingsLayout: function() {
  var settingsLayout = new LinearLayout(ctx);
  //add extra widgets (such as buttons and texts) in here, they will be displayed in a mod's ... dialog
  return settingsLayout;
},
onModDialogDismiss: function() {
  //this will be called when an user closes a mod's ... dialog
},
canBypassYesCheatPlus: function() {
  return false; //if the mod should be blocked by YesCheat+
}

If you want to store a variable in a module, simply add it like this: yourVariableName: yourVariableValue just like other parameters.
You can call this variable from within the module using this.yourVariableName.

It's still possible to use normal vars within the module's functions (onUseItem, onTick etcetera)

***************************************************************************************************************

registerModule(exampleModule);

var secondExampleModule = {
	name: "Example non-toggleable module",
	desc: "Example description.",
	category: Category.COMBAT,
	type: "Mod",
	isStateMod: function() {
		return false;
	},
	onToggle: function() {
		//do something when an user taps on this mod's button
	}
};

registerModule(secondExampleModule);

*/

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
