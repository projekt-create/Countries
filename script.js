// api
const url = "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,languages,currencies";

// main elements
const Main = document.querySelector("main");

// fillter elements
const Continents = document.querySelector("#Continents");
const Search = document.querySelector("#search");

// Loader
const Loading = document.querySelector(".Loading");




// fetch 
const Data = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => render(data));
}

Data();

function render (data) {
    Main.innerHTML = "";
    data.forEach((country) => {
        Main.innerHTML += `
            <div class="countries" data-name="${country.name.common}">
                <img src="${country.flags.png}" alt="${country.flags.alt}">
                <div class="country-info">
                    <h3 class="country-name">${country.name.common}</h3>
                    <p class="country-Continents">🌏 ${country.region}</p>
                    <p class="country-population">👥 ${country.population.toLocaleString()}</p>
                </div>
            </div>
        `;
        Loading.style.display = "none";
    });
}


// filter

Continents.addEventListener("change", (e) => {
    const value = e.target.value;
    Loading.style.display = "flex";

    if (value === "all") {
        Data();
    } else {
        fetch(`https://restcountries.com/v3.1/region/${value}?fields=name,flags,capital,region,population,languages,currencies`)
        .then(res => res.json())
        .then(data => render(data),
        Loading.style.display = "none");
    }
});     

console.log(Continents.value);

// search

Search.addEventListener("input", (e) => {
    if (Continents.value !== "all"){
        let All = document.querySelectorAll(".countries");
        let Name = document.querySelectorAll(".country-name");

        Name.forEach((country, i) => {
            if (country.textContent.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())) {
                All[i].style.display = "flex";
            } else {
                All[i].style.display = "none";
            }
        });        
    }else {
        let All = document.querySelectorAll(".countries");
        let Name = document.querySelectorAll(".country-name");

        Name.forEach((country, i) => {
            if (country.textContent.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())) {
                All[i].style.display = "flex";
            } else {
                All[i].style.display = "none";
            }
        });
    }
});

// Modal window