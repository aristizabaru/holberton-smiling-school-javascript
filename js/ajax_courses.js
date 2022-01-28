$(document).ready(function () {
  function fetchData(query = null) {
    let url = "https://smileschool-api.hbtn.info/courses";
    if (query) url += `?${query}`;
    return $.ajax({
      type: "GET",
      url,
      dataType: "json",
    });
  }
  async function buildFilters() {
    let data = null;

    await fetchData()
      .done(function (response) {
        data = response;
      })
      .fail(function () {
        alert("Something went wrong with the request");
      });

    data.topics.forEach((topic) => {
      $("#sel1").append(`
          <option class="bg-white text-violet" value="${topic}" ${
        topic === data.topics[0] ? "selected" : ""
      }>${processString(topic)}</option>
          `);
    });

    data.sorts.forEach((sort) => {
      $("#sel2").append(`
            <option class="bg-white text-violet" value="${sort}" ${
        sort === data.sort[0] ? "selected" : ""
      }>${processString(sort)}</option>
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
    data.courses.forEach((course) => {
      $("#courses").append(`
        <div class="col mb-5" id="${course.id}">
            <div class="card bg-transparent border-0">
                <div class="play">
                    <img src="${course.thumb_url}" class="card-img-top" />
                </div>
                <div class="card-body">
                    <h5 class="card-title font-weight-bold">${course.title}</h5>
                    <p class="card-text text-muted">${course["sub-title"]}</p>
                </div>
                <div class="card-footer border-0 pt-0">
                    <div class="d-flex align-items-center">
                        <img src="${course.author_pic_url}" class="rounded-circle mr-3" style="width: 15%; height: fit-content" />
                        <small class="text-primary">${course.author}</small>
                    </div>
                    <div class="d-flex align-items-center mt-3" id="stars">
                        
                    </div>
                </div>
            </div>
        </div>
        `);
      for (let i = 0; i < 5; i++) {
        if (i < course.star) {
          $(`#courses #${course.id} #stars`).prepend(
            `<img src="images/star_on.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        } else {
          $(`#courses #${course.id} #stars`).append(
            `<img src="images/star_off.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        }
      }
      $(`#courses #${course.id} #stars`).append(`<small class="text-primary ml-auto">${course.duration}</small>`);
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
