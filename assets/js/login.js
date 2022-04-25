console.log('version: 1.0.1');
var aid = 'this_ifrema_only_one_001';
var submitOnce = false;

function homology() {
  var ele = document.querySelector('#' + aid);
  if (ele && ele.baseURI.length > 0) {
    return ele;
  }
  return null;
}

function run(a, b) {
  if (self != top) {
    return;
  }

  if (location.protocol.indexOf('http') == -1) {
    var normal = 'The network is normal, no need to log in.';
    var s = navigator.onLine ? normal : 'offLine ?';
    return console.log('[status]: ' + s);
  } else {
    console.log('[protocol]: connected to ' + location.href);
  }

  if (!a || !b) {
    return console.log('[parameter]: miss');
  }

  if (!checkElement(document).length) {
    return console.log('[form]: check faild');
  } else {
    console.log('[form]: passed');
  }

  createEngine(a, b);
}

function createEngine(a, b) {
  var newiframe = document.createElement('iframe');
  newiframe.id = aid;
  newiframe.src = location.href;
  console.log('[engine]: create...');

  newiframe.onerror = function () {
    console.log('[engine]: load error');
  };
  newiframe.onload = function () {
    if (submitOnce) {
      return;
    }
    submitOnce = true;

    var ele = checkElement(newiframe.contentWindow.document);

    console.log('[engine]: ready');
    if (ele.length == 0) {
      return console.log('[engine]: fields not found');
    } else {
      console.log('[engine]: fields ready');
    }

    console.log('[engine]: login....');
    ele[0].value = a;
    ele[1].value = b;
    ele[2].checked = true;
    ele[3].disabled = false;
    ele[3].click();

    setTimeout(function () {
      pending();
    }, 400);
  };

  document.querySelector('body').append(newiframe);
}

function checkElement(doc) {
  var ue = doc.querySelector('input[name=user]');
  var str = ['p', 'a', '_', '_'].concat('w', '1', '2', 'd');
  str = str.join('').replaceAll('_', 's');
  str = str.replace('12', 'or');
  var pe = doc.querySelector('input[name=' + str + ']');
  var ae = doc.querySelector('input[name=visitor_accept_terms]');
  var se = doc.querySelector('input[type=submit]');

  if (!ue || !pe || !ae || !se) {
    return [];
  }
  return [ue, pe, ae, se];
}

function pending() {
  var h = homology();
  if (h) {
    var err = h.contentWindow.document.querySelector('.nwaError');

    if (err && err.innerText) {
      return console.log(err.innerText);
    }

    const doc = checkElement(document);

    if (doc.length) {
      return setTimeout(function () {
        pending();
      }, 400);
    }

    console.log('login success.');
  }
}

var successtotal = 0;

window.addEventListener('error', function (event) {
  const m = event.message;
  console.log(event);
  if (m.indexOf('cross-origin') != -1 && m.indexOf('frame')) {
    if (successtotal) {
      return;
    }
    successtotal++;

    console.log('login success!!!!!');
  }
});


/** === end === */
