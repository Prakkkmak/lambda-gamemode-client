import * as alt from 'alt';
import * as game from 'natives';
import * as position_utils from 'modules/utils/position'
let peds = [];

let state = 0;

let northIpl = [
    "prologue01", "prologue01c", "prologue01d", "prologue01e", "prologue01f", "prologue01g", "prologue01h", "prologue01i", "prologue01j", "prologue01k", "prologue01z", "prologue02", "prologue03", "prologue03b", "prologue03_grv_dug", "prologue_grv_torch", "prologue04", "prologue04b", "prologue04_cover", "des_protree_end", "des_protree_start", "prologue05", "prologue05b", "prologue06", "prologue06b", "prologue06_int", "prologue06_pannel", "plg_occl_00", "prologue_occl", "prologuerd", "prologuerdb", "prologue_DistantLights", "prologue_LODLights", "prologue_m2_door"
]

let spawnPosition = {
    x: 5837,
    y: -5035,
    z: 82.1
}
let spawnLength = 20;

let shapeMother;
let shapeFather;
let skinMother;
let skinFather;
let model = "";
let mix = 0.5;


export function updateClose() {
    let yaw = position_utils.getRotation();
    let frontPos = position_utils.positionInAngle(alt.getLocalPlayer().pos, -yaw, 0.7);

    let closePed = closePedInRange(frontPos, 3);
    if (closePed != null) {
        let pos = closePed.pos;
        game.drawSpotLight(pos.x, pos.y, pos.z + 2, 0, 0, - 2, 255, 255, 255, 100, 1, 0, 9, 2);
        if (game.isControlJustPressed(0, 19)) {
            alt.log("pressed");
            if (peds.length > 0) closePed.onChoose();

        }
    }

}

export function loadPed(pedHash) {
    return new Promise((resolve, reject) => {
        //resolve(true);
        let nbtry = 0;
        if (!game.isModelValid(pedHash)) alt.log("Model not valid");
        game.requestModel(pedHash);
        let check = alt.setInterval(() => {
            nbtry++;
            if (game.hasModelLoaded(pedHash)) {
                alt.clearInterval(check);
                resolve(true);
            }
            if (nbtry >= 100) {
                reject("Model not loaded after " + nbtry + " try");
            }
        }, (10));
    });
}

export function closePedInRange(pos, range) {
    let currentClosePed = null;
    let i = 0;
    peds.forEach(target => {
        if (position_utils.distance(target.pos, pos) < range) {
            if (currentClosePed == null) currentClosePed = target;
            if (position_utils.distance(target.pos, pos) < position_utils.distance(currentClosePed.pos, pos)) currentClosePed = target;
        }
    });
    return currentClosePed;
}


export async function deletePeds() {
    peds.forEach((ped) => {
        game.deletePed(ped.ped);
    })
    peds = [];
}

export async function spawnPeds(model, start, end, spawnLength, onSpawn) {
    alt.log("Spawn Peds s:" + start + " e:" + end);
    let hash = game.getHashKey(model);
    await loadPed(hash);
    for (let i = start; i < end; i++) {
        let ped = game.createPed(2, hash, -spawnLength / 2 - start + spawnPosition.x + i * (spawnLength / (end - start)), spawnPosition.y, spawnPosition.z, 0, false, false);
        game.freezeEntityPosition(ped, true);
        let pedAndPos = {
            index: i,
            ped: ped,
            pos: game.getEntityCoords(ped, true),
        }
        onSpawn(pedAndPos);
        peds.push(pedAndPos);
    }
}

export function start() {
    northIpl.forEach((ipl) => {
        game.requestIpl(ipl);
    })
    game.setEntityCoords(game.playerPedId(), 5837, -5035 + 4, 83 + 1, 0, 1, 0, 0, 1)
    state = 0;
    deletePeds();
    spawnMotherSkinColor();
}

export async function spawnMotherSkinColor() {
    await spawnPeds("mp_f_freemode_01", 0, 42, 20, (pedAndPos) => {
        alt.log("1");
        game.setPedHeadBlendData(pedAndPos.ped, 0, 0, 0, pedAndPos.index, 0, 0, 0, 0, 0, 0);
        alt.log("2");
        pedAndPos.onChoose = () => {
            alt.log("Mother shape choosed, start father skin color")
            skinMother = pedAndPos.index;
            deletePeds();
            spawnFatherSkinColor();
        }
        alt.log("3");
    });
}
export async function spawnFatherSkinColor() {
    await spawnPeds("mp_m_freemode_01", 0, 42, 20, (pedAndPos) => {
        game.setPedHeadBlendData(pedAndPos.ped, 0, 0, 0, skinMother, pedAndPos.index, 0, 1, 1, 0, 0);
        pedAndPos.onChoose = () => {
            alt.log("Father skin choosed, start mother shapes")
            skinFather = pedAndPos.index;
            deletePeds();
            spawnMotherShapes();
        }
    });
}

export async function spawnMotherShapes() {
    await spawnPeds("mp_f_freemode_01", 21, 42, 20, (pedAndPos) => {
        game.setPedHeadBlendData(pedAndPos.ped, pedAndPos.index, 0, 0, skinMother, skinFather, 0, 0, 0, 0, 0);
        pedAndPos.onChoose = () => {
            alt.log("Mother shape choosed, start father shapes")
            shapeMother = pedAndPos.index;
            deletePeds();
            spawnFatherShapes();
        }
    });
}
export async function spawnFatherShapes() {
    await spawnPeds("mp_m_freemode_01", 0, 21, 20, (pedAndPos) => {
        game.setPedHeadBlendData(pedAndPos.ped, shapeMother, pedAndPos.index, 0, skinMother, skinFather, 0, 1, 1, 0, 0);
        pedAndPos.onChoose = () => {
            alt.log("sex choosed, start sex")
            shapeFather = pedAndPos.index;
            deletePeds();
            spawnSex();
        }
    });
}

export async function spawnSex() {
    let start = 0;
    let end = 2;
    let spawnLength = 20;
    alt.log("-b");
    let hash = game.getHashKey("mp_m_freemode_01");
    await loadPed(hash);
    /* Female */
    await spawnPeds("mp_f_freemode_01", 0, 2, spawnLength, (pedAndPos) => {
        game.setPedHeadBlendData(pedAndPos.ped, shapeMother, shapeMother, 0, skinMother, skinFather, 0, 0, 0, 0, 0);
        if (pedAndPos.index == 1) {
            game.deletePed(pedAndPos.ped);
            pedAndPos.ped = game.createPed(2, "mp_m_freemode_01", -spawnLength / 2 - start + spawnPosition.x + pedAndPos.index * (spawnLength / (end - start)), spawnPosition.y, spawnPosition.z, 0, false, false)
            pedAndPos.onChoose = () => {
                alt.log("sex choosed, start sex")
                model = "mp_m_freemode_01";
                deletePeds();
            }
        }
        else {
            pedAndPos.onChoose = () => {
                alt.log("sex choosed, start sex")
                model = "mp_f_freemode_01";
                deletePeds();
            }
        }

    });
    /* Male */

    /**/


}

export async function spawnMix() {
    let start = 0;
    let end = 10;
    await spawnPeds(model, start, end, 20, (pedAndPos) => {
        game.setPedHeadBlendData(pedAndPos.ped, shapeMother, shapeFather, 0, skinMother, skinFather, 0, pedAndPos.index / (end - start), pedAndPos.index / (end - start), 0, 0);

        pedAndPos.onChoose = () => {
            alt.log("Mix choosed")
            mix = pedAndPos.index / (end - start);
            deletePeds();
            //spawnMotherShapes();
        }
    });
}

