function bookmarkPage() {
    
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
        window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
        this.title = document.title;
        return true;
    } else { // webkit - safari/chrome
        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
}

function getBrowser() {
    var ua = navigator.userAgent, tem, 
    browser = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if(/trident/i.test(browser[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }

    if(browser[1] === 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    browser = browser[2] ? [browser[1], browser[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!== null) browser.splice(1, 1, tem[1]);
    
    return browser.join(' ');
}

function browserPlugins() {
    var plugins = [];
    for (var i in navigator.plugins) {
        if (typeof (navigator.plugins[i]) === 'object') {
            plugins.push(navigator.plugins[i].name);
        }
    };
    return plugins;
}

function getIp(selector) {
    selector = selector || false;
    ajax({
        url: "http://api.ipify.org/"
    }, function(data) {
        if (selector) {
            document.querySelectorAll(selector).forEach(function(item) {
                item.innerHTML += data;
            });
        }
    });
}

function blink(selector, speed) {
    selector = selector || 'blink';
    speed = speed || 500;
    var elements = document.querySelectorAll(selector);
    
    elements.forEach(function(item){
        var el = item; 
        setInterval(function(){
            if (el.style.opacity === '' || el.style.opacity === '1') {
                el.style.opacity = '0.0';
            } else {
                el.style.opacity = '1.0';
            }
        }, speed);
    });
}

function isNumericDigit(evt) {
    return (evt.keyCode >= 48 && evt.keyCode <= 57) 
        || (evt.keyCode >= 96 && evt.keyCode <= 105);
}


function isNode(obj){
    return (
        typeof Node === "object" ? obj instanceof Node : 
        obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
    );
}

function isElement(obj){
    return (
        typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
    );
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (el.offsetParent === null || style.display === 'none');
}


function escapeHtml(string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    
    return String(string).replace(/[&<>"'`=\/]/g, function(str) {
        return entityMap[str];
    });
}

function isIpv4(ip) {
    var str = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip);
  //var str = /^(?:(?:25[0-5]2[0-4][0-9][01]?[0-9][0-9]?)\.){3}(?:25[0-5]2[0-4][0-9][01]?[0-9][0-9]?)$/.test(ip);
    return str;
}

function isIpv6(ip) {
    var str = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/.test(ip);
    return str;
}

function isMobile() {
    function ua(ag) {
        return navigator.userAgent.match(ag);
    }
    
    if(ua(/Android/i)
    || ua(/webOS/i)
    || ua(/iPhone/i)
    || ua(/iPad/i)
    || ua(/iPod/i)
    || ua(/BlackBerry/i)
    || ua(/Windows Phone/i)
    ){
        return true;
    } else {
        return false;
    }
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isURL(url) {
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater
        
    if(!pattern.test(url)) {
        return false;
    } else {
        return true;
    }
}


function urlParams() {
	var vars = {};
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function formSubmit(id, userEvent){
    userEvent = userEvent || window.event;
    if (typeof id === 'number') {
        document.forms[id].submit();
    } else {
        document.getElementById(id).submit();
    }
}

function enterSubmit(id, userEvent){
     if (userEvent.keyCode === 13) {
         formSubmit(id, userEvent);
     }
}

function setFullScreen() {

	var doc = document.documentElement,
		rfs =  doc.requestFullScreen
			|| doc.webkitRequestFullScreen
			|| doc.mozRequestFullScreen;
	rfs.call(doc);
}

function ss(scriptPath, callback, insertBody) {
    insertBody = insertBody || true;
	var script = document.createElement('script'); 
	script.type = 'text/javascript';
	script.src = scriptPath;
    if (insertBody) {
        document.body.appendChild(script);
    } else {
        document.head.appendChild(script);
    }
    
	script.onload = function() {
		callback();
	};
}

function windowSize() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return {"width": x, "height": y};
}

function goTop() {
	window.scrollTo(0, 0);
}

function goBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

function pagePos(x, y) {
	window.scrollTo(x, y);    
}


function printContent(elemId) {

	var d = document, body = d.body,
	    elementsContent = d.getElementById(elemId).innerHTML,
	    oldPage = body.innerHTML;

	body.innerHTML ="<html>"+
                        "<head>"+
                            "<meta charset='" + d.characterSet + "'>"+
                                "<title>Print</title>"+
                        "</head>"+
                        "<body>" + elementsContent + "</body>"+
                    "</html>";

	//Print Page
	window.print();

	//Restore orignal HTML
	document.body.innerHTML = oldPage;

}


function toggleCheckAll(e) {
	var element = e.target || event.srcElement || e.srcElement;
    var check = element.checked;
    var arrayElements = document.getElementsByTagName('input');
	
    for (var i = 0; i < arrayElements.length; i++) {
        if (arrayElements[i].type === 'checkbox') {
            arrayElements[i].checked = check;
        }
    }
}

function isValidForm(id) {
    if (typeof id === 'number') {
        return document.forms[id].checkValidity();
    } else {
        return document.getElementById(id).checkValidity();
    }
}

function serializeForm(form) {
    if (!form || form.nodeName !== "FORM") {
      return false;
    }
    
    var i = form.elements.length - 1,  j = 0, q = [];
    
    while (i >= 0) {
        var element = form.elements[i];
        var elementName = element.name, elementType = element.type, elementValue = element.value;
        
        if (elementName === "") {
            i = i - 1;
            continue;
        }
        
        switch (element.nodeName) {
            case "INPUT":
                switch (elementType) {
                    case "checkbox":
                    case "radio":
                        if (element.checked) {
                            q.push(elementName + "=" + encodeURIComponent(elementValue));
                        }
                        break;
                    default:
                        q.push(elementName + "=" + encodeURIComponent(elementValue));
                        break;
                }
                break;
                
            case "TEXTAREA":
                q.push(elementName + "=" + encodeURIComponent(elementValue));
                break;
            
            case "SELECT":
                switch (elementType) {
                  case "select-one":
                    q.push(elementName + "=" + encodeURIComponent(elementValue));
                    break;
                  case "select-multiple":
                    j = element.options.length - 1;
                    while (j >= 0) {
                      if (element.options[j].selected) {
                        q.push(elementName + "=" + encodeURIComponent(element.options[j].value));
                      }
                      j = j - 1;
                    }
                }
                break;
                
            case "BUTTON":
                q.push(elementName + "=" + encodeURIComponent(elementValue));
                break;
        }
        
        i = i - 1;
    }
    return q.join("&");
};


function isInput(selector) {
    var query = document.querySelectorAll(selector);
        if ( ! isEmpty(query) ) {
            var elem = query[0].nodeName,
                result = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].indexOf(elem);
            return result !== -1;
        }
        return false;
}


function copyTextToClipboard(selector) {
    var d = document, aux = d.createElement("input");
    aux.setAttribute("value", document.querySelectorAll(selector)[0].innerHTML);
    d.body.appendChild(aux);
    aux.select();
    d.execCommand("copy");
    d.body.removeChild(aux);
}

function copyHtmlToClipboard(selector){
    var d = document, aux = d.createElement("div");
    aux.setAttribute("contentEditable", true);
    aux.innerHTML = document.querySelectorAll(selector)[0].innerHTML;
    aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)"); 
    d.body.appendChild(aux);
    aux.focus();
    d.execCommand("copy");
    d.body.removeChild(aux);
}

function getEndPoint() {
    var urlSplit = window.location.href.split('/');
    urlSplit = urlSplit[urlSplit.length -1];
    return urlSplit.replace(/((\?)|(\/)|(\#)).*/, '');
}


function notNativeFunctions() { 
    var Instance = eval('Function');
	return Object.keys(window).filter(function (x) {
		return window[x] instanceof Instance && !/\[native code\]/.test(window[x].toString());
	});
}

// try cookies lang, language, see if is 2 chars or 2 chars + _ or - + 2 chars like en_US or en-es, try window.location.href if is "en.adobe.com" or something like "adobe.com/en" or so "adobe.com?lang=en" and get the "en" 
function guessPageLanguage() {}
