const region_Link = "https://didactic-chainsaw-69wq55j4qxpvcr976-6006.app.github.dev/regions";

fetch(region_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#regiontable tbody");

    data.forEach(c=>{
        const row = document.createElement("tr");
        row.innerHTML=`
        <td>${c.region_id}</td>
        <td>${c.region_name}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});