document.addEventListener("DOMContentLoaded", () => {
  const userInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  const footer = document.getElementById("footer-info");
  const storedInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (storedInfo) {
    const infoParagraph = document.createElement("p");
    infoParagraph.className = "footer__text";
    infoParagraph.innerHTML = `
      Platform: ${storedInfo.platform} | 
      Browser: ${storedInfo.userAgent} | 
      Language: ${storedInfo.language}
    `;
    footer.appendChild(infoParagraph);
  }

  fetch("https://jsonplaceholder.typicode.com/posts/5/comments")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("comments-list");
      data.forEach((comment) => {
        const li = document.createElement("li");
        li.className = "list__item";
        li.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
        list.appendChild(li);
      });
    });

  setTimeout(() => {
    const modal = document.getElementById("feedback-modal");
    if (modal) {
      modal.style.display = "block";
    }
  }, 60000);

  document.getElementById("close-modal").onclick = function () {
    document.getElementById("feedback-modal").style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === document.getElementById("feedback-modal")) {
      document.getElementById("feedback-modal").style.display = "none";
    }
  };

  const now = new Date();
  const hours = now.getHours();
  const autoDark = hours < 7 || hours >= 21;

  const themeSwitch = document.getElementById("theme-switch");
  document.body.classList.toggle("dark-mode", autoDark);
  themeSwitch.checked = autoDark;

  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", themeSwitch.checked);
  });
});
