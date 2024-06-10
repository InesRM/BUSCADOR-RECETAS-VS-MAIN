window.addEventListener("load", function () {

// Selectores
const categoriasSelectElement = document.querySelector('#categories');
const resultadoElement = document.querySelector('#resultado');
const modal= document.getElementById('modal');
const modalBody = document.querySelector('.modal-body');
const modalTitle = document.querySelector('.modal-title');
const favoritosElement = document.querySelector('.favoritos');



// Carga las categories 
function cargarCategorias() {

  categoriasSelectElement.innerHTML = `<option value="">Selecciona una categoría</option>`;

  fetch("../php/getCategories.php")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
      
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categoriasSelectElement.appendChild(option);
      });
    })
    .catch((error) => console.error(error, 'Error al cargar las categorías'));
}

cargarCategorias();

//Cargar DISHES de la categoría seleccionada utilizando el script getDishes.php

categoriasSelectElement.addEventListener('change', function () {
  const category = categoriasSelectElement.value;
  if (category) {
    fetch(`../php/getDishesByCat.php?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        resultadoElement.innerHTML = ''; // Limpiar el contenido de resultados
        data.forEach((dish) => {
          const div = document.createElement('div');
          div.classList.add('col-md-4', 'mb-3');
          div.innerHTML = `
            <div class="card">
              <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
              <div class="card-body">
                <h5 class="card-title">${dish.name}</h5>
                <p class="card-text">${dish.description}</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"data-dish-name="${dish.name}">Ver más</button>
              </div>
            </div>
          `;
          resultadoElement.appendChild(div);
        });
      })
      .catch((error) => console.error(error, 'Error al cargar los platos'));
  }
});

resultadoElement.addEventListener('click', (event) => {

  if (event.target.classList.contains('btn-primary')){
    const dishName = event.target.getAttribute('data-dish-name');
    //Obtener los datos del plato seleccionado con fetch

    fetch(`../php/getDishByName.php?name=${dishName}`)
      .then((response) => response.json())
      .then((data) => {
        modalTitle.textContent = data.name;
        modalBody.innerHTML = `
          <img src="${data.image}" class="img-fluid" alt="${data.name}">
          <p>${data.description}</p>
          <p>Ingredients: ${data.ingredients}</p>
          <button class="btn btn-success" data-dish-name="${data.name}">Agregar a favoritos</button>
        `;
      })
      .catch((error) => console.error(error,'Error al cargar el plato'));
    }
  });

});























          

      