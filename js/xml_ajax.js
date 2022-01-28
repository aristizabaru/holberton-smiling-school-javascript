$(document).ready(function () {
  // Quotes
  function getQuotes() {
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/xml/quotes",
      dataType: "xml",
      success: function (response, textStatus) {
        if (textStatus == "success") {
          printQuotes(response);
        } else {
          alert("Something went wrong with the request");
        }
      },
      error: function () {
        alert("Something went wrong with the request");
      },
    });
  }
  function printQuotes(data) {
    const quotes = [...data.getElementsByTagName("quote")];
    const $structure = `
  <div id="carouselControls" class="carousel slide container" data-ride="carousel">
      <div class="carousel-inner w-75 mx-auto"></div>
      <a class="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </a>
  </div>
`;

    $("#carouselQuotes .loader").remove();
    $("#carouselQuotes").append($structure);
    quotes.forEach((quote, index) => {
      $("#carouselQuotes .carousel-inner").append(`
  <div class="carousel-item" id="${index}">
      <div class="card bg-transparent border-0">
          <div class="row no-gutters">
          <div class="col-md-3 d-flex justify-content-center align-items-center">
              <img src="${quote.childNodes[0].textContent}" class="card-img rounded-circle w-75" />
          </div>
          <div class="col-md-9">
              <div class="card-body">
              <p class="card-text">
              ${quote.childNodes[3].textContent}
              </p>
              <p class="font-weight-bold">
              ${quote.childNodes[1].textContent}<br /><span class="font-italic font-weight-normal">${quote.childNodes[2].textContent}</span>
              </p>
              </div>
          </div>
          </div>
      </div>
  </div>
`);
      $("#carouselQuotes #1").addClass("active");
    });
  }

  // Videos
  function getVideos() {
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/xml/popular-tutorials",
      dataType: "xml",
      success: function (response, textStatus) {
        if (textStatus == "success") {
          printVideos(response);
        } else {
          alert("Something went wrong with the request");
        }
      },
      error: function () {
        alert("Something went wrong with the request");
      },
    });
  }
  function printVideos(data) {
    const videos = [...data.getElementsByTagName("video")];
    const $structure = `
        <div class="col-1">
            <a class="carousel-control-prev owlPrevBtn owl-1PrevBtn" role="button">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
        </div>
        <div class="owl-carousel col-10"></div>
        <div class="col-1">
            <a class="carousel-control-next owlNextBtn owl-1NextBtn" role="button">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
      `;

    $("#carouselVideos .loader").remove();
    $("#carouselVideos").append($structure);
    videos.forEach((video, index) => {
      $("#carouselVideos .owl-carousel").append(`
        <div class="card bg-transparent border-0" id="${++index}">
            <div class="play">
                <img src="${video.childNodes[2].textContent}" class="card-img-top" />
            </div>
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${video.childNodes[0].textContent}</h5>
                <p class="card-text text-muted">${video.childNodes[1].textContent}</p>
            </div>
            <div class="card-footer border-0 pt-0">
                <div class="d-flex align-items-center">
                    <img src="${
                      video.childNodes[4].textContent
                    }" class="rounded-circle mr-3" style="width: 15%; height: fit-content" />
                    <small class="text-primary">${video.childNodes[3].textContent}</small>
                </div>
                <div class="d-flex align-items-center mt-3" id="stars">
                    
                </div>
            </div>
        </div>
      `);
      for (let i = 0; i < 5; i++) {
        if (i < parseInt(video.attributes[1].textContent)) {
          $(`#carouselVideos #${index} #stars`).prepend(
            `<img src="images/star_on.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        } else {
          $(`#carouselVideos #${index} #stars`).append(
            `<img src="images/star_off.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        }
      }
      $(`#carouselVideos #${index} #stars`).append(
        `<small class="text-primary ml-auto">${video.childNodes[5].textContent}</small>`
      );
    });
    // run owl carousel
    owlCarousel1();
  }
  function owlCarousel1() {
    var owl = $(".owl-carousel");

    owl.owlCarousel({
      loop: true,
      nav: false,
      autoplay: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 4,
        },
      },
    });

    // Most popular tutorials
    // Go to the next item
    $(".owl-1NextBtn").click(function () {
      owl.trigger("next.owl.carousel");
    });
    // Go to the previous item
    $(".owl-1PrevBtn").click(function () {
      owl.trigger("prev.owl.carousel");
    });

    owl.owlCarousel();
  }

  // Videos
  function getLatestVideos() {
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/xml/latest-videos",
      dataType: "xml",
      success: function (response, textStatus) {
        if (textStatus == "success") {
          printLatestVideos(response);
        } else {
          alert("Something went wrong with the request");
        }
      },
      error: function () {
        alert("Something went wrong with the request");
      },
    });
  }
  function printLatestVideos(data) {
    const videos = [...data.getElementsByTagName("video")];
    const $structure = `
        <div class="col-1">
            <a class="carousel-control-prev owlPrevBtn owl-2PrevBtn" role="button">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
        </div>
        <div class="owl-2 owl-carousel col-10"></div>
        <div class="col-1">
            <a class="carousel-control-next owlNextBtn owl-2NextBtn" role="button">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
      `;

    $("#carouselLatestVideos .loader").remove();
    $("#carouselLatestVideos").append($structure);
    videos.forEach((video, index) => {
      $("#carouselLatestVideos .owl-carousel").append(`
        <div class="card bg-transparent border-0" id="${++index}">
            <div class="play">
                <img src="${video.childNodes[2].textContent}" class="card-img-top" />
            </div>
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${video.childNodes[0].textContent}</h5>
                <p class="card-text text-muted">${video.childNodes[1].textContent}</p>
            </div>
            <div class="card-footer border-0 pt-0">
                <div class="d-flex align-items-center">
                    <img src="${
                      video.childNodes[4].textContent
                    }" class="rounded-circle mr-3" style="width: 15%; height: fit-content" />
                    <small class="text-primary">${video.childNodes[3].textContent}</small>
                </div>
                <div class="d-flex align-items-center mt-3" id="stars">
                    
                </div>
            </div>
        </div>
      `);
      for (let i = 0; i < 5; i++) {
        if (i < parseInt(video.attributes[1].textContent)) {
          $(`#carouselLatestVideos #${index} #stars`).prepend(
            `<img src="images/star_on.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        } else {
          $(`#carouselLatestVideos #${index} #stars`).append(
            `<img src="images/star_off.png" class="rounded-circle mr-2" style="width: 8%; height: fit-content" />`
          );
        }
      }
      $(`#carouselLatestVideos #${index} #stars`).append(
        `<small class="text-primary ml-auto">${video.childNodes[5].textContent}</small>`
      );
    });
    // run owl carousel
    owlCarousel2();
  }
  function owlCarousel2() {
    var owl_2 = $(".owl-carousel.owl-2");

    owl_2.owlCarousel({
      loop: true,
      nav: false,
      margin: 10,
      autoplay: true,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 4,
        },
      },
    });

    // Latest videos
    // Go to the next item
    $(".owl-2NextBtn").click(function () {
      owl_2.trigger("next.owl.carousel");
    });
    // Go to the previous item
    $(".owl-2PrevBtn").click(function () {
      owl_2.trigger("prev.owl.carousel");
    });

    owl_2.owlCarousel();
  }
  function main() {
    getQuotes();
    getVideos();
    getLatestVideos();
  }
  main();
});
