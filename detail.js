const param = new URLSearchParams(location.search);
const eventId = param.get("eventId");

const deleteEvent = function () {
    const key =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTRlZjRjNTllYzAwMTk5MGQ3MjMiLCJpYXQiOjE3MDkyODY2MzksImV4cCI6MTcxMDQ5NjIzOX0.4EwRNAKQO2zi1fSyWHCUxINqd9x7rvVBb91poujluSg";

    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
        method: "DELETE",
        headers: {
            Authorization: key,
        },
    })
        .then((res) => {
            if (res.ok) {
                alert("Prodotto cancellato");
                location.assign("./index.html");
            } else {
                alert("Errore in fase di cancellazione");
                throw new Error("Errore");
            }
        })
        .catch((err) => {
            console.log("Errore:", err);
        });
};

const getProductEdit = function (el) {
    const row = document.getElementById("edit");
    row.innerHTML = `
    <div class="card">
          <img src="${el.imageUrl}" class="card-img-top" >
          <div class="card-body">
              <h5 class="card-title">${el.name}</h5>
              <p class="card-text">${el.description}</p>
              <p class="card-text">Prezzo: ${el.price}€</p>
              <button class="btn btn-danger" onclick="deleteEvent()">Elimina</button>
              <a class="btn btn-primary" href="./back-office.html?eventId=${el._id}" class="btn btn-primary">Modifica</a>
          </div>
      </div>
    `;
};

const getProduct = function () {
    const key =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTRlZjRjNTllYzAwMTk5MGQ3MjMiLCJpYXQiOjE3MDkyODY2MzksImV4cCI6MTcxMDQ5NjIzOX0.4EwRNAKQO2zi1fSyWHCUxINqd9x7rvVBb91poujluSg";
    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
        headers: {
            Authorization: key,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Errore nella generazione");
            }
        })
        .then((eventProduct) => {
            getProductEdit(eventProduct);
        })
        .catch((err) => console.log("Errore", err));
};

getProduct();
