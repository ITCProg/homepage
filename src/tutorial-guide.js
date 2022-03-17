//vue.jsを使ってサイトの作品を自動的に生成しています。
//elが生成の対象となる親要素です。作品を生成したい場合、親要素にidを指定してください。
(function(){
    //Vueにコンポーネントの定義を登録
    Vue.component('guide', {
        props: ['prev','home','next','showprev','shownext'],//muteという単語を変数名の一部に含めると認識できなくなる。なんで？
        template: `
        <div class="card bg-dark text-white">
            <div class="card-body">
                <nav aria-label="pager">
                    <ul class="pagination justify-content-between">
                        <li v-if="showprev==false"> <!-- どうもprevpageがstring型っぽい-->
                            <a class="btn page-link rounded-pill text-muted disabled" href="#" aria-disabled="true">←前へ</a>
                        </li>
                        <li v-else>
                            <a class="btn page-link rounded-pill" v-bind:href="prev">←前へ</a>
                        </li>
                        <li>
                            <a class="btn page-link rounded-pill" v-bind:href="home">目次に戻る</a>
                        </li>
                        <li v-if="shownext==false">
                            <a class="btn page-link rounded-pill text-muted disabled" href="#" aria-disabled="true">次へ→</a>
                        </li>
                        <li v-else>
                            <a class="btn page-link rounded-pill" v-bind:href="next">次へ→</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        `
      });

//prog-works内の要素を置換
var vm = new Vue({
    el: '#tutorial-guide',
    data: {
    },
    //thisはdataを指します
    methods:{
    },
    });
    
})();
