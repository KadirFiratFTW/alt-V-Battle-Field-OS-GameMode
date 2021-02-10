// {

//     killerTeam:1,
//     victimTeam:2,
//     weapon:1,
//     isHeadshot:true,
//     isVehicle:null || [1, 2, 3, 4, 5]

// }

const KillFeed = new Vue({

    el: '#app',
    data: {
        endState: false,
        endText: "",
        killTeam1: 0,
        killTeam2: 0,
        killPoints: 0,
        killLogs: [
        ]
    }




})

function killLog(killerName, victimName, killerTeam, victimTeam, weapon, isHeadshot) {
    const data = {
        killerTeam: killerTeam,
        victimTeam: victimTeam,
        killerName: killerName,
        victimName: victimName,
        weapon: weapon,
        isHeadshot: isHeadshot,
        remove: Date.now() + 10000
    }
    const Current = KillFeed.killLogs;
    Current.push(data);
    KillFeed.killLogs = Current

}


setInterval(function () {
    if (!KillFeed.killLogs.length) { return; }
    KillFeed.killLogs = KillFeed.killLogs.filter(K => K.remove > Date.now());

}, 2000)

function killCounts(t1, t2) {
    KillFeed.killTeam1 = t1
    KillFeed.killTeam2 = t2;

}

function end(winner, team) {
    if (parseInt(team) === parseInt(winner)) {
        KillFeed.endText = "Winner!";
        KillFeed.endState = true;
        return;
    }

    KillFeed.endText = "LOOOOSEEERR!";
    KillFeed.endState = true;
}

function getPoint(point) {
    KillFeed.killPoints = KillFeed.killPoints + parseInt(point);
}

if ('alt' in window) {

    alt.on("killLog", killLog);
    alt.on("killCounts", killCounts)
    alt.on("ended", end)
    alt.on("pointCounter", getPoint)
}