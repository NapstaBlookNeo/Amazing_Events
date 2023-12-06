import * as functions from "./modules/functions.js";

let categories = []
let pastEventsdata = { events: [] }
let dataCategorized = { events: [] }
let data = []

let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then(response => response.json())
    .then(responseData => {
        data = responseData
        
        //Filter past events
        let todayDate = new Date(data.currentDate)

        pastEventsdata.events = data.events.filter(event => {
            let eventDate = new Date(event.date);
            return eventDate < todayDate;
        });

        let dataToRender = dataCategorized.events.length > 0 ? dataCategorized : pastEventsdata

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