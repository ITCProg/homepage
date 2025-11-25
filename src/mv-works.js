(function () {
    Vue.component("mv-work", {
        props: [
            "item"
        ],
        template: `
        <div class="card col-11 col-lg-5">
            <div class="card-body">
                <h4 class="title">「{{item.title}}」</h4>
                <p class="description" v-if="item.description">{{item.description}}</p>
                <div class="authors row m-3">
                    <p>作者： </p>
                    <div>
                        <p v-for="author in item.authors">{{author}}</p>
                    </div>
                </div>
                <div class="subauthors row m-3" v-if="item.subauthors">
                    <p>協力者： </p>
                    <div>
                        <p v-for="subauthor in item.subauthors">{{subauthor}}</p>
                    </div>
                </div>
                <div class="embed embed-responsive embed-responsive-16by9" v-html="item.embed"></div>
            </div>
        </div>
   `});

    var vm = new Vue({
        el: '#mv-works',
        data: {
            items: null
        },
        mounted: function () {
            var self = this;
            axios.get("data/mv-works.json").then(response => {
                var data = response.data;
                var ob_list = data.ob_list;
                if (ob_list) {
                    for (var key in data) {
                        if (key !== "ob_list" && Array.isArray(data[key])) {
                            data[key].forEach(item => {
                                if (item.authors) {
                                    item.authors = item.authors.map(author => {
                                        return ob_list.includes(author) ? author + "(OB)" : author;
                                    });
                                }
                                if (item.subauthors) {
                                    item.subauthors = item.subauthors.map(author => {
                                        return ob_list.includes(author) ? author + "(OB)" : author;
                                    });
                                }
                            });
                        }
                    }
                }
                self.items = data;
            }).catch(error => {
                console.log(error);
            });
        }
    });
})();