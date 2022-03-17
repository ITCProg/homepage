
//jQuery(たぶん)で外部ファイルを読み込んで置換
//vue.jsに置き換えられないだろうか
//https://qiita.com/hiroyukiwk/items/f2a74ba1406de9fad6f6

function header(rootDir) {
	$.ajax({
		url: rootDir + "common/header.html",
		cache: false,
		async: false,
		dataType: 'html',
		success: function (html) {
			html = html.replace(/\{\$root\}/g, rootDir);//{$root}をrootDirに置換
			document.write(html);
		},
		error:function(html) {
			console.log(url);
			console.log('loading header is failed!');
		}
	});
}
function footer(rootDir) {
	$.ajax({
		url: rootDir + "common/footer.html",
		cache: false,
		async: false,
		dataType: 'html',
		success: function (html) {
			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		},
		error : function (html) {
			console.log(url);
			console.log('loading footer is failed!');
		}
	});
}
//画面上部に移動するボタン
function gotoTop(rootDir){
	$.ajax({
		url: rootDir + "common/goto-top.html",
		cache: false,
		async: false,
		dataType: 'html',
		success: function (html) {
			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		},
		error:function(html) {
			console.log(html);
			console.log('loading top is failed!')
		}
	});
}

function head(rootDir) {
	$.ajax({
		url: rootDir + "common/head.html",
		cache: false,
		async: false,
		dataType: 'html',
		success: function (html) {
			html = html.replace(/\{\$root\}/g, rootDir);
			var head_element = document.getElementsByTagName('head');
			head_element[0].innerHTML+=html;
		},
		    error:function(html) {
			console.log(url);
			console.log('loading head is failed!');
		 }
	});
}