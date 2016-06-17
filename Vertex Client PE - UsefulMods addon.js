//Vertex UsefulMods addon v1.0
//by peacestorm and LPMG
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

var VertexClientPE = {};

VertexClientPE.nuker = function (x, y, z, range, mode) {

	range = (range == null) ? 3 : range;

	mode = (mode == null) ? "cube" : mode;

	if (mode == "cube") {

		for (var blockX = -range; blockX <= range; blockX++) {

			for (var blockY = -range; blockY <= range; blockY++) {

				for (var blockZ = -range; blockZ <= range; blockZ++) {

					setTile(x + blockX, y + blockY, z + blockZ, 0);

				}

			}

		}

	}
	if (mode == "flat") {

		for (var blockX = -range; blockX <= range; blockX++) {

			for (var blockY = -1; blockY <= range; blockY++) {

				for (var blockZ = -range; blockZ <= range; blockZ++) {

					setTile(x + blockX, y + blockY, z + blockZ, 0);

				}

			}

		}

	}
	if (mode == "smash") {

		for (var blockX = -range; blockX <= range; blockX++) {

			for (var blockY = -range; blockY <= range; blockY++) {

				for (var blockZ = -range; blockZ <= range; blockZ++) {

					if (Block.getDestroyTime(getTile(x + blockX, y + blockY, z + blockZ)) == 0) {

						setTile(x + blockX, y + blockY, z + blockZ, 0);

					}

				}

			}

		}

	}

}

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
		setVelY(Player.getEntity(), +0.07);
	}
});

registerModule({
	name: "PointNuker",
	desc: "Nukes all blocks your'e looking at",
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
			VertexClientPE.nuker(Player.getPointedBlockX(), Player.getPointedBlockY(),
				Player.getPointedBlockZ(), 3, "cube");
		}
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
