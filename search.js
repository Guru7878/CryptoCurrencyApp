
// importing via module the function fetching data from API
import { getRates } from './queries.js';

// loading search page elements into variable in order to find and access them

// const coinCard = document.querySelector('#coinCard');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
// const cards = document.querySelector('.card');
const cardRow = document.querySelector ('.row');
// cardRow.addEventListener('click', function (params) {
//   console.log(cardRow);
// })

const searchValue = localStorage.getItem('searchValue');
if(searchValue){
  searchInput.value = searchValue;
}

// Function to display result

function displayRates(result){
  // console.log(result);
  for(var i = 0; i < result.data.length; i++){
    // console.log(result)
    // + sign is used to override the browser behaviour of deleting previous data and the displaying the recent one
    // cardTitle.innerHTML += result.data[i].name;
    // priceUsd.innerHTML += result.data[i].priceUsd;
    // priceChange24.innerHTML += result.data[i].changePercent24Hr;
    
    // Create Elements of the Card

    // 1. Create a div elements for 
    
    var newCol = document.createElement('div');
    newCol.className ='col';

    var cardContainer = document.createElement('div');
    cardContainer.className = 'card'

    var cardBody = document.createElement ('div');
    cardBody.className = 'card-body';

      // 2. Display Text

      // a. Create h3 element for name property of coin 
      
      var coinTitle = document.createElement('h3');
      coinTitle.className = 'card-title';
      // b. Create textNode to insert string 'name' property of coin
      var coinTitleText = document.createTextNode (result.data[i].name);
      coinTitle.appendChild(coinTitleText);
      
      // cards.appendChild(newCol);

      // b. p element for price display

      if(result.data[i].priceUsd != null) {

        let coinPriceLabel = document.createElement('strong');
        coinPriceLabel.innerHTML = "Price in USD : ";
        var coinPrice = document.createElement('p');
        coinPrice.appendChild (coinPriceLabel);
        // bootstrap card
        coinPrice.className= 'card-text';
        var coinPriceValue = document.createTextNode (result.data[i].priceUsd);
        coinPrice.appendChild(coinPriceValue);

      }
      
      
     
      
      // cards.appendChild(newCol);

      // c. p element for price change display
      if (result.data[i].changePercent24Hr != null){
        let priceChange24Label = document.createElement('strong');
        priceChange24Label.innerHTML = "Price Change (24Hr): ";
        var coinPriceChange24 = document.createElement('p');
        coinPriceChange24.appendChild(priceChange24Label);
        coinPriceChange24.className= 'card-text';
        var priceChange24 = document.createTextNode(result.data[i].changePercent24Hr);
        coinPriceChange24.appendChild(priceChange24);
       
        } else {
          let priceChange24Label = document.createElement('strong');
          priceChange24Label.innerHTML = "Price Change (24Hr): ";
          var coinPriceChange24 = document.createElement('p');
          coinPriceChange24.appendChild(priceChange24Label);
          coinPriceChange24.className= 'card-text';
          var priceChange24 = document.createTextNode("No Data Available");
          coinPriceChange24.appendChild(priceChange24);
        }

          

        // }
       

        // newCol.appendChild(coinTitle);
        // newCol.appendChild(coinPriceChange24);
        // newCol.appendChild(coinPrice);
        // cards.appendChild(newCol);

        cardBody.appendChild(coinTitle);
        cardBody.appendChild(coinPrice);
        cardBody.appendChild(coinPriceChange24);
        cardContainer.appendChild(cardBody);
        newCol.appendChild(cardContainer);
        cardRow.appendChild(newCol);


      // coinCard.innerHTML += `<p>${result.data[i].priceUsd}</p>`
      // coinCard.innerHTML += `<p>${result.data[i].changePercent24Hr}</p>`
    }
  }

    searchBtn.addEventListener('click', async function(){
        // coinCard.innerHTML = '';
        const searchValue = searchInput.value;
        localStorage.setItem('searchValue', searchValue);
        // console.log(searchValue);
          if (!searchValue) {console.log ("search");
            return;

          }
        const result =  await getRates(searchValue, 20);

        // console.log(result);
        // cards.innerHTML = "";
        cardRow.innerHTML = "";
        displayRates(result);
        searchInput.value ="";
    }
)