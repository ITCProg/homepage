(function(){

    Vue.component('history-page', {
      props: [
          'current_index',
          'item_count'
      ],
      template: `
      <nav aria-label="page">
          <ul class="pagination justify-content-center">

            <li class="page-item" v-if="current_index!=1">
              <a class="page-link" v-bind:href="'history.html?index='+ (current_index-1)" aria-label="前">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item disabled" v-else>
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true" aria-label="前">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>


            <li class="page-item" v-if="current_index!=1"><a class="page-link" href="history.html?index=1">1</a></li>

            <li class="page-item disabled" v-if="current_index!=1 || current_index!=2">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                <span aria-hidden="true">...</span>
              </a>
            </li>

            <li class="page-item" v-if="current_index!=1"><a class="page-link" v-bind:href="'history.html?index='+ (current_index-1)">{{current_index-1}}</a></li>
            <li class="page-item active" aria-current="page"><span class="page-link" href="#">{{current_index}}</span></li>
            <li class="page-item" v-if="current_index!=item_count"><a class="page-link" v-bind:href="'history.html?index='+ (current_index+1)">{{current_index+1}}</a></li>

            <li class="page-item disabled" v-if="current_index != item_count-1 || item_count">
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                <span aria-hidden="true">...</span>
              </a>
            </li>

            <li class="page-item" v-if="current_index!=item_count"><a class="page-link" v-bind:href="'history.html?index='+ item_count">{{item_count}}</a></li>


            <li class="page-item" v-if="current_index!=item_count">
              <a class="page-link" v-bind:href="'history.html?index='+ (current_index+1)" aria-label="次">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
            <li class="page-item disabled" v-else>
              <a class="page-link" href="#" tabindex="-1" aria-disabled="true" aria-label="次">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>

          </ul>
        </nav>
      `
    });

var vm = new Vue({
    el: '#app',
    data: {
        items:null,
        current_index:0,
        year:0
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
        axios.get("../data/history.json").then(response => {
            console.log(response);
            console.log(this.$route);
            self.current_index = this.$route.params.id == undefined ? 1 : this.$route.params.index;
            //https://www.i-ryo.com/entry/2019/11/27/062247
            if(self.current_index<=0)self.current_index=1;
            else if(self.current_index>self.items.length)self.current_index=self.items.length;
            
            var item_database = response.data;
            if(item_database!=null){
              var url=item_database.data[self.current_index].url;
              self.year=item_database.data[self.current_index].year;
              axios.get(url).then(response => {
                self.items=responce.data;
                console.log(self.items);
              }).catch(error => {
                console.log(error);
              });
            }else{
              console.log("item is null");
            }
        }).catch(error => {
            console.log(error);
        });
    }
    });
    
})();
