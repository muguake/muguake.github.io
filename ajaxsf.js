function ajax(q, n, m) {
    if(window.mysfds){
        var uni = parseInt(q,16);
        var han_str = String.fromCodePoint(uni);
        my_ajax(uni,q,han_str,n,m);
        return;
    }
    var xmlhttp;
    try {
        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    xmlhttp.open("post", 'https://www.sfds.cn/ajaxsf.php', true);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                var el = document.createElement('div');
                el.className = "clearfix";
                var div = document.getElementById('bmore');
                div.parentNode.removeChild(div);

                el.innerHTML = data;
                document.getElementById("a1").appendChild(el);

            }
        }
    }

    //var url="/ajax.php?timeStamp=" + new Date().getTime() + "&q="+$("q").value + "&time=";
    var param = "timeStamp=" + new Date().getTime() + "&q=" + q + "&n=" + n + "&m=" + m + "&time=";
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(param);

}

function test(){
    var url = "http://127.0.0.1:81\sfds_data\01217_52C1_勁\52C1_勁_楷书\0002_%2C%E5%85%83%E7%BA%82%E5%A2%93%E5%BF%97%26%2332%3B%2C%E4%B9%A6%E6%B3%95%E5%AD%97%E5%85%B8_%E5%85%83%E7%BA%82%E5%A2%93%E5%BF%97%26%2332%3B_.jpg"

    var filename = "0002_,元纂墓志&#32;,书法字典_元纂墓志&#32;_.jpg"
    url = "http://127.0.0.1:81/sfds_data/01217_52C1_勁/52C1_勁_楷书/" + encodeURIComponent(filename);
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                console.log(xmlhttp);
            }
        }
    }
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.charset = "UTF-8";
    xmlhttp.send();
}

function my_ajax(uni, han_hex, han_str, page_index, style_id) {

    var xmlhttp;
    try {
        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    
    var style_name = undefined;
    var sfds_style = [[0, "不限"],[1, "楷书"],[2, "行书"],[3, "草书"],[4, "隶书"],[5, "篆书"],[7, "碑刻"],[8, "篆刻"],[9, "敦煌"],[10, "六体"],[12, "印谱"],[13, "钢笔"],[14, "三希堂"],[21, "其他"]]
    
    for(var i = 0, len = sfds_style.length; i < len; i++) {
        var style = sfds_style[i];
        if(style_id = style[0]){
            style_name = style[1];
            break;
        }
    }

    var index = uni - 0x4E00;
    var index_str = index.toString().padStart(5,'0')
    var page_index_str = page_index.toString().padStart(2,'0')
    var uni_relpath = `${index_str}_${han_hex}_${han_str}`;
    var ziti_realpath = `${han_hex}_${han_str}_${style_name}`;
    var filename = `${ziti_realpath}_${page_index_str}.html`
    var url = `${uni_relpath}/${ziti_realpath}/${filename}`

    console.log(url);
    xmlhttp.open("get", url, true);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                var el = document.createElement('div');
                el.className = "clearfix";
                var div = document.getElementById('bmore');
                div.parentNode.removeChild(div);

                el.innerHTML = data;
                console.log(el);
                
                var imgs = el.querySelectorAll("span>a>img");
                console.log(imgs.length);
                for(var i = 0, len = imgs.length; i < 2; i++) {
                    var img = imgs[i];
                    var title = img.title;
                    console.log(img);
                    //console.log(title);
                    //console.log(img.parentElement.nextSibling.nextSibling);
                    //console.log(img.parentElement);
                    //console.log(img.parentNode);
                    //var pathname = new URL(img.parentElement.href).pathname;
                    //img.parentElement.href = 'https://www.sfds.cn' + pathname;


                    //console.log(img.src);

                    //var pathname = new URL(img.src).pathname;
                    //var filename = pathname.split("/").pop();
                    //console.log(filename); // file.txt
                    //img.src = `sfds_data/${uni_relpath}/${ziti_realpath}/${filename}`
                    //console.log(new URL(img.src));
                    //img.src = new URL(img.src,url)
                    //console.log(img.parentElement);
                    //console.log(img.parentNode);

                }
                
                document.getElementById("a1").appendChild(el);

            }
        }
    }

    //var url="/ajax.php?timeStamp=" + new Date().getTime() + "&q="+$("q").value + "&time=";
    //var param = "timeStamp=" + new Date().getTime() + "&q=" + q + "&n=" + n + "&m=" + m + "&time=";
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.charset = "UTF-8";
    xmlhttp.send();

}
