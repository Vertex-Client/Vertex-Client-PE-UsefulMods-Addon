/**
*  Library made by peacestorm
*  © 2016
*/

//Vertex UsefulMods addon v1.0
//by peacestorm and LPMG

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

const ADDON_NAME = "UsefulMods";
const ADDON_DESC = "Adds a few handy modules into Vertex Client PE.";
const ADDON_VERSION = "1.0";
const TARGET_VERSION = "1.3.1";

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
	isStateMod: function () {
		return true;
	},
	onToggle: function () {
		this.state = !this.state;
	},
	onTick: function () {
		setVelY(Player.getEntity(), 0.07);
	}
});

registerModule({
	name: "PointNuker",
	desc: "Removes blocks around the block you're looking at.",
	category: Category.BUILDING,
	type: "Mod",
	state: false,
	isStateMod: function () {
		return true;
	},
	onToggle: function () {
		this.state = !this.state;
	},
	onTick: function () {
		if (getTile(Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ()) != 0) {
			callVertexFunction("nuker", [Player.getPointedBlockX(), Player.getPointedBlockY(),
				Player.getPointedBlockZ(), 3, "cube"]);
		}
	}
});

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

registerModule({
	name: "NoWeather",
	desc: "Disables weather.",
	category: Category.MISC,
	type: "Mod",
	state: false,
	isStateMod: function () {
		return true;
	},
	onToggle: function () {
		this.state = !this.state;
	},
	onTick: function() {
		if(Level.getRainLevel() > 0) {
			Level.setRainLevel(0);
		}
	}
});

/*
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
Other functions and variables you can use in your addon are the following:
##################################
callVertexFunction(functionName, propArray);
>> Example: callVertexFunction("nuker", [exampleX, exampleY, exampleZ, 3, "cube"]); <<
^^ In this example it will call VertexClientPE.nuker without having to copy the whole function into your addon. This also works for other functions. ^^
----------------------------------
Launcher.isBlockLauncher();
>> Example: Launcher.isBlockLauncher(); <<
^^ This will return true if the user uses BlockLauncher. If not, it will return false.
----------------------------------
Launcher.isToolbox();
>> Example: Launcher.isToolbox(); <<
^^ This will return true if the user uses the Toolbox launcher. If not, it will return false.
----------------------------------
Launcher.isMcpeMaster();
>> Example: Launcher.isMcpeMaster(); <<
^^ This will return true if the user uses the MCPE Master launcher. If not, it will return false.
##################################
***************************************************************************************************************

*/

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
