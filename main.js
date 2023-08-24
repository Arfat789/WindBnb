const container = document.getElementById('box-container')
const openBox = document.getElementById('filter-place')
const openHeader = document.getElementById('open-header')
const mainBody = document.getElementById('main-body')
const searchBTN = document.getElementById('search-btn')
const filter1 = document.getElementById('filter-bottom')
const filter2 = document.getElementById('filter-guest-bottom')
const locationBTN = document.getElementById('btn-location')
const guestBTN = document.getElementById('guest-btn')
const mapText = document.getElementById('map-text')
const mapText2 = document.getElementById('map-text2')
const pText = document.querySelectorAll('.p-text')
const minusAdult = document.getElementById('minusAdult')
const plusAdult = document.getElementById('plusAdult')
const counterAdultText = document.getElementById('counterAdult')
const minusChild = document.getElementById('minusChild')
const plusChild = document.getElementById('plusChild')
const counterChildText = document.getElementById('counterChild')







let list = [];
let textMap = '';
let cityIndex = 3;
let adultCounter = 0;
let childCounter = 0;


let vassaList;
let helsinkiList;
let ouluList ;
let turkuList;


setTimeout(() => {
 vassaList = list.filter((letter)=>  letter.city == 'Vaasa')
 helsinkiList = list.filter((letter)=>  letter.city == 'Helsinki')
ouluList = list.filter((letter)=>  letter.city == 'Oulu')
 turkuList = list.filter((letter)=>  letter.city == 'Turku')
}, 200);

 






fetch('./stays.json') // the cachesh the json file
  .then(response => response.json())
  .then(jsonObject => {
    // Assign the parsed JSON data to an object
    for (const item of jsonObject) {
      list.push(item);
    }
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON:', error);
  });




  function update(){ //this is the fucntion that updates list form json file
    setTimeout(() => {
        let totalGuest = adultCounter + childCounter;
        container.innerHTML = ''
        let uselesslist;
        if(cityIndex == 0){
           uselesslist = vassaList;
        }else if(cityIndex == 1){
          uselesslist = helsinkiList;
        }else if(cityIndex == 2){
          uselesslist = ouluList;
        }
        else if(cityIndex == 3){
          uselesslist = turkuList;
        }
        if(totalGuest > 0){
          const newUseLessList  = uselesslist.filter((item) => item.maxGuests >= totalGuest)
          uselesslist = newUseLessList;
          
        }
        
        uselesslist.forEach((data,index)=>{  
             const taskDiv = document.createElement("div");
             taskDiv.classList.add('main-box')
             if(uselesslist.length > 0){
              taskDiv.innerHTML = ' <div class="main-box"> <img src="'+ data.photo +'" alt="">  <div class="box-text-box"> <p class="super-host">Super Host</p> <p>'+ data.type +'</p> <div class="flex"><i class="fa-solid fa-star"></i><p>'+ data.rating +'</p></div> </div><h3>'+ data.title +'</h3> </div> '
              container.appendChild(taskDiv);
              

             }
             
            
              

        })
        
    }, 300);
  }




  openBox.onclick = ()=>{
    openHeader.style.display  = 'flex';
    mainBody.classList.toggle('overlay')
    update()
  }


  searchBTN.onclick = ()=>{
    openHeader.style.display  = 'none';
    mainBody.classList.toggle('overlay')
    update()
  }

  locationBTN.onclick = ()=>{
    filter1.style.display = 'flex'
    filter2.style.display = 'none'
  }

  guestBTN.onclick = ()=>{

    filter2.style.display = 'flex'
    filter1.style.display = 'none'
  }



  pText.forEach((text)=>{
    text.onclick = ()=>{
        textMap = text.textContent;
        mapText.textContent = text.textContent;
        mapText2.textContent = text.textContent;
        if(text.textContent == 'Vassa, Finland'){
          cityIndex = 0;
        }else if(text.textContent == 'Helsinki, Finland'){
          cityIndex = 1;
        }
        else if(text.textContent == 'Oulu, Finland'){
          cityIndex = 2;
        }
        else if(text.textContent == 'Turku, Finland'){
          cityIndex = 3;
        }
        
        
    }
  })



  minusAdult.onclick = ()=>{
    if(adultCounter <= 0){
      return;
    }
    adultCounter--;
    counterAdultText.textContent = adultCounter;
  }

  plusAdult.onclick = ()=>{
      adultCounter++;
      counterAdultText.textContent = adultCounter;

  }


  
  minusChild.onclick = ()=>{
    if(childCounter <= 0){
      return;
    }
    childCounter--;
    counterChildText.textContent = childCounter;
    
  }

  plusChild.onclick = ()=>{
      childCounter++;
      counterChildText.textContent = childCounter;

  }


 



  