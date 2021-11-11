var Mylatitude = 0;
var Mylongitude = 0;
const Tbilisi = "Tbilisi";
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

    FillPopularRestaurantsInTbilisi();
    FillFavouritePlaces();
    GetLocation();
});





function FillFavouritePlaces() {

    $.ajax({
        url: "Content/Json/Restaurants.json", success: function (result) {

            const myJSON = JSON.stringify(result);
            object = JSON.parse(myJSON);
            let docGEBI = document.getElementById("FavouritePlaces");
            for (let index = 0; index < object.length; index++) {
                var restaurant = object[index];
                docGEBI.innerHTML += "<div class=\"col-xl-4 col-lg-4 col-md-6\">" +
                    "<div class=\"single-place mb-30\">" +
                    "<div class=\"place-img\">" +
                    "<img style=\"width:300px;height:300px\"src=Content/Images/" + restaurant.Name + ".png alt=\"" + restaurant.Name + "\">" +
                    "</div>" +
                    "<div class=\"place-cap\">" +
                    "<div class=\"place-cap-top\">" +
                    "<span><i class=\"fas fa-star\"></i><span>" + restaurant.Start + " </span> </span>" +
                    "<h3><a href=\"#\">" + restaurant.Name + "</a></h3>" +
                    "</div>" +
                    "<div class=\"place-cap-bottom\">" +
                    "<ul>" +
                    "<li><i class=\"fas fa-map-marker-alt\"></i>" + restaurant.Country + "</li>" +
                    "</ul>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"



                //  $('#RestaurantsChosenForYou').slick('slickAdd', "<div><a href = \"RestaurantPage.html?Restaurant=" + object.Restaurants[index].Name + "\"><img id=\"RestaurantImages\" src=Content/Images/" + object.Restaurants[index].Name + ".png></a></div>");
            }

        }
    });

}
function FillPopularRestaurantsInTbilisi() {
    $.ajax({
        url: "Content/Json/Restaurants.json", success: function (result) {

            const myJSON = JSON.stringify(result);
            object = JSON.parse(myJSON);
            var counter = 0;
            for (let index = 0; index < object.length; index++) {
                if (object[index].City = "Tbilisi") {
                    $('#PopularRestaurantsInTbilisi').slick('slickAdd', "<div><a href = \"RestaurantPage.html?Restaurant=" + object[index].Name + "\"><img id=\"RestaurantImages\" src=Content/Images/" + object[index].Name + ".png></a></div>");
                    counter++;
                }
            }
            if (counter == 0) {
                $('#PopularRestaurantsInTbilisi').slick('slickAdd', "<div>Eror 404</div>");
            }

        }
    });

}
function FillRestaurantNearYou(){
console.log(NearYou());
}

function NearYou() {

    $.ajax({
        url: "Content/Json/Restaurants.json", success: function (result) {

            const myJSON = JSON.stringify(result);
            object = JSON.parse(myJSON);
            var elementArray = [];
            for (let index = 0; index < object.length; index++) {
                elementArray[index] = new Restaurant(object[index].Name, object[index].Country,
                    object[index].City, object[index].Street, object[index].Number, object[index].Start,
                    object[index].Latitude, object[index].Longitude)
            }
            elementArray.sort((a, b) => b.Distance - a.Distance);
            console.log(elementArray)
            return elementArray;
        }
    });
}


class Restaurant {
    constructor(name, country, city, street, number, start, latitude, longitude) {
        this.Name = name;
        this.Country = country;
        this.City = city;
        this.Street = street;
        this.Number = number;
        this.Start = start;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Distance = this.CalcCrow(this.Latitude, this.Longitude, Mylatitude, Mylongitude);
    }


    CalcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.ToRad(lat2 - lat1);
        var dLon = this.ToRad(lon2 - lon1);
        var lat1 = this.ToRad(lat1);
        var lat2 = this.ToRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    ToRad(Value) {
        return Value * Math.PI / 180;
    }
}



function GetLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error, options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function showPosition(position) {
    Mylatitude = position.coords.latitude;
    Mylongitude = position.coords.longitude;
}