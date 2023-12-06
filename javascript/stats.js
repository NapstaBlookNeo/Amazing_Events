let data = []

let url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then(response => response.json())
    .then(responseData => {
        data = responseData


        //Render table
        let table = document.getElementById("statsTable");
        tableItems = document.createElement("table")
        tableItems.classList.add("table", "table-bordered", "mx-md-5", "my-5")
        tableItems.innerHTML = `
            <tbody>
            <tr class="table-dark text-center">
                <th colspan="3">Events Statistics</th>
            </tr>
            <tr class="table-secondary">
                <th>Events with higher % of assistance</th>
                <th>Events with lower % of assistance</th>
                <th>Events with larger capacity</th>
            </tr>
            <tr>
                <td>Avengers: Estimated 9000 out of 9000 (100%)</td>
                <td>Halloween Night: Estimated 9000 out of 12000 (75%)</td>
                <td>School Book Fair: 150000 </td>
            </tr>
            <tr>
                <td>Metallica in concert: Estimated 138000 out of 138000 (100%)</td>
                <td>Art Exhibition: 65892 out of 82000 (80%)</td>
                <td>Metallica in concert: 138000</td>
            </tr>
            <tr>
                <td>Festival of the collectivities: 42756 out of 45000 (95%)</td>
                <td>School Book Fair: 123286 out of 150000 (82%)</td>
                <td>Art Exhibition: 82000</td>
            </tr>

            <tr class="table-dark text-center">
                <th colspan="3">Upcoming events statistics by category</th>
            </tr>
            <tr class="table-secondary">
                <th>Categories</th>
                <th>Revenues</th>
                <th>Estimated percentage of assistance</th>
            </tr>
            <tr>
                <td>Costume Party</td>
                <td>108.000$ (Estimated)</td>
                <td>9000 out of 12000 (75%)</td>
            </tr>
            <tr>
                <td>Music Concert</td>
                <td>20.700.000$ (Estimated)</td>
                <td>138000 out of 138000 (100%)</td>
            </tr>

            <tr class="table-dark text-center">
                <th colspan="3">Past events statistics by category</th>
            </tr>
            <tr class="table-secondary">
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of assistance</th>
            </tr>
            <tr>
                <td>Food Fair</td>
                <td>213.750$</td>
                <td>42756 out of 45000 (95%)</td>
            </tr>
            <tr>
                <td>Museum</td>
                <td>988.380$</td>
                <td>65892 out of 82000 (80%)</td>
            </tr>
            <tr>
                <td>Race</td>
                <td>77.094$</td>
                <td>25698 out of 30000 (85%)</td>
            </tr>
            <tr>
                <td>Book Exchange</td>
                <td>123.286$</td>
                <td>123286 out of 150000 (82%)</td>
            </tr>
            <tr>
                <td>Let's go to the cinema</td>
                <td>2.250.000$</td>
                <td>9000 out of 9000 (100%)</td>
            </tr>
            </tbody>
            `
        table.appendChild(tableItems)

    })