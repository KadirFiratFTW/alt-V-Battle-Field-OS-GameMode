import * as alt from "alt"

let Rooms = [];
alt.on("onServerCreated", OnServerCreated)
alt.onClient("getRoomCount", OnRoomCount)
alt.onClient("startSearch", SearchStatus)

function OnRoomCount(player) {
    alt.emitClient(player, "roomCount", Rooms.length)
}

function OnServerCreated(roomID){
    if (roomID) {
        Rooms.push(roomID);
    }
    alt.emitClient(null, "roomCount", Rooms.length)
}

function SearchStatus(player, status, map, loadout) {
    player.setSyncedMeta("searching", status)
    player.setSyncedMeta("mapChoice", map)
    player.setSyncedMeta("loadout", loadout);

}
