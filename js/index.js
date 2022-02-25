$(document).ready(() => {
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

  // contact form buttons
  $("#form-clear").click(() => {
    $("#form-subject").val('');
    $("#form-body").val('');
  });

  $("#form-send").click(() => {
    let subject = encodeURIComponent($("#form-subject").val());
    let body = encodeURIComponent($("#form-body").val());
    document.location.href = `mailto:shaunmoini1@outlook.com?subject=${subject}&body=${body}`;

    // clear form after submission
    $("#form-subject").val('');
    $("#form-body").val('');
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