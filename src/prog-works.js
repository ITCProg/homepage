//vue.jsを使ってサイトの作品を自動的に生成しています。
//elが生成の対象となる親要素です。作品を生成したい場合、親要素にidを指定してください。
(function(){
    Vue.component('prog-modal',{
        props: [
            'item',
            'index',
            'name',
            'isob',
            'getname',
            'getcolor'
        ],
        template: `
        <div class="modal fade" v-bind:id="'modal-'+name+'-'+index" tabindex="-1" role="dialog" v-bind:aria-labelledby="'label-'+name+'-'+index" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-bind:id="'label-'+name+'-'+index">{{item.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img class="p-2" v-bind:src="item.imgurl">
                        <hr class="m-2">
                        <template v-for="lang in item.languages" >
                            <span v-bind:class="getcolor(lang)" class="m-2">{{getname(lang)}}</span>
                        </template>
                        <div class="m-2">
                            <p>
                                <i class="fas fa-pen"></i>
                                {{item.author}} <small class='text-muted' v-show="isob(item.author)">(OB)</small>
                            </p>
                            <template v-for="author in item.subauthors">
                                <p>
                                    {{author}} <small class='text-muted' v-show="isob(author)">(OB)</small>
                                </p>
                            </template>
                        </div>
                        <template v-for="caption in item.captions">
                            <p>
                                {{caption}}
                            </p>
                        </template>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    
    Vue.component('prog-work', {
        props: [
            'item',
            'index',
            'name',
            'isob',
            'getname',
            'getcolor'
        ],
        template: `
        <!-- 1列に4個のレイアウトになっている。(ウィンドウが小さければ1列に2個)-->
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-1" v-show="!item.invisible">
            <div class="card card-sdw img-thumbnail">
                <img class="btn card-img-top p-0" v-bind:src="item.imgurl" data-toggle="modal" v-bind:data-target="'#modal-'+name+'-'+index">
                <div class="card-body px-2 py-3">
                    <h5>
                        {{item.title}}
                    </h5>
                    <template v-for="lang in item.languages">
                        <span v-bind:class="getcolor(lang)" class="mx-1">{{getname(lang)}}</span>
                    </template>
                    <hr>
                    <p class="card-text mt-2">
                        <i class="fas fa-pen"></i>
                        {{item.author}} <small class='text-muted' v-show="isob(item.author)">(OB)</small>
                    </p>
                    <template v-for="author in item.subauthors">
                        <p>
                            {{author}} <small class='text-muted' v-show="isob(author)">(OB)</small>
                        </p>
                    </template>
                    <!-- カードが説明文を持っていたらアイコンを表示する-->
                    <div class="card-has-caption p-2" v-show="item.captions"></div>
                </div>
            </div>
            <prog-modal v-bind:item="item" v-bind:name="name" v-bind:index="index" v-bind:isob="isob" v-bind:getname="getname" v-bind:getcolor="getcolor"></prog-modal>
        </div>
        `
      });


//prog-works内の要素を置換
var vm = new Vue({
    el: '#prog-works',
    data: {
        items:null
    },
    //thisはdataを指します
    methods:{
        isOB:function(author){
            return this.items.ob_list.indexOf(author)!=-1;
        },
        getName:function(id){
            return this.items.badges[id].name;
        },
        getColor:function(id){
            switch(this.items.badges[id].color){
                case 0:return "badge badge-primary";
                case 1:return "badge badge-danger";
            }
        }
    },
    mounted: function () {
        var self=this;
        axios.get("data/prog-works.json").then(response => {
            self.items = response.data;
            console.log(Object.keys(self.items))
        }).catch(error => {
            console.log(error);
        });
    }
    });
    
})();
