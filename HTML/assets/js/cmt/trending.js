function fetchTrending() {
    var parentDivId = "trending-carousel";
    var parentDiv = document.getElementById(parentDivId);
    document.getElementById("trending-carousel-initiator").remove();

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var itemsProcessed = 0;

    fetch("https://api.coingecko.com/api/v3/search/trending", requestOptions)
        .then(response => response.json())
        .then(function(result) {

            console.log(result);
            result.coins.forEach((coin, index, array) => {

                parentDiv.insertAdjacentHTML("beforeend", `
                <div class="item ml-1" onclick="fetchSingleCoin('${coin.item.id}')">
                    <div class="card">
                        <img src="${coin.item.large}" style="height: 150px; object-fit: scale-down" class="card-img-top" alt="image">
                        <div class="card-body pt-1">
                            <h4 class="mb-0"><span class="badge badge-warning mr-1">${coin.item.score+1}</span>${coin.item.name}</h4>
                        </div>
                    </div>
                </div>
                `);
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    // $('.owl-carousel').owlCarousel('update');
                    $('#trending-carousel').owlCarousel({
                        stagePadding: 32,
                        loop: true,
                        margin: 16,
                        nav: false,
                        items: 2,
                        dots: false,
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: 2,
                            },
                            768: {
                                items: 4,
                            }
                        }
                    });
                }
            });
        })
        .catch(error => console.log('error', error));
}