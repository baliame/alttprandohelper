(function(window) {
    'use strict';

    var query = uri_query(),
        sword = query.mode === 'open' ? 0 : 1;

    window.items = {
        tunic: 1,
        sword: sword,
        shield: 0,
        moonpearl: false,

        bow: 0,
        boomerang: 0,
        hookshot: false,
        mushroom: false,
        powder: false,

        firerod: false,
        icerod: false,
        bombos: false,
        ether: false,
        quake: false,

        lantern: false,
        hammer: false,
        shovel: false,
        net: false,
        book: false,

        bottle: 0,
        somaria: false,
        byrna: false,
        cape: false,
        mirror: false,

        boots: false,
        glove: 0,
        flippers: false,
        flute: false,
        agahnim: false,

        boss0: false,
        boss1: false,
        boss2: false,
        boss3: false,
        boss4: false,
        boss5: false,
        boss6: false,
        boss7: false,
        boss8: false,
        boss9: false,

        chest0: 3,
        chest1: 2,
        chest2: 2,
        chest3: 5,
        chest4: 6,
        chest5: 2,
        chest6: 4,
        chest7: 3,
        chest8: 2,
        chest9: 5,

        bk0: 0,
        bk1: 0,
        bk2: 0,
        bk3: 0,
        bk4: 0,
        bk5: 0,
        bk6: 0,
        bk7: 0,
        bk8: 0,
        bk9: 0,

        ks0: 0,
        ks1: 0,
        ks2: 0,
        ks3: 0,
        ks4: 0,
        ks5: 0,
        ks6: 0,
        ks7: 0,
        ks8: 0,
        ks9: 0,

        kchests0: 6,
        kchests1: 6,
        kchests2: 6,
        kchests3: 14,
        kchests4: 7,
        kchests5: 9,
        kchests6: 8,
        kchests7: 8,
        kchests8: 8,
        kchests9: 12,

        inc: limit(1, {
            tunic: { min: 1, max: 3 },
            sword: { max: 4 },
            shield: { max: 3 },
            bottle: { max: 4 },
            bow: { max: 3 },
            boomerang: { max: 3 },
            glove: { max: 2 },

            bk0: { max: 1 },
            bk1: { max: 1 },
            bk2: { max: 1 },
            bk3: { max: 1 },
            bk4: { max: 1 },
            bk5: { max: 1 },
            bk6: { max: 1 },
            bk7: { max: 1 },
            bk8: { max: 1 },
            bk9: { max: 1 },

            ks0: { max: 0 },
            ks1: { max: 1 },
            ks2: { max: 1 },
            ks3: { max: 6 },
            ks4: { max: 1 },
            ks5: { max: 3 },
            ks6: { max: 1 },
            ks7: { max: 2 },
            ks8: { max: 3 },
            ks9: { max: 4 },
        }),
        dec: limit(-1, {
            chest0: { max: 3 },
            chest1: { max: 2 },
            chest2: { max: 2 },
            chest3: { max: 5 },
            chest4: { max: 6 },
            chest5: { max: 2 },
            chest6: { max: 4 },
            chest7: { max: 3 },
            chest8: { max: 2 },
            chest9: { max: 5 },
            kchests0: { max: 6 },
            kchests1: { max: 6 },
            kchests2: { max: 6 },
            kchests3: { max: 14 },
            kchests4: { max: 7 },
            kchests5: { max: 9 },
            kchests6: { max: 8 },
            kchests7: { max: 8 },
            kchests8: { max: 8 },
            kchests9: { max: 12 },
        })
    };

    function limit(delta, limits) {
        return function(item) {
            var value = items[item],
                max = limits[item].max,
                min = limits[item].min || 0;
            value += delta;
            if (value > max) value = min;
            if (value < min) value = max;
            return items[item] = value;
        };
    }
}(window));
