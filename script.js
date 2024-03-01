const createProduct = function (arr) {
    const row = document.getElementById("prodotti");
    arr.forEach((event) => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-sm-6", "col-md-4");
        col.innerHTML = `
        <div class="card">
            <img src="${event.imageUrl}" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>            
                <p class="card-text">Prezzo: ${event.price}€</p>
                <a href="./detail.html?eventId=${event._id}" class="btn btn-dark">Scopri di più</a>
                <a class="btn btn-primary" href="./back-office.html?eventId=${event._id}" class="btn btn-primary">Modifica</a>
            </div>
        </div>
        `;
        row.appendChild(col);
    });
};

const getEvent = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product", {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTRlZjRjNTllYzAwMTk5MGQ3MjMiLCJpYXQiOjE3MDkyODY2MzksImV4cCI6MTcxMDQ5NjIzOX0.4EwRNAKQO2zi1fSyWHCUxINqd9x7rvVBb91poujluSg",
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Errore");
            }
        })
        .then((event) => {
            createProduct(event);
        })
        .catch((err) => {
            console.log("Si è verificato un errore", err);
        });
};

getEvent();
