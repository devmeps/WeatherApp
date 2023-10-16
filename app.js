// Función para obtener los datos del clima utilizando la API de OpenWeatherMap
function getWeatherData(location) {
    // Clave de API para acceder a la API de OpenWeatherMap
    const apiKey = "c3d4b9072ca2bfbb3d54685322b94d3c";
    // Construir la URL de la API utilizando la ubicación y la clave de API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    // Realizar una solicitud fetch a la URL y devolver una promesa
    return fetch(url)
      .then(response => response.json()) // Convertir la respuesta en formato JSON
      .then(data => {
        // Extraer los datos relevantes del clima de la respuesta JSON
        const weatherData = {
          temperature: data.main.temp, // Temperatura actual
          condition: data.weather[0].main, // Condición climática principal
          location: data.name, // Nombre de la ubicación
        };
        // Devolver los datos del clima
        return weatherData;
      });
  }
  
  // Función para actualizar la interfaz de usuario con los datos del clima
  function updateUI(weatherData) {
    // Seleccionar los elementos HTML que mostrarán los datos del clima
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const location = document.querySelector("#location");
  
    // Actualizar el contenido de los elementos HTML con los datos del clima
    temperature.textContent = `${weatherData.temperature}°C`; // Temperatura
    condition.textContent = weatherData.condition; // Condición climática
    location.textContent = weatherData.location; // Ubicación
  }
  
  // Obtener las referencias a los elementos HTML del botón de búsqueda y el campo de búsqueda
  const searchBtn = document.querySelector("#search-btn");
  const searchBar = document.querySelector("#search-bar");
  
  // Añadir un event listener al botón de búsqueda que se activa al hacer clic
  searchBtn.addEventListener("click", () => {
    // Obtener el valor del campo de búsqueda (ubicación)
    const location = searchBar.value;
    // Obtener los datos del clima utilizando la función getWeatherData()
    getWeatherData(location)
      .then(weatherData => {
        // Actualizar la interfaz de usuario con los datos del clima obtenidos
        updateUI(weatherData);
      })
      .catch(error => {
        // Manejar cualquier error que ocurra durante la obtención de los datos del clima
        console.log(error);
      });
  });