const domain = "https://laof.github.io/";
const t = "?t=" + new Date().getTime();

let maxName = 0;
let maxSize = 0;
const all = [
  fetch(domain + "page.json" + t).then((res) => res.json()),
  fetch(domain + "data.json" + t).then((res) => res.json()),
  fetch(domain + "blob/blob.json" + t).then((res) => res.json()),
];

function maxLength(list, attr) {
  const max = [].concat(...list).sort((a, b) => {
    if (a[attr] && b[attr]) {
      return b[attr].length - a[attr].length;
    }

    return -1;
  });
  return (max.shift().name.length + 5) * 7;
}

function addTitle(name, time = "", link) {
  let target = "";
  let href = "";
  if (link) {
    target = `target="_blank"`;
    href = `href="${link}"`;
  }

  if (time) {
    time = `<span class="time">${time}</span>`;
  }

  const aaa = `<br><br><li><a class="header" ${href} ${target}>${name}</a> ${time}</li><br>`;

  return aaa;
}

Promise.all(all).then(([page, data, blob]) => {
  let arr = files("", data.files);
  maxName = maxLength([...page, ...arr, ...blob.files], "name");
  maxSize = maxLength([...page, ...arr, ...blob.files], "size");
  const html = [];
  // config
  const ori = location.origin;
  html.push(
    addTitle(
      "laof.github.io",
      data.time,
      "https://github.com/laof/laof.github.io"
    )
  );
  arr = liArr(arr, location.origin);
  html.push(...arr);

  // blob
  arr = files("", blob.files);
  html.push(addTitle("blob", blob.time, "https://github.com/laof/blob"));
  arr = liArr(arr, "https://laof.github.io/blob/files");
  html.push(...arr);

  // page
  html.push(
    addTitle("repositories", "", "https://github.com/laof?tab=repositories")
  );
  arr = liArr(page);
  html.push(...arr);
  html.push("<br><br>");

  const ul = document.createElement("ui");
  ul.innerHTML = html.join("");
  document.body.appendChild(ul);
});

function liArr(list, domain = "") {
  return list.map((obj) => {
    let dir = String(obj.link).replace(
      new RegExp(`^\/|${obj.name}$`, "gi"),
      ""
    );

    return `<li><a class="name" style="width:${maxName}px;" href="${domain}${
      obj.link
    }" target="_blank">${
      obj.name
    }</a><span class="size" style="width:${maxSize}px;"> ${
      obj.size || ""
    }</span><span class="dir">${dir}</span></li>`;
  });
}

function files(path, data = [], arr = []) {
  for (let index = 0; index < data.length; index++) {
    const obj = data[index];
    const oc = obj.children;
    if (!Array.isArray(oc)) {
      obj.link = `${path}/${obj.name}`;
      arr.push(obj);
    } else if (oc.length) {
      files(`${path}/${obj.name}`, oc, arr);
    }
  }
  return arr;
}
