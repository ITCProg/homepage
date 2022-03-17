
(function(){
    var vm = new Vue({
        el: '#dtm-introduction',
        data: {
            items:null,
        },
        //thisはdataを指します
        methods:{
            
        },
        mounted: function () {
            var self=this;
            axios.get("data/dtm-works.json").then(response => {
                self.items = response.data;
                //console.log(typeof(self.items));
            }).catch(error => {
                console.log(error);
            });
        }
        });
})();