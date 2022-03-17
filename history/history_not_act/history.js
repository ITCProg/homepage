(function(){

var vm = new Vue({
    el: '#app',
    data: {
        items:null
    },
    //thisはdataを指します
    methods:{
        get_badge_name(name){
            switch(name){
                case "m3":return "M3";
                case "ridaisai":return "理大祭";
                case "dejige":return "デジゲー博";
                case "comic":return "コミケ";
                case "dtm":return "DTM";
                case "cg":return "CG";
                case "prog":return "PROG";
            }
            return "---";
        }
    },
    mounted: function () {
        var self=this;
        axios.get("data/history.json").then(response => {
            self.items = response.data;
            console.log(self.items);
        }).catch(error => {
            console.log(error);
        });
    }
    });
    
})();
