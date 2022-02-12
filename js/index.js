$(document).ready(() => {
  // Event listeners
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

  // populating project section using github api
  $.get("https://api.github.com/users/shaunmoini/repos", (res) => {
    let projectSection = $("#project div");

    // only three elements per row
    for (let i = 0; i < res.length; i += 3) {
      let row = $("<div class='columns'></div>");
      let repos = [res[i], res[i + 1], res[i + 2]];

      for (let r of repos) {
        if (r) {
          let col = $("<div class='column'></div>");
          let content = $(`<a href=${r.html_url} target='_blank'></a>`).append(
            $("<div class='box'></div>").append(
              $(`<p>${r.name}</p>`), $(`<p>${r.description}</p>`)
            )
          );

          row.append(col.append(content));
        }
      }
      projectSection.append(row);
    }
  });
});