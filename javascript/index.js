import * as functions from "./modules/functions.js";
let categories = []
let data = []

let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then(response => response.json())
    .then(responseData => {
        data = responseData
        
        let dataToRender = data

        // Carousel render
        functions.renderCarousel(dataToRender)

        //Checkbox category render
        functions.checkBoxRender(dataToRender, categories)

        //Search
        let searchText = document.getElementById('searchText')
        searchText.addEventListener('keyup', function() {
            functions.combineFilters(dataToRender, searchText);
        });

        searchText.addEventListener('search', function() {
            functions.combineFilters(dataToRender, searchText);
        });
    })