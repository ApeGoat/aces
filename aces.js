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
  cards[randomIndex].style.display = 'flex';
  if (randomIndex == 1){
    const whale = document.getElementById('whale');
    gsap.to(whale, { y: '200vh', duration: 1.5, ease: 'power1.inOut', delay: 1.8 });   
    gsap.to(whale, { opacity: 1, delay: 1.8 });    
 
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
  const { clientX: x, clientY: y } = event;
  gsap.to(cursorArea, { x: x - cursorArea.offsetWidth / 2, y: y - cursorArea.offsetHeight / 2, duration: 0.2 });
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
    if (isOverlapping(cursorArea, element)) {
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

splitAllText();
// Add mousemove event listener to the document to check for overlap
document.addEventListener('mousemove', checkOverlap);

// Add mousemove event listener to the document
document.addEventListener('mousemove', updateCursorPosition);

