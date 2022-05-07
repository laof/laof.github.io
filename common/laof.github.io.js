const t = "?t=" + new Date().getTime();
const all = [
  fetch("page.json" + t).then((res) => res.json()),
  fetch("data.json" + t).then((res) => res.json()),
  fetch("blob/blob.json" + t).then((res) => res.json()),
];

function addTitle(name, time = "", link) {
  let target = "";
  let href = "";
  if (link) {
    target = `target="_blank"`;
    href = `href="${link}"`;
  }

  if (time) {
    time = `<span style="font-size:12px">${time}</span>`;
  }

  const aaa = `<br><br><li>[<a ${href} ${target}>${name}</a>] ${time}</li><br>`;

  return aaa;
}

Promise.all(all).then(([page, data, blob]) => {
  const html = [];
  let arr = [];

  // config
  const ori = location.origin;
  arr = files("", data.files);
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
    addTitle("my repositories", "", "https://github.com/laof?tab=repositories")
  );
  arr = liArr(page);
  html.push(...arr);

  const ul = document.createElement("ui");
  ul.innerHTML = html.join("");
  document.body.appendChild = ul;
});

function liArr(list, domain = "") {
  return list.map((obj) => {
    return `<li><a href="${domain}${obj.link}" target="_blank">${
      obj.name
    }</a><span style="color: #d8d8d8;font-size: 12px;"> ${obj.size || ""} ${
      obj.link
    }</span></li>`;
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
