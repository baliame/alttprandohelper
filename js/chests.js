(function(window) {
    'use strict';

    var query = uri_query(),
        is_standard = query.mode === 'standard';

    function can_reach_outcast() {
        return items.moonpearl && (
            items.glove === 2 || items.glove && items.hammer ||
            items.agahnim && items.hookshot && (items.hammer || items.glove || items.flippers));
    }

    function medallion_check(i) {
        if (!items.sword || !items.bombos && !items.ether && !items.quake) return 'unavailable';
        if (medallions[i] === 1 && !items.bombos ||
            medallions[i] === 2 && !items.ether ||
            medallions[i] === 3 && !items.quake) return 'unavailable';
        if (medallions[i] === 0 && !(items.bombos && items.ether && items.quake)) return 'possible';
    }

    function melee() { return items.sword || items.hammer; }
    function melee_bow() { return melee() || items.bow > 1; }
    function cane() { return items.somaria || items.byrna; }
    function rod() { return items.firerod || items.icerod; }

    function always() { return 'available'; }

    // define dungeon chests
    window.dungeons = [{ // [0]
        caption: 'Eastern Palace {lantern}',
        is_beaten: false,
        is_beatable: function() {
            return items.bow > 1 ?
                items.lantern ? 'available' : 'dark' :
                'unavailable';
        },
        can_get_chest: function() {
            return items.chest0 <= 2 && !items.lantern ||
                items.chest0 === 1 && !(items.bow > 1) ?
                'possible' : 'available';
        }
    }, { // [1]
        caption: 'Desert Palace',
        is_beaten: false,
        is_beatable: function() {
            if (!(melee_bow() || cane() || rod())) return 'unavailable';
            if (!items.lantern && !items.firerod) return 'unavailable';
            if (!(items.book && items.glove) && !(items.flute && items.glove === 2 && items.mirror)) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            return items.boots ? 'available' : 'possible';
        },
        can_get_chest: function() {
            if (!items.book && !(items.flute && items.glove === 2 && items.mirror)) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (items.glove && (items.firerod || items.lantern) && items.boots) return 'available';
            return items.chest1 > 1 && items.boots ? 'available' : 'possible';
        }
    }, { // [2]
        caption: 'Tower of Hera',
        is_beaten: false,
        is_beatable: function() {
            if (!melee()) return 'unavailable';
            return this.can_get_chest();
        },
        can_get_chest: function() {
            if (!items.flute && !items.glove) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (!items.mirror && !(items.hookshot && items.hammer)) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            return items.firerod || items.lantern ?
                items.flute || items.lantern ? 'available' : 'dark' :
                'possible';
        }
    }, { // [3]
        caption: 'Palace of Darkness {lantern}',
        is_beaten: false,
        is_beatable: function() {
            if (!(items.bow > 1) || !items.hammer) return 'unavailable';
            if (!items.moonpearl) return (window.ow_glitches ? 'sequencebreak-revival' : 'unavailable');
            if (!items.agahnim && !items.glove) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            return items.lantern ? 'available' : 'dark';
        },
        can_get_chest: function() {
            if (!items.agahnim && !(items.hammer && items.glove) && !(items.glove === 2 && items.flippers)) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (!items.moonpearl) return (window.ow_glitches ? 'sequencebreak-revival' : 'unavailable');
            if (!items.agahnim && items.glove === 2 && !items.flippers && !items.hammer && items.boots) return 'sequencebreak-jesusdash';
            if (!items.agahnim && items.glove === 2 && !items.flippers && !items.hammer && items.bottle) return 'sequencebreak-revival';
            return !(items.bow > 1 && items.lantern) ||
                items.chest3 === 1 && !items.hammer ?
                'possible' : 'available';
        }
    }, { // [4]
        caption: 'Swamp Palace {mirror}',
        is_beaten: false,
        is_beatable: function() {
            if (!items.mirror || !items.flippers) return 'unavailable';
            if (!items.hammer || !items.hookshot) return 'unavailable';
            if (window.ow_glitches) {
                if (!items.glove && !items.agahnim) {
                    return 'major-glitch';
                }
                if (!items.moonpearl) {
                    return 'sequencebreak-revival';
                }
            } else {
                if ((!items.glove && !items.agahnim) || (!items.moonpearl)) {
                    return 'unavailable';
                }
            }
            return 'available';
        },
        can_get_chest: function() {
            if (!items.mirror || !items.flippers) return 'unavailable';
            var ret = 'available';
            if (!can_reach_outcast() && !(items.agahnim && items.hammer)) {
                ret = (window.ow_glitches ? 'major-glitch' : 'unavailable');
            } else if (!items.moonpearl) {
                ret = (window.ow_glitches ? 'sequencebreak-revival' : 'unavailable');
            }

            if (ret === 'unavailable') {
                return ret;
            }

            if (items.chest4 <= 2) return !items.hammer || !items.hookshot ? 'unavailable' : ret;
            if (items.chest4 <= 4) return !items.hammer ? 'unavailable' : !items.hookshot ? (ret == 'available' ? 'possible' : ret) : ret;
            if (items.chest4 <= 5) return !items.hammer ? 'unavailable' : ret;
            return !items.hammer ? (ret == 'available' ? 'possible' : ret) : ret;
            }
    }, { // [5]
        caption: 'Skull Woods',
        is_beaten: false,
        is_beatable: function() {
            if (window.ow_glitches && items.firerod && items.sword && !can_reach_outcast()) {
                return 'major-glitch';
            }
            return !can_reach_outcast() || !items.firerod || !items.sword ? 'unavailable' : 'available';
        },
        can_get_chest: function() {
            if (!can_reach_outcast()) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            return items.firerod ? 'available' : 'possible';
        }
    }, { // [6]
        caption: 'Thieves\' Town',
        is_beaten: false,
        is_beatable: function() {
            if (!(melee() || cane())) return 'unavailable';
            if (!can_reach_outcast()) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            return 'available';
        },
        can_get_chest: function() {
            if (!can_reach_outcast()) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            return items.chest6 === 1 && !items.hammer ? 'possible' : 'available';
        }
    }, { // [7]
        caption: 'Ice Palace (yellow=must bomb jump)',
        is_beaten: false,
        is_beatable: function() {
            if (items.flippers && !items.moonpearl && items.glove === 2 && (items.firerod || (items.bombos && items.sword)) && items.hammer) {
                if (items.hookshot || items.somaria) return 'sequencebreak-revival';
                return 'sequencebreak-revival-check';
            }
            if (!items.moonpearl || items.glove !== 2 || !items.hammer) return 'unavailable';
            if (!items.firerod && !(items.bombos && items.sword)) return 'unavailable';
            if (!items.flippers) return 'sequencebreak-flippers';
            return items.hookshot || items.somaria ? 'available' : 'possible';
        },
        can_get_chest: function() {
            if (items.flippers && !items.moonpearl && items.glove === 2 && (items.firerod || (items.bombos && items.sword))) {
                if (items.hammer) return 'sequencebreak-revival';
                return 'sequencebreak-revival-check';
            }
            if (!items.moonpearl || items.glove !== 2) return 'unavailable';
            if (!items.firerod && !(items.bombos && items.sword)) return 'unavailable';
            if (!items.flippers) return items.hammer ? 'sequencebreak-flippers' : 'sequencebreak-flippers-check';
            return items.hammer ? 'available' : 'possible';
        }
    }, { // [8]
        caption: 'Misery Mire {medallion0}{lantern}',
        is_beaten: false,
        is_beatable: function() {
            if (!melee_bow()) return 'unavailable';
            if ((!items.boots && !items.hookshot) || !items.somaria) return 'unavailable';
            if ((!items.flute || items.glove !== 2) && !window.ow_glitches) return 'unavailable';
            var state = medallion_check(0);
            if (state === 'unavailable') {
                return state;
            }
            if ((!items.flute || items.glove !== 2) && window.ow_glitches) return 'major-glitch';

            if (!items.moonpearl && items.mirror && items.flippers && items.bottle) {
                    if (items.lantern) {
                        return state ? 'sequencebreak-revival-check' : 'sequencebreak-revival';
                    } else {
                        return 'sequencebreak-revival-check';
                    }
            }

            if (!items.moonpearl) {
                return window.ow_glitches ? 'major-glitch' : 'unavailable';
            }
            if (state) {
                return state;
            }

            return items.lantern || items.firerod ?
                items.lantern ? 'available' : 'dark' :
                'possible';
        },
        can_get_chest: function() {
            if (!items.boots && !items.hookshot) return 'unavailable';
            var state = medallion_check(0);
            if (state === 'unavailable') {
                return state;
            }
            if (!items.flute || items.glove !== 2) return (window.ow_glitches ? 'major-glitch' : 'unavailable');

            if (!items.moonpearl && items.mirror && items.flippers && items.bottle) {
                    if ((items.chest8 > 1 || (items.somaria && items.lantern)) && (items.lantern || items.firerod)) {
                        return state ? 'sequencebreak-revival-check' : 'sequencebreak-revival';
                    } else {
                        return 'sequencebreak-revival-check';
                    }
            }

            if (!items.moonpearl) {
                return window.ow_glitches ? 'major-glitch' : 'unavailable';
            }
            if (state) {
                return state;
            }

            return (items.chest8 > 1 ?
                items.lantern || items.firerod :
                items.lantern && items.somaria) ?
                'available' : 'possible';
        }
    }, { // [9]
        caption: 'Turtle Rock {medallion0}{lantern}',
        is_beaten: false,
        is_beatable: function() {
            if (!items.icerod || !items.firerod || !items.somaria) return 'unavailable';
            var state = medallion_check(1);
            if (state == 'unavailable' && (!window.ow_glitches || !items.mirror)) return state;
            if (!items.moonpearl || !items.hammer || items.glove !== 2) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (!items.hookshot && !items.mirror) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (state) return state;

            return items.byrna || items.cape || items.shield === 3 ?
                items.lantern ? 'available' : 'dark' :
                'possible';
        },
        can_get_chest: function() {
            var state = medallion_check(1);
            if (window.ow_glitches && !items.mirror && state === 'unavailable') {
                return 'unavailable';
            }
            if (window.ow_glitches && !items.mirror && (!items.moonpearl || !items.hammer || items.glove !== 2) && state !== 'unavailable' && !items.somaria) return 'unavailable';
            if (!items.moonpearl || !items.hammer || items.glove !== 2 || !items.somaria) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (!items.hookshot && !items.mirror) return (window.ow_glitches ? 'major-glitch' : 'unavailable');
            if (state) {
                if (state === 'unavailable' && window.ow_glitches) {
                    return 'major-glitch';
                }
                return state;
            }

            var laser_safety = items.byrna || items.cape || items.shield === 3,
                dark_room = items.lantern ? 'available' : 'dark';
            if (items.chest9 <= 1) return !laser_safety ? 'unavailable' : items.firerod && items.icerod ? dark_room : 'possible';
            if (items.chest9 <= 2) return !laser_safety ? 'unavailable' : items.firerod ? dark_room : 'possible';
            if (items.chest9 <= 4) return laser_safety && items.firerod && items.lantern ? 'available' : 'possible';
            return items.firerod && items.lantern ? 'available' : 'possible';
        }
    }, { // [10]
        caption: 'GT Lobby {boots}',
        is_beaten: false,
        is_beatable: function() {
            return 'available';
        },
        can_get_chest: function() {
            if (crystals() >= 7 && items.glove === 2 && items.moonpearl && (items.hookshot || (items.mirror && items.hammer))) {
                if (!items.flute && !items.lantern && !window.ow_glitches) {
                    return 'dark'
                }
                if (items.chest10 > 1 || items.boots) {
                    return 'available';
                } else {
                    return 'possible';
                }
            }
            if (window.ow_glitches && items.moonpearl) {
                return 'available';
            }
            return 'unavailable';
        }
    }, { // [11]
        caption: 'GT Left {hammer} {hookshot}/{bomb}',
        is_beaten: false,
        is_beatable: function() {
            return 'available';
        },
        can_get_chest: function() {
            var parent = dungeons[10].can_get_chest();
            if (parent == 'unavailable') {
                return 'unavailable';
            }
            if (parent == 'possible') {
                parent = 'available';
            }
            if (items.hammer) {
                if (items.hookshot || parent !== 'available') {
                    return parent;
                } else {
                    return 'possible';
                }
            } else {
                return 'unavailable';
            }
        }
    }, { // [12]
        caption: 'GT Right {somaria} {firerod}/{lantern}',
        is_beaten: false,
        is_beatable: function() {
            return 'available';
        },
        can_get_chest: function() {
            var parent = dungeons[10].can_get_chest();
            if (parent == 'unavailable') {
                return 'unavailable';
            }
            if (parent == 'possible') {
                parent = 'available';
            }
            if (items.somaria) {
                if (items.chest12 > 4) {
                    return parent;
                } else {
                    if (items.firerod || (items.lantern && parent !== 'available')) {
                        return parent;
                    } else if (items.lantern) {
                        return 'possible';
                    } else {
                        return 'unavailable';
                    }
                }
            } else {
                return 'unavailable';
            }
        }
    }, { // [13]
        caption: 'GT Back (Left/Right access)',
        is_beaten: false,
        is_beatable: function() {
            return 'available';
        },
        can_get_chest: function() {
            var parent1 = dungeons[11].can_get_chest();
            var parent2 = dungeons[12].can_get_chest();
            if (items.chest12 > 4 && parent2 == 'available') {
                if (!items.firerod) {
                    if (!items.lantern) {
                        parent2 = 'unavailable';
                    } else {
                        parent2 = 'possible';
                    }
                }
            }
            console.log(parent1 + ' ' + parent2);
            if (items.chest13 > 1) {
                return strongest(parent1, parent2);
            } else {
                return weakest_p(parent1, parent2);
            }
        }
    }, { // [14]
        caption: 'Upper GT {bow} {hookshot} {firerod}/{lantern}',
        is_beaten: false,
        is_beatable: function() {
            return 'available';
        },
        can_get_chest: function() {
            if (items.bow < 2 || (!items.firerod && !items.lantern) || !melee()) {
                return 'unavailable';
            }
            var parent = dungeons[10].can_get_chest();
            if (parent == 'unavailable' || parent == 'dark') {
                return parent;
            }
            if (!items.hammer || !items.firerod || !items.somaria || !items.hookshot) {
                return 'possible';
            }
            return 'available';
        }
    }, { // [15]
        caption: 'Agahnim 2 {hookshot}',
        is_beaten: false,
        is_beatable: function() {
            return 'available';
        },
        can_get_chest: function() {
            var parent = dungeons[14].can_get_chest();
            if (parent === 'available' && !items.hookshot) {
                return 'possible';
            }
            return parent;
        }
    }];

    window.strongest = function(a, b) {
        if (a === 'dark' || b === 'dark') {
            return 'dark';
        }
        if (a === 'available' || b === 'available') {
            return 'available';
        }
        if (a === 'possible' || b === 'possible') {
            return 'possible';
        }
        if (a === 'major-glitch' || b === 'major-glitch') {
            return 'major-glitch';
        }
        return 'unavailable';
    }

    window.weakest_p = function(a, b) {
        if (a === 'dark' || b === 'dark') {
            return 'dark';
        }
        if (a === 'unavailable' || a === 'major-glitch' || a === 'possible') {
            return 'possible';
        }
        if (b === 'unavailable' || b === 'major-glitch' || b === 'possible') {
            return 'possible';
        }
        return 'available';
    }

    window.agahnim = {
        caption: 'Agahnim {sword2}/ ({cape}{sword1}){lantern}',
        is_available: function() {
            return items.sword >= 2 || items.cape && items.sword ?
                items.lantern ? 'available' : 'dark' :
                'unavailable';
        }
    };

    //define overworld chests
    window.chests = [{ // [0]
        caption: 'King\'s Tomb {boots} + {glove2}/{mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (!items.boots) return 'unavailable';
            if (can_reach_outcast() && items.mirror || items.glove === 2) return 'available';
            return 'unavailable';
        }
    }, { // [1]
        caption: 'Light World Swamp (2)',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [2]
        caption: 'Stoops Lonk\'s Hoose',
        is_opened: is_standard,
        dependency: false,
        is_available: always
    }, { // [3]
        caption: 'Spiral Cave',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return (items.glove || items.flute) && (items.hookshot || items.mirror && items.hammer) ?
                items.lantern || items.flute ? 'available' : 'dark' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [4]
        caption: 'Mimic Cave ({mirror} outside of Turtle Rock)(Yellow = {medallion0} unkown OR possible w/out {firerod})',
        is_opened: false,
        dependency: false,
        is_available: function() {
            var state = medallion_check(1);
            if (!items.moonpearl || !items.hammer || items.glove !== 2 || !items.somaria || !items.mirror) {
                if (window.ow_glitches && items.somaria && (items.mirror || !state)) {
                    return 'major-glitch'
                }
                return 'unavailable';
            }
            if (state) return state;

            return items.firerod ?
                items.lantern || items.flute ? 'available' : 'dark' :
                'possible';
        }
    }, { // [5]
        caption: 'Tavern',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [6]
        caption: 'Chicken House {bomb}',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [7]
        caption: 'Bombable Hut {bomb}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [8]
        caption: 'C House',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [9]
        caption: 'Aginah\'s Cave {bomb}',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [10]
        caption: 'West of Mire (2)',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.flute && items.glove === 2) {
                if (items.moonpearl) {
                    return 'available';
                } else if (items.mirror) {
                    return 'sequencebreak-bunny';
                }
            }
            return (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [11]
        caption: 'Super Bunny Chests (2)',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.glove === 2 && (items.hookshot || items.mirror && items.hammer)) {
                if ((items.lantern || items.flute) && items.moonpearl) {
                    return 'available';
                } else if (items.moonpearl) {
                    return 'dark';
                }
                return 'sequencebreak-bunny';
            }
            return (window.ow_glitches ? 'major-glitch' : 'unavailable')
        }
    }, { // [12]
        caption: 'Sahasrahla\'s Hut (3) {bomb}/{boots}',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [13]
        caption: 'Byrna Spike Cave',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.moonpearl && items.glove && items.hammer && (items.byrna || items.cape) ?
                items.lantern || items.flute ? 'available' : 'dark' :
                'unavailable';
        }
    }, { // [14]
        caption: 'Kakariko Well (4 + {bomb})',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [15]
        caption: 'Thieve\'s Hut (4 + {bomb})',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [16]
        caption: 'Hype Cave! {bomb} (NPC + 4 {bomb})',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() || (items.agahnim && items.moonpearl && items.hammer) ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [17]
        caption: 'Death Mountain East (5 + 2 {bomb})',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return (items.glove || items.flute) && (items.hookshot || items.mirror && items.hammer) ?
                items.lantern || items.flute ? 'available' : 'dark' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [18]
        caption: 'West of Sanctuary {boots}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.boots ? 'available' : 'unavailable';
        }
    }, { // [19]
        caption: 'Minimoldorm Cave (NPC + 4) {bomb}',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [20]
        caption: 'Ice Rod Cave {bomb}',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [21]
        caption: 'Cave Under Rock (bottom chest) {hookshot}/{boots}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (!items.hookshot && !items.boots) {
                return 'unavailable';
            }
            if (!items.moonpearl && medallion_check(1)) {
                return 'unavailable';
            }
            return items.moonpearl && items.glove === 2 && (items.hookshot || (items.mirror && items.hammer && items.boots)) ?
                items.lantern || items.flute ? 'available' : 'dark' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [22]
        caption: 'Cave Under Rock (3 top chests) {hookshot}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (!items.hookshot || (!items.moonpearl && medallion_check(1))) {
                return 'unavailable';
            }
            return items.moonpearl && items.glove === 2 && items.hookshot ?
                items.lantern || items.flute ? 'available' : 'dark' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [23]
        caption: 'Treasure Chest Minigame: Pay 30 rupees',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [24]
        caption: 'Bottle Vendor: Pay 100 rupees',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [25]
        caption: 'Sahasrahla {pendant0}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            for (var k = 0; k < 10; k++) {
                if (prizes[k] === 1 && items['boss'+k])
                    return 'available';
            }
            return 'unavailable';
        }
    }, { // [26]
        caption: 'Ol\' Stumpy',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [27]
        caption: 'Dying Boy: Distract him with {bottle} so that you can rob his family!',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.bottle ? 'available' : 'unavailable';
        }
    }, { // [28]
        caption: 'Gary\'s Lunchbox (save the frog first)',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (!window.chests[60].is_opened) {
                var av = window.chests[60].is_available();
                if (av !== 'available') {
                    return av;
                } else {
                    return 'possible';
                }
            }
            return items.moonpearl && items.glove === 2 ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [29]
        caption: 'Fugitive under the bridge {flippers}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.flippers ? 'available' : 'sequencebreak-flippers';
        }
    }, { // [30]
        caption: 'Ether Tablet {sword2}{book}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.book && (items.glove || items.flute) && (items.mirror || items.hookshot && items.hammer) ?
                items.sword >= 2 ?
                    items.lantern || items.flute ? 'available' : 'dark' :
                    'possible' :
                (window.ow_glitches && items.book ? 'major-glitch' : 'unavailable');
        }
    }, { // [31]
        caption: 'Bombos Tablet {mirror}{sword2}{book}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.book && items.mirror && (can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer) ?
                items.sword >= 2 ? 'available' : 'possible' :
                (window.ow_glitches && items.book ? 'major-glitch' : 'unavailable');
        }
    }, { // [32]
        caption: 'Catfish',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.moonpearl && items.glove && (items.agahnim || items.hammer || items.glove === 2 && items.flippers)) return 'available';
            if (items.glove === 2 && !items.flippers && !items.hammer && items.boots) return 'sequencebreak-jesusdash';
            if (items.glove === 2 && !items.flippers && !items.hammer && items.bottle) return 'sequencebreak-revival';
            return (window.ow_glitches && items.glove ? 'major-glitch' : 'unavailable');
        }
    }, { // [33]
        caption: 'King Zora: Pay 500 rupees',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.flippers || items.glove ? 'available' : 'sequencebreak-flippers';
        }
    }, { // [34]
        caption: 'Lost Old Man {lantern}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.glove || items.flute ?
                items.lantern ? 'available' : 'dark' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [35]
        caption: 'Witch: Give her {mushroom}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.mushroom ? 'available' : 'unavailable';
        }
    }, { // [36]
        caption: 'Forest Hideout',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [37]
        caption: 'Lumberjack Tree {agahnim}{boots}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.agahnim && items.boots ? 'available' : 'possible';
        }
    }, { // [38]
        caption: 'Spectacle Rock Cave',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.glove || items.flute ?
                items.lantern || items.flute ? 'available' : 'dark' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [39]
        caption: 'South of Grove {mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.mirror && (can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer) ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [40]
        caption: 'Graveyard Cliff Cave {mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() && items.mirror ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [41]
        caption: 'Checkerboard Cave {mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.flute && items.glove === 2 && items.mirror ? 'available' : (window.ow_glitches && items.glove ? 'major-glitch' : 'unavailable');
        }
    }, { // [42]
        caption: '{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}!!!!!!!!',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.moonpearl && items.glove === 2 && items.hammer ? 'available' : (window.ow_glitches && items.hammer ? 'major-glitch' : 'unavailable');
        }
    }, { // [43]
        caption: 'Library {boots}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.boots ? 'available' : 'possible';
        }
    }, { // [44]
        caption: 'Mushroom',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [45]
        caption: 'Spectacle Rock {mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.glove || items.flute ?
                items.mirror ?
                    items.lantern || items.flute ? 'available' : 'dark' :
                    'possible' :
                (window.ow_glitches && items.mirror ? 'major-glitch' : 'unavailable');
        }
    }, { // [46]
        caption: 'Floating Island {mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return (items.glove || items.flute) && (items.hookshot || items.hammer && items.mirror) ?
                items.mirror && items.moonpearl && items.glove === 2 ?
                    items.lantern || items.flute ? 'available' : 'dark' :
                    'possible' :
                (window.ow_glitches && items.mirror ? 'major-glitch' : 'unavailable');
        }
    }, { // [47]
        caption: 'Race Minigame {bomb}/{boots}',
        is_opened: false,
        dependency: false,
        is_available: always
    }, { // [48]
        caption: 'Desert West Ledge {book}/{mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.book || items.flute && items.glove === 2 && items.mirror ? 'available' : 'possible';
        }
    }, { // [49]
        caption: 'Lake Hylia Island {mirror}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.mirror && items.moonpearl && (items.agahnim || items.glove === 2 || items.glove && items.hammer)) {
                if (items.flippers) {
                    return 'available';
                } else if (items.boots) {
                    return 'sequencebreak-jesusdash';
                } else if (items.bottle) {
                    return 'sequencebreak-revival';
                } else {
                    return 'sequencebreak-flippers-check';
                }
            } else {
                if (items.flippers) {
                    return 'possible';
                } else {
                    return 'sequencebreak-flippers-check';
                }
            }
        }
    }, { // [50]
        caption: 'Bumper Cave {cape}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() ?
                items.glove && items.cape ? 'available' : 'possible' :
                (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [51]
        caption: 'Pyramid',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.agahnim || items.glove && items.hammer && items.moonpearl) {
                return 'available';
            } else if (items.glove === 2 && items.moonpearl) {
                if (items.hammer || items.flippers) {
                    return 'available';
                } else if (items.boots) {
                    return 'sequencebreak-jesusdash';
                } else if (items.bottle) {
                    return 'sequencebreak-revival';
                }
            }
            return (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [52]
        caption: 'Alec Baldwin\'s Dig-a-Thon: Pay 80 rupees',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer ? 'available' : (window.ow_glitches ? 'major-glitch' : 'unavailable');
        }
    }, { // [53]
        caption: 'Zora River Ledge {flippers}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.flippers) return 'available';
            if (items.bottle && (items.moonpearl || items.boots)) return 'sequencebreak-revival';
            if (items.glove) return 'possible';
            return 'sequencebreak-flippers-check';
        }
    }, { // [54]
        caption: 'Buried Itam {shovel}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.shovel ? 'available' : 'unavailable';
        }
    }, { // [55]
        caption: 'Escape Sewer Side Room (3) {bomb}/{boots}' + (is_standard ? '' : ' (yellow = need small key)'),
        is_opened: false,
        dependency: false,
        is_available: function() {
            return is_standard || items.glove ? 'available' :
                items.lantern ? 'possible' : 'dark';
        }
    }, { // [56]
        caption: "Castle Secret Entrance (Uncle + 1)",
        is_opened: is_standard,
        dependency: false,
        is_available: always
    }, { // [57]
        caption: 'Hyrule Castle Dungeon (3)',
        is_opened: is_standard,
        dependency: false,
        is_available: always
    }, { // [58]
        caption: 'Sanctuary',
        is_opened: is_standard,
        dependency: false,
        is_available: always
    }, { // [59]
        caption: 'Mad Batter {hammer}/{mirror} + {powder}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            if (items.hammer || items.glove === 2 && items.mirror && items.moonpearl) {
                if (items.powder) {
                    return 'available';
                } else if (items.somaria && items.mushroom) {
                    return 'sequencebreak-powder';
                } else {
                    return 'unavailable';
                }
            } else {
                return 'unavailable';
            }
        }
    }, { // [60]
        caption: 'Take the frog home {mirror} / Save+Quit',
        is_opened: false,
        dependency: true,
        is_available: function() {
            if (items.glove === 2) {
                if (items.moonpearl) {
                    return 'available';
                }
                if (window.ow_glitches) {
                    return 'major-glitch';
                }
            }
                return 'unavailable';
        }
    }, { // [61]
        caption: 'Fat Fairy: Buy OJ bomb from Dark Link\'s House after {crystal}5 {crystal}6 (2 items)',
        is_opened: false,
        dependency: false,
        is_available: function() {
            //crystal check
            var crystal_count = 0;
            for (var k = 0; k < 10; k++) {
                if (prizes[k] === 4 && items['boss'+k])
                    crystal_count += 1;
            }

            if (!items.moonpearl || crystal_count < 2) return (window.ow_glitches && items.mirror ? 'major-glitch' : 'unavailable');
            return items.hammer && (items.agahnim || items.glove) ||
                items.agahnim && items.mirror && can_reach_outcast() ? 'available' : (window.ow_glitches && items.mirror ? 'major-glitch' : 'unavailable');
        }
    }, { // [62]
        caption: 'Master Sword Pedestal {pendant0}{pendant1}{pendant2} (can check with {book})',
        is_opened: false,
        dependency: false,
        is_available: function() {
            var pendant_count = 0;
            for (var k = 0; k < 10; k++) {
                if ((prizes[k] === 1 || prizes[k] === 2) && items['boss'+k]) {
                    if (++pendant_count === 3) return 'available';
                }
            }
            return items.book ? 'possible' : 'unavailable';
        }
    }, { // [63]
        caption: 'Escape Sewer Dark Room {lantern}',
        is_opened: is_standard,
        dependency: false,
        is_available: function() {
            return is_standard || items.lantern ? 'available' : 'dark';
        }
    }, { // [64]
        caption: 'Waterfall of Wishing (2) {flippers}',
        is_opened: false,
        dependency: false,
        is_available: function() {
            return items.flippers ? 'available' : (items.moonpearl || items.boots ? 'sequencebreak-jesusdash' : 'unavailable');
        }
    }];
}(window));
