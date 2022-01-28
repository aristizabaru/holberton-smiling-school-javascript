$(document).ready(function () {
  function fetchData(query = null) {
    let url = "https://smileschool-api.hbtn.info/xml/courses";
    if (query) url += `?${query}`;
    return $.ajax({
      type: "GET",
      url,
      dataType: "xml",
    });
  }
  async function buildFilters() {
    let data = null;
    let topics = null;
    let sorts = null;
    let courses = null;

    await fetchData()
      .done(function (response) {
        data = response;
      })
      .fail(function () {
        alert("Something went wrong with the request");
      });
    topics = [...data.getElementsByTagName("topics")[0].children];
    topics.forEach((topic) => {
      $("#sel1").append(`
          <option class="bg-white text-violet" value="${topic.textContent}" ${
        topic.textContent === topics[0].textContent ? "selected" : ""
      }>${processString(topic.textContent)}</option>
          `);
    });
    sorts = [...data.getElementsByTagName("sorts")[0].children];
    sorts.forEach((sort) => {
      $("#sel2").append(`
            <option class="bg-white text-violet" value="${sort.textContent}" ${
        sort.textContent === sorts[0].textContent ? "selected" : ""
      }>${processString(sort.textContent)}</option>
            `);
    });
  }
  function addListeners() {
    $("#search").change(function (e) {
      e.preventDefault();
      printResult();
    });
    $("#sel1").change(function (e) {
      e.preventDefault();
      printResult();
    });
    $("#sel2").change(function (e) {
      e.preventDefault();
      printResult();
    });
  }
  function resetResutl() {
    const $loader = '<div class="loader"></div>';
    if ($("#courses")) $("#courses").remove();
    $("#coursesContainer").append($loader);
  }
  async function printResult() {
    const searchValue = $("#search").val();
    const topicValue = $("#sel1").val();
    const sortValue = $("#sel2").val();
    const $courses = `<div class="row row-cols-1 row-cols-md-3 row-cols-lg-4" id="courses"></div>`;
    let data = null;
    let courses = null;

    resetResutl();
    await fetchData(`q=${searchValue}&topic=${topicValue}&sort=${sortValue}`)
      .done(function (response) {
        data = response;
      })
      .fail(function () {
        alert("Something went wrong with the request");
      });

    $("#coursesContainer .loader").remove();
    $("#coursesContainer").append($courses);
    courses = [...data.getElementsByTagName("course")];
    courses.forEach((course, index) => {
      $("#courses").append(`
        <div class="col mb-5" id="${++index}">
            <div class="card bg-transparent border-0">
                <div class="play">
                    <img src="${course.childNodes[2].textContent}" class="card-img-top" />
                </div>
                <div class="card-body">
                    <h5 class="card-title font-weight-bold">${course.childNodes[0].textContent}</h5>
                    <p class="card-text text-muted">${course.childNodes[1].textContent}</p>
                </div>
                <div class="card-footer border-0 pt-0">
                    <div class="d-flex align-items-center">
                        <img src="${
                          course.childNodes[4].textContent
                        }" class="rounded-circle mr-3" style="width: 15%; height: fit-content" />
                        <small class="text-primary">${course.childNodes[3].textContent}</small>
                    </div>
                    <div class="d-flex align-items-center mt-3" id="stars">
                        
                    </div>
                </div>
            </div>
        </div>
        `);
      for (let i = 0; i < 5; i++) {
        if (i < parseInt(course.attributes[1].textContent)) {
          $(`#courses #${index} #stars`).prepend(
            `<img src="images/star_on.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        } else {
          $(`#courses #${index} #stars`).append(
            `<img src="images/star_off.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        }
      }
      $(`#courses #${index} #stars`).append(
        `<small class="text-primary ml-auto">${course.childNodes[5].textContent}</small>`
      );
    });
  }
  function processString(str) {
    let stringCapitalize = str.charAt(0).toUpperCase() + str.slice(1);
    return stringCapitalize.replace("_", " ");
  }
  function main() {
    buildFilters();
    addListeners();
    printResult();
  }
  main();
});
