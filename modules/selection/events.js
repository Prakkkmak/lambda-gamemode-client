import alt from 'alt';

import game from 'natives';

import * as position_utils from 'modules/utils/position'

import * as selection from 'modules/selection/main';

let oldCheck = null;
alt.on('update', () => {
    selection.updateClose();
});
