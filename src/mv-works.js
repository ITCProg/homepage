
(function(){
    var vm = new Vue({
        el: '#movie-works',
        data: {
            items:null,
        },
        //thisはdataを指します
        methods:{
            
        },
        mounted: function () {
            var self=this;
            axios.get("data/mv-works.json").then(response => {
                self.items = response.data;
                console.log(typeof(self.items));
                console.log(self.items);
            }).catch(error => {
                console.log(error);
            });
        }
        });
})();