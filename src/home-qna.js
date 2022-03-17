
(function(){
    var vm = new Vue({
        el: '#introduction-qna',
        data: {
            items:null,
        },
        //thisはdataを指します
        methods:{
            
        },
        mounted: function () {
            var self=this;
            var item_database=null;
            axios.get("data/home-qna.json").then(response => {
                self.items = response.data;
                console.log(self.items);
            }).catch(error => {
                console.log(error);
            });
        }
        });
})();