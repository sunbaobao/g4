/**
 * Created by Administrator on 2016/8/22.
 */
function createXHR() {
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
        console.log('a');
    } else if (typeof ActiveXObject != 'undefined') {
        if (typeof arguments.callee.activeXString != 'string') {
            var varsions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i, len;
            for (i = 0, len = varsions.length; i < len; i++) {
                try {
                    new ActiveXObject(varsions[i]);
                    arguments.callee.activeXString = varsions[i];
                    break;
                } catch (ex) {

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error('no XHR object available');
    }
}
function ajax(type,url,bl,callbackS,callbackF){
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callbackS(xhr.responseText);
            } else {
               callbackF(xhr.status)
            }
        }
    };
    xhr.open(type, url, bl);
   // xhr.setRequestHeader('Access-Control-Allow-Origin','http://www.baiud.com');
    xhr.send(null);
}