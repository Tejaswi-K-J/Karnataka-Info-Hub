document.addEventListener("DOMContentLoaded",function(){

  /* GENERATE ALL SECTIONS */

  generateSection(karnatakaDB.places,"placesContainer");
  generateSection(karnatakaDB.food,"foodContainer");
  generateSection(karnatakaDB.festivals,"festivalContainer");
  generateSection(karnatakaDB.wildlife,"wildlifeContainer");
  generateSection(karnatakaDB.tech,"techContainer");
  generateSection(karnatakaDB.regions,"regionContainer");
  generateSection(karnatakaDB.economy,"economyContainer");
  generateSection(karnatakaDB.arts,"artsContainer");


  /* HERO SLIDER */

  const slides=document.querySelectorAll(".slide");
  let currentSlide=0;

  if(slides.length>0){
    setInterval(()=>{
      slides.forEach(s=>s.classList.remove("active"));
      currentSlide=(currentSlide+1)%slides.length;
      slides[currentSlide].classList.add("active");
    },4000);
  }


  /* TYPING EFFECT */

  const text="One State. Many Worlds.";
  let i=0;
  function typing(){
    if(i<text.length){
      document.getElementById("typing").innerHTML+=text.charAt(i);
      i++;
      setTimeout(typing,70);
    }
  }
  typing();


  /* COUNTER ANIMATION */

  const counters=document.querySelectorAll(".counter");

  counters.forEach(counter=>{
    const update=()=>{
      const target=+counter.getAttribute("data-target");
      const current=+counter.innerText;
      const increment=target/200;

      if(current<target){
        counter.innerText=Math.ceil(current+increment);
        setTimeout(update,15);
      }else{
        counter.innerText=target;
      }
    };
    update();
  });


  /* REVEAL ON SCROLL */

  const reveals=document.querySelectorAll(".reveal");

  function revealOnScroll(){
    reveals.forEach(el=>{
      const windowHeight=window.innerHeight;
      const elementTop=el.getBoundingClientRect().top;

      if(elementTop<windowHeight-100){
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll",revealOnScroll);
  revealOnScroll();


  /* ACTIVE NAV HIGHLIGHT */

  const sections=document.querySelectorAll("section");
  const navLinks=document.querySelectorAll("nav a");

  window.addEventListener("scroll",()=>{
    let current="";

    sections.forEach(section=>{
      const sectionTop=section.offsetTop;
      if(pageYOffset>=sectionTop-200){
        current=section.getAttribute("id");
      }
    });

    navLinks.forEach(link=>{
      link.classList.remove("active");
      if(link.getAttribute("href")==="#"+current){
        link.classList.add("active");
      }
    });
  });


  /* BACK TO TOP BUTTON */

  const topBtn=document.getElementById("topBtn");

  window.addEventListener("scroll",()=>{
    topBtn.style.display=window.scrollY>600?"block":"none";
  });

  topBtn.onclick=()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  };

});



/* GENERATE CARDS */

function generateSection(data,containerId){

  const container=document.getElementById(containerId);

  if(!container || !data) return;

  container.innerHTML="";

  data.forEach(item=>{

    const card=document.createElement("div");
    card.className="card visible";

    card.innerHTML=`
      <div class="card-image">
        <img src="${item.image}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${item.title}</h3>
        <button onclick="openModal('${containerId}','${item.id}')">
          View More
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}



/* MODAL FUNCTION */

function openModal(section,id){

  const dataMap={
    placesContainer:karnatakaDB.places,
    foodContainer:karnatakaDB.food,
    festivalContainer:karnatakaDB.festivals,
    wildlifeContainer:karnatakaDB.wildlife,
    techContainer:karnatakaDB.tech,
    regionContainer:karnatakaDB.regions,
    economyContainer:karnatakaDB.economy,
    artsContainer:karnatakaDB.arts
  };

  const item=dataMap[section]?.find(x=>x.id===id);

  if(!item) return;

  document.getElementById("modalTitle").innerText=item.title;

  document.getElementById("modalBody").innerHTML=`
    <img src="${item.image}" class="modal-img">
    ${item.location?`<p><strong>Location:</strong> ${item.location}</p>`:""}
    ${item.highlight?`<p><strong>Highlight:</strong> ${item.highlight}</p>`:""}
    <p>${item.info}</p>
  `;

  const modal=document.getElementById("detailsModal");
  modal.style.display="flex";

  setTimeout(()=>{
    modal.classList.add("show");
  },10);
}



function closeModal(){
  const modal=document.getElementById("detailsModal");
  modal.classList.remove("show");

  setTimeout(()=>{
    modal.style.display="none";
  },300);
}