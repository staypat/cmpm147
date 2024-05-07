/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
    return [
      {
        name: "Lunch atop a Skyscraper", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/lunch-on-a-skyscraper.jpg?v=1714798266994",
        credit: "Lunch atop a Skyscraper, Charles Clyde Ebbets, 1932",
        drawShape: rect
      },
      {
        name: "Train Wreck", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/train-wreck.jpg?v=1714798264965",
        credit: "Train Wreck At Monteparnasse, Levy & fils, 1895",
        drawShape: rect
      },
      {
        name: "Migrant mother", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/migrant-mother.jpg?v=1714778906791",
        credit: "Migrant Mother near Nipomo, California, Dorothea Lange, 1936",
        drawShape: ellipse
      },
      {
        name: "Disaster Girl", 
        assetUrl: "https://cdn.glitch.global/3abd0223-86fb-43ce-a00a-fde12615bcd5/girl-with-fire.jpg?v=1714778905663",
        credit: "Four-year-old Zoë Roth, 2005",
        drawShape: ellipse
      },
      {
        name: "Nature", 
        assetUrl: "https://cdn.glitch.global/a2d93ee5-e2c3-454b-a80f-6ef7741ff671/nature.webp?v=1714878840527",
        credit: "Landscape Photography, Megan A, 2019",
        drawShape: ellipse
      },
      {
        name: "Northern Lights", 
        assetUrl: "https://cdn.glitch.global/a2d93ee5-e2c3-454b-a80f-6ef7741ff671/northern-lights.jpg?v=1714878869683",
        credit: "Northern Lights in Alaska, Beth Ruggiero-York, 2024",
        drawShape: ellipse
      },
      {
        name: "Cherry Blossoms", 
        assetUrl: "https://cdn.glitch.global/a2d93ee5-e2c3-454b-a80f-6ef7741ff671/cherry-blossom.jpg?v=1714878885852",
        credit: "Cherry Blossom Trees, Peerapat Tandavanitj, 2024",
        drawShape: ellipse
      },
    ];
  }
  
  function initDesign(inspiration) {
    
    // code taken from Wes Modes website
    let canvasContainer = $('.image-container'); 
    let canvasWidth = canvasContainer.width(); 
    let aspectRatio = inspiration.image.height / inspiration.image.width;
    let canvasHeight = canvasWidth * aspectRatio; 
    resizeCanvas(canvasWidth, canvasHeight);
    $(".caption").text(inspiration.credit); 

    
    const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
    $('#original').empty();
    $('#original').append(imgHTML);

    let design = [];
    for (let i = 0; i < 1000; i++) {
      let shape = {
        x: random(width),
        y: random(height),
        diameter: random(8, 16)
      };
      design.push(shape);
    }
  
    return design;
  }
  
  function renderDesign(design, inspiration) {
    background(255);
    noStroke();
    inspiration.image.loadPixels();
  
    let imageWidth = inspiration.image.width;
    let imageHeight = inspiration.image.height;
    
    rectMode(CENTER);
  
    for (let shape of design) {
      let pixelX = Math.floor((shape.x / width) * imageWidth);
      let pixelY = Math.floor((shape.y / height) * imageHeight);
      pixelX = constrain(pixelX, 0, imageWidth - 1);
      pixelY = constrain(pixelY, 0, imageHeight - 1);
      let pixelIndex = (pixelY * imageWidth + pixelX) * 4;
      let r = inspiration.image.pixels[pixelIndex];
      let g = inspiration.image.pixels[pixelIndex + 1];
      let b = inspiration.image.pixels[pixelIndex + 2];
      fill(r, g, b);
      inspiration.drawShape(shape.x, shape.y, shape.diameter, shape.diameter);
    }
  
    inspiration.image.updatePixels();
  }
  
  function mutateDesign(design, inspiration, rate) {
    for (let shape of design) {
      shape.diameter = mut(shape.diameter || 50, 30, 60, rate);
    }
  }
  
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 20), min, max);
  }
  