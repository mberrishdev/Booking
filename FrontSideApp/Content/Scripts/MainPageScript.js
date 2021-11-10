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

function FillRestaurantsChosenForYou(){
    
    $.ajax({
        url: "Content/Json/RestarauntChosenForYou.json", success: function (result) {

            const myJSON = JSON.stringify(result);
            object = JSON.parse(myJSON);

            for (let index = 0; index < object.Restaurants.length; index++) {
                $('#RestaurantsChosenForYou').slick('slickAdd','<div><a href = "#"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1565190720/gallery/preview/02_o_car.jpg"></a></div>');
            }

        }
    });

}
function FillPopularRestaurantsInTbilisi(){
    $.ajax({
        url: "Content/Json/PopularRestaurantsInTbilisi.json", success: function (result) {

            const myJSON = JSON.stringify(result);
            object = JSON.parse(myJSON);
            for (let index = 0; index < object.Restaurants.length; index++) {
                $('#PopularRestaurantsInTbilisi').slick('slickAdd','<div><a href = "#"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1565190720/gallery/preview/02_o_car.jpg"></a></div>');
            }

        }
    });

}


