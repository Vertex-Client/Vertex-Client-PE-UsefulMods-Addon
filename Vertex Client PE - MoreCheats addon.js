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
 VertexClientPE.saveMainSettings = function() {
    java.io.File(settingsPath).mkdirs();
    var newFile = new java.io.File(settingsPath, "vertexclientpe.txt");
    newFile.createNewFile();
    var outWrite = new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
    outWrite.append("," + chTiTime.toString());
    outWrite.close();
}
VertexClientPE.loadMainSettings = function() {
    if(!java.io.File(settingsPath + "vertexclientpe.txt").exists())
        return;
    var file = new java.io.File(settingsPath + "vertexclientpe.txt");
    var fos = new java.io.FileInputStream(file);
    var str = new java.lang.StringBuilder();
    var ch;
    while((ch = fos.read()) != -1)
        str.append(java.lang.Character(ch));
	if(str.toString().split(",")[11] != null && str.toString().split(",")[11] != undefined) {
		
	chTiTime = str.toString().split(",")[11]; //Here we split text by ","
	}
    fos.close();
	return true;
}

registerModule({
	name: "Heal",
	desc: "Heals you.",
	category: Category.COMBAT,
	type: "Mod",
	state: false,
	isStateMod: function () {
		return false;
	},
	onToggle: function () {
		this.state = !this.state;
	},
	onTick: function () {
		Entity.setHealth(getPlayerEnt(), Entity.getMaxHealth(getPlayerEnt()));
	}
});

registerModule({
	name: "Change Time",
	desc: "desc //TODO ",
	category: Category.MISC,
	type: "Mod",
	state: false,
	getSettingsLayout: function() {
		var chTiTime = 0; 
		var chTiSettingsLayout = new LinearLayout(ctx);
		chTiSettingsLayout.setOrientation(1);
		var chTiTitle = clientTextView("Time: | " + chTiTime);
		var chTiSlider = new SeekBar(ctx);
		chTiSliderSlider.setProgress(chTiTime);
		chTiSliderSlider.setMax(14000);
		chTiSliderSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
			onProgressChanged: function() {
				chTiRange = chTiSlider.getProgress();
				chTiTitle.setText("Time: | " + chTiTime);
			}
		});
		var space = clientTextView("\n");
		chTiSettingsLayout.addView(chTiTitle);
		chTiSettingsLayout.addView(chTiSlider);
		chTiSettingsLayout.addView(space);
		return chTiSettingsLayout;
	},
	
	isStateMod: function() {
		return true;
	},
	onToggle: function() {
		this.state = !this.state;
	},
	onTick: function () {
	Level.setTime(chTiTime)
	},
	onModDialogDismiss: function() {
		VertexClientPE.saveMainSettings();
	
)};

registerModule(changeTime);


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





