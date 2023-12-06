let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then(response => response.json())
    .then(responseData => {
        data = responseData

        let url = new URL(window.location.href)
        console.log(url);
        let searchParams = new URLSearchParams(url.search)
        let printCard = data.events.filter((events) => events._id == searchParams.get('id'))
        console.log(printCard);

        let detailCards = document.getElementById("detail-cards")
        let card = document.createElement("div")
        card.classList.add("card", "mb-3", "my-5")
        card.innerHTML =
                `<div class="row g-0">
            <div class="col-md-5 detailCard">
                <img src="${printCard[0].image}" class="img-fluid rounded-start" alt="${printCard[0].name}">
            </div>
            <div class="col-md-7">
                <div class="card-body">
                    <h4 class = "mb-3">${printCard[0].name}</h4>
                    <p class = "text-justify">${printCard[0].description}</p>
                    <p>Date: ${printCard[0].date}</p>
                    <p>Place: ${printCard[0].place}</p>
                    <p>Price: ${printCard[0].price} $</p>
                    <p>Capacity: ${printCard[0].capacity}</p>
                    <p>${(printCard[0].estimate ? "Estimated Assistance: " + printCard[0].estimate : "Assistance: " + printCard[0].assistance)}</p>
                    <p>Category: ${printCard[0].category}</p>
                </div>
            </div>
        </div>`
        detailCards.appendChild(card)

    })    
