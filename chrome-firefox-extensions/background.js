var searchEngine = [
{"title":"搜狗","id":"sogou","queryUrl":"https://www.sogou.com/web?ie={inputEncoding}&query=%s","contexts":["selection"],"enable":true},
{"title":"百度","id":"baidu","queryUrl":"https://www.baidu.com/#ie={inputEncoding}&wd=%s","contexts":["selection"],"enable":true},
{"title":"bing","id":"bing","queryUrl":"https://www.bing.com/search?q=%s&PC=U316&FORM=CHROMN","contexts":["selection"],"enable":true},
{"title":"360","id":"360","queryUrl":"https://www.so.com/s?ie={inputEncoding}&q=%s","contexts":["selection"],"enable":true},
{"title":"google","id":"google","queryUrl":"https://www.google.com/search?q=%s&ie={inputEncoding}","contexts":["selection"],"enable":true}

];

var searchZidian = [
{"title":"汉典","id":"zdic","queryUrl":"https://www.zdic.net/hans/%s","contexts":["selection"],"enable":true},
{"title":"muguake","id":"muguake","queryUrl":"https://muguake.github.io","contexts":["link"],"enable":true},
];

var searchOther = [
{"title":"superchat","id":"superchat","queryUrl":"","contexts":["link"],"top":true,"enable":true},
{"title":"xgplayer","id":"xgplayer","queryUrl":"","contexts":["link"],"top":true,"enable":true},
{"title":"xgplayer2","id":"xgplayer2","queryUrl":"","contexts":["link"],"top":true,"enable":true}
];

var menus = [
{"title":"搜索","id":"engine","items":searchEngine,"enable":true},
{"title":"字典","id":"zidian","items":searchZidian,"enable":true},
{"title":"其他","id":"other","items":searchOther,"enable":true},
];

// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    
    if(info.menuItemId == "superchat"){
        var href = info.linkUrl;
        var result = decode_zb(href);
        var model_id = result["model_id"];
        var username = result["username"];
        var url = `https://zh.superchat.shop/${username}`;
        window.open(url);
    }else if(info.menuItemId == "xgplayer"){
        var href = info.linkUrl;
        var result = decode_zb(href);
        var model_id = result["model_id"];
        var username = result["username"];
        var url = `http://127.0.0.1/h5player/iso.php.html?hls=&ll=&id=${model_id}&u=${username}`;
        window.open(url);
    }else if(info.menuItemId == "xgplayer2"){
        var href = info.linkUrl;
        var result = decode_zb(href);
        var model_id = result["model_id"];
        var username = result["username"];
        var url = `http://muguake.github.io/h5player/iso.php.html?hls=&ll=&id=${model_id}&u=${username}`;
        window.open(url);
    }
}

function menus_creat(){
    for (var i = 0; i < menus.length; i++) {
        var menu = menus[i];
        var title = menu["title"];
        var items = menu["items"];
        var pid = menu["id"];
        chrome.contextMenus.create({"title": title, "contexts":["all"],"id": pid});
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var title = item["title"];
            var contexts = item["contexts"];
            var id = item["id"];
            var top = item["top"];
            if(top){
                chrome.contextMenus.create({"title": title, "contexts":contexts,"id":id});
            }else{
                chrome.contextMenus.create({"title": title, "contexts":contexts,"parentId":pid,"id":id});
            }
        }
   }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    menus_creat();
});
