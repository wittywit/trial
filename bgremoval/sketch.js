/*
 * 👋 
 * This example demonstrates separating people from the background with ml5.bodySegmentation.
 */

let bodySegmentation;
let video;
let segmentation;
let bgImage; // Variable to hold the background image
let fileInput; // File input for image upload

let options = {
  maskType: "background",
};

function preload() {
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", options);
}

function setup() {
  createCanvas(640, 480);

  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  bodySegmentation.detectStart(video, gotResults);

  // Create file input for image upload
  fileInput = createFileInput(handleFile);
  fileInput.position(0, height + 60);

  // Create image selection buttons for default images
  createButton('Upload Image').mousePressed(() => fileInput.elt.click());

  // Create download button
  createButton('Download Image').mousePressed(downloadImage);
}

function draw() {
  if (bgImage) {
    background(bgImage);
  } else {
    background(0); // Fallback background
  }

  if (segmentation) {
    video.mask(segmentation.mask);
    image(video, 0, 0);
  }
}

// Callback function for body segmentation
function gotResults(result) {
  segmentation = result;
}

// Handle file upload
function handleFile(file) {
  if (file.type === 'image') {
    bgImage = loadImage(file.data, 
      () => console.log('Image loaded successfully'),
      (err) => console.error('Failed to load image:', err)
    );
  } else {
    console.log('Not an image file.');
  }
}

function downloadImage() {
  saveCanvas('segmented-image', 'png');
}
