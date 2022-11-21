$(document).ready(() => {
  // event listeners

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
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").slideToggle(300);
  });

  // contact form submit button
  $("#form-send").click(() => {
    let subject = encodeURIComponent($("#form-subject").val());
    let body = encodeURIComponent($("#form-body").val());
    document.location.href = `mailto:shaunmoini@tutanota.com?subject=${subject}&body=${body}`;

    // clear form after submission
    $("#form-subject").val('');
    $("#form-body").val('');
  });

  // animations and project section

  // fade in animations
  if ($(window).scrollTop() < 200) {
    $("#home-title p:nth-child(1)").delay(500).fadeTo(300, 1);
    $("#home-title p:nth-child(2)").delay(1100).fadeTo(300, 1);
    $("#home-title p:nth-child(3)").delay(1700).fadeTo(300, 1);
    $("#outgoing-links-home").delay(2300).fadeTo(300, 1);
    $(".navbar").delay(2300).fadeTo(300, 1);
  }
  else {
    $("#home-title p:nth-child(1)").fadeTo(0, 1);
    $("#home-title p:nth-child(2)").fadeTo(0, 1);
    $("#home-title p:nth-child(3)").fadeTo(0, 1);
    $("#outgoing-links-home").fadeTo(0, 1);
    $(".navbar").fadeTo(0, 1);
  }

  // on page load, if sections are visible then show
  if ($("#about").visible(true)) $("#about .container").delay(500).fadeTo(300, 1);
  if ($("#project").visible(true)) $("#project .container").delay(500).fadeTo(300, 1);
  if ($("#contact").visible(true)) $("#contact .container").delay(500).fadeTo(300, 1);

  // on scroll, if sections are visible then show
  $(window).on("resize scroll", () => {
    if ($("#about").visible(true)) $("#about .container").delay(500).fadeTo(300, 1);
    if ($("#project").visible(true)) $("#project .container").delay(500).fadeTo(300, 1);
    if ($("#contact").visible(true)) $("#contact .container").delay(500).fadeTo(300, 1);
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
            $(`<p id="box-subtitle">${r.description}</p>`),
            $('<i id="box-icon" class="las la-external-link-square-alt"></i>')
          );

          let footer = $("<div id='box-footer'></div>");
          for (let t of r.topics) footer.append($(`<span>${t}</span>`));

          let box = $(`<a href=${r.html_url} target="_blank"></a>`).append(
            $("<div class='box shrink'></div>").append(body, footer)
          );

          row.append(col.append(box));
        }
      }
      projectSection.append(row);
    }
  });
});