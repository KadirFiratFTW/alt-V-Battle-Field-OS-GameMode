import * as alt from "alt";
import uuid from 'uuid';
import lodash from "lodash";

let Lobbies = [];

const MaxPlayers = 40;
const MaxPlayersTeam = 20;
const MatchEndKillCount = 100;

// Constants for game lobby.

const POINTS = {
    'kill': 100
}

const WEAPON_COMBAT_TAG = {
    '3523564046': "1",
    '584646201': "2",
    '3415619887': "3",
    '3220176749': "4",
    '2210333304': "5",
    "205991906": "6",
    "2726580491": "7",
    "1672152130": "8",
    "741814745": "9",
    "328167896": "v3",
    "1151689097": "v3",
    "190244068": "v3",
    "507170720": "v4",
    "711953949": "v4",
    "2741846334": "v4",
    "1945616459": "v4",
    "3800181289": "v1",
    "3473446624": "v1",
    "153396725": "v2",
    "785467445": "v2",
    "1119518887": "v2",
    "2971687502": "v2",
    "2722615358": "v5",
    "2725352035": "FIST"
}

const WeaponConst = {
    'M4': "weapon_carbinerifle",
    'AK47': "weapon_assaultrifle",
    'Heavy Sniper': "weapon_heavysniper",
    'Deagle': "weapon_heavypistol",
    'Revolver MKII': "weapon_revolver_mk2",
    'AP Pistol': "weapon_appistol",
    'Grenade Launcher': "weapon_grenadelauncher",
    'Stinger': "weapon_hominglauncher",
    'Sticky Bomb': "weapon_stickybomb"
}

const Ammo = {
    'primary': 450,
    'secondary': 100,
    'explosive': 10
}

const MAP_CONSTANTS = [
    {
        'Spawns':

        {
            'Team1':
            {
                'Players': [
                    { "x": 761.9834594726562, "y": -631.2890625, "z": 28.893600463867188 },
                    { "x": 761.9273681640625, "y": -638.243408203125, "z": 28.89899253845215 },
                    { "x": 767.29931640625, "y": -638.1649780273438, "z": 28.766008377075195 },
                    { "x": 767.7974243164062, "y": -631.6441650390625, "z": 28.75234603881836 },
                    { "x": 789.8941040039062, "y": -631.285400390625, "z": 28.705781936645508 },
                    { "x": 790.0631713867188, "y": -628.6926879882812, "z": 28.70453453063965 },
                    { "x": 790.0763549804688, "y": -625.5933837890625, "z": 28.70660400390625 },
                    { "x": 790.0879516601562, "y": -622.6783447265625, "z": 28.72259521484375 },
                    { "x": 790.0987548828125, "y": -619.76513671875, "z": 28.719457626342773 },
                    { "x": 790.1524047851562, "y": -616.8926391601562, "z": 28.71038818359375 },
                    { "x": 786.4024658203125, "y": -616.2050170898438, "z": 28.658710479736328 },
                    { "x": 783.0797119140625, "y": -616.3051147460938, "z": 28.8129825592041 },
                    { "x": 779.082763671875, "y": -616.2642822265625, "z": 28.83757972717285 },
                    { "x": 775.513671875, "y": -616.2244262695312, "z": 28.84947395324707 },
                    { "x": 771.8391723632812, "y": -616.2508544921875, "z": 28.876434326171875 },
                    { "x": 768.4886474609375, "y": -616.3890991210938, "z": 28.831649780273438 },
                    { "x": 767.240234375, "y": -620.23486328125, "z": 28.77244758605957 },
                    { "x": 767.298583984375, "y": -624.5081787109375, "z": 28.765666961669922 },
                    { "x": 767.237548828125, "y": -628.2948608398438, "z": 28.669530868530273 },
                    { "x": 767.2232666015625, "y": -632.7786254882812, "z": 28.75893211364746 },
                    { "x": 767.211181640625, "y": -636.6187133789062, "z": 28.75987434387207 },
                    { "x": 767.2005615234375, "y": -639.9279174804688, "z": 28.76309585571289 },
                    { "x": 769.0742797851562, "y": -641.1812133789062, "z": 28.831716537475586 },
                    { "x": 770.753173828125, "y": -639.5568237304688, "z": 28.858840942382812 }
                ],
                'Vehicles': [
                    //SAM APC
                    {
                        id: 100, 'vehicle': 'apc', rot: { "x": 0, "y": 0, "z": 0.9400041699409485 }, pos: { "x": 802.6434326171875, "y": -690.624267578125, "z": 28.860652923583984 }, modkits: [
                            { 'modkit': 10, 'val': 1 }
                        ]
                    },
                    //NORMAL APC
                    { id: 101, 'vehicle': 'apc', rot: { "x": 0, "y": 0, "z": 0.9894780516624451 }, pos: { "x": 800.6431884765625, "y": -695.5043334960938, "z": 29.136327743530273 }, modkits: [] }

                ]
            },


            'Team2':
            {
                'Players': [
                    { "x": 836.7783203125, "y": -1753.7559814453125, "z": 29.45098114013672 },
                    { "x": 832.5888061523438, "y": -1753.4097900390625, "z": 29.450748443603516 },
                    { "x": 828.6177368164062, "y": -1753.08154296875, "z": 29.449748992919922 },
                    { "x": 824.6856079101562, "y": -1752.75732421875, "z": 29.448699951171875 },
                    { "x": 820.67919921875, "y": -1752.4259033203125, "z": 29.44198989868164 },
                    { "x": 816.945068359375, "y": -1752.1171875, "z": 29.373180389404297 },
                    { "x": 812.8307495117188, "y": -1751.7764892578125, "z": 29.30988883972168 },
                    { "x": 809.5516967773438, "y": -1751.5048828125, "z": 29.307674407958984 },
                    { "x": 811.8858642578125, "y": -1748.3154296875, "z": 29.345396041870117 },
                    { "x": 815.748046875, "y": -1748.9454345703125, "z": 29.375539779663086 },
                    { "x": 820.0838012695312, "y": -1749.1114501953125, "z": 29.453632354736328 },
                    { "x": 825.0387573242188, "y": -1749.604248046875, "z": 29.477638244628906 },
                    { "x": 830.6180419921875, "y": -1750.1585693359375, "z": 29.476215362548828 },
                    { "x": 836.5270385742188, "y": -1750.7452392578125, "z": 29.480945587158203 },
                    { "x": 840.3703002929688, "y": -1751.1270751953125, "z": 29.494768142700195 },
                    { "x": 840.3851928710938, "y": -1746.8980712890625, "z": 29.491844177246094 },
                    { "x": 836.3321533203125, "y": -1746.512451171875, "z": 29.47726058959961 },
                    { "x": 831.8706665039062, "y": -1746.0875244140625, "z": 29.465274810791016 },
                    { "x": 827.4309692382812, "y": -1745.663330078125, "z": 29.467029571533203 },
                    { "x": 823.2550048828125, "y": -1745.265380859375, "z": 29.468708038330078 },
                    { "x": 819.2041625976562, "y": -1744.87841796875, "z": 29.420692443847656 },
                    { "x": 815.3143310546875, "y": -1744.5078125, "z": 29.35061264038086 },
                    { "x": 811.6829833984375, "y": -1744.1605224609375, "z": 29.33030891418457 },
                    { "x": 812.9862670898438, "y": -1738.6405029296875, "z": 29.245637893676758 }
                ],
                'Vehicles': [
                    //SAM APC
                    {
                        id: 103, 'vehicle': 'apc', rot: { "x": 0, "y": 0, "z": -0.09894780069589615 }, pos: { "x": 839.2470092773438, "y": -1729.1201171875, "z": 29.303247451782227 }, modkits: [
                            { 'modkit': 10, 'val': 1 }
                        ]
                    },
                    //NORMAL APC
                    { id: 102, 'vehicle': 'apc', rot: { "x": 0, "y": 0, "z": -0.09894780069589615 }, pos: { "x": 823.1854858398438, "y": -1729.09130859375, "z": 29.299245834350586 }, modkits: [] }

                ]
            }


        }


    }
]


alt.on("vehicleDestroy", OnVehicleDestroy)
alt.on("playerConnect", OnPlayerConnect)
alt.on("playerDeath", OnPlayerDeath)

alt.onClient("vote:start", OnVoteStart)
alt.onClient("GetLoadout", GetLoadout)
alt.onClient("vote", OnVote)

alt.setInterval(LobbyManagerTick, 1000)
alt.setInterval(OnVoteTick, 60000)

function LobbyManagerTick(){
    const getPlayers = alt.Player.all.filter(P => P.getSyncedMeta("searching") && !P.getSyncedMeta("Room"));
    if (!getPlayers.length) { return; }
    const RoomCount = Math.floor(getPlayers.length / MaxPlayers);
    if (!RoomCount) { return; }
    for (let i = 0; i < RoomCount; i++) {
        const ChunkPlayers = lodash.chunk(lodash.shuffle(getPlayers), MaxPlayers)[0];
        generateRoom(0, ChunkPlayers);
    }
}

async function generateRoom(Map, Players) {
    const MapDataTeam1 = MAP_CONSTANTS[Map].Spawns.Team1.Players
    const MapDataTeam2 = MAP_CONSTANTS[Map].Spawns.Team2.Players;
    const MapDataTeamVeh1 = MAP_CONSTANTS[Map].Spawns.Team1.Vehicles
    const MapDataTeamVeh2 = MAP_CONSTANTS[Map].Spawns.Team2.Vehicles;
    const ROOM_ID = uuid.v4();
    const Chunked = lodash.chunk(Players, MaxPlayersTeam);
    const Dimension = Lobbies.length + 1;
    Players = lodash.shuffle(Players);
    
    let counter = 0;

    for (let P of Chunked[0]) {
        P.setSyncedMeta("Team", 1)
        P.setSyncedMeta("Room", ROOM_ID)
        P.setSyncedMeta("Map", Map)
        P.setSyncedMeta("searching", false)
        P.dimension = Dimension;
        P.spawn(MapDataTeam1[counter].x, MapDataTeam1[counter].y, MapDataTeam1[counter].z, 0)
        P.model = "s_m_y_blackops_02";
        P.health = 200;
        alt.emitClient(P, "lobby:prepare")
        Players = Players.filter(p => p.id !== P.id);
    }

    counter = 0;

    for (let P of Chunked[1]) {
        P.setSyncedMeta("Team", 2)
        P.setSyncedMeta("Room", ROOM_ID)
        P.setSyncedMeta("Map", Map)
        P.setSyncedMeta("searching", false)
        P.dimension = Dimension;
        P.spawn(MapDataTeam2[counter].x, MapDataTeam2[counter].y, MapDataTeam2[counter].z, 0)
        P.model = "s_m_y_blackops_02"
        P.health = 200;
        alt.emitClient(P, "lobby:prepare")
        Players = Players.filter(p => p.id !== P.id);
    }

    const Data = {
        'RoomID': ROOM_ID,
        'PlayerList': Players,
        'Dimension': Dimension,
        'ActiveVoteTeam1': {},
        'ActiveVoteTeam2': {},
        'TeamKill1': 0,
        'TeamKill2': 0
    }

    //Generate Vehicles

    for (let V of MapDataTeamVeh1) {
        const Veh = new alt.Vehicle(V.vehicle, V.pos.x, V.pos.y, V.pos.z, V.rot.x, V.rot.y, V.rot.z);
        Veh.dimension = Dimension;
        Veh.setSyncedMeta("VehID", V.id)
        Veh.setSyncedMeta("Team", "Team1");
        Veh.setSyncedMeta("Map", Map);
        Veh.modKit = 1
        for (let M of V.modkits) {
            Veh.setMod(M.modkit, M.val);
        }
    }

    for (let V of MapDataTeamVeh2) {
        const Veh = new alt.Vehicle(V.vehicle, V.pos.x, V.pos.y, V.pos.z, V.rot.x, V.rot.y, V.rot.z);
        Veh.dimension = Dimension;
        Veh.setSyncedMeta("VehID", V.id)
        Veh.setSyncedMeta("Team", "Team2");
        Veh.setSyncedMeta("Map", Map);
        Veh.modKit = 1
        for (let M of V.modkits) {
            Veh.setMod(M.modkit, M.val);
        }
    }
    Lobbies.push({ ...Data });
    StartGame(ROOM_ID);
    alt.emit("onServerCreated", ROOM_ID);
}


async function StartGame(Room) {
    const RoomPlayers = alt.Player.all.filter(P => P.getSyncedMeta("Room") == Room)
    if (!RoomPlayers.length) { return; }
    RoomPlayers.forEach(P => {
        alt.emitClient(P, "lobby:start")
    })
}


function OnVehicleDestroy(veh){
    const Dimension = veh.dimension;
    const TempData = MAP_CONSTANTS[veh.getSyncedMeta("Map")].Spawns[veh.getSyncedMeta("Team")].Vehicles.find(V => V.id == veh.getSyncedMeta("VehID"));
    const Team = veh.getSyncedMeta("Team");
    const Map = veh.getSyncedMeta("Map");
    veh.destroy();
    const Veh = new alt.Vehicle(TempData.vehicle, TempData.pos.x, TempData.pos.y, TempData.pos.z, TempData.rot.x, TempData.rot.y, TempData.rot.z);
    Veh.dimension = Dimension;
    Veh.setSyncedMeta("VehID", TempData.id)
    Veh.setSyncedMeta("Team", Team);
    Veh.setSyncedMeta("Map", Map);
    Veh.modKit = 1
    for (let M of TempData.modkits) {
        Veh.setMod(M.modkit, M.val);
    }
}

function OnPlayerDeath(victim, killer, weapon){
    const GetRoom = killer.getSyncedMeta("Room")
    const FindRoom = Lobbies.find(L => L.RoomID == GetRoom);
    if (!FindRoom) return;
    const TempData = lodash.shuffle(MAP_CONSTANTS[victim.getSyncedMeta("Map")].Spawns["Team" + victim.getSyncedMeta("Team")].Players)[0];
    const Loadout = victim.getSyncedMeta("loadout");
    
    killer = (killer) ? killer:victim;
    
    if (killer.id !== victim.id) {
        //Send kill points to killer.
        alt.emitClient(killer, "showPoint", POINTS['kill'], victim.pos)
    }
    victim.spawn(TempData.x, TempData.y, TempData.z, 10000);
    victim.removeAllWeapons();
    for (let L of Loadout) {
        victim.giveWeapon(alt.hash(WeaponConst[L.val]), Ammo[L.type], Boolean(L.type == "primary"));
    }

    const roomPlayers = alt.Player.all.filter(P => P.getSyncedMeta("Room") == GetRoom)
    FindRoom['TeamKill' + killer.getSyncedMeta("Team")] = parseInt(FindRoom['TeamKill' + killer.getSyncedMeta("Team")]) + 1;
    for (let P of roomPlayers) {
        alt.emitClient(P, "onKill", FindRoom.TeamKill1, FindRoom.TeamKill2)
        alt.emitClient(P, "onKillLog", killer.name, victim.name, killer.getSyncedMeta("Team"), victim.getSyncedMeta("Team"), WEAPON_COMBAT_TAG[weapon], false)
    }
    CheckGame(GetRoom, FindRoom.TeamKill1, FindRoom.TeamKill2);
}

async function CheckGame(room, t1, t2) {
    let winner = (t1 >= MatchEndKillCount) ? 1:(t2 >= MatchEndKillCount) 2: null;
    if (!winner) {
        return;
    }
    const GetPlayers = alt.Player.all.filter(P => P.getSyncedMeta("Room") == room)
    for (let P of GetPlayers) {
        alt.emitClient(P, "lobby:Ended", winner);
        P.setSyncedMeta("Room", false)
        P.setSyncedMeta("Team", false)
        P.setSyncedMeta("Map", false)
        P.dimension = 0;
        P.spawn(0, 0, 60, 16000)
    }
    Lobbies = Lobbies.filter(L => L.Room !== room);
    alt.emit("onServerCreated", false);
}

function OnPlayerConnect(p){
    p.setSyncedMeta("loadout", [
        { 'type': 'primary', 'val': "M4" },
        { 'type': 'secondary', 'val': "Deagle" },
        { 'type': 'explosive', 'val': "Sticky Bomb" }
    ]);
    const username = (alt.Player.all.find(P => P.name == p.name && P.id !== p.id)) ? p.name+"("+p.id+")":p.name;
    p.setSyncedMeta("UserName", username);
    alt.emitClient(p, "Init")
}

function GetLoadout(player){
    const Loadout = player.getSyncedMeta("loadout");
    for (let L of Loadout) {
        player.giveWeapon(alt.hash(WeaponConst[L.val]), Ammo[L.type], Boolean(L.type == "primary"));
    }
}

//* Vote System *//

function OnVoteStart(player, target){
    const Room = player.getSyncedMeta("Room");
    const RoomObject = Lobbies.find(L => L.RoomID == Room);
    const Target = alt.Player.getByID(target);
    const Team = player.getSyncedMeta("Team")
    if (!Target) { return; }
    if (!RoomObject) { return; }
    if (RoomObject["ActiveVoteTeam" + Team].isActive) { return; }
    
    RoomObject["ActiveVoteTeam" + Team].isActive = true;
    RoomObject["ActiveVoteTeam" + Team].yes = 0;
    RoomObject["ActiveVoteTeam" + Team].team = Team;
    RoomObject["ActiveVoteTeam" + Team].no = 0;
    RoomObject["ActiveVoteTeam" + Team].voter = player.id;
    RoomObject["ActiveVoteTeam" + Team].target = Target.id;
    RoomObject["ActiveVoteTeam" + Team].startDate = Date.now() + 60000;
    
    const RoomPlayers = alt.Player.all.filter(P => P.getSyncedMeta("Room") == Room && player.getSyncedMeta("Team") == Team);
    if (!RoomPlayers.length) return;
    for (let P of RoomPlayers) {
        alt.emitClient(P, "start:vote", player.getSyncedMeta("UserName"), Target.getSyncedMeta("UserName"));
    }
}

async function OnVote(player, type) {
    const ROOM = player.getSyncedMeta("Room");
    const Team = player.getSyncedMeta("Team");
    const FindRoom = Lobbies.find(L => L.RoomID == ROOM && Boolean(L['ActiveVoteTeam' + Team].isActive));
    if (!FindRoom) return;
    if (type) { //VoteY
        FindRoom['ActiveVoteTeam' + Team].yes++;
    } else { // VoteN
        FindRoom['ActiveVoteTeam' + Team].no++;
    }
    const RoomPlayers = alt.Player.all.filter(P => P.getSyncedMeta("Room") == ROOM && P.getSyncedMeta("Team") == Team);
    if (!RoomPlayers.length) return;
    for (let P of RoomPlayers) {
        alt.emitClient(P, "onVote", type, (type) ? FindRoom['ActiveVoteTeam' + Team].yes : FindRoom['ActiveVoteTeam' + Team].no)
    }
    //Kick player if half of team is voted yes.
    if (FindRoom['ActiveVoteTeam' + Team].yes >= (MaxPlayersTeam / 2)) {
        KickPlayer(ROOM, FindRoom['ActiveVoteTeam' + Team].target);
        endVote(ROOM, Team);
    }
}

function endVote(roomID, team) {
    const FindRoom = Lobbies.find(L => L.RoomID == roomID);
    if (FindRoom) {
        FindRoom['ActiveVoteTeam' + team].isActive = false;
    }
    const RoomPlayers = alt.Player.all.filter(P => P.getSyncedMeta("Room") == roomID && P.getSyncedMeta("Team") == team);
    if (!RoomPlayers.length) return;
    for (let P of RoomPlayers) {
        alt.emitClient(P, "onVoteEnd")
    }
}

function KickPlayer(room, target) {
    const Player = alt.Player.all.find(P => P.id == target)
    if (Player && Player.getSyncedMeta("Room") == room) {
        Player.kick("Oylama ile oyundan atıldın.");
        //TODO : Send all players notification of voting result;
    }
}

//VoteInterval

function OnVoteTick(){
    const Team1Vote = Lobbies.filter(L => L.ActiveVoteTeam1.isActive && L.ActiveVoteTeam1.startDate >= Date.now())
    const Team2Vote = Lobbies.filter(L => L.ActiveVoteTeam2.isActive && L.ActiveVoteTeam2.startDate >= Date.now())
    const isVoteActive = [...Team1Vote, ...Team2Vote];
    if (!isVoteActive.length) { return; }
    for (let L of isVoteActive) {
        L.isActive = false;
        const Players = alt.Player.all.filter(P => P.getSyncedMeta("Room") == L.RoomID && P.getSyncedMeta("Team") == L.team)
        for (let P of Players) {
            alt.emitClient(P, "endVote");
        }
    }
}
