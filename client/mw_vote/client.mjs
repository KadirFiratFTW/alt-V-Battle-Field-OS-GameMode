import * as alt from "alt";

const URL = "http://resource/client/mw_vote/html/index.html";
let View = new alt.WebView(URL);

let Voted = false;

let showCursor = false;
let gameControls = true;
let isFocus = false;
View.on("startVote", (id) => {

    alt.emitServer("vote:start", id)

})

View.on("takeControls", takeControls);

alt.onServer("start:vote", (voter, target) => {
    Voted = false;
    View.emit("voteStarted", voter, target)
})


alt.onServer("onVoteEnd", () => {

    View.emit("voteEnd");

})

alt.onServer("onVote", (voteType, voteCount) => {

    if (View) {

        View.emit("voteCount", voteType, voteCount);

    }

})


ListenKeyEvents();

function takeControls() {

    showCursor = !showCursor
    gameControls = !gameControls
    isFocus = !isFocus

    alt.showCursor(showCursor)
    alt.toggleGameControls(gameControls)

    if (isFocus) {
        View.focus();
    } else {
        View.unfocus();
    }

}

function ListenKeyEvents() {

    alt.on("keyup", KeyEvent)

}

function KeyEvent(key) {

    if (key == 116) {
        VoteMenu();
    }

    if (Voted) { return; }
    if (key == 112) {

        Voted = true
        alt.emitServer("vote", true);
    }

    if (key == 113) {
        Voted = true
        alt.emitServer("vote", false);
    }

}

function VoteMenu() {

    const Players = alt.Player.all.filter(P => P.scriptID !== alt.Player.local.scriptID && P.getSyncedMeta("Team") == alt.Player.local.getSyncedMeta("Team")).map(P => {

        return { 'name': P.getSyncedMeta("UserName"), 'id': P.id }

    })

    View.emit("vote:playerList", Players)

}
