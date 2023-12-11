let filteredCategories = { events: [] }
let filteredSearch = { events: [] }
let combinedData = { events: [] }

//Render Carousel
export function renderCarousel(dataToRender) {
    let carrusel = document.getElementById("carousel-cards");
    carrusel.innerHTML = ''

    if (dataToRender.events.length === 0) {
        carrusel.innerHTML = `<h2 class="text-center text-secondary my-5">I have nothing to show you</h2>`
    }

    for (let i = 0; i < dataToRender.events.length; i += 4) {
        let carruselItem
        if (i === 0) {
            carruselItem = document.createElement("div")
            carruselItem.classList.add("carousel-item", "active")
        } else {
            carruselItem = document.createElement("div")
            carruselItem.classList.add("carousel-item")
        }
        let contenedor = document.createElement("div")
        contenedor.classList.add("d-block", "d-md-flex", "justify-content-around")

        for (let j = i; j < i + 4; j++) {
            if (dataToRender.events[j] !== undefined) {
                let card = document.createElement("div")
                card.classList.add("card", "mx-1", "my-3", "border", "col-12", "col-md-3", "cardSize")
                card.innerHTML = `
                    <img src="${dataToRender.events[j].image}" class="card-img-top h-50" alt="${dataToRender.events[j].name}">
                    <div class="card-body">
                        <h5 class="card-title">${dataToRender.events[j].name}</h5>
                        <p class="card-text">${dataToRender.events[j].description}</p>
                    </div>
                    <div class="card-text d-flex justify-content-around align-items-center">
                        <p>Price: ${dataToRender.events[j].price}$</p>
                        <a href="details.html?id=${dataToRender.events[j]._id}" class="btn btn-primary my-3">More Details</a>
                    </div>`
                contenedor.appendChild(card)
            }
        }
        carruselItem.appendChild(contenedor)
        carrusel.appendChild(carruselItem)
    }
}

//Filter data by category
function categoryFilter(category, dataToRender) {
    let categoryExists = filteredCategories.events.includes(category)
    if (categoryExists === true) {
        filteredCategories.events = filteredCategories.events.filter(categories => categories !== category)
    } else {
        filteredCategories.events.push(category)
    }
    combineFilters(dataToRender, searchText)
}

//Checkbox category render
export function checkBoxRender(dataToRender, categories) {
    dataToRender.events.forEach(events => {
        if (!categories.includes(events.category)) {
            categories.push(events.category)
        }
    })
    let navbarCategories = document.getElementById('navbarCategories')

    let categoryCheckbox = document.createElement("div")
    categoryCheckbox.classList.add("collapse", "navbar-collapse", "justify-content-end", "px-2")
    categoryCheckbox.setAttribute("id", "mainNavbar")
    for (let i = 0; i < categories.length; i++) {
        let element = document.createElement("div")
        element.classList.add("form-check", "form-check-inline")
        element.innerHTML = `
            <input class="form-check-input" type="checkbox" id="category_${i}">
            <label class="form-check-label noClickable" for="category_${i}">${categories[i]}</label>
           `
        { let j = i;
            element.addEventListener('change', function () {
                categoryFilter(categories[j], dataToRender)
            })}

        categoryCheckbox.appendChild(element)
    }
    navbarCategories.appendChild(categoryCheckbox)
}

//Combine category filter and search
export function combineFilters(dataToRender, searchText) {
    let text = searchText.value.trim().toLowerCase()
    filteredSearch.events = dataToRender.events.filter(event =>
        event.name.toLowerCase().includes(text) ||
        event.category.toLowerCase().includes(text)
    )

    combinedData.events = filteredSearch.events.filter(event => {
        return filteredCategories.events.length === 0 || filteredCategories.events.includes(event.category);
    })
    renderCarousel(combinedData.events.length > 0 ? { events: combinedData.events } : { events: [] })
}