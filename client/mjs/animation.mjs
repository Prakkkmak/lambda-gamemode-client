import game from 'natives';
import alt from 'alt';

let  eAnimationFlags=
{
    ANIM_FLAG_NORMAL : 8,
    ANIM_FLAG_LOOP : 9,
    ANIM_FLAG_UPPER_NORMAL : 48,
    ANIM_FLAG_UPPER_LOOP : 49
};

const anims = {
    'gesture_come_here_hard' : {dic : "gestures@f@standing@casual", anim : "gesture_come_here_hard", label : "Come Here (hard)", category : "Gesture"},
    'gesture_come_here_soft' : {dic : "gestures@f@standing@casual", anim : "gesture_come_here_soft", label : "Come Here (soft)", category : "Gesture"},
    'gesture_bye_hard' : {dic : "gestures@f@standing@casual", anim : "gesture_bye_hard", label : "Bye (hard)", category : "Gesture"},
    'gesture_bye_soft' : {dic : "gestures@f@standing@casual", anim : "gesture_bye_soft", label : "Bye (soft)", category : "Gesture"},
    'gesture_why_right' : {dic : "gestures@f@standing@casual", anim : "gesture_why", label : "Why", category : "Gesture"},
    'gesture_bring_it_on' : {dic : "gestures@f@standing@casual", anim : "gesture_bring_it_on", label : "Bring It On", category : "Gesture"},
    'gesture_easy_now' : {dic : "gestures@f@standing@casual", anim : "gesture_easy_now", label : "Easy Now", category : "Gesture"},
    'gesture_why_left' : {dic : "gestures@f@standing@casual", anim : "gesture_why_left", label : "Why left", category : "Gesture"},
    'gesture_damn' : {dic : "gestures@f@standing@casual", anim : "gesture_damn", label : "Damn", category : "Gesture"},
    'gesture_displeased' : {dic : "gestures@f@standing@casual", anim : "gesture_displeased", label : "Displeased", category : "Gesture"},
    'gesture_hello' : {dic : "gestures@f@standing@casual", anim : "gesture_hello", label : "Hello", category : "Gesture"},
    'getsure_its_mine' : {dic : "gestures@f@standing@casual", anim : "getsure_its_mine", label : "It's Mine", category : "Gesture"},
    'gesture_me' : {dic : "gestures@f@standing@casual", anim : "gesture_me", label : "Me", category : "Gesture"},
    'gesture_head_no' : {dic : "gestures@f@standing@casual", anim : "gesture_head_no", label : "No", category : "Gesture"},
    'gesture_no_way' : {dic : "gestures@f@standing@casual", anim : "gesture_no_way", label : "No Way", category : "Gesture"},
    'gesture_pleased' : {dic : "gestures@f@standing@casual", anim : "gesture_pleased", label : "Pleased", category : "Gesture"},
    'gesture_point' : {dic : "gestures@f@standing@casual", anim : "gesture_point", label : "Point", category : "Gesture"},
    'gesture_shrug_hard' : {dic : "gestures@f@standing@casual", anim : "gesture_shrug_hard", label : "Shrug", category : "Gesture"},
    'gesture_what_hard' : {dic : "gestures@f@standing@casual", anim : "gesture_what_hard", label : "What", category : "Gesture"},
    'gesture_nod_yes_hard' : {dic : "gestures@f@standing@casual", anim : "gesture_nod_yes_hard", label : "Yes", category : "Gesture"},
    'gesture_you_hard' : {dic : "gestures@f@standing@casual", anim : "gesture_you_hard", label : "You", category : "Gesture"}
};

const scens = {
    'PROP_HUMAN_SEAT_ARMCHAIR' : {scen : "PROP_HUMAN_SEAT_ARMCHAIR", label : "Armchair", category : "Sat"},
    'WORLD_HUMAN_GUARD_STAND_ARMY' : {scen : "WORLD_HUMAN_GUARD_STAND_ARMY", label : "Army Standing", category : "Jobs"},
    'PROP_HUMAN_ATM' : {scen : "PROP_HUMAN_ATM", label : "ATM", category : "Misc"},
    'PROP_HUMAN_SEAT_BAR' : {scen : "PROP_HUMAN_SEAT_BAR", label : "Bar Seat", category : "Sat"},
    'PROP_HUMAN_BBQ' : {scen : "PROP_HUMAN_BBQ", label : "BBQ", category : "Hobby"},
    'PROP_HUMAN_SEAT_BENCH' : {scen : "PROP_HUMAN_SEAT_BENCH", label : "Bench", category : "Sat"},
    'PROP_HUMAN_SEAT_BENCH_DRINK' : {scen : "PROP_HUMAN_SEAT_BENCH_DRINK", label : "Bench Drink", category : "Sat"},
    'PROP_HUMAN_SEAT_BENCH_DRINK_BEER' : {scen : "PROP_HUMAN_SEAT_BENCH_DRINK_BEER", label : "Bench Drink Beer", category : "Sat"},
    'PROP_HUMAN_SEAT_BENCH_FOOD' : {scen : "PROP_HUMAN_SEAT_BENCH_FOOD", label : "Bench Eating", category : "Sat"},
    'PROP_HUMAN_SEAT_MUSCLE_BENCH_PRESS' : {scen : "PROP_HUMAN_SEAT_MUSCLE_BENCH_PRESS", label : "Bench Press", category : "Sat"},
    'PROP_HUMAN_SEAT_MUSCLE_BENCH_PRESS_PRISON' : {scen : "PROP_HUMAN_SEAT_MUSCLE_BENCH_PRESS_PRISON", label : "Bench Press (Prison)", category : "Sat"},
    'WORLD_HUMAN_BINOCULARS' : {scen : "WORLD_HUMAN_BINOCULARS", label : "Binoculars", category : "Misc"},
    'WORLD_HUMAN_WINDOW_SHOP_BROWSE' : {scen : "WORLD_HUMAN_WINDOW_SHOP_BROWSE", label : "Browse Shop Window", category : "Misc"},
    'PROP_HUMAN_SEAT_BUS_STOP_WAIT' : {scen : "PROP_HUMAN_SEAT_BUS_STOP_WAIT", label : "Bus Stop", category : "Sat"},
    'WORLD_HUMAN_CAR_PARK_ATTENDANT' : {scen : "WORLD_HUMAN_CAR_PARK_ATTENDANT", label : "Car Park Attendant", category : "Jobs"},
    'PROP_HUMAN_SEAT_CHAIR' : {scen : "PROP_HUMAN_SEAT_CHAIR", label : "Chair", category : "Sat"},
    'PROP_HUMAN_SEAT_CHAIR_DRINK' : {scen : "PROP_HUMAN_SEAT_CHAIR_DRINK", label : "Chair Drinking", category : "Sat"},
    'PROP_HUMAN_SEAT_CHAIR_DRINK_BEER' : {scen : "PROP_HUMAN_SEAT_CHAIR_DRINK_BEER", label : "Chair Drinking Beer", category : "Sat"},
    'PROP_HUMAN_SEAT_CHAIR_FOOD' : {scen : "PROP_HUMAN_SEAT_CHAIR_FOOD", label : "Chair Eating", category : "Sat"},
    'PROP_HUMAN_SEAT_CHAIR_MP_PLAYER' : {scen : "PROP_HUMAN_SEAT_CHAIR_MP_PLAYER", label : "Chair (MP Char)", category : "Sat"},
    'WORLD_HUMAN_CHEERING' : {scen : "WORLD_HUMAN_CHEERING", label : "Cheering", category : "Misc"},
    'WORLD_HUMAN_CLIPBOARD' : {scen : "WORLD_HUMAN_CLIPBOARD", label : "Clipboard", category : "Jobs"},
    'WORLD_HUMAN_AA_COFFEE' : {scen : "WORLD_HUMAN_AA_COFFEE", label : "Coffee", category : "Drink"},
    'CODE_HUMAN_POLICE_CROWD_CONTROL' : {scen : "CODE_HUMAN_POLICE_CROWD_CONTROL", label : "Crowd Control", category : "EMS"},
    'PROP_HUMAN_SEAT_DECKCHAIR' : {scen : "PROP_HUMAN_SEAT_DECKCHAIR", label : "Deckchair", category : "Sat"},
    'PROP_HUMAN_SEAT_DECKCHAIR_DRINK' : {scen : "PROP_HUMAN_SEAT_DECKCHAIR_DRINK", label : "Deckchair Drinking", category : "Sat"},
    'WORLD_HUMAN_CONST_DRILL' : {scen : "WORLD_HUMAN_CONST_DRILL", label : "Drilling", category : "Jobs"},
    'WORLD_HUMAN_DRINKING' : {scen : "WORLD_HUMAN_DRINKING", label : "Drinking", category : "Drink"},
    'WORLD_HUMAN_DRUG_DEALER' : {scen : "WORLD_HUMAN_DRUG_DEALER", label : "Drug Dealer", category : "Jobs"},
    'WORLD_HUMAN_DRUG_DEALER_HARD' : {scen : "WORLD_HUMAN_DRUG_DEALER_HARD", label : "Drug Dealer Hard", category : "Jobs"},
    'WORLD_HUMAN_MOBILE_FILM_SHOCKING' : {scen : "WORLD_HUMAN_MOBILE_FILM_SHOCKING", label : "Film With Phone", category : "Misc"},
    'WORLD_HUMAN_STAND_FISHING' : {scen : "WORLD_HUMAN_STAND_FISHING", label : "Fishing", category : "Jobs"},
    'WORLD_HUMAN_MUSCLE_FLEX' : {scen : "WORLD_HUMAN_MUSCLE_FLEX", label : "Flex", category : "Hobby"},
    'WORLD_HUMAN_BUM_FREEWAY' : {scen : "WORLD_HUMAN_BUM_FREEWAY", label : "Freeway Bum", category : "Misc"},
    'WORLD_HUMAN_GOLF_PLAYER' : {scen : "WORLD_HUMAN_GOLF_PLAYER", label : "Golf Player", category : "Hobby"},
    'WORLD_HUMAN_GUARD_PATROL' : {scen : "WORLD_HUMAN_GUARD_PATROL", label : "Guard Patrol", category : "Jobs"},
    'WORLD_HUMAN_GUARD_STAND' : {scen : "WORLD_HUMAN_GUARD_STAND", label : "Guard Standing", category : "Jobs"},
    'WORLD_HUMAN_HAMMERING' : {scen : "WORLD_HUMAN_HAMMERING", label : "Hammering", category : "Jobs"},
    'WORLD_HUMAN_HANG_OUT_STREET' : {scen : "WORLD_HUMAN_HANG_OUT_STREET", label : "Hang Out", category : "Misc"},
    'WORLD_HUMAN_PROSTITUTE_LOW_CLASS' : {scen : "WORLD_HUMAN_PROSTITUTE_LOW_CLASS", label : "High Class Prostitute", category : "Jobs"},
    'WORLD_HUMAN_HIKER_STANDING' : {scen : "WORLD_HUMAN_HIKER_STANDING", label : "Hiker Standing", category : "Misc"},
    'WORLD_HUMAN_HUMAN_STATUE' : {scen : "WORLD_HUMAN_HUMAN_STATUE", label : "Human Statue", category : "Jobs"},
    'WORLD_HUMAN_COP_IDLES' : {scen : "WORLD_HUMAN_COP_IDLES", label : "Idling Cop", category : "Jobs"},
    'WORLD_HUMAN_STAND_IMPATIENT' : {scen : "WORLD_HUMAN_STAND_IMPATIENT", label : "Impatient", category : "Misc"},
    'WORLD_HUMAN_JANITOR' : {scen : "WORLD_HUMAN_JANITOR", label : "Janitor", category : "Jobs"},
    'WORLD_HUMAN_JOG_STANDING' : {scen : "WORLD_HUMAN_JOG_STANDING", label : "Jog On The Spot", category : "Misc"},
    'WORLD_HUMAN_GARDENER_LEAF_BLOWER' : {scen : "WORLD_HUMAN_GARDENER_LEAF_BLOWER", label : "Leaf Blower", category : "Jobs"},
    'WORLD_HUMAN_LEANING' : {scen : "WORLD_HUMAN_LEANING", label : "Lean", category : "Misc"},
    'WORLD_HUMAN_PROSTITUTE_HIGH_CLASS' : {scen : "WORLD_HUMAN_PROSTITUTE_HIGH_CLASS", label : "Low Class Prostitute", category : "Jobs"},
    'WORLD_HUMAN_VEHICLE_MECHANIC' : {scen : "WORLD_HUMAN_VEHICLE_MECHANIC", label : "Mechanic", category : "Jobs"},
    'CODE_HUMAN_MEDIC_KNEEL' : {scen : "CODE_HUMAN_MEDIC_KNEEL", label : "Medic Kneel", category : "EMS"},
    'CODE_HUMAN_MEDIC_TIME_OF_DEATH' : {scen : "CODE_HUMAN_MEDIC_TIME_OF_DEATH", label : "Medic Time Of Death", category : "EMS"},
    'WORLD_HUMAN_TOURIST_MOBILE' : {scen : "WORLD_HUMAN_TOURIST_MOBILE", label : "Mobile", category : "Misc"},
    'WORLD_HUMAN_MUSICIAN' : {scen : "WORLD_HUMAN_MUSICIAN", label : "Musician", category : "Jobs"},
    'WORLD_HUMAN_PAPARAZZI' : {scen : "WORLD_HUMAN_PAPARAZZI", label : "Paparazzi", category : "Jobs"},
    'WORLD_HUMAN_PARTYING' : {scen : "WORLD_HUMAN_PARTYING", label : "Partying", category : "Hobby"},
    'WORLD_HUMAN_PICNIC' : {scen : "WORLD_HUMAN_PICNIC", label : "Picnic", category : "Hobby"},
    'WORLD_HUMAN_GARDENER_PLANT' : {scen : "WORLD_HUMAN_GARDENER_PLANT", label : "Planting", category : "Jobs"},
    'CODE_HUMAN_POLICE_INVESTIGATE' : {scen : "CODE_HUMAN_POLICE_INVESTIGATE", label : "Police Investigate", category : "EMS"},
    'WORLD_HUMAN_PUSH_UPS' : {scen : "WORLD_HUMAN_PUSH_UPS", label : "Push Ups", category : "Hobby"},
    'PROP_HUMAN_SEAT_COMPUTER' : {scen : "PROP_HUMAN_SEAT_COMPUTER", label : "Sat At Computer", category : "Sat"},
    'PROP_HUMAN_SEAT_CHAIR_UPRIGHT' : {scen : "PROP_HUMAN_SEAT_CHAIR_UPRIGHT", label : "Sat Upright", category : "Sat"},
    'PROP_HUMAN_SEAT_SEWING' : {scen : "PROP_HUMAN_SEAT_SEWING", label : "Sewing", category : "Sat"},
    'WORLD_HUMAN_SECURITY_SHINE_TORCH' : {scen : "WORLD_HUMAN_SECURITY_SHINE_TORCH", label : "Shine Torch", category : "Jobs"},
    'WORLD_HUMAN_SIT_UPS' : {scen : "WORLD_HUMAN_SIT_UPS", label : "Sit Ups", category : "Hobby"},
    'WORLD_HUMAN_BUM_SLUMPED' : {scen : "WORLD_HUMAN_BUM_SLUMPED", label : "Slumped", category : "Misc"},
    'WORLD_HUMAN_SMOKING' : {scen : "WORLD_HUMAN_SMOKING", label : "Smoking", category : "Drink"},
    'WORLD_HUMAN_AA_SMOKE' : {scen : "WORLD_HUMAN_AA_SMOKE", label : "Smoking 1", category : "Drink"},
    'WORLD_HUMAN_SMOKING' : {scen : "WORLD_HUMAN_SMOKING", label : "Smoking 2", category : "Drink"},
    'WORLD_HUMAN_SMOKING_POT' : {scen : "WORLD_HUMAN_SMOKING_POT", label : "Smoking Pot", category : "Drink"},
    'WORLD_HUMAN_STAND_FIRE' : {scen : "WORLD_HUMAN_STAND_FIRE", label : "Stand By Fire", category : "Misc"},
    'WORLD_HUMAN_STAND_MOBILE' : {scen : "WORLD_HUMAN_STAND_MOBILE", label : "Stand Using Mobile", category : "Misc"},
    'WORLD_HUMAN_BUM_STANDING' : {scen : "WORLD_HUMAN_BUM_STANDING", label : "Standing Bum", category : "Misc"},
    'WORLD_HUMAN_STUPOR' : {scen : "WORLD_HUMAN_STUPOR", label : "Stupor", category : "Drink"},
    'WORLD_HUMAN_SUNBATHE' : {scen : "WORLD_HUMAN_SUNBATHE", label : "Sunbathe", category : "Hobby"},
    'WORLD_HUMAN_SUNBATHE_BACK' : {scen : "WORLD_HUMAN_SUNBATHE_BACK", label : "Sunbathe On Back", category : "Hobby"},
    'PROP_HUMAN_SEAT_SUNLOUNGER' : {scen : "PROP_HUMAN_SEAT_SUNLOUNGER", label : "Sunlounger", category : "Sat"},
    'WORLD_HUMAN_SUPERHERO' : {scen : "WORLD_HUMAN_SUPERHERO", label : "Superhero", category : "Hobby"},
    'WORLD_HUMAN_SWIMMING' : {scen : "WORLD_HUMAN_SWIMMING", label : "Swimming", category : "Hobby"},
    'CODE_HUMAN_MEDIC_TEND_TO_DEAD' : {scen : "CODE_HUMAN_MEDIC_TEND_TO_DEAD", label : "Tend To Dead", category : "EMS"},
    'WORLD_HUMAN_TENNIS_PLAYER' : {scen : "WORLD_HUMAN_TENNIS_PLAYER", label : "Tennis Player", category : "Hobby"},
    'WORLD_HUMAN_TOURIST_MAP' : {scen : "WORLD_HUMAN_TOURIST_MAP", label : "Tourist With Map", category : "Misc"},
    'WORLD_HUMAN_BUM_WASH' : {scen : "WORLD_HUMAN_BUM_WASH", label : "Washing Bum", category : "Misc"},
    'WORLD_HUMAN_STRIP_WATCH_STAND' : {scen : "WORLD_HUMAN_STRIP_WATCH_STAND", label : "Watch Stripper", category : "Hobby"},
    'WORLD_HUMAN_MUSCLE_FREE_WEIGHTS' : {scen : "WORLD_HUMAN_MUSCLE_FREE_WEIGHTS", label : "Weights", category : "Hobby"},
    'WORLD_HUMAN_WELDING' : {scen : "WORLD_HUMAN_WELDING", label : "Welding", category : "Jobs"},
    'WORLD_HUMAN_YOGA' : {scen : "WORLD_HUMAN_YOGA", label : "Yoga", category : "Hobby"}
};

export function playAnim (dict, anim, animFlag)
{
    if (arguments.length == 2)
    {
        if(game.hasAnimDictLoaded(dict))
        {
            game.taskPlayAnim(game.playerPedId(), dict, anim, 8, 1, -1, eAnimationFlags.ANIM_FLAG_NORMAL, 0, 0, 0, 0);
        } else {
            loadAnimDict(dict).then(() => {
                game.taskPlayAnim(game.playerPedId(), dict, anim, 8, 1, -1, eAnimationFlags.ANIM_FLAG_NORMAL, 0, 0, 0, 0);
            });
        }
    } else if (arguments.length == 3)
    {
        if(game.hasAnimDictLoaded(dict))
        {
            game.taskPlayAnim(game.playerPedId(), dict, anim, 8, 1, -1, animFlag, 0, 0, 0, 0);
        } else {
            loadAnimDict(dict).then(() => {
                game.taskPlayAnim(game.playerPedId(), dict, anim, 8, 1, -1, animFlag, 0, 0, 0, 0);
            });
        }
    }
}
export function loadAnimDict(dict)
{
    game.requestAnimDict(dict);
    return new Promise((resolve, reject) => {
        let check = alt.setInterval(() => {
            
            if(game.hasAnimDictLoaded(dict))
            {
                alt.clearInterval(check);
                alt.log('Anim dict loaded');
                resolve(true);
            } else {
                alt.log('loading...');
            }
            
        },(5));
    });
}
export default {anims, scens, playAnim, loadAnimDict, eAnimationFlags};