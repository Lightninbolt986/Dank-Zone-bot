module.exports = {
    bar: function (finalval) {
        const full = "<:bp_full:920060141943029780>"
        const start = "<:bp_str:920059865785835530>"
        const empty = "<:bp_mt:920060097131061259>"
        const half = "<:bp_5:920060037815205928>"
        const zero = "<:bp_0:920059944580051024>"
        const eempty = "<:bp_e:920060587009015818>"
        const efull = "<:bp_ef:920060292942155796>"
        const ehalf = "<:bp_e5:920060255889666048>"
        const ezero = "<:bp_e0:920060208007479376>"

        if (finalval >= 100) {
            bar = `${start + full + full + full + full + full + full + full + full + full + efull}`
        } else if (finalval < 100 && finalval >= 95) {
            bar = `${start + full + full + full + full + full + full + full + full + full + ehalf}`
        } else if (finalval < 95 && finalval >= 90) {
            bar = `${start + full + full + full + full + full + full + full + full + full + ezero}`
        } else if (finalval < 90 && finalval >= 85) {
            bar = `${start + full + full + full + full + full + full + full + full + half + eempty}`
        } else if (finalval < 85 && finalval >= 80) {
            bar = `${start + full + full + full + full + full + full + full + full + zero + eempty}`
        } else if (finalval < 80 && finalval >= 75) {
            bar = `${start + full + full + full + full + full + full + full + half + empty + eempty}`
        } else if (finalval < 75 && finalval >= 70) {
            bar = `${start + full + full + full + full + full + full + full + zero + empty + eempty}`
        } else if (finalval < 70 && finalval >= 65) {
            bar = `${start + full + full + full + full + full + full + half + empty + empty + eempty}`
        } else if (finalval < 65 && finalval >= 60) {
            bar = `${start + full + full + full + full + full + full + zero + empty + empty + eempty}`
        } else if (finalval < 60 && finalval >= 55) {
            bar = `${start + full + full + full + full + full + full + zero + empty + empty + eempty}`
        } else if (finalval < 55 && finalval >= 50) {
            bar = `${start + full + full + full + full + full + zero + empty + empty + empty + eempty}`
        } else if (finalval < 50 && finalval >= 45) {
            bar = `${start + full + full + full + full + half + empty + empty + empty + empty + eempty}`
        } else if (finalval < 45 && finalval >= 40) {
            bar = `${start + full + full + full + full + zero + empty + empty + empty + empty + eempty}`
        } else if (finalval < 40 && finalval >= 35) {
            bar = `${start + full + full + full + half + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 35 && finalval >= 30) {
            bar = `${start + full + full + full + zero + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 30 && finalval >= 25) {
            bar = `${start + full + full + half + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 25 && finalval >= 20) {
            bar = `${start + full + full + zero + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 20 && finalval >= 15) {
            bar = `${start + full + half + empty + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 15 && finalval >= 10) {
            bar = `${start + full + zero + empty + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 10 && finalval >= 5) {
            bar = `${start + half + empty + empty + empty + empty + empty + empty + empty + empty + eempty}`
        } else if (finalval < 5 && finalval >= 0) {
            bar = `${start + zero + empty + empty + empty + empty + empty + empty + empty + empty + eempty}`
        }

        return bar
    },
    commas: function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    CanGetChannelWithInfo: function (member) {
        let has = false
        let num = 0
        //5$ investor
        if (member.roles.cache.has('782502710099836929')) {
            has = true
            num = num + 10
        }
        //10$ investor 
        if (member.roles.cache.has('782503381070512128')) {
            has = true
            num = num + 5
        }
        //25$ investor
        if (member.roles.cache.has('801348395036835880')) {
            has = true
            num = num + 5
        }
        //50$ investor
        if (member.roles.cache.has('837266511210348544')) {
            has = true
            num = num + 5
        }
        //Double booster
        if (member.roles.cache.has('745564909810614343')) {
            has = true
            num = num + 5
        }
        //Multi booster
        if (member.roles.cache.has('812326743653482507')) {
            has = true
            num = num + 5
        }
        //500M Donator
        if (member.roles.cache.has('772005497762218024')) {
            has = true
            num = num + 5
        }
        //750M Donator
        if (member.roles.cache.has('798558270104010752')) {
            has = true
            num = num + 5
        }

        return {
            has,
            num
        }
    },
    TextSmall: function (text, length) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }

}