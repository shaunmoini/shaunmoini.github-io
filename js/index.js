$(document).ready(() => {
  // theme toggle
  let themeToggle = $("#theme-toggle");
  let themeLink = $("#theme");
  themeToggle.click(() => {
    if (themeLink.attr("href") == "css/theme-light.min.css") {
      themeLink.attr("href", "css/theme-dark.min.css");
      themeToggle.html("<i class='las la-sun'></i>");
    }
    else {
      themeLink.attr("href", "css/theme-light.min.css");
      themeToggle.html("<i class='las la-moon'></i>");
    }
  });

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(() => {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Check for click events on navbar-items
  $(".navbar-end .navbar-item").click(() => {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // contact form submit button
  $("#form-send").click(() => {
    let subject = encodeURIComponent($("#form-subject").val());
    let body = encodeURIComponent($("#form-body").val());
    document.location.href = `mailto:shaunmoini1@outlook.com?subject=${subject}&body=${body}`;

    // clear form after submission
    $("#form-subject").val('');
    $("#form-body").val('');
  });

  // side link management based on viewport size and scroll location
  let breakpoint = 1023;
  let sideLinks = $("#outgoing-links-side");
  let footerLinks = $("#outgoing-links-footer");

  // on page load
  if (window.innerWidth > breakpoint) {
    if ($(window).scrollTop() > 250) sideLinks.fadeIn();
    else sideLinks.hide();
  }
  else {
    sideLinks.hide();
    footerLinks.show();
  }
  // on resize
  $(window).resize(() => {
    if (window.innerWidth > breakpoint) {
      if ($(this).scrollTop() > 250) sideLinks.show();
      footerLinks.hide()
    }
    else {
      sideLinks.hide();
      footerLinks.show();
    }
  });
  // on scroll
  $(window).scroll(() => {
    if (window.innerWidth > breakpoint) {
      if ($(this).scrollTop() > 250) sideLinks.fadeIn();
      else sideLinks.fadeOut();
    }
  });

  // populating project section using github api
  $.get("https://api.github.com/users/shaunmoini/repos", (res) => {
    let projectSection = $("#project div");

    // only 2 elements per row
    for (let i = 0; i < res.length; i += 2) {
      let row = $("<div class='columns'></div>");
      let repos = [res[i], res[i + 1]];

      for (let r of repos) {
        if (r) {
          let col = $("<div class='column'></div>");

          let body = $("<div></div>").append(
            $(`<p id="box-title">${r.name}</p>`),
            $(`<p id="box-subtitle">${r.description}</p>`)
          );

          let footer = $("<div id='box-footer'></div>");
          for (let t of r.topics) footer.append($(`<span>${t}</span>`));

          let box = $(`<a href=${r.html_url} target="_blank"></a>`).append(
            $("<div class='box'></div>").append(body, footer)
          );

          row.append(col.append(box));
        }
      }
      projectSection.append(row);
    }
  });
});


// var i = 0;
// var txt = 'CS Student at Carleton University.'
// var str = ''

// function typeWriter() {
//   if (i < txt.length) {
//     str += txt.charAt(i)
//     $('#sub-title').html(str)
//     i++;
//     setTimeout(typeWriter, 100);
//   }
// }

// window.onload = function () {
//   setTimeout(() => {
//     this.typeWriter()
//   }, 1000);
// }