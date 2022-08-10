const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonInfo = document.querySelector(".btn-info");
const popup = document.querySelector(".popup-wrapper");
const closePopup = document.querySelector(".popup-close")

let searchPokemon = 1;
let pokemonHeight = document.querySelector(".height");
let pokemonWeight = document.querySelector(".weight");
let pokemonType1 = document.querySelector(".main-type");

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){

        const data = await APIResponse.json();

        return data;
    }
    
}
const renderPokemon =  async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML ='';

    const data =  await fetchPokemon(pokemon);

    if(data){
    
        pokemonImage.style.display = 'block';
        
        pokemonName.innerHTML = data.name;

        pokemonNumber.innerHTML = data.id;

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 

        input.value = '';

        searchPokemon.innerHTML = data.id;

        pokemonWeight.innerHTML = `Weight: ${data.weight /10} kg` ;

        pokemonHeight.innerHTML = `Height: ${data.height/10} m` ;

        pokemonType1.innerHTML = `Main Type: ${data['types']['0']['type']['name']}`;
    
        
    }   else{

        pokemonImage.style.display = 'None'

        pokemonName.innerHTML = 'Not Found :/';

        pokemonNumber.innerHTML = '';

        pokemonWeight.innerHTML = 'Weight: none' ;

        pokemonHeight.innerHTML = 'Height: none' ;

        pokemonType1.innerHTML = 'Main Type: None';
    
    }
}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());


});

buttonPrev.addEventListener('click', () => {

    if(searchPokemon>1){

    searchPokemon -= 1;

    renderPokemon(searchPokemon);

    }
});
buttonNext.addEventListener('click', () => {

    if(searchPokemon<649){
        searchPokemon += 1;

        renderPokemon(searchPokemon);
    }else{

        pokemonImage.style.display = 'none';

        pokemonName.innerHTML = 'Limited until gen V';

        pokemonNumber.innerHTML = '';
    }
    

});

/*popup info configurations*/
buttonInfo.addEventListener('click', () => {
    popup.style.display = 'block';
});


popup.addEventListener('click', event =>{
    const classNameOfClickedElement = event.target.classList[0]
    const classNames = ['popup-close', 'popup-wrapper']
    const shouldClosePopup = classNames.some(className => 
        className === classNameOfClickedElement)
    if(shouldClosePopup){
        popup.style.display = 'none';
    }

});

renderPokemon(searchPokemon);