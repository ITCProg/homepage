
//vue.jsを使ってサイトの作品を自動的に生成しています。
//elが生成の対象となる親要素です。作品を生成したい場合、親要素にidを指定してください。
//getCardTypeでは作品の表示される大きさを指定するクラスを返す関数です。詳しくはbootstrapのレイアウトを調べてください。
//作者がOBの場合、OBListに名前を登録して下さい。

(function(){


    //コンポーネントの名前はすべて小文字で
    //
    //htmlで書いた要素は大文字で書いてもすべて小文字に変換されるので
    //html で　<Test></Test>と書いても、
    //vue.jsで更新されると <test></test>になってしまう
    //javascriptでVue.component('Test')とやっても反応しなくなる
    //

    //モーダルを定義
    //画像をクリックしたときに拡大表示のウィンドウが出てくるやつ
    Vue.component('cg-modal', {
        props: [
            'item',
            'name',
            'index',
            'isob'
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
                        <img v-bind:src="item.imgurl">
                        <hr class="m-2">
                        <p>
                            <i class="fas fa-pen"></i>
                            {{item.author}} <small class='text-muted' v-show="isob">(OB)</small>
                        </p>
                        <p>制作年度：{{item.year}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `

      });

      Vue.component('cg-card', {
        props: [
            'item',
            'name',
            'index',
            'isob',
            'cardtype'
        ],
        template: `
        <div v-bind:class="cardtype">
            <div class="card card-sdw img-thumbnail m-1 p-0 cg-card-grayscale">
                <img class="btn card-img-top p-0" v-bind:src="item.imgurl" alt="画像"  data-toggle="modal" v-bind:data-target="'#modal-'+name+'-'+index">
                <div class="cg-card-author m-2 p-1">
                    <i class="fas fa-pen"></i> {{item.author}} 
                    <small v-show="isob">(OB)</small>
                </div>
            </div>
            <cg-modal v-bind:item="item" v-bind:name="name" v-bind:index="index" v-bind:isob="isob"></cg-modal>
        </div>
        `
      });

var vm = new Vue({
    el: '#cg-works',
    data: {
        items:null
    },
    //thisはdataを指します
    methods:{
        //作品がどのように表示されるかの定義
        getCardType:function(value){
            switch(value){
                case 0:return "col-6 col-sm-4 col-lg-3 p-0";//一番小さいやつ
                case 1:return "col-12 col-sm-6 col-lg-6 p-0";//横に2マスあるやつ
            }
        },
        isOB:function(author){
            //console.log(this.items.OBList);
            return this.items.ob_list.indexOf(author)!=-1;
        },
    },
    mounted: function () {
        var self=this;
        axios.get("data/cg-works.json").then(response => {
            self.items = response.data;
            //console.log(self.items);
            //console.log(typeof(self.items));
        }).catch(error => {
            console.log(error);
        });
    }
    });
})();
