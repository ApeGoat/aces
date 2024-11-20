const cards = document.querySelectorAll('.turn .cards');

// Function to hide all cards
function hideAllCards() {
  cards.forEach(card => {
    card.style.display = 'none';
  });
}

  // Function to show a random card
function showRandomCard() {
  hideAllCards();
  const randomIndex = Math.floor(Math.random() * cards.length);
  //const randomIndex = 2;
  cards[randomIndex].style.display = 'flex';
  switch (randomIndex){
    case 0:
      break;
    case 1:
      // Animate the whale falling
      const whale = document.getElementById('whale');
      gsap.to(whale, { y: '280vh', duration: 2, ease: 'power1.inOut', delay: 1.8 });   
      gsap.to(whale, { opacity: 1, delay: 1.8 });    
      gsap.set(whale, { y: '-280vh', opacity:0, delay: 3.8 });
      break;
    case 2:
      // Animate the precursor star(s)
      const star = document.getElementsByClassName('star');
      gsap.fromTo(star, 
        { scale: 0}, 
        { scale: 1, duration: 1, delay: 1.8 }
      );
      gsap.to(star, { opacity: 1, delay: 1.8 });   
      gsap.fromTo(star,
        { rotation: -60},
        { rotation: 120, duration: 2 , delay: 1.8 }
      );
      gsap.to(star, { scale: 0, duration: 1, delay: 2.8 });   
      
      // Animate the first meteor
      const meteor = document.getElementsByClassName('meteor');
      gsap.set(meteor, { scale: 0, opacity: 1 }); 
      gsap.to(meteor, { scale: 9, duration: 2, delay: 3.8, ease: 'power2.in' });
      gsap.to(meteor, { x: '120vw', y: '120vw', duration: 2, delay: 3.8, ease: 'power1.inOut' });
      gsap.set(meteor, { x: 0, y: 0, scale: 1, opacity: 0, delay: 5.8 }); // Reset position and scale
      break;
    default:
      break;
    }
}




// Select the header, button, and turn elements
const header = document.querySelectorAll('.header');
const dd = document.getElementById('dd');
const turn = document.querySelectorAll('.turn');
const bet = document.getElementById('bet');

// Set initial position of turns below the viewport
gsap.set(turn, { y: '100vh' });

// Add click event listener to the button
dd.addEventListener('click', () => {
  showRandomCard();
  // Animate the header to move up 100vh
  gsap.to(header, { y: '-100vh', duration: 1, ease: 'power1.inOut' });
  gsap.to(header, { opacity: 0, duration: 0.8 });
  // Animate each turn to slide up into view
  gsap.to(turn, { y: '0', duration: 1.8, ease: 'power1.inOut' });
  // Animate the button opacity to 1 after the turns have finished moving
  gsap.to(bet, { opacity: 1, duration: 1, delay: 2.8 });
});

bet.addEventListener('click', () => {

  gsap.to(turn, { y: '100vh', duration: 1, ease: 'power1.inOut' });
  gsap.to(bet, { opacity: 0, delay: 1 });

  // Animate the header to move up 100vh
  gsap.to(header, { y: '0', duration: 1.8, ease: 'power1.inOut' });
  gsap.to(header, { opacity: 1, duration: 1.8 });
  // Animate each turn to slide up into view
  
  // Animate the button opacity to 1 after the turns have finished moving
});

// Select the cursor-area element
const cursorArea = document.querySelector('.cursor-area');

// Function to split text into individual letters wrapped in span elements
function splitTextToSpans(element) {
  const text = element.innerText;
  element.innerHTML = '';
  text.split('').forEach(letter => {
    const span = document.createElement('span');
    span.innerText = letter;
    element.appendChild(span);
  });
}

// Split the text of the h1 and p elements into individual letters wrapped in span elements
function splitAllText() {
  let h1 = document.querySelector('.header h1');
  let p = document.querySelector('.header p');
  splitTextToSpans(h1);
  splitTextToSpans(p);
}

// Function to update the position of the cursor-area
function updateCursorPosition(event) {
  let x, y;
  if (event.type === 'mousemove') {
    x = event.clientX;
    y = event.clientY;
  } else if (event.type === 'touchmove') {
    x = event.clientX;
    y = event.clientY;
  }
  else if (event.type === 'pan') {
    x = event.center.x;
    y = event.center.y;
  }
  gsap.to(cursorArea, { x: x - cursorArea.offsetWidth / 2, y: y - cursorArea.offsetHeight / 2, duration: 0.1 });
}
// Function to check if two elements are overlapping
function isOverlapping(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const centerX1 = rect1.left + rect1.width / 2;
  const centerY1 = rect1.top + rect1.height / 2;

  const nearestX = Math.max(rect2.left, Math.min(centerX1, rect2.right));
  const nearestY = Math.max(rect2.top, Math.min(centerY1, rect2.bottom));

  const distance = Math.sqrt(Math.pow(centerX1 - nearestX, 2) + Math.pow(centerY1 - nearestY, 2));

  return distance < 100;
}

// Function to change color on overlap
function checkOverlap() {
  const headerLetters = document.querySelectorAll('.header p span, .header h1 span');
  const elementsToCheck = [...headerLetters];
  const dd = document.getElementById('dd');

  elementsToCheck.forEach(element => {
    if (isOverlapping(cursorArea, element) && window.getComputedStyle(element).color != 'rgb(118, 122, 124)') {
      gsap.to(element, { color: 'rgb(41, 173, 255)', duration: 0.1, ease: 'power1.inOut'});
    }
    else if (window.getComputedStyle(element).color === 'rgb(41, 173, 255)'){
      gsap.to(element, { color: 'rgb(118, 122, 124)', duration: 0.01, ease: 'power1.inOut'});
    }
  });
  if (isOverlapping(cursorArea, dd)) {
    gsap.to(dd, { backgroundColor: 'rgb(41, 173, 255)', duration: 0.5, ease: 'power1.inOut'});
  }
}

const lightSwitch = document.getElementById('lightswitch');
const neon = document.getElementById('neon');

lightSwitch.addEventListener('click', () => {
  if (lightSwitch.classList.contains('active')) {
    gsap.to(neon, { opacity: 0, duration: 1 });
    gsap.set(lightSwitch, { rotationX: 0});
    lightSwitch.classList.remove('active');
  } else {
    lightSwitch.classList.add('active');
    gsap.to(neon, { opacity: 1, duration: 1 });
    gsap.set(lightSwitch, { rotationX: 180 });
  }
  });


splitAllText();
// Add mousemove event listener to the document to check for overlap
document.addEventListener('mousemove', (event) => {
  updateCursorPosition(event);
  checkOverlap();
});
document.addEventListener('touchmove', (event) => {
  updateCursorPosition(event.touches[-1]);
  checkOverlap();
});
 const hammer = new Hammer(document);
 hammer.set({ domEvents: true});
// Add pan event listener to update cursor position and check for overlap
hammer.on('pan', (event) => {
  updateCursorPosition(event);
  checkOverlap();
});