function fetchSingleCoin(coinID) {
    console.log(coinID);
    $('#singleCoinModal').modal('toggle');
    var titleDivID = "coinModalTitle";
    var bodyDivID = "coinModalBody";

    var titleDiv = document.getElementById(titleDivID);
    var bodyDiv = document.getElementById(bodyDivID);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var itemsProcessed = 0;

    fetch("https://api.coingecko.com/api/v3/coins/" + coinID, requestOptions)
        .then(response => response.json())
        .then(function(result) {
            titleDiv.innerHTML = result.name;

            console.log(result);
            bodyDiv.innerHTML = `
                <p>
                    ${result.description.en}
                </p>
            `;

        })
        .catch(error => console.log('error', error));


}