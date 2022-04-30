var keys = 'ABK3456LMNOPQRSCDEFGHIJTUVWXYZ1278';
var api = 'https://cdnjs.cloudflare.com/ajax/libs/clone/1.0.4/clone.min.js';
var guest = 'A3KA35A3BA3CAK8A3RA3SABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3L';
var apar = 'AKZA3QA3CAK1AKZABQAKZA3OABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3L';
var home = 'A3EA3EA3EABQA3LAKZA3MA3CA36A33A3AAK8ABQAK2A3NA3LABQA3RA3B';

function run(a, b) {
  if (!a || !b) {
    return console.log('[parameter]: miss');
  }

  if (location.protocol.indexOf('http') == -1) {
    return __ajax().get(api).then(function (response, XMLHttpRequest) {
      console.log('network online.');
    }).catch(function(){
      console.log('access faile: offLine or not found ?');
    });
  }

  var host = location.host;
  if (host == zCode(guest)) {
    console.log('wait...');
    var err = document.querySelector('.nwaError');
    if (err && err.innerText) {
      return console.log(err.innerText);
    }
    return autosubmit(a, b);
  } else if (host == zCode(apar)) {
    console.log('login successful.');
  } else if (host == zCode(home)) {
    console.log('welcome!');
  } else {
    return console.log('domain error');
  }
}

function autosubmit(a, b) {
  var code = '';
  code = zCode('A3CA3RAK8A3Q');
  var ue = document.querySelector('input[name=' + code + ']');
  code = zCode('A3OAKZA3RA3RA3EA3NA3QAK7');
  var pe = document.querySelector('input[name=' + code + ']');
  var ae = document.querySelector('input[name=visitor_accept_terms]');
  var se = document.querySelector('input[type=submit]');

  if (!ue || !pe || !ae || !se) {
    return console.log('[form]: check faild');
  } else {
    console.log('[form]: passed');
  }

  ue.value = a;
  pe.value = b;
  ae.checked = true;
  se.disabled = false;
  console.log('loggin in...');
  se.click();
}

/** === add === */
function jCode(value) {
  var kleng = keys.length;
  var kstr = keys.split('');
  var v = '',
    cat,
    cat1,
    cat2,
    cat3;
  for (var i = 0; i < value.length; i++) {
    cat = value.charCodeAt(i);
    cat1 = cat % kleng;
    cat = (cat - cat1) / kleng;
    cat2 = cat % kleng;
    cat = (cat - cat2) / kleng;
    cat3 = cat % kleng;
    v += kstr[cat3] + kstr[cat2] + kstr[cat1];
  }
  return v;
}

/** === unzip === */
function zCode(value) {
  var kleng = keys.length;
  var alen,
    cat1,
    cat2,
    cat3,
    num = 0,
    arr;
  arr = new Array(Math.floor(value.length / 3));
  alen = arr.length;
  for (var i = 0; i < alen; i++) {
    cat1 = keys.indexOf(value.charAt(num));
    num++;
    cat2 = keys.indexOf(value.charAt(num));
    num++;
    cat3 = keys.indexOf(value.charAt(num));
    num++;
    arr[i] = cat1 * kleng * kleng + cat2 * kleng + cat3;
  }
  alen = eval('String.fromCharCode(' + arr.join(',') + ')');
  return alen;
}
/** === __ajax === */

!function(e,t){"use strict";e.__ajax=t()}(this,function(){"use strict";function e(e){var r=["get","post","put","delete"];return e=e||{},e.baseUrl=e.baseUrl||"",e.method&&e.url?n(e.method,e.baseUrl+e.url,t(e.data),e):r.reduce(function(r,o){return r[o]=function(r,u){return n(o,e.baseUrl+r,t(u),e)},r},{})}function t(e){return e||null}function n(e,t,n,u){var c=["then","catch","always"],i=c.reduce(function(e,t){return e[t]=function(n){return e[t]=n,e},e},{}),f=new XMLHttpRequest,p=r(t,n,e);return f.open(e,p,!0),f.withCredentials=u.hasOwnProperty("withCredentials"),o(f,u.headers,n),f.addEventListener("readystatechange",a(i,f),!1),f.send(s(n)?JSON.stringify(n):n),i.abort=function(){return f.abort()},i}function r(e,t,n){if("get"!==n.toLowerCase()||!t)return e;var r=i(t),o=e.indexOf("?")>-1?"&":"?";return e+o+r}function o(e,t,n){t=t||{},u(t)||(t["Content-Type"]=s(n)?"application/json":"application/x-www-form-urlencoded"),Object.keys(t).forEach(function(n){t[n]&&e.setRequestHeader(n,t[n])})}function u(e){return Object.keys(e).some(function(e){return"content-type"===e.toLowerCase()})}function a(e,t){return function n(){t.readyState===t.DONE&&(t.removeEventListener("readystatechange",n,!1),e.always.apply(e,c(t)),t.status>=200&&t.status<300?e.then.apply(e,c(t)):e["catch"].apply(e,c(t)))}}function c(e){var t;try{t=JSON.parse(e.responseText)}catch(n){t=e.responseText}return[t,e]}function i(e){return s(e)?f(e):e}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function f(e,t){return Object.keys(e).map(function(n){if(e.hasOwnProperty(n)&&void 0!==e[n]){var r=e[n];return n=t?t+"["+n+"]":n,null!==r&&"object"==typeof r?f(r,n):p(n)+"="+p(r)}}).filter(Boolean).join("&")}function p(e){return encodeURIComponent(e)}return e});

/** === end === */
