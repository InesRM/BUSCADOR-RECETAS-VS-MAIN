window.addEventListener("load", function () {
  // Selectores generales
  const categoriasSelectElement = document.querySelector("#categories");
  const resultadoElement = document.querySelector("#resultado");
  const modalBody = document.querySelector(".modal-body");
  const modalTitle = document.querySelector(".modal-title");
  const modalFooter = document.querySelector(".modal-footer");

  // Función para cargar categorías
  function cargarCategorias() {
    categoriasSelectElement.innerHTML = `<option value="">Selecciona una categoría</option>`;
    fetch("../php/getCategories.php")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          categoriasSelectElement.appendChild(option);
        });
      })
      .catch((error) => console.error(error, "Error al cargar las categorías"));
  }

  // Solo cargar categorías si estamos en la página de inicio
  if (categoriasSelectElement) {
    cargarCategorias();

    // Cargar platos de la categoría seleccionada
    categoriasSelectElement.addEventListener("change", function () {
      const category = categoriasSelectElement.value;
      if (category) {
        fetch(`../php/getDishesByCat.php?category=${category}`)
          .then((response) => response.json())
          .then((data) => {
            resultadoElement.innerHTML = ""; // Limpiar el contenido de resultados
            data.forEach((dish) => {
              const div = document.createElement("div");
              div.classList.add("col-md-4", "mb-3");
              div.innerHTML = `
                <div class="card">
                  <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
                  <div class="card-body">
                    <h5 class="card-title">${dish.name}</h5>
                    <p class="card-text">${dish.description}</p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal" data-dish-name="${dish.name}">Ver más</button>
                  </div>
                </div>
              `;
              resultadoElement.appendChild(div);
            });
          })
          .catch((error) => console.error(error, "Error al cargar los platos"));
      }
    });

    // Mostrar detalles del plato en el modal
    resultadoElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-primary")) {
        const dishName = event.target.getAttribute("data-dish-name");
        fetch(`../php/getDishByName.php?name=${dishName}`)
          .then((response) => response.json())
          .then((data) => {
            modalTitle.textContent = data.name;
            modalBody.innerHTML = `
              <img src="${data.image}" class="img-fluid" alt="${data.name}">
              <p>${data.description}</p>
              <p>Ingredients: ${data.ingredients}</p>
            `;
            const btnFavoritos = document.getElementById("btnFavoritos");
            btnFavoritos.setAttribute("data-dish-name", data.name);
            btnFavoritos.setAttribute("data-dish-image", data.image);
            btnFavoritos.setAttribute("data-dish-description",data.description);

            const btnCerrar = document.getElementById("btnClose");
            btnCerrar.addEventListener("click", () => {
              modalTitle.textContent = "";
              modalBody.innerHTML = "";
            });

          })
          .catch((error) => console.error(error, "Error al cargar el plato"));
      }
    });

    // Manejar el botón "Agregar a favoritos"
    modalFooter.addEventListener("click", (event) => {
      if (event.target.id === "btnFavoritos") {
        const dishName = event.target.getAttribute("data-dish-name");
        const dishImage = event.target.getAttribute("data-dish-image");
        const dishDescription = event.target.getAttribute(
          "data-dish-description"
        );

        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (!favoritos.some((fav) => fav.name === dishName)) {
          // Evitar duplicados
          favoritos.push({
            name: dishName,
            image: dishImage,
            description: dishDescription,
          });
          localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }

        // Mostrar mensaje de éxito
        const toastElement = document.getElementById("toast");
        const toastBody = toastElement.querySelector(".toast-body");
        toastBody.textContent = `${dishName} ha sido agregado a favoritos.`;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
      }
    });
  }

  // Cargar favoritos en favoritos.html
  function cargarFavoritos() {
    const favoritosElement = document.querySelector("#favoritos");
    if (favoritosElement) {
      const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      favoritosElement.innerHTML = ""; // Limpiar el contenido de favoritos
      favoritos.forEach((dish) => {
        if (dish) {
          // Comprobar que el plato no es null
          const div = document.createElement("div");
          div.classList.add("col-md-4", "mb-3");
          div.innerHTML = `
          <div class="card">
            <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
            <div class="card-body">
              <h5 class="card-title">${dish.name}</h5>
              <p class="card-text">${dish.description}</p>
            </div>
            <button class="btn btn-danger" data-dish-name="${dish.name}">Eliminar favorito</button>
          </div>
        `;
          favoritosElement.appendChild(div);
        }
      });
    }
  }
 
    cargarFavoritos();

  // Manejar el botón "Eliminar favoritos"

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
      const dishName = event.target.getAttribute("data-dish-name");
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      favoritos = favoritos.filter((fav) => fav.name !== dishName);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      cargarFavoritos();
    }
  });


  
});
