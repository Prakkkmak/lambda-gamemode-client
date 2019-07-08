/// <reference path="../../definitions/altv-client.d.ts" />

import * as game from 'natives';
import * as alt from 'alt';

import * as base from 'modules/base/main';
import * as matrix from 'modules/utils/matrix';

export const ped_bones =
{
    'IK_Head': 0x322c,
    'SKEL_Head ': 0x796E,
    'FACIAL_facialRoot': 0xFE2C,
    'SKEL_Spine2': 0x60f1,
    'SKEL_Root': 0x0,
    'SKEL_L_Clavicle': 0xfcd9
};

var cam = [];

export class Camera {
    constructor(id, position, rotation, fov) {

        this.id = id;

        alt.nextTick(() => {
            if (doesCamExist(id)) {
                game.destroyCam(cam[id].cam, false);
            }
            this.cam = game.createCam('DEFAULT_SCRIPTED_CAMERA', false);
            this.setPosition(position.x, position.y, position.z);
            this.setRotation(rotation.x, rotation.y, rotation.z);
            this.setFov(fov);
            game.setCamActive(this.cam, true);


            cam.push(this);
        });
    }

    get position()
    {
        return game.getCamCoord(this.cam);
    }

    get rotation()
    {
        return game.getCamRot(this.cam, 2);
    }

    get model_matrix()
    {
        return matrix.translation(this.position).mul(matrix.rotation(this.rotation.x* 0.0174532924, this.rotation.y* 0.0174532924, this.rotation.z* 0.0174532924));
    }



    focusOnBone(bone, offset, fov, easeTime, ped, attach) {
        bone = (typeof (bone) == 'string') ? ped_bones[bone] : bone;
        alt.nextTick(() => {
            this.setFov(fov);
            game.pointCamAtPedBone(this.cam, ped, bone, 0, 0, 0, true);
            if (attach) {
                game.attachCamToPedBone(this.cam, ped, bone, offset.x, offset.y, offset.z, true);
            }
            game.renderScriptCams(true, true, easeTime, true, false);
        });
    }

    focusOnEntity(entity, offset, offsetPoint = { x: 0, y: 0, z: 0 }, relative = true) {
        alt.nextTick(() => {
            game.pointCamAtEntity(this.cam, entity, offsetPoint.x, offsetPoint.y, offsetPoint.z, true);
            game.renderScriptCams(true, true, 500, true, false);
        });
    }

    setPosition(position) {
        game.setCamCoord(this.cam, position.x, position.y, position.z);
    }

    setRotation(rotation) {
        game.setCamRot(this.cam, rotation.x, rotation.y, rotation.z);
    }

    setFov(fov) {
        game.setCamFov(this.cam, fov);
        return this;
    }

    destroy() {
        game.destroyCam(this.cam, false);

        for (var i = 0; i < cam.length; i++) {
            if (cam[i].id === this.id) {
                cam.splice(i, 1);
            }
        }
    }

    renderCam() {
        alt.nextTick(() => {
            game.setCamActive(this.cam, true);
            game.renderScriptCams(true, true, 500, true, false);
        
            
        });
    }

    getForwardVector() {
        let rotation = game.getCamRot(this.cam, 2);
    
        let Z = rotation.z;
        let num = Z * 0.0174532924;
        let X = rotation.x;
        let num2 = X * 0.0174532924;
        let num3 = Math.abs(Math.cos(num2));
    
        let dir = {
            x: (((-Math.sin(num))) * num3),
            y: ((Math.cos(num)) * num3),
            z: Math.sin(num2)
        };
    
        return dir;
    }
    
    getRightVector() {
        
        
        let cells = new Array(4).fill(0).map(x => Array(1).fill(0));
        cells[0][0] = 1;
        cells[3][0] = 1;

        let right = new matrix.Matrix(cells);
        let right_global = matrix.rotation(this.rotation.x*0.0174532924, this.rotation.y*0.0174532924, this.rotation.z*0.0174532924).mul(right);
        
        //right_global.display();
        return {
            x: right_global.cells[0][0],
            y: right_global.cells[1][0],
            z: right_global.cells[2][0]

        };
    }

    screenPointToWorldPoint(pixelCoords, z)
    {
        let fov = game.getCamFov(this.cam);
    }

    screenPointToViewportPoint(pixelCoords)
    {
        return {
            x: pixelCoords.x/getScreenResolution().width - 0.5,
            y: pixelCoords.y/getScreenResolution().height - 0.5
        }
    }
}


export function createCam(id, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, fov = 30) {
    if (doesCamExist(id)) {
        let c = getCam(id);
        c.setPosition(position.x, position.y, position.z);
        c.setRotation(rotation.x, rotation.y, rotation.z);
        c.setFov(fov);

        return getCam(id);
    } else {
        return new Camera(id, position, rotation, fov);
    }
}
export function getCam(camID) {
    for (let i = 0; i < cam.length; i++) {
        if (cam[i].id == camID) {
            return cam[i];
        }
    }

    return undefined;
}
export function doesCamExist(camID) {
    for (let i = 0; i < cam.length; i++) {
        if (cam[i].id == camID) return true;
    }

    return false;
}

export function goBackToGameplayCam() {

    alt.nextTick(() => {
        game.renderScriptCams(false, false, 0, true, true);
    });

}
export function getGameplayCamDirVector() {
    let rotation = game.getGameplayCamRot();

    let Z = rotation.z;
    let num = Z * 0.0174532924;
    let X = rotation.x;
    let num2 = X * 0.0174532924;
    let num3 = Math.abs(Math.cos(num2));

    let dir = {
        x: (((-Math.sin(num))) * num3),
        y: ((Math.cos(num)) * num3),
        z: Math.sin(num2)
    };

    return dir;
}

export function getScreenResolution()
{
    let [x, y] = game.getActiveScreenResolution();
    return {width: x, height: y}
}