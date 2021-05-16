function fetchMarketCap() {
    var parentDivId = "topCoinsMC";
    var parentDiv = document.getElementById(parentDivId);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var itemsProcessed = 0;

    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true", requestOptions)
        .then(response => response.json())
        .then(function(result) {

            console.log(result);
            resultString = '';
            result.forEach((coin, index, array) => {

                resultString += `
                <li onclick="fetchSingleCoin('${coin.id}')">
                    <div class="item">
                        <div class="imageWrapper">
                            <img src="${coin.image}" alt="image" class="imaged w64">
                        </div>
                        <div class="in">
                            <div>
                                ${coin.name}
                                <div class="text-warning mt-1">$
                                    ${
                                        ((Math.round(coin.current_price*100)/100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                `;
                itemsProcessed++;
                if (itemsProcessed === array.length) {
                    parentDiv.innerHTML = resultString;
                }
            });
        })
        .catch(error => console.log('error', error));
}