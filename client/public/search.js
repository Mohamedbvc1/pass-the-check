const restCradtemplate = document.querySelector("[data-rest-template]")
const restCradContainer = document.querySelector("[data-rest-cards-container]")
const searchInput = document.querySelector("[data-search]")
let restaurants = []
searchInput.addEventListener("input", e=>{
    const value = e.target.value.toLowerCase()
    restaurants.forEach(restaurant =>{
        const isVisible = 
       restaurant.address.toLowerCase().includes(value)
       restaurant.element.classList.toggle("hide", !isVisible)
    })
})

fetch("http://localhost:3000/data/restaurant.json")
    .then(res => res.json())
    .then(data =>{
        console.log("fetch done", data)
       restaurants = data.map(restaurant => {
        console.log('restaurant', restaurant)
            const card = restCradtemplate.Content.cloneNode(true).children[0]
            console.log('card', card)
            const name = card.querySelector("[data-name]") 
            const community = card.querySelector("[data-community]") 
            const address = card.querySelector("[data-address]") 
            name.textContent = restaurant.facilityname
            community.textContent = restaurant.area
            address.textContent = restaurant.address
            restCradContainer.append(card)
            console.log(restaurant.facilityname)
            return {name: restaurant.facilityname, area: restaurant.area, address: restaurant.address, element: card}
       }
       ) 
    })
    .catch(error => console.error());

