'use strict';

(function () {
  /* Menu */
  var toggler = document.getElementById('toggler');
  var header = document.getElementById('header');
  var menu = document.getElementById('menu');

  toggler.onclick = function (e) {
    e.preventDefault();
    toggler.classList.toggle('menu-toggler--close');
    menu.classList.toggle('main-nav--vertical');
  };

  /* JSON */
  $(document).ready(function () {
    var jsonProjects;

    $.getJSON('json/projects.json', function (data) {
      jsonProjects = data;
      populateProjects(jsonProjects);
    });
  });

  function populateProjects(projects) {
    if (projects.length == 0) {
      $("#projects").hide();
      return;
    }

    var template = $(".js-project");

    for (var i = 0; i < projects.length; i++) {
      if (i > 0) {
        template = $(template).clone();
        template.appendTo("#projects");
      }

      var projectName = projects[i].name;
      var projectDescr = projects[i].description;
      var projectLogo = projects[i].logo;
      var projectUrl = projects[i].url;

      $(template).attr("data-project", i);
      $(template).find(".js-name").text(projectName);
      $(template).find(".js-descr").text(projectDescr);
      $(template).find(".js-logo").attr("src", projectLogo);
      $(template).find(".js-url").attr("href", projectUrl);
      $(template).find(".js-hide").attr("data-hide", i);
    }

    /* Hide */
    $(".js-hide").on("click", function () {
      event.preventDefault();

      var index = $(this).attr("data-hide");
      console.log(index);
      $(".js-project[data-project='" + index + "']").hide();
    });

  };

})();