const Menu = new Vue({

    el: "#app",
    data: {
        userName: "",
        isSearching: false,
        selectedMap: 0,
        preparing: false,
        allPlayerCount: 0,
        playersLooking: 0,
        activeRooms: 0,
        show: true,
        loadout: [
            { 'type': 'primary', 'val': "M4" },
            { 'type': 'secondary', 'val': "Deagle" },
            { 'type': 'explosive', 'val': "Sticky Bomb" }
        ],
        selectorShow: false,
        selectorType: ""
    },
    methods: {
        showSelector(type) {

            if (this.selectorShow && this.selectorType == type) {
                this.selectorShow = false
                return;
            }

            this.selectorShow = true;
            this.selectorType = type;

        },
        startSearch() {
            this.isSearching = !this.isSearching;
            _startSearch(this.isSearching, this.selectedMap, this.loadout);
        }
    }

})


if ('alt' in window) {
    function _startSearch(status, map, loadout) {
        alt.emit("StartSearch", status, map, loadout);
    }

    function Prepare() {
        Menu.preparing = true;
    }

    function allPlayerCount(c) {
        Menu.allPlayerCount = c
    }

    function playersLooking(c) {
        Menu.playersLooking = c;
    }

    function activeRooms(c) {
        Menu.activeRooms = c;
    }

    function hide() {
        Menu.show = false;
    }

    function setUsername(username) {
        Menu.userName = username;
    }

    alt.on("setUsername", setUsername)
    alt.on("hide", hide)
    alt.on("prepare", Prepare)
    alt.on("allPlayerCount", allPlayerCount)
    alt.on("playersLooking", playersLooking)
    alt.on("activeRooms", activeRooms)
}