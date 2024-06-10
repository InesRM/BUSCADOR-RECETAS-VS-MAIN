window.addEventListener("load", function () {

// Selectores
const categoriasSelectElement = document.querySelector('#categories');
const resultadoElement = document.querySelector('#resultado');
const modalElement = new bootstrap.Modal('#modal', {});
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

//Cargar dishes de la categoría seleccionada utilizando el script getDishes.php

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
                <button class="btn btn-primary" data-dish-name="${dish.name}">Ver más</button>
              </div>
            </div>
          `;
          resultadoElement.appendChild(div);
        });
      })
      .catch((error) => console.error(error, 'Error al cargar los platos'));
  }
});
});

// Mostrar modal con la información del plato seleccionado

//tenemos un modalElement en el DOM que es el modal que se va a mostrar

const limpiarHTML = (selector) => {
  while (selector.firstChild) {
    selector.removeChild(selector.firstChild);
  } 
}


//Consultar dish por name

const consultarDish = (name) => {
  fetch(`../php/getDishByName.php?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
      const dish = data[0];
      const modalBody = document.querySelector('.modal-body');
      limpiarHTML(modalBody);
      const div = document.createElement('div');
      div.innerHTML = `
        <img src="${dish.image}" class="img-fluid"
        <p><strong>Nombre:</strong> ${dish.name}</p>
        <p><strong>Descripción:</strong> ${dish.description}</p>

      `;
      modalBody.appendChild(div);
      modalElement.show();
      
}
    )
    .catch((error) => console.error(error, 'Error al cargar el plato'));
}

// Evento para abrir el modal

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const dishName = e.target.getAttribute('data-dish-name');
    consultarDish(dishName);
  }
}
);

// Buscar platos por nombre

















          

      