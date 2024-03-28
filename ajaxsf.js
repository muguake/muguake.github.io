function ajax(q, n, m) {

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
