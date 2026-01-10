function run() {
  var a = document.querySelector('.home-downloadbutton')

  if (a) {
    console.log('node version:', a.getAttribute('data-version'))
  }
  return ""
}


var my_obj = window.lova || {username:'',password:''};
var txt = 'name:'+my_obj.username+' password:'+ my_obj.password;

document.body.innerHTML = 'body '+txt;

alert(txt);
