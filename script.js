var counter = 10;


function openAbout() {
  var html;

  html = '<h1 style="text-align: center;"><strong>About PowerUI</strong></h1> ';
  html = html + '<p style="text-align: center;">Version 1.0 Web</p> ';
  html = html + '<p style="text-align: center;">The PowerUI experience, on the web.<br></p> ';
  html = html + '<p style="text-align: center">In attempts to innovate more, PowerUI is shifting completely from a PowerPoint OS into a Web based OS. Leading to better performance, more features, and an overall better experience.<br></p> ';
  html = html + '<p style="text-align: center; text-decoration: none; color: aaa;">Tranch Software 2022</p>';

  console.log(html);
  createWindow("About", "About.png", html);
}

function openSettings() {
  var html;
  html = "<h1 style='text-align: center;'><strong>Hello, " + getCookie("username") + "!</strong></h1>";
  html = html + "<ul id='nav' style='list-style-type: none;'> ";
  html = html + "<li> ";
  html = html + "<a>";
  html = html + "Account Settings";
  html = html + "</a> ";
  html = html + "</li> ";
  html = html + "<li> ";
  html = html + "<a>";
  html = html + "Personalization";
  html = html + "</a> ";
  html = html + "</li> ";
  html = html + "<li> ";
  html = html + "<a>";
  html = html + "Updates";
  html = html + "</a> ";
  html = html + "</li> ";
  html = html + "<li> ";
  html = html + "<a>";
  html = html + "About PowerUI";
  html = html + "</a> ";
  html = html + "</li> ";
  html = html + "</ul>";

  console.log(html);
  createWindow("Settings", "Settings.png", html);
}

function openBroadcast() {
  var html;

  html = '<h1>PowerUI Broadcast</h1> ';
  html = html + '<p>Insert a channel ID or start a stream to get started.</p> ';
  html = html + '<p>Channel ID</p> ';
  html = html + '<input style="border-radius: 3px; border: none;" type="text" placeholder="Channel ID">';

  createWindow("Broadcast", html);
}

function removeDialog(name) {
  var dialog = document.getElementById(name);

  dialog.style.animation = "fadeOut 200ms";
  setTimeout(function() {
    dialog.remove();
  }, 100);
}

function createDialog(name, title, content, option1, option2, text1 = "Cancel", text2 = "OK") {
  var dialog = document.createElement("div");
  var dialogContent = document.createElement("div");

  dialog.id = name;
  dialog.className = "dialog";
  dialogContent.className = "dialog-content";
  dialog.style.zIndex = ++counter;

  dialog.appendChild(dialogContent);

  var dialogTitle = document.createElement("p");
  var dialogSubtitle = document.createElement("p");

  dialogTitle.className = "dialog-title";
  dialogSubtitle.className = "dialog-subtitle";

  dialogTitle.innerHTML = title;
  dialogSubtitle.innerHTML = content;

  dialogContent.appendChild(dialogTitle);
  dialogContent.appendChild(dialogSubtitle);

  var dialogFooter = document.createElement("div");

  dialogFooter.className = "dialog-footer";

  dialogContent.appendChild(dialogFooter);

  var button1 = document.createElement("button");
  var button2 = document.createElement("button");

  button1.className = "dialog-button no";
  button2.className = "dialog-button yes";

  button1.innerHTML = text1;
  button2.innerHTML = text2;

  button1.setAttribute("onclick", option1);
  button2.setAttribute("onclick", option2);

  dialogFooter.appendChild(button1);
  dialogFooter.appendChild(button2);


  document.body.appendChild(dialog);

}

function createContextMenu(name, title, href) {
  var ctxMenu = document.createElement("menu");
  var ctxLink = document.createElement("a");
  ctxMenu.className = "ctxMenu:" + name;
  ctxMenu.id = "ctxMenu";
  if (title.trim() != "") {
    ctxMenu.setAttribute("title", title);
  }

  document.body.appendChild(ctxMenu);

}

function createSubMenu(ref, name, href) {
  var ctxMenu = document.getElementsByClassName("ctxMenu:" + ref);
  var subMenu = document.createElement("menu");

  subMenu.setAttribute("title", name);
  subMenu.setAttribute("href", href);
  subMenu.className = "ctxMenu:" + name;

  ctxMenu[0].appendChild(subMenu);

}

function assignContextMenu(elmnt, ref) {
  elmnt.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    var ctxMenu = document.getElementsByClassName("ctxMenu:" + ref);
    ctxMenu[0].style.display = "block";
    ctxMenu[0].style.animation = "contextMenu 500ms ease 0s 1 normal forwards";
    ctxMenu[0].style.width = "150px";
    ctxMenu[0].style.left = (event.pageX - 20) + "px";
    ctxMenu[0].style.top = (event.pageY - 20) + "px";
  }, false);
  elmnt.addEventListener("click", function(event) {
    var ctxMenu = document.getElementsByClassName("ctxMenu:" + ref);
    ctxMenu[0].style.display = "";
    ctxMenu[0].style.left = "";
    ctxMenu[0].style.top = "";
    ctxMenu[0].style.animation = "animation: contextMenu 500ms ease 0s 1 normal forwards";
  }, false);
  var ctxMenu = document.getElementsByClassName("ctxMenu:" + ref);
  ctxMenu[0].addEventListener("click", function(event) {
    var hovered = document.getElementsByClassName(event.target.className);
    if (hovered[0].getAttribute('href').trim() != "") {
      eval(hovered[0].getAttribute('href').replace('javascript:', ''));
    }
  }, false);
}

function focusApp(elmnt) {
  elmnt.style.zIndex = ++counter;
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

  localStorage.setItem(elmnt.id + "_isMaximized", "false");

}

function maximizeWindow(elmnt, maximizeElement) {
  localStorage.setItem(elmnt.id + "_lastX", elmnt.style.left);
  localStorage.setItem(elmnt.id + "_lastY", elmnt.style.top);
  localStorage.setItem(elmnt.id + "_lastHeight", elmnt.clientHeight + "px");
  localStorage.setItem(elmnt.id + "_lastWidth", elmnt.clientWidth + "px");
  localStorage.setItem(elmnt.id + "_isMaximized", "true");

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


function closeWindow(elmnt, id) {
  var openInstances = +localStorage.getItem(id + "_openInstances") || 0;
  console.log(openInstances);
  elmnt.style.animation = "zoomOut 100ms ease 0s 1 normal forwards";
  setTimeout(function() {
    elmnt.remove();
  }, 100);
  localStorage.setItem(elmnt.id + "_isMaximized", "false");
  localStorage.setItem(id + "_openInstances", String(openInstances - 1));
  removeTaskbarItem(elmnt.id);
  if (localStorage.getItem("startOpened") == "true") {
    var thing = startMenu();
  }
}

function createWindow(id, icon, content) {
  var openInstances = +localStorage.getItem(id + "_openInstances") || 0;
  var windowContainer = document.createElement("div");
  var windowHeader = document.createElement("div");
  var windowControls = document.createElement("div");


  windowContainer.id = id + "_" + (openInstances + 1);
  windowContainer.className = "container";

  windowHeader.id = (id + "_" + (openInstances + 1)) + "Header";
  windowHeader.className = "row";

  windowControls.className = "column left";

  var closeButton = document.createElement("span");
  var minimizeButton = document.createElement("span");
  var maximizeButton = document.createElement("span");

  closeButton.className = "dot";
  closeButton.style.background = "#ED594A";
  closeButton.addEventListener("click", function() { closeWindow(windowContainer, id) });

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
  addTaskbarItem(id + "_" + (openInstances + 1), icon, "javascript: console.log('" + id + "');");
  localStorage.setItem(id + "_isMaximized", "false");
  localStorage.setItem(id + "_openInstances", openInstances + 1)
  dragElement(windowContainer, maximizeButton);

  if (localStorage.getItem("startOpened") == "true") {
    var thing = startMenu();
  }

}

function dragElement(elmnt, maxButton) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    elmnt.style.zIndex = ++counter;
    if (localStorage.getItem("startOpened") == "true") {
      var thing = startMenu();
    }
  }

  function elementDrag(e) {
    if (localStorage.getItem(elmnt.id + "_isMaximized") != "true") {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement(e) {
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

function addTaskbarItem(name, icon, href) {
  var taskbar = document.getElementById("taskbar");
  var taskbarItem = document.createElement("a");
  var taskbarIcon = document.createElement("img");
  taskbarIcon.src = icon;
  taskbarIcon.style.width = "17px";
  taskbarItem.href = href;
  taskbarItem.id = name;
  taskbarItem.appendChild(taskbarIcon);
  taskbar.appendChild(taskbarItem);
}

function removeTaskbarItem(name) {
  var taskbarItem = document.getElementById(name);
  taskbarItem.style.animation = "slideDown 1s ease 0s 1 normal forwards";
  setTimeout(function() {
    taskbarItem.remove();
  }, 1000)
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function getTime() {
  var time = document.getElementById("time");
  var timeLockScreen = document.getElementById("timeLockScreen");
  time.innerHTML = formatAMPM(new Date);
  timeLockScreen.innerHTML = formatAMPM(new Date);
}

getTime();
setInterval(getTime, 1000);

async function authenticateUser(username, password) {
  var result = await makeRequest(
    "GET",
    "https://CloudWebV2.skywarspro15.repl.co/login.php?username=" +
    username +
    "&password=" +
    password
  );

  return result;
}

function makeRequest(method, url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}


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

function lockScreen() {
  var lockScreen = document.getElementById("lockScreen");
  var loginPage = document.getElementById("loginPage");
  var username = document.getElementById("username");

  lockScreen.addEventListener("click", function() {
    loginPage.style.display = "block";
    username.innerHTML = getCookie("username");
  });
}

function continueLogin() {
  var username = prompt("Insert your PowerUI account username to continue");
  if (username.trim() != "") {
    setCookie("hasUser", "true");
    setCookie("username", username);
    removeDialog("NoUser");
    lockScreen();
  } else {
    continueLogin();
  }
}

async function logIn() {
  var username = getCookie("username");
  var password = document.getElementById("passwordInput").value;
  var lockScreen = document.getElementById("lockScreen");
  var loginPage = document.getElementById("loginPage");
  var loginButton = document.getElementById("loginButton");

  loginButton.innerHTML = "Logging in...";

  var result = await authenticateUser(username, password);

  if (result == "Not a valid user") {
    setCookie("hasUser", "false");
    loginButton.innerHTML = "Log in";
    window.location.reload();
  } else if (result == "Password's valid!") {
    sessionStorage.setItem("loggedIn", "true");
    lockScreen.style.animation = "fadeOut 200ms";
    loginPage.style.animation = "fadeOut 200ms";
    setTimeout(function() {
      lockScreen.remove();
      loginPage.remove();
    }, 200);
    loginButton.innerHTML = "Log in";
  } else if (result == "Password's not valid") {
    createDialog("WrongPass", "Wrong password.", "Please try again.", "removeDialog('WrongPass');", "removeDialog('WrongPass');");
    document.getElementById("passwordInput").value = "";
    loginButton.innerHTML = "Log in";
  }

}

localStorage.setItem("isMaximized", "false");
localStorage.setItem("startOpened", "false");

addTileItem("About", "javascript: openAbout();");
addListItem("About", "javascript: openAbout();");
addTileItem("Settings", "javascript: openSettings();");
addListItem("Settings", "javascript: openSettings();");

if (sessionStorage.getItem("loggedIn") != "true") {
  if (getCookie("hasUser") == "true") {
    lockScreen();
  } else {
    createDialog("NoUser", "Access PowerUI by signing up for an account", "Get started using PowerUI by signing up for PowerUI Cloud. It's easy! Already an existing user? Click on 'Log in' to continue to the login page.", "continueLogin();", "window.open('https://CloudWebV2.skywarspro15.repl.co', '', 'width=400, height=500');", "Log in", "Sign up");

  }
} else {
  var lockScreen = document.getElementById("lockScreen");
  var loginPage = document.getElementById("loginPage");
  lockScreen.remove();
  loginPage.remove();
}

const full = location.protocol + '//' + location.host;

if (full == "https://powerui-webos-dev.skywarspro15.repl.co") {
  createDialog("BuildWarn", "This is a dev build!", "This build is used to test a certain feature before getting released to a stable build. Things might not work as expected!", "removeDialog('BuildWarn');", "window.open('https://powerui-webos.netlify.app/')", "Proceed anyway", "Go to stable build");
}