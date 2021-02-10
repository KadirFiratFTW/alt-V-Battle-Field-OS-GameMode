import * as alt from "alt"
import * as native from "natives"

const URL = "http://resource/client/mw_manager/html/index.html"
const Rels = {
    'Team1': native.addRelationshipGroup("Team1"),
    'Team2': native.addRelationshipGroup("Team2")
}

let View = null;
let EveryTick = null;
let PointQue = [];

alt.onServer("lobby:start", OnLobbyStart)
alt.onServer("onKill", OnKill)
alt.onServer("onKillLog", OnKillLog)
alt.onServer("lobby:Ended", OnLobbyEnded)
alt.onServer("showPoint", OnPoint)


function OnLobbyStart(){
    View = new alt.WebView(URL);
    EveryTick = alt.everyTick(OnTick)
}

function OnKill(team1, team2){
    if (!View) { return; }
    View.emit("killCounts", team1, team2)
}

function OnKillLog(killerName, victimName, killerTeam, victimTeam, weapon, isHeadshot){
    if (!View) { return; }
    View.emit("killLog", killerName, victimName, killerTeam, victimTeam, weapon, isHeadshot)
}

function PlaySound(winner){
    if (winner == alt.Player.local.getSyncedMeta("Team")) {
        native.playSoundFrontend(-1, "BASE_JUMP_PASSED", "HUD_AWARDS", false)
        return;
    }
    native.playSoundFrontend(-1, "Bed", "WastedSounds", false)
}

function OnLobbyEnded(winner){
    alt.clearInterval(Interval);
    PlaySound(winner)
    View.emit("ended", winner, alt.Player.local.getSyncedMeta("Team"));
    alt.toggleGameControls(false);
    native.triggerScreenblurFadeIn(2500)
    alt.setTimeout(() => {
        ReturnMainMenu();
        native.triggerScreenblurFadeOut(2500)
    }, 15000);
    alt.clearEveryTick(EveryTick)
    EveryTick = null;
}

function OnPoint(point, pos){
    PointQue.push({ 'point': point, 'pos': { ...pos }, 'clearTime': Date.now() + 1200, 'sended': false });
}

function OnTick(){
    PlayerPedReleationship();
    PointQueTick();
}

function PlayerPedRelationship(){
     alt.Player.all.filter(P => P.getSyncedMeta("Team") && P.getSyncedMeta("Team") == alt.Player.local.getSyncedMeta("Team")).forEach(P => {
            native.setPedRelationshipGroupHash(P.scriptID, Rels['Team' + alt.Player.local.getSyncedMeta("Team")][1]);
            native.setPedRelationshipGroupDefaultHash(P.scriptID, Rels['Team' + alt.Player.local.getSyncedMeta("Team")][1]);
            native.setEntityCanBeDamagedByRelationshipGroup(P.scriptID, false, Rels['Team' + alt.Player.local.getSyncedMeta("Team")][1]);
        })
        native.setRelationshipBetweenGroups(0, Rels['Team2'][1], Rels['Team1'][1])
        native.setRelationshipBetweenGroups(0, Rels['Team2'][1], Rels['Team2'][1])
        native.setRelationshipBetweenGroups(0, Rels['Team1'][1], Rels['Team2'][1])
        native.setRelationshipBetweenGroups(0, Rels['Team1'][1], Rels['Team1'][1])
        native.setRelationshipBetweenGroups(0, Rels['Team1'][1], alt.hash("PLAYER"))
        native.setRelationshipBetweenGroups(0, alt.hash("PLAYER"), Rels['Team1'][1])
        native.setRelationshipBetweenGroups(0, Rels['Team2'][1], alt.hash("PLAYER"))
        native.setRelationshipBetweenGroups(0, alt.hash("PLAYER"), Rels['Team2'][1])
        native.setPedConfigFlag(alt.Player.local.scriptID, 184, false)
}
    

function PointQueTick(){
 if (!PointQue.length) { return; }
    PointQue = PointQue.filter(point => point.clearTime > Date.now());
    for (let P of PointQue) {
        if (Date.now() > P.clearTime) {
            continue;
        }
        P.pos.z += 0.01;
        Text3D(P.pos.x, P.pos.y, P.pos.z, "+" + P.point);
        if (!P.sended) {
            if (View) {
                View.emit("pointCounter", P.point);
                P.sended = true;
            }
        }
    }   
}

function ReturnMainMenu() {
    alt.emit("lobby:goMenu")
    View.destroy();
    View = null;
}

function Text3D(x, y, z, text) {
    const [bol, _x, _y] = native.getScreenCoordFromWorldCoord(x, y, z);
    if (bol) {
        native.setTextScale(0.40, 0.40)
        native.setTextFont(4)
        native.setTextProportional(1)
        native.setTextColour(255, 255, 255, 215)
        native.setTextCentre(true)
        native.beginTextCommandDisplayText("STRING");
        native.addTextComponentSubstringPlayerName(`~y~${text} `);
        native.endTextCommandDisplayText(_x, _y);
        let factor = text.length / 250
        native.drawRect(_x, _y + 0.0150, 0.0 + factor, 0.035, 41, 11, 41, 100)
    }
}
