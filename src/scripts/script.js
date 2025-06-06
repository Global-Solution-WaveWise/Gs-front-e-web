const GOOGLE_API_KEY = "AIzaSyAGLJTKB4b-2jKYgKgsMKJCC4xOPI_GYic";
let map;
let marker;

function loadGoogleMapsScript(callback) {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
}

function initializeMap() {
  const initialPosition = { lat: -23.5505, lng: -46.6333 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: initialPosition,
    zoom: 12,
  });

  marker = new google.maps.Marker({
    position: initialPosition,
    map: map,
  });

  getWeather(initialPosition.lat, initialPosition.lng);

  document.getElementById("buscar").addEventListener("click", () => {
    const cep = document.getElementById("cep").value.trim();
    if (cep) {
      buscarCoordenadasPorCEP(cep);
    }
  });
}

function buscarCoordenadasPorCEP(cep) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${GOOGLE_API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        map.setCenter(location);
        marker.setPosition(location);
        getWeather(location.lat, location.lng);
      } else {
        alert("CEP não encontrado!");
      }
    })
    .catch((err) => {
      console.error("Erro ao buscar o CEP:", err);
    });
}

function getWeather(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=precipitation_probability&timezone=auto`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const climaDiv = document.getElementById("clima");

      const temperatura = data.current_weather?.temperature ?? "-";
      const chanceChuva = data.hourly?.precipitation_probability?.[0] ?? "-";

      climaDiv.innerHTML = `
        <p><strong>Temperatura atual:</strong> ${temperatura}°C</p>
        <p><strong>Chance de chuva (próxima hora):</strong> ${chanceChuva}%</p>
      `;
    })
    .catch((err) => {
      console.error("Erro ao buscar clima:", err);
      document.getElementById("clima").innerText = "Erro ao buscar clima.";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadGoogleMapsScript(initializeMap);
});

// Mudando a cor do background

const backgroundChange = document.querySelectorAll(".background");
const backgroundMap = document.querySelector("#sectionCep");

function trocar(cor) {
  document.querySelectorAll(".background").forEach((el) => {
    el.style.background = cor;
  });
}

// Header

const color = document.querySelector(".color");
const btn_navbar = document.querySelector(".btn_navbar");
const nav = document.querySelector(".nav");
const body = document.getElementsByTagName("body")[0];

// Navbar para mobile
btn_navbar.addEventListener("click", () => {
  nav.classList.toggle("active");
  // Muda a cor do header quando o menu está ativo
  const header = document.querySelector(".header.background");
  if (nav.classList.contains("active")) {
    header.classList.add("menu-ativo");
  } else {
    header.classList.remove("menu-ativo");
  }
});

// Mudando a cor do background
color.addEventListener("click", () => {
  body.classList.toggle("background_transform");
  body.classList.remove("background");
});
