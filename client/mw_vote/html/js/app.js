const Vote = new Vue({
    el: '#app',
    data: {
        voteStarted: false,
        showVoteMenu: false,
        playerList: [],
        VoteY: 0,
        VoteN: 0,
        VoteTitle: "",
        Desc: ""
    },
    methods: {
        startVote(id) {
            _startVote(id)
            this.showVoteMenu = false;
        },
        close() {
            this.voteStarted = false;
            this.showVoteMenu = false;
            _takeControls();
        }
    }
})


if ('alt' in window) {

    function _takeControls() {
        alt.emit("takeControls")
    }

    function _startVote(id) {

        alt.emit("startVote", id);
        this.showVoteMenu = false;
        alt.emit("takeControls")

    }

    function voteCount(t, c) {
        if (t) {
            Vote.VoteY = c;
        } else {
            Vote.VoteN = c;
        }
    }

    function playerList(l) {
        Vote.playerList = l
        if (Vote.voteStarted) { return; }
        Vote.showVoteMenu = !Vote.showVoteMenu;
        alt.emit("takeControls")

    }

    function voteStarted(voter, target) {
        if (Vote.showVoteMenu) {
            Vote.showVoteMenu = false;
            alt.emit("takeControls")
        }
        Vote.VoteTitle = voter + " bir oylama başlattı.";
        Vote.Desc = target + " adlı oyuncuyu at";
        Vote.VoteY = 0;
        Vote.VoteN = 0;
        Vote.voteStarted = true
    }

    function voteEnd() {
        Vote.VoteY = 0;
        Vote.VoteN = 0;
        Vote.voteStarted = false
    }

    alt.on("voteEnd", voteEnd)
    alt.on("voteCount", voteCount)
    alt.on("vote:playerList", playerList)
    alt.on("voteStarted", voteStarted)

}