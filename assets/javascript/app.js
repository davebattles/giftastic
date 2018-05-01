$(document).ready(function () {
  var gifArray = ["Kpop", "dance off", "space"];
  var gifBox = $(".buttonSpace");
  var content = $(".gif-view");
  var searchBox = $("#searchBox");
  var addNewGifBtn = $("#add-new-gif-btn");
  /***
   *    █████████╗   █████╗   ██╗██████╗
   *    ██╔════██║   ██████╗  ████╔════╝
   *    █████╗ ██║   ████╔██╗ ████║     
   *    ██╔══╝ ██║   ████║╚██╗████║     
   *    ██║    ╚██████╔██║ ╚████╚██████╗
   *    ╚═╝     ╚═════╝╚═╝  ╚═══╝╚═════╝
   *                                    
   */
  //clear gifs 
  function clearGifs() {
    $(".gif-view").empty();
  }
  function clearBtns() {
    gifBox.html("");
  }
  // MAKE GIF BTN
  function propagateButtons() {

    for (var i = 0; i < gifArray.length; i++) {
      var buttons = $("<a>");
      buttons.addClass("btn waves-effect gifbtn");
      buttons.text(gifArray[i]);
      buttons.attr("gif-data", gifArray[i]);
      gifBox.append(buttons);
    }
  }
  // ADD NEW GIF
  addNewGifBtn.on("click", function (event) {
    if (searchBox.val() === "") {
      (event).preventDefault();
    } else {
      event.preventDefault();
      gifArray.push(searchBox.val().trim());
      clearBtns();
      propagateButtons();
      searchBox.val("");
    }
  });
  /***
   *     █████╗      ██╗ █████╗ ██╗  ██╗
   *    ██╔══██╗     ██║██╔══██╗╚██╗██╔╝
   *    ███████║     ██║███████║ ╚███╔╝ 
   *    ██╔══██║██   ██║██╔══██║ ██╔██╗ 
   *    ██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗
   *    ╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
   */
  var clickBtn = $(".gifbtn");
  $(document).on("click", ".gifbtn", renderGifs);
  function renderGifs() {
    clearGifs();
    var gifData = $(this).attr("gif-data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifData + "&api_key=5lOCeJsh28VZ18MUoQMrmIXxQmHUEdrX&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      //  waits for json to be grabbed
      .then(function (response) {
        var result = response.data;
        var still = "images.fixed_height_still.url";
        var animate = "images.fixed_height.url";
        for (var i = 0; i < result.length; i++) {
          //THIS IS WHERE I MESS WITH GIFS
          var rating = result[i].rating;
          var div = $("<div>");
          var img = $("<img>");
          var hr = $("<hr>");
          var br = $("<br>");
          img.addClass("thisistheimage");
          div.addClass("shapeThisShit");
          img.attr("src", result[i].images.fixed_height_still.url);
          img.attr("data-still", result[i].images.fixed_height_still.url);
          img.attr("data-animate", result[i].images.fixed_height.url);
          img.attr("data-title", result[i].title);
          img.attr("data-state", "still");
          var p = $("<p>");
          p.addClass("rating");
          var title = $("<p>");
          title.addClass("gif-title col");
          title.text(result[i].title);
          div.prepend(br);
          div.prepend(img);
          div.prepend(br);
          div.prepend("rated: " + rating + "<br>");
          div.prepend(p);
          div.prepend(title);
          div.prepend(div);
          content.prepend(div);
        }
      });
  }
  $(document).on("click", ".thisistheimage", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  /***
   *    ███████████████╗█████╗██████╗████████╗
   *    ██╔════╚══██╔══██╔══████╔══██╚══██╔══╝
   *    ███████╗  ██║  █████████████╔╝  ██║   
   *    ╚════██║  ██║  ██╔══████╔══██╗  ██║   
   *    ███████║  ██║  ██║  ████║  ██║  ██║   
   *    ╚══════╝  ╚═╝  ╚═╝  ╚═╚═╝  ╚═╝  ╚═╝   
   *                                          
   */
  propagateButtons();
  //Wow i thought there would be more to this.




});