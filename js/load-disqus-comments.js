(function () {
  let load = function () {
    var d = document,
      s = d.createElement("script");
    s.src = "https://shidhincr.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  };

  let observer;
  let elem = document.querySelector("[data-load-disqus]");
  let handle = () => {
    elem.innerHTML = "Loading Comments ...";
    load();
    setTimeout(() => {
      if (observer) {
        observer.unobserve(elem);
      }
      elem.removeEventListener("click", handle);
      elem.remove();
    }, 2000);
  };

  if (elem) {
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handle();
          }
        });
      });
      observer.observe(elem);
    }
    elem.addEventListener("click", handle, { once: true });
  }
})();
