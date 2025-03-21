"use strict";
console.log("Hello my JS!  :)");

//FORM
//- nombre-> required
//- apellido -> required
//- telefono -> validar formato telefono
//- email -> validar formato email y required

//- PAÍS -> SELECT!
//cargar lista paises haciendo un fetch GET a https://countriesnow.space/api/v0.1/countries/flag/unicode
// cargar solo NOMBRE del pais, limpiar datos

//- PROVINCIA -> SELECT! mostrar solo si selecciono un pais
// - cargar lista haciendo un fetch POST a https://countriesnow.space/api/v0.1/countries/states,
// - mandando por BODY en POST el pais que se ha seleccionado arriba para devolver sus PROVINCIAS
// ejemplo: {"country":"Spain"}
// - cargar solo NOMBRE de la provincia, limpiar datos
// - No cargar NADA en este desplegable si no hay pais seleccionado

// - botón AÑADIR --> al clickar se añade registro nuevo a la tabla ¿LOCALSTORAGE?

// TABLA: mismos campos que formulario, en formato tabular
// ¿que se carguen datos de algo, un JSON que yo me invente para que no esté vacía y así haga un FOREACH?

//========================
// 1. SELECCIÓN DEL DOM
//========================

// formulario
const userName = document.getElementById("name");
const surname = document.getElementById("surname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const form = document.getElementById("form-registry");
const successMessage = document.getElementById('message-success');
const errorsArea = document.getElementById("name-error");

// tabla
const button = document.getElementById("add-btn");
const usersTable = document.querySelector(".tbody-js");
const tableHand = document.querySelector(".table-container-js");

// desplegable info
const pInfo = document.querySelector(".p-info-js");
const ulInfo = document.querySelector(".ul-info-js");
const upInfo = document.querySelector(".up-js");
const downInfo = document.querySelector(".down-js");

// filtro
const filterSurname = document.getElementById("filter-surname");
const filterCountry = document.getElementById("filter-country");
const olFilter = document.getElementById("ol-filter");
const deleteButton = document.getElementById("delete-button");

//==========================
// 2. FUNCIONES UTILITARIAS
//==========================

// vallidar el email con formato email@email.com
function validateEmail(email) {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return mailRegex.test(email);
}

// validar telefon SI LO PONEN, porque tlf es optativo
function validatePhone(phone) {
  const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
  return phoneRegex.test(phone);
}

// limpiar los inputs del formularios tras añadir un usuario
function clearForm() {
  [userName, surname, phone, email, countrySelect].forEach(
    (input) => (input.value = "")
  );
  stateSelect.innerHTML =
    '<option value="">Selecciona un país primero</option>';
}

let isDown = false;
let startX;
let scrollLeft;

tableHand.addEventListener('mousedown', (ev) =>{
  isDown = true;
  tableHand.classList.add('active');
  startX = ev.pageX - tableHand.offsetLeft;
  scrollLeft = tableHand.scrollLeft;
});

tableHand.addEventListener('mouseleave', ()=>{
  isDown= false;
  tableHand.classList.remove('active');
});

tableHand.addEventListener('mouseup', ()=>{
  isDown = false;
  tableHand.classList.remove('active');
});

tableHand.addEventListener('mousemove', (ev)=>{
  if(!isDown) return;
  ev.preventDefault();
  const x = ev.pageX - tableHand.offsetLeft;
  const walk = (x-startX)*3; //velocidad
  tableHand.scrollLeft = scrollLeft - walk;
});

//==========================
// 3. FUNCIONES PRINCIPALES
//==========================

// FUNCION PARA AÑADIR USARIOS A LA TABLA
function addNewUser() {
  const errors = [];

  // Limpiar errores previos
  userName.classList.remove("input-error");
  surname.classList.remove("input-error");
  email.classList.remove("input-error");
  phone.classList.remove("input-error");

  // Validaciones
  if (!userName.value) {
    errors.push("El campo nombre es obligatorio.<br>");
    userName.classList.add("input-error");
  }

  if (!surname.value) {
    errors.push("El campo apellidos es obligatorio.<br>");
    surname.classList.add("input-error");
  }
  if (!email.value) {
    errors.push("El campo del correo electrónico es obligatorio.<br>");
    email.classList.add("input-error");
  }
  if (email.value && !validateEmail(email.value)) {
    errors.push(
      "El formato del correo electronico no es válido: email@email.com.<br>"
    );
    email.classList.add("input-error");
  }
  if (phone.value.trim() && !validatePhone(phone.value.trim())) {
    errors.push("Formato de teléfono no válido.<br>");
    phone.classList.add("input-error");
  }

  // no registrar un usuario ya existente
  const userExists = users.some(
    (user) =>
      user.name.toLowerCase() === userName.value.trim().toLowerCase() &&
      user.surname.toLowerCase() === user.surname.trim().toLowerCase()
  );

  if (userExists)
    errors.push("Ya existe un usuario con ese nombre y apellido.");

  //mostrar errores si los hay
  if (errors.length > 0) {
    errorsArea.innerHTML = errors.join("\n");
    // alert(errors.join("\n")); 
    return;
  }

  // nuevo usuario
  const newUser = {
    name: userName.value.trim(),
    surname: surname.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    country: countrySelect.value.trim(),
    state: stateSelect.value.trim(),
  };
  // console.log("New user:", newUser);

  users.push(newUser); //Guardar usuario en el array
  // console.log("Users:", users);

  localStorage.setItem("users", JSON.stringify(users)); //guardar el array
  updateTable(); //Actualizar tabla
  clearForm(); //limpiar formulario

  errorsArea.innerHTML=''; // limpiar mensajes de error
  successMessage.innerHTML = `¡¡¡El usuario ${newUser.name} ${newUser.surname} se ha agregado correctamente!!!`;
  
  // desaparecer tras 5 segundos
  setTimeout(()=>{
    successMessage.innerHTML='';
  }, 5000);

  return newUser;
}

// renderizar la tabla con los usuarios
function updateTable(userList = users) {
  usersTable.innerHTML = ""; //limpiar tabla

  //añadir los usuarios del array a la tabla
  userList.forEach((user) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${user.name}</td>
                              <td>${user.surname}</td>
                              <td><a href="tel:${user.phone}">${user.phone}</a></td>
                              <td><a href="mailto:${user.email}">${user.email}</a></td>
                              <td>${user.country}</td>
                              <td>${user.state}</td>`;
    usersTable.appendChild(newRow);
  });
}

// FUNCIÓN PARA FILTRAR USUARIOS
function filterTable() {
  olFilter.innerHTML = "";

  if (!filterSurname.value.trim() && !filterCountry.value.trim()) {
    return;
  }

  const filterUsers = users.filter((user) => {
    const surnameMatch =
      user.surname.toLowerCase().includes(filterSurname.value.toLowerCase()) ||
      user.name.toLowerCase().includes(filterSurname.value.toLowerCase());

    const counrtyMatch = user.country
      .toLowerCase()
      .includes(filterCountry.value.toLowerCase());

    return surnameMatch && counrtyMatch;
  });

  // updateTable(filterUsers); // en caso de querer actualizar la tabla al filtrar

  filterUsers.forEach((user, index) => {
    const usersFiltered = document.createElement("li");
    usersFiltered.classList.add("users-filtered");
    usersFiltered.innerHTML = `
            <strong>${
              index + 1
            }.</strong> <img src="./images/usuario.png" alt="image usuario" class="img-usuario"/><strong>Usuario:</strong> ${
      user.name
    } ${user.surname}, 
            <strong>País:</strong> ${user.country}, 
            <strong>Provincia:</strong> ${user.state}, 
            <strong>email:</strong> <a href="mailto:${user.email}">${
      user.email
    }</a>, 
            <strong>teléfono:</strong> <a href="tel:${user.phone}">${user.phone}</a>`;

    olFilter.appendChild(usersFiltered);
  });
}

// VACIAR LOS INPUTS MEDIANTE EL BOTÓN DE FILTRADO
function deletFilters() {
  filterSurname.value = "";
  filterCountry.value = "";
  olFilter.innerHTML = "";
}

// FUNCION PARA MOSTRAR EL DESPLEGABLE CON INFOMRACION SOBRE FUNCIONAMIENTO DE LA APLICACIÓN
function showInfo() {
  ulInfo.classList.toggle("hidden");
  downInfo.classList.toggle("hidden");
  upInfo.classList.toggle("hidden");
}

//====================
// 4. EVENTOS
//====================

// añadir usuario pulsando botón
button.addEventListener("click", (ev) => {
  ev.preventDefault();
  addNewUser();
});

// añadir usuario pulsando enter
form.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    // para que el formulario no se envie si estas dentro del select
    if (document.activeElement.tagName !== "SELECT") {
      addNewUser();
    }
  }
});

// mostrar desplegable con informacion
pInfo.addEventListener("click", showInfo);

// eventos relacionados con el filtrado
filterSurname.addEventListener("input", filterTable);
filterCountry.addEventListener("input", filterTable);
deleteButton.addEventListener("click", deletFilters);

//====================================================
// 5. CARGA INICIAL DE DATOS E INICIALIZACION DEL DOM
//====================================================

let users = JSON.parse(localStorage.getItem("users")) || [];
updateTable();

// const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
// if (usersFromLocalStorage) {
//     users = usersFromLocalStorage;
//     updateTable();
// }

document.addEventListener("DOMContentLoaded", () => {
  //CARGO PAÍSES
  async function loadCountries() {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/flag/unicode"
      );
      if (!response.ok) throw new Error("Error cargando los paises");

      const result = await response.json();
      countrySelect.innerHTML = '<option value="">Selecciona un país</option>';

      // Extraigo solo los nombres de los países
      const countryNames = result.data.map((country) => country.name);

      countryNames.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        countrySelect.appendChild(option);
      });
      console.log("Countries loaded:", countryNames);
    } catch (error) {
      //   console.error("Error loading countries:", error);
      alert("Error al cargar lalista de paises:" + error);
    }
  }

  //CARGO PROVINCIAS
  async function loadStates(country) {
    try {
      //   console.log("Sending country in body:", { country });

      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),

          //body: JSON.stringify({ country: countryName })
          // Para enviar la infomracion como clave:valor{"country":"Spain"} podría usar la forma --body: JSON.stringify({ country: countryName })--, pero en JS ES6, si la clave y el valor tienen el mismo nombre, se puede abreviar solo usando ({ country }). Ambas formas producen el mismo resultado en el cuerpo de la solicitud POST
        }
      );

      if (!response.ok)
        throw new Error(`Error al obtener los datos para ${country}`);

      const data = await response.json();

      // Verifica si la estructura del JSON contiene estados
      if (!data.data || !data.data.states || data.data.states < 1)
        throw new Error(`No se encontraron estados para ${country}`);

      // limpio datos y traigo solo el nombre de los states
      const stateNames = data.data.states.map((state) => state.name);

      console.log("States loaded:", stateNames);

      stateSelect.innerHTML = ""; //limpiar select

      if (stateNames.length > 0) {
        stateNames.forEach((name) => {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          stateSelect.appendChild(option);
        });
        // console.log(`Error al obtener los datos para ${country}`);
      } else {
        stateSelect.innerHTML =
          '<option value="">No hay provincias disponibles</option>';
      }
      //   console.log("Estados cargados para:", country);
    } catch (error) {
      console.error("Error cargando provincias:", error);
      stateSelect.innerHTML =
        stateSelect.innerHTML = `<option value="">No hay provincias disponibles para ${country}</option>`;
    }
  }

  //EVENTO CHANGE PARA SELECCIONAR PAÍS
  countrySelect.addEventListener("change", async () => {
    const selectedCountry = countrySelect.value;
    // console.log("País seleccionado:", selectedCountry);

    if (selectedCountry) {
      await loadStates(selectedCountry);
    } else {
      stateSelect.innerHTML =
        '<option value="">No hay provincias disponibles</option>';
    }
  });
  userName.focus(); // Enfocar el campo de nombre al cargar la página
  loadCountries();
});
