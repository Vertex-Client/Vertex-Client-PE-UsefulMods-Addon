/**
*  Library made by peacestorm
*  © 2016-2017
*/

/**
  * Vertex UsefulMods addon v1.1
  * @author peacestorm and LPMG
  *
  * Don't copy anything without our permission!
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

function Song(songTitle, songArtist, songUrl, songGenre) {
    this.title = songTitle || "Unknown";
    this.artist = songArtist || "Unknown";
    this.genre = songGenre || "Unknown";
    this.url = songUrl;
}

/**
* YOUR ADDON CONTENT
*/

const ADDON_NAME = "UsefulMods";
const ADDON_DESC = "Adds a few handy modules into Vertex Client PE.";
const ADDON_AUTHOR = "LPMG and peacestorm";
const ADDON_VERSION = "1.1";
const TARGET_VERSION = "2.4";

var modules = [];
var songs = [];
var tiles = [];

const Category = {
	COMBAT: 0,
	WORLD: 1,
	MOVEMENT: 2,
	PLAYER: 3,
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
	category: Category.WORLD,
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
			callVertexFunction("nuke", [Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ(), 3, "cube"]);
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
	category: Category.WORLD,
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
		if(Level.getLightningLevel() > 0) {
			Level.setLightningLevel(0);
		}
	}
});

registerModule({
	name: "Suicide",
	desc: "Kills you.",
	category: Category.COMBAT,
	type: "Mod",
	isStateMod: function () {
		return false;
	},
	onToggle: function () {
		Entity.setHealth(getPlayerEnt(), 0);
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
isBlockedByBypass: function() {
  return false; //if the mod should be blocked by Bypass
}

If you want to store a variable in a module, simply add it like this: yourVariableName: yourVariableValue just like other parameters.
You can call this variable from within the module using this.yourVariableName.

It's still possible to use normal vars within the module's functions (onUseItem, onTick etcetera)

***************************************************************************************************************

Other functions and variables you can use in your addon are the following:
##################################
callFunction(functionName, propArray);
>> Example: callFunction("newLevel", []); <<
^^ In this example it will call newLevel in all scripts. This also works for other functions. ^^
!! Make sure to put the parameters in an array, otherwise it won't work!
----------------------------------
callVertexFunction(functionName, propArray);
>> Example: callVertexFunction("nuke", [getPlayerX(), getPlayerY(), getPlayerZ(), 3, "cube"]); <<
^^ In this example it will call Vertex Client PE's 'VertexClientPE.nuke' function without having to copy the whole function into your addon. This also works for other functions. ^^
** Supported since Vertex Client PE v2.4
!! Make sure to put the parameters in an array, otherwise it won't work!
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
		net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules, songs, tiles, ADDON_AUTHOR]);
	}
	if(Launcher.isMcpeMaster()) {
		com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod("registerAddon", [ADDON_NAME, ADDON_DESC, ADDON_VERSION, TARGET_VERSION, modules, songs, tiles, ADDON_AUTHOR]);
	}
}

function registerModule(obj) {
	modules.push(obj);
}

function registerSong(song) {
	try {
		if(!(song instanceof Song)) {
			throw new TypeError("The registered value is not of the type Song.");
			return;
		}
		songs.push(song);
	} catch(e) {
		if(e instanceof TypeError) {
			print("TypeError: " + e);
		}
	}
}

function registerTile(obj) {
	tiles.push(obj);
}

function callFunction(functionName, propArray) {
	if(Launcher.isBlockLauncher() || Launcher.isToolbox()) {
		net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, propArray);
	}
	if(Launcher.isMcpeMaster()) {
		com.mcbox.pesdk.mcpelauncher.ScriptManager.callScriptMethod(functionName, propArray);
	}
}

function callVertexFunction(functionName, args) {
	callFunction("callVertexFunctionCallback", [functionName, args]);
}
