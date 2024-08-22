let bodySegmentation;
let video;
let segmentation;
let bgImage;
let imageCounter = 0;
let qrCodeImg;

function preload() {
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", { maskType: "background" });
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('canvasContainer');

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySegmentation.detectStart(video, gotResults);

  // Listen for changes in localStorage (used by control.js)
  window.addEventListener('storage', handleStorageChange);

  // Load the background if previously selected in localStorage
  const savedBackground = localStorage.getItem('selectedBackground');
  if (savedBackground) {
    selectBackground(savedBackground);
  }
}

function draw() {
  if (bgImage) {
    background(bgImage);
  } else {
    background(0);
  }

  if (segmentation) {
    video.mask(segmentation.mask);
    image(video, 0, 0);
  }
}

function selectBackground(imagePath) {
  bgImage = loadImage(imagePath);
}

function startCountdown() {
  setTimeout(downloadImage, 5000);
}

function gotResults(result) {
  segmentation = result;
}

function downloadImage() {
  // Generate a unique filename based on the current timestamp
  let timestamp = Date.now();
  let filename = `segmented-image-${timestamp}.png`;
  
  // Save the canvas with the unique filename
  saveCanvas(filename, 'png');
  
  // Create the local image URL (assuming you're using Serveo or similar service)
  let localImageUrl = `https://8f342214a380c4ed504bd40b7f263193.serveo.net/${filename}`;

  // Remove the previous QR code image if it exists
  if (qrCodeImg) {
    qrCodeImg.remove();
  }

  // Generate the new QR code URL using the local image URL
  let qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(localImageUrl)}`;
  qrCodeImg = createImg(qrCodeURL, 'QR Code to download image');
  qrCodeImg.parent('qrCodeContainer');
}

function resetImage() {
  // Reset the image counter (if needed)
  imageCounter = 0;

  // Remove the QR code image from the DOM
  if (qrCodeImg) {
    qrCodeImg.remove();
  }

  // Clear the background image and segmentation
  bgImage = null;
  segmentation = null;

  // Clear the canvas
  clear();
}

function handleStorageChange(event) {
  if (event.key === 'selectedBackground') {
    selectBackground(event.newValue);
  } else if (event.key === 'action') {
    if (event.newValue === 'download') {
      startCountdown();
    } else if (event.newValue === 'reset') {
      resetImage();
    }
  }
}
