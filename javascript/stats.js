let data = []
let filteredCategories = { events: [] }
let pastEventsData = { events: [] }
let upcomingEventsData = { events: [] }

let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then(response => response.json())
    .then(responseData => {
        data = responseData
        let todayDate = new Date(data.currentDate)

        //Past events Filter
        pastEventsData.events = data.events.filter(event => {
            let eventDate = new Date(event.date)
            return eventDate < todayDate
        })

        //Upcoming events Filter
        upcomingEventsData.events = data.events.filter(event => {
            let eventDate = new Date(event.date)
            return eventDate > todayDate
        })

        //------------------------- Table Calculations ---------------------------------

        //Events with higher and lower assistance
        let pastEventsAssistanceData = []
        for (let i = 0; i < pastEventsData.events.length; i++) {
            let assistancePercentaje = Math.floor(pastEventsData.events[i].assistance * 100 / pastEventsData.events[i].capacity)
            let DataToPush = {
                name: pastEventsData.events[i].name,
                assistancePercentaje: assistancePercentaje,
                capacity: pastEventsData.events[i].capacity,
                assistance: pastEventsData.events[i].assistance
            }
            pastEventsAssistanceData.push(DataToPush)
        }
        pastEventsAssistanceData.sort((a, b) => b.assistancePercentaje - a.assistancePercentaje)

        //Events with larger caacity
        let eventsWithLargerCapacity = []
        for (let i = 0; i < data.events.length; i++) {
            let DataToPush = {
                name: data.events[i].name,
                capacity: data.events[i].capacity
            }
            eventsWithLargerCapacity.push(DataToPush)
        }
        eventsWithLargerCapacity.sort((a, b) => b.capacity - a.capacity)

        //Statistics by category
        function calculateCategoryRevenue(eventos) {
            let dataByCategory = {}

            eventos.forEach(evento => {
                let category = evento.category
                let eventRevenue = (evento.assistance || evento.estimate) * evento.price;
                let assistancePercentaje = Math.floor(((evento.assistance || evento.estimate) * 100) / evento.capacity)

                if (!dataByCategory[category]) {
                    dataByCategory[category] = {
                        category: category,
                        revenue: 0,
                        percentage: 0,
                        eventCount: 0
                    }
                }

                dataByCategory[category].revenue += eventRevenue
                dataByCategory[category].percentage += assistancePercentaje
                dataByCategory[category].eventCount++
            })

            for (let category in dataByCategory) {
                dataByCategory[category].percentage = Math.floor(dataByCategory[category].percentage / dataByCategory[category].eventCount)
            }

            return Object.values(dataByCategory)
        }

        let upcomingEventsCategoryData = calculateCategoryRevenue(upcomingEventsData.events)
        let pastEventsCategoryData = calculateCategoryRevenue(pastEventsData.events)

        //------------------------- Table Render --------------------------------------

        let table = document.getElementById("statsTable")
        let tableItems = document.createElement("table")
        tableItems.classList.add("table", "table-bordered", "mx-md-5", "my-5")
        let tableBody = document.createElement("tbody")
        let eventsStatsRows = `
            <tr class="table-dark text-center">
                <th colspan="3">Events Statistics</th>
            </tr>
            <tr class="table-secondary">
                <th>Events with higher % of assistance</th>
                <th>Events with lower % of assistance</th>
                <th>Events with larger capacity</th>
            </tr>
            ${renderEventStats(pastEventsAssistanceData, eventsWithLargerCapacity)}
        `
        tableBody.innerHTML += eventsStatsRows

        let upcomingEventsRows = `
            <tr class="table-dark text-center">
                <th colspan="3">Upcoming events statistics by category</th>
            </tr>
            <tr class="table-secondary">
                <th>Categories</th>
                <th>Estimated Revenues</th>
                <th>Estimated percentage of assistance</th>
            </tr>
            ${renderCategoryStats(upcomingEventsCategoryData)}
        `
        tableBody.innerHTML += upcomingEventsRows

        let pastEventsRows = `
        <tr class="table-dark text-center">
            <th colspan="3">Past events statistics by category</th>
        </tr>
        <tr class="table-secondary">
            <th>Categories</th>
            <th>Revenues</th>
            <th>Percentage of assistance</th>
        </tr>
        ${renderCategoryStats(pastEventsCategoryData)}
    `
        tableBody.innerHTML += pastEventsRows

        tableItems.appendChild(tableBody)
        table.appendChild(tableItems)

        //Render general event statistics
        function renderEventStats(assistanceData, capacityData) {
            let rows = ''

            for (let i = 0; i < 3; i++) {
                rows += `
                    <tr>
                        <td>${assistanceData[i].name}: ${assistanceData[i].assistance} out of ${assistanceData[i].capacity} (${assistanceData[i].assistancePercentaje}%)</td>
                        <td>${assistanceData[assistanceData.length - (i + 1)].name}: ${assistanceData[assistanceData.length - (i + 1)].assistance} out of ${assistanceData[assistanceData.length - (i + 1)].capacity} (${assistanceData[assistanceData.length - (i + 1)].assistancePercentaje}%)</td>
                        <td>${capacityData[i].name}: ${capacityData[i].capacity} guests</td>
                    </tr>
                `
            }

            return rows
        }

        //Render pas or upcoming event statistics by category
        function renderCategoryStats(categoryData) {
            let rows = ''


            for (let i = 0; i < categoryData.length; i++) {
                rows += `
                    <tr>
                        <td>${categoryData[i].category}</td>
                        <td>${categoryData[i].revenue}$</td>
                        <td>${categoryData[i].percentage}%</td>
                    </tr>
                `
            }

            return rows
        }

    })

