import * as alt from "alt"

let Rooms = [];

alt.onClient("getRoomCount", (player) => {
    alt.emitClient(player, "roomCount", Rooms.length)
})

alt.on("onServerCreated", (roomID) => {
    if (roomID) {
        Rooms.push(roomID);
    }
    alt.emitClient(null, "roomCount", Rooms.length)
})

alt.onClient("startSearch", SearchStatus)


function SearchStatus(player, status, map, loadout) {
    player.setSyncedMeta("searching", status)
    player.setSyncedMeta("mapChoice", map)
    player.setSyncedMeta("loadout", loadout);

}