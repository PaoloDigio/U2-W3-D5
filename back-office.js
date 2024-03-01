const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId");

if (eventId) {
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
                throw new Error("Errore");
            }
        })
        .then((even) => {
            const nameInput = document.getElementById("name");
            const descriptionInput = document.getElementById("description");
            const priceInput = document.getElementById("price");
            const imageUrlInput = document.getElementById("imageUrl");
            const brandInput = document.getElementById("brand");

            nameInput.value = even.name;
            descriptionInput.value = even.description;
            priceInput.value = even.price;
            brandInput.value = even.brand;
            imageUrlInput.value = even.imageUrl;
        })
        .catch((err) => {
            console.log("err", err);
        });
}

const formRif = document.getElementById("form");
formRif.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const priceInput = document.getElementById("price");
    const imageUrlInput = document.getElementById("imageUrl");
    const brandInput = document.getElementById("brand");

    const newProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
    };

    let methodToUse = "POST";
    if (eventId) {
        methodToUse = "PUT";
    }

    let urlToUse = "https://striveschool-api.herokuapp.com/api/product";
    if (eventId) {
        urlToUse = "https://striveschool-api.herokuapp.com/api/product/" + eventId;
    }

    const key =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTRlZjRjNTllYzAwMTk5MGQ3MjMiLCJpYXQiOjE3MDkyODY2MzksImV4cCI6MTcxMDQ5NjIzOX0.4EwRNAKQO2zi1fSyWHCUxINqd9x7rvVBb91poujluSg";

    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(newProduct),
        headers: {
            Authorization: key,
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                alert("Prodotto salvato");
                location.assign("./index.html");
            } else {
                alert("Qualcosa è andato storto");
                throw new Error("Errore");
            }
        })
        .catch((err) => {
            console.log("Errore ", err);
        });
});
