$(document).ready(function () {

  $('.items').slick({
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  });
  FillRestaurantsChosenForYou();
  FillPopularRestaurantsInTbilisi();
});

function FillRestaurantsChosenForYou() {

  $.ajax({
    url: "Content/Json/Restaurants.json", success: function (result) {

      const myJSON = JSON.stringify(result);
      object = JSON.parse(myJSON);

      for (let index = 0; index < object.Restaurants.length; index++) {
        $('#RestaurantsChosenForYou').slick('slickAdd', "<div><a href = \"RestaurantPage.html?Restaurant=" + object.Restaurants[index].Name + "\"><img id=\"RestaurantImages\" src=Content/Images/" + object.Restaurants[index].Name + ".png></a></div>");
      }

    }
  });

}
function FillPopularRestaurantsInTbilisi() {
  $.ajax({
    url: "Content/Json/Restaurants.json", success: function (result) {

      const myJSON = JSON.stringify(result);
      object = JSON.parse(myJSON);
      for (let index = 0; index < object.Restaurants.length; index++) {
        $('#PopularRestaurantsInTbilisi').slick('slickAdd', "<div><a href = \"RestaurantPage.html?Restaurant=" + object.Restaurants[index].Name + "\"><img id=\"RestaurantImages\" src=Content/Images/" + object.Restaurants[index].Name + ".png></a></div>");
      }

    }
  });

}
//41.706526614848805, 44.787646
//alert(calcCrow(59.3293371,13.4877472,59.3225525,13.4619422).toFixed(1));
//getLocation();
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180;
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  console.log(calcCrow(position.coords.latitude, position.coords.longitude, 41.706526614848805, 44.787646).toFixed(1));
}