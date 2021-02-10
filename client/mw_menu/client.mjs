import * as alt from "alt";

const URL = "http://resource/client/mw_menu/html/index.html";
let View = null;
let ActiveRooms = 0;
let Intervals = null;

alt.onServer("Init", Init)

alt.onServer("lobby:menu", Init)
alt.onServer("lobby:prepare", Prepare);
alt.onServer("lobby:start", Start)
alt.onServer("roomCount", RoomCount)
alt.on("lobby:goMenu", Init)

function RoomCount(c){
    ActiveRooms = c;
}

function Start() {
    View.emit("Hide");
    View.destroy();
    alt.toggleGameControls(true);
    alt.clearInterval(Intervals);
    Intervals = null;
    alt.emitServer("GetLoadout")
}

function Prepare() {
    if (View) {
        View.emit("prepare");
        alt.showCursor(false);
        View.unfocus();
    }
}

function Init() {
    View = new alt.WebView(URL);
    View.on("load", () => {
        View.emit("setUsername", alt.Player.local.getSyncedMeta("UserName"));
        alt.toggleGameControls(false)
        alt.showCursor(true)
        View.focus();
        View.on("StartSearch", (status, map, loadout) => {
            alt.emitServer("startSearch", status, map, loadout)
        })
    })

    alt.emitServer("getRoomCount")
    startIntervals();
}

function startIntervals() {
    Intervals = alt.setInterval(() => {
        if (View) {
            View.emit("allPlayerCount", alt.Player.all.length);
            View.emit("playersLooking", alt.Player.all.filter(P => P.getSyncedMeta("searching")).length);
            View.emit("activeRooms", ActiveRooms)
        }
    }, 1000)
}


