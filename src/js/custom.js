(function($) {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");
  var bird = document.querySelector(".button-bird");
  var birdtext = document.querySelector(".button-bird__text");

  //according to loftblog tut
  $(".main-menu li:first").addClass("active");

  var showSection = function showSection(section, isAnimate) {
    var direction = section.replace(/#/, ""),
      reqSection = $(".section").filter(
        '[data-section="' + direction + '"]'
      ),
      reqSectionPos = reqSection.offset().top - 0;

    if (isAnimate) {
      $("body, html").animate(
        {
          scrollTop: reqSectionPos
        },
        800
      );
    } else {
      $("body, html").scrollTop(reqSectionPos);
    }
  };

  var checkSection = function checkSection() {
    var wScroll = $(window).scrollTop();
    if (wScroll > position) {
      scrollDir = "down";
    } else {
      scrollDir = "up";
    }
    position = wScroll;

    $(".section").each(function() {
      var $this = $(this),
        topEdge = $this.offset().top - 80,
        bottomEdge = topEdge + $this.height();
      if (topEdge - 80 < wScroll && bottomEdge > wScroll) {
        var currentId = $this.data("section"),
          reqLink = $("a").filter("[href*=\\#" + currentId + "]");
          reqLink
          .closest("li")
          .addClass("active")
          .siblings()
          .removeClass("active");
      }

      var offset = (scrollDir == "down") ? 0.8 : 0.2;
      /* console.log(offset);
      console.log(topEdge + " " + wScroll + " " + bottomEdge); */
      if (topEdge - (window.innerHeight * offset) < wScroll && bottomEdge > wScroll) {
        var currentId = $this.data("section"),
          line = $("#" + currentId + "-line");
          line
          .addClass("active");
          text = $("#" + currentId + "-text");
          text
          .addClass("active");
      }
    });
  };

  $(".main-menu").on("click", "a", function(e) {
    if (!$(this).attr("href").match(/^http/)) {
      e.preventDefault();
      showSection($(this).attr("href"), true);
    };
  });

  var position = $(window).scrollTop();
  var scrollDir = "down";
  $(window).scroll(function() {
    checkSection();
  });

  window.onload = function() {
    checkSection();
    $("#carousel").flipster({
      style: 'carousel',
      spacing: -0.5,
      start: 0,
      nav: true,
      buttons: true,
    });
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    });
  };

  // Close menu after click on smaller screens
  $(window).on("resize", function() {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function() {
        menu.classList.remove("open");
      });
    }
  });

  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
  });

  $(".hover").mouseleave(function() {
    $(this).removeClass("hover");
  });

  bird.addEventListener('click', function() {
    bird.classList.toggle('active');

    if(bird.classList.contains('active')){
      birdtext.innerHTML = 'DONE';
    } else {
      birdtext.innerHTML = 'SEND';
    }
  });

  $('.form-group').each((i,e) => {
    $('.form-control', e)
    .focus( function () {
      e.classList.add('not-empty');
    })
    .blur( function () {
      this.value === '' ? e.classList.remove('not-empty') : null;
    });
  });

})(jQuery);
