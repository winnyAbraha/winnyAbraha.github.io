let tasks = [
    {
      id: 1,
      title: "TSIRUR STATEMENT NECKLACE",
      description: "14K real gold plated on recycled brass",
      price: 4350,
      rate: 3,
      rate1: "fa fa-star checked",
      rate2: "fa fa-star checked",
      rate3: "fa fa-star checked",
      rate4: "fa fa-star ",
      rate5: "fa fa-star ",
      btn:'Shop now',
      image:
        "https://cdn.shopify.com/s/files/1/0101/3478/2011/products/Tsirur_Necklace_2_Model_2048x.jpg?v=1606261852",
      
    },
    {
      id: 2,
      title: "14K real gold plated on recycled brass",
      description: "14K real gold plated Antique Finish on recycled brass",
      price: 1500,
      rate: 5,
      rate1: "fa fa-star checked",
      rate2: "fa fa-star checked",
      rate3: "fa fa-star checked",
      rate4: "fa fa-star checked",
      rate5: "fa fa-star checked",
      btn:'Shop now',
      image:
        "https://cdn.shopify.com/s/files/1/0101/3478/2011/products/NK2_Anti_Syo_2048x.jpg?v=1606327811",
    },
    {
      id: 3,
      title: "AXUM CROSS",
      description: "14K gold plated with antique finish on recycled brass",
      price: 1000,
      rate: 2,
      rate1: "fa fa-star checked",
      rate2: "fa fa-star checked",
      rate3: "fa fa-star ",
      rate4: "fa fa-star ",
      rate5: "fa fa-star",
      btn:'Shop now',
      image:
        "https://cdn.shopify.com/s/files/1/0101/3478/2011/products/NK2_GP_Wuletta_2048x.jpg?v=1606326648",
    },
    {
      id: 4,
      title: "LALIBELA CROSS",
      description:
        "Necklace chain: 14” to 16”, adjustable chain with 3 loop holes",
      price: 1200,
      rate: 4,
      rate1: "fa fa-star checked",
      rate2: "fa fa-star checked",
      rate3: "fa fa-star checked",
      rate4: "fa fa-star checked",
      rate5: "fa fa-star",
      btn:'Shop now',
      
      image:
        "https://cdn.shopify.com/s/files/1/0101/3478/2011/products/NK1_Anti_Center_2048x.jpg?v=1606328110",
    },
  ];
  
  let cardContainer;
  
  let createTaskCard = (task) => {
    let card = document.createElement("div");
    card.className = "card shadow cursor-pointer";
  
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
  
    let title = document.createElement("h5");
    title.innerText = task.title;
    title.className = "card-title";
  
    let price = document.createElement("h4");
    price.innerText = task.price;
    price.className = "card-color";
  
    let button = document.createElement('button')
    button.innerHTML = task.btn
    button.className = 'card-btn'
    
  
    let i1 = document.createElement("span");
    i1.className = task.rate1;
    let i2 = document.createElement("span");
    i2.className = task.rate2;
    let i3 = document.createElement("span");
    i3.className = task.rate3;
    let i4 = document.createElement("span");
    i4.className = task.rate4;
    let i5 = document.createElement("span");
    i5.className = task.rate5;
  
    let description = document.createElement("p");
    description.innerText = task.description;
    description.className = "card-color";
  
    
    let image = document.createElement("img");
    image.src = task.image;
    image.className = "img-fluid";
    image.id = "img123";
    cardBody.appendChild(title);
    cardBody.appendChild(i1);
    cardBody.appendChild(i2);
    cardBody.appendChild(i3);
    cardBody.appendChild(i4);
    cardBody.appendChild(i5);
    cardBody.appendChild(price);
    cardBody.appendChild(description);
    
   
    cardBody.appendChild(image);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    cardBody.appendChild(button);
    button.onclick = function(){
      window.location.href = 'selectedProduct.html'
    }
  };
  
  function executeRating(stars) {
    const starClassActive = "rating__star fas fa-star";
    const starClassInactive = "rating__star far fa-star";
    const starsLength = stars.length;
    let i;
    stars.map((star) => {
      star.onclick = () => {
        i = stars.indexOf(star);
  
        if (star.className === starClassInactive) {
          for (i; i >= 0; --i) stars[i].className = starClassActive;
        } else {
          for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
        }
      };
    });
  }
  
  function initListOfTasks() {
    if (cardContainer) {
      document.getElementById("card-container").replaceWith(cardContainer);
      return;
    } else {
      cardContainer = document.getElementById("card-container");
      const ratingStars = [...document.getElementsByClassName("rating__star")];
      tasks.forEach((task) => {
        createTaskCard(task);
        executeRating(ratingStars);
      });
    }
  }
  
  initListOfTasks();
  
  function sortedPriceFunc() {
    document.getElementById("card-container").innerHTML = "";
    let sortedPrice = tasks.sort((a, b) => (a.price > b.price ? 1 : -1));
    console.log(sortedPrice);
    cardContainer = document.getElementById("card-container");
    sortedPrice.map((item) => {
      createTaskCard(item);
    });
  }
  
  function sortedPriceFunc2() {
    document.getElementById("card-container").innerHTML = "";
    let sortedPrice = tasks.sort((a, b) => (a.price < b.price ? 1 : -1));
    console.log(sortedPrice);
    cardContainer = document.getElementById("card-container");
    sortedPrice.map((item) => {
      createTaskCard(item);
    });
  }
  
  function sortedRateFunc() {
    document.getElementById("card-container").innerHTML = "";
    let sortedRate = tasks.sort((a, b) => (b.rate > a.rate ? 1 : -1));
    cardContainer = document.getElementById("card-container");
    sortedRate.map((item) => {
      createTaskCard(item);
    });
  }