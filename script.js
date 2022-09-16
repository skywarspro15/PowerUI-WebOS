var counter = 10;


function openAbout() {
  var html;

  html = '<h1 style="text-align: center;"><strong>About PowerUI</strong></h1> ';
  html = html + '<p style="text-align: center;">Version 1.0 Web</p> ';
  html = html + '<p style="text-align: center;">The PowerUI experience, on the web.<br></p> ';
  html = html + '<p style="text-align: center">In attempts to innovate more, PowerUI is shifting completely from a PowerPoint OS into a Web based OS. Leading to better performance, more features, and an overall better experience.<br></p> ';
  html = html + '<p style="text-align: center; text-decoration: none; color: aaa;">Tranch Software 2022</p>';

  console.log(html);
  createWindow("about", html);

}



function restoreWindow(elmnt, maximizeElement) {
  var lastX = localStorage.getItem(elmnt.id + "_lastX");
  var lastY = localStorage.getItem(elmnt.id + "_lastY");

  var lastHeight = localStorage.getItem(elmnt.id + "_lastHeight");
  var lastWidth = localStorage.getItem(elmnt.id + "_lastWidth");

  elmnt.style.transition = "all 100ms ease";

  if (elmnt.hasChildNodes()) {
    elmnt.childNodes.forEach((e, i) => {
      if (e.className == "content") {
        e.style.height = "auto";
        e.style.transition = "all 100ms ease";
      }
    });
  }

  elmnt.style.left = lastX;
  elmnt.style.top = lastY;
  elmnt.style.width = lastWidth;
  elmnt.style.height = lastHeight;

  maximizeElement.addEventListener("click", (e) => { maximizeWindow(elmnt, maximizeElement) }, { once: true });

  setTimeout(function() {
    if (elmnt.hasChildNodes()) {
      elmnt.childNodes.forEach((e, i) => {
        if (e.className == "content") {
          e.style.transition = "none";
        }
      });
    }
    elmnt.style.transition = "none";
  }, 100);

  localStorage.setItem("isMaximized", "false");

}

function maximizeWindow(elmnt, maximizeElement) {
  localStorage.setItem(elmnt.id + "_lastX", elmnt.style.left);
  localStorage.setItem(elmnt.id + "_lastY", elmnt.style.top);
  localStorage.setItem(elmnt.id + "_lastHeight", elmnt.clientHeight + "px");
  localStorage.setItem(elmnt.id + "_lastWidth", elmnt.clientWidth + "px");
  localStorage.setItem("isMaximized", "true");
  localStorage.setItem("currentlyMaximized", elmnt.id);

  elmnt.style.transition = "all 100ms ease";

  if (elmnt.hasChildNodes()) {
    elmnt.childNodes.forEach((e, i) => {
      if (e.className == "content") {
        e.style.height = "93%";
        e.style.transition = "all 100ms ease";
      }
    });
  }
  elmnt.style.top = "0px";
  elmnt.style.left = "0px";
  elmnt.style.width = "100%";
  elmnt.style.height = "92%";
  maximizeElement.addEventListener("click", (e) => { restoreWindow(elmnt, maximizeElement) }, { once: true });

  setTimeout(function() {
    if (elmnt.hasChildNodes()) {
      elmnt.childNodes.forEach((e, i) => {
        if (e.className == "content") {
          e.style.transition = "none";
        }
      });
    }
    elmnt.style.transition = "none";
  }, 100);

}


function closeWindow(elmnt) {
  elmnt.style.animation = "zoomOut 100ms ease 0s 1 normal forwards";
  setTimeout(function() {
    elmnt.remove();
  }, 100);
  localStorage.setItem("isMaximized", "false");
  if (localStorage.getItem("startOpened") == "true") {
    var thing = startMenu();
  }
}

function createWindow(id, content) {
  var windowContainer = document.createElement("div");
  var windowHeader = document.createElement("div");
  var windowControls = document.createElement("div");


  windowContainer.id = id;
  windowContainer.className = "container";

  windowHeader.id = id + "Header";
  windowHeader.className = "row";

  windowControls.className = "column left";

  var closeButton = document.createElement("span");
  var minimizeButton = document.createElement("span");
  var maximizeButton = document.createElement("span");

  closeButton.className = "dot";
  closeButton.style.background = "#ED594A";
  closeButton.addEventListener("click", function() { closeWindow(windowContainer) });

  minimizeButton.className = "dot";
  minimizeButton.style.background = "#FDD800";

  maximizeButton.className = "dot";
  maximizeButton.style.background = "#5AC05A";
  maximizeButton.addEventListener("click", (e) => { maximizeWindow(windowContainer, maximizeButton) }, { once: true });
  var windowContent = document.createElement("div");

  windowContent.className = "content";
  windowContent.innerHTML = content;

  windowHeader.appendChild(windowControls);
  windowControls.appendChild(closeButton);
  windowControls.appendChild(minimizeButton);
  windowControls.appendChild(maximizeButton);

  windowContainer.appendChild(windowHeader);
  windowContainer.appendChild(windowContent);

  windowContainer.style.animation = "zoomIn 100ms ease 0s 1 normal forwards";

  document.body.appendChild(windowContainer);
  dragElement(windowContainer, maximizeButton);

  if (localStorage.getItem("startOpened") == "true") {
    var thing = startMenu();
  }

}

function dragElement(elmnt, maxButton) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    //e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    elmnt.style.zIndex = ++counter;
    if (localStorage.getItem("startOpened") == "true") {
      var thing = startMenu();
    }
  }

  function elementDrag(e) {
    if (localStorage.getItem("isMaximized") != "true") {
      e = e || window.event;
      //e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    if (e.clientY < 1) {
      const removeAll = maxButton.cloneNode(true);
      maxButton.parentNode.replaceChild(removeAll, maxButton);
      maxButton = removeAll;
      maximizeWindow(elmnt, removeAll);
    }
  }
}

addTaskbarItem("About.png", "javascript: openAbout();");
addTileItem("About", "javascript: openAbout();");
addListItem("About", "javascript: openAbout();");

function addTileItem(name, href) {
  var tileList = document.getElementById("tileList");
  var curTile = document.createElement("li");
  var curLink = document.createElement("a");

  curLink.innerHTML = name;
  curLink.href = href;
  curLink.className = "tileListItem";
  curTile.appendChild(curLink);
  tileList.appendChild(curTile);
}


function addListItem(name, href) {
  var appList = document.getElementById("appList");
  var curItem = document.createElement("li");
  var curLink = document.createElement("a");

  curLink.innerHTML = name;
  curLink.href = href;
  curLink.className = "appListItem";
  curItem.appendChild(curLink);
  appList.appendChild(curItem);

}

function startMenu() {
  var startMenu = document.getElementById("startMenu");
  if (localStorage.getItem("startOpened") != "true") {
    localStorage.setItem("startOpened", "true");
    startMenu.style.animation = "slideUp 0.3s ease 0s 1 normal forwards";
    if (startMenu.hasChildNodes()) {
      startMenu.childNodes.forEach((e, i) => {
        e.style.animation = "slideUp 0.2s ease 0s 1 normal forwards";
      });
    }
    startMenu.style.transform = "translateY(0)";
  } else {
    localStorage.setItem("startOpened", "false");
    startMenu.style.animation = "slideDown 0.2s ease 0s 1 normal forwards";
    if (startMenu.hasChildNodes()) {
      startMenu.childNodes.forEach((e, i) => {
        e.style.animation = "slideDown 0.2s ease 0s 1 normal forwards";
      });
    }
    //startMenu.style.transform = "translateY(250vh)";
  }
  return "";
}

function addTaskbarItem(icon, href) {
  var taskbar = document.getElementById("taskbar");
  var taskbarItem = document.createElement("a");
  var taskbarIcon = document.createElement("img");
  taskbarIcon.src = icon;
  taskbarIcon.style.width = "17px";
  taskbarItem.href = href;
  taskbarItem.appendChild(taskbarIcon);
  taskbar.appendChild(taskbarItem);
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function getTime() {
  var time = document.getElementById("time");
  time.innerHTML = formatAMPM(new Date);
}

getTime();
setInterval(getTime, 1000);

function setCookie(cname, cvalue) {
  const today = new Date();
  const d = new Date();
  d.setTime(today.getTime() + 3600000 * 24 * 15);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=Lax";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

localStorage.setItem("isMaximized", "false");
localStorage.setItem("startOpened", "false");