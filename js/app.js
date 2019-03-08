
   class ZOMATO {
    constructor(){
      this.api="459a6e8fee98c8683a083223bf309964";
      this.header = {
        method:"GET",
        headers: {
          "user-key":this.api,
          "Content-Type":"application/json"
        },
        credentials:"same-origin"
      };
    }
    async searchAPI(city,categoryID){
      const categoryURL = 'https://developers.zomato.com/api/v2.1/categories';
    
    const categoryInfo = await fetch(categoryURL,this.header);
    const categoryJSON = await categoryInfo.json();
    const categories = await categoryJSON.categories;
  
    return{
      categories
    }
    }
  }
  
  class UI {
      constructor(){
          this.loader = document.querySelector('.loader');
          this.restaurant = document.getElementById('restaurant-list');
      }
      addSelectOptions(categories){
          const search = document.getElementById("searchCategory");
          let output = `<option value='0' selected>select category</option>`;
          categories.forEach(category =>{
              output +=`<option value=${category.categories.id}">${category.categories.name}</option `;
          });
          search.innerHTML = output;
      }
    }

    showFeedback(text){
        const feedback = document.querySelector('.feedback');
        feedback.classList.add('showItem');
        feedback.innerHTML = '<p>${text}</p>';
        setTimeout(() => {
            feedback.classList.remove("showItem");
        },3000);
    }


  (function(){
    const searchForm = document.getElementById("searchForm");
    const searchCity = document.getElementById("searchCity");
    const searchCategory = document.getElementById("searchCategory");
  
      const zomato = new ZOMATO();
      const ui = new UI();
  
    document.addEventListener("DOMContentLoaded",()=>{
      zomato.searchAPI().then(data => ui.addSelectOptions(data.categories));
    });

    searchForm.addEventListener('submit', event => {
        event.preventDefault();

        const city = searchCity.value.toLocaleLowerCase();
        const categoryID = parseInt(searchCategory.value);

        if(city === ''|| categoryID === 0){
            ui.showFeedback('please enter a city and select category ')
        }
    }); 

  })();
   