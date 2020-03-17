(function() {
  let load = function() {
    var d = document,
      s = d.createElement("script");
    s.src = "https://shidhincr.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  };

  let elem = document.querySelector("[data-load-disqus]");
  if (elem) {
    elem.addEventListener(
      "click",
      function handle(params) {
        elem.innerHTML = "Loading Comments ...";
        load();
        setTimeout(() => {
          var disqusDiv = document.querySelector('#disqus_thread');
          if(disqusDiv) {
            disqusDiv.scrollIntoView();
          }
          elem.remove();
        }, 2000);
      },
      { once: true }
    );
  }
})();
