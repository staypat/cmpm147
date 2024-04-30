// sketch.js - purpose and description here
// Author: Patrick Hu
// Date: 4/30/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

const w1 = (sketch) => {
  let tile_width_step_main; // A width step is half a tile's width
  let tile_height_step_main; // A height step is half a tile's height
  
  // Global variables. These will mostly be overwritten in setup().
  let tile_rows, tile_columns;
  let camera_offset;
  let camera_velocity;
  
  /////////////////////////////
  // Transforms between coordinate systems
  // These are actually slightly weirder than in full 3d...
  /////////////////////////////
  function worldToScreen([world_x, world_y], [camera_x, camera_y]) {
    let i = (world_x - world_y) * tile_width_step_main;
    let j = (world_x + world_y) * tile_height_step_main;
    return [i + camera_x, j + camera_y];
  }
  
  function worldToCamera([world_x, world_y], [camera_x, camera_y]) {
    let i = (world_x - world_y) * tile_width_step_main;
    let j = (world_x + world_y) * tile_height_step_main;
    return [i, j];
  }
  
  function tileRenderingOrder(offset) {
    return [offset[1] - offset[0], offset[0] + offset[1]];
  }
  
  function screenToWorld([screen_x, screen_y], [camera_x, camera_y]) {
    screen_x -= camera_x;
    screen_y -= camera_y;
    screen_x /= tile_width_step_main * 2;
    screen_y /= tile_height_step_main * 2;
    screen_y += 0.5;
    return [Math.floor(screen_y + screen_x), Math.floor(screen_y - screen_x)];
  }
  
  function cameraToWorldOffset([camera_x, camera_y]) {
    let world_x = camera_x / (tile_width_step_main * 2);
    let world_y = camera_y / (tile_height_step_main * 2);
    return { x: Math.round(world_x), y: Math.round(world_y) };
  }
  
  function worldOffsetToCamera([world_x, world_y]) {
    let camera_x = world_x * (tile_width_step_main * 2);
    let camera_y = world_y * (tile_height_step_main * 2);
    return new p5.Vector(camera_x, camera_y);
  }
  
  sketch.preload = () =>{
    if (p3_preload) {
      p3_preload();
    }
  };
  
  sketch.setup = () =>{
    let canvas = sketch.createCanvas(800, 400);
    canvas.parent("canvas-container-1");
  
    camera_offset = new p5.Vector(-sketch.width / 2, sketch.height / 2);
    camera_velocity = new p5.Vector(0, 0);
  
    if (p3_setup) {
      p3_setup();
    }
  
    let label = sketch.createP();
    label.html("World key: ");
    label.parent("canvas-container-1");
  
    let input = sketch.createInput("xyzzy");
    input.parent(label);
    input.input(() => {
      rebuildWorld(input.value());
    });
  
    sketch.createP("Arrow keys scroll. Clicking changes tiles.").parent("canvas-container-1");
  
    rebuildWorld(input.value());
  };
  
  function rebuildWorld(key) {
    if (p3_worldKeyChanged) {
      p3_worldKeyChanged(key);
    }
    tile_width_step_main = p3_tileWidth ? p3_tileWidth() : 32;
    tile_height_step_main = p3_tileHeight ? p3_tileHeight() : 14.5;
    tile_columns = Math.ceil(sketch.width / (tile_width_step_main * 2));
    tile_rows = Math.ceil(sketch.height / (tile_height_step_main * 2));
  }
  
  sketch.mouseClicked = () =>{
    let world_pos = screenToWorld(
      [0 - sketch.mouseX, sketch.mouseY],
      [camera_offset.x, camera_offset.y]
    );
  
    if (p3_tileClicked) {
      p3_tileClicked(world_pos[0], world_pos[1]);
    }
    return false;
  };
  
  sketch.draw = () =>{
    // Keyboard controls!
    if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
      camera_velocity.x -= 1;
    }
    if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
      camera_velocity.x += 1;
    }
    if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
      camera_velocity.y -= 1;
    }
    if (sketch.keyIsDown(sketch.UP_ARROW)) {
      camera_velocity.y += 1;
    }
  
    let camera_delta = new p5.Vector(0, 0);
    camera_velocity.add(camera_delta);
    camera_offset.add(camera_velocity);
    camera_velocity.mult(0.95); // cheap easing
    if (camera_velocity.mag() < 0.01) {
      camera_velocity.setMag(0);
    }
  
    let world_pos = screenToWorld(
      [0 - sketch.mouseX, sketch.mouseY],
      [camera_offset.x, camera_offset.y]
    );
    let world_offset = cameraToWorldOffset([camera_offset.x, camera_offset.y]);
  
    sketch.background(100);
  
    if (p3_drawBefore) {
      p3_drawBefore();
    }
  
    let overdraw = 0.1;
  
    let y0 = Math.floor((0 - overdraw) * tile_rows);
    let y1 = Math.floor((1 + overdraw) * tile_rows);
    let x0 = Math.floor((0 - overdraw) * tile_columns);
    let x1 = Math.floor((1 + overdraw) * tile_columns);
  
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        drawTile(tileRenderingOrder([x + world_offset.x, y - world_offset.y]), [
          camera_offset.x,
          camera_offset.y
        ]); // odd row
      }
      for (let x = x0; x < x1; x++) {
        drawTile(
          tileRenderingOrder([
            x + 0.5 + world_offset.x,
            y + 0.5 - world_offset.y
          ]),
          [camera_offset.x, camera_offset.y]
        ); // even rows are offset horizontally
      }
    }
  
    describeMouseTile(world_pos, [camera_offset.x, camera_offset.y]);
  
    if (p3_drawAfter) {
      p3_drawAfter();
    }
  };
  
  // Display a discription of the tile at world_x, world_y.
  function describeMouseTile([world_x, world_y], [camera_x, camera_y]) {
    let [screen_x, screen_y] = worldToScreen(
      [world_x, world_y],
      [camera_x, camera_y]
    );
    drawTileDescription([world_x, world_y], [0 - screen_x, screen_y]);
  }
  
  function drawTileDescription([world_x, world_y], [screen_x, screen_y]) {
    sketch.push();
    sketch.translate(screen_x, screen_y);
    if (p3_drawSelectedTile) {
      p3_drawSelectedTile(world_x, world_y, screen_x, screen_y);
    }
    sketch.pop();
  }
  
  // Draw a tile, mostly by calling the user's drawing code.
  function drawTile([world_x, world_y], [camera_x, camera_y]) {
    let [screen_x, screen_y] = worldToScreen(
      [world_x, world_y],
      [camera_x, camera_y]
    );
    sketch.push();
    sketch.translate(0 - screen_x, screen_y);
    if (p3_drawTile) {
      p3_drawTile(world_x, world_y, -screen_x, screen_y);
    }
    sketch.pop();
  }

  /* global XXH */
  /* exported --
      p3_preload
      p3_setup
      p3_worldKeyChanged
      p3_tileWidth
      p3_tileHeight
      p3_tileClicked
      p3_drawBefore
      p3_drawTile
      p3_drawSelectedTile
      p3_drawAfter
  */

  let grass;
  let grass2;
  let rock;
  let rock2;
  let log;

  function p3_preload() {
    grass = sketch.loadImage("https://cdn.glitch.global/8b3b7a25-c5d2-4814-b789-c42ba416a25e/grass.png?v=1714288423344");
    grass2 = sketch.loadImage("https://cdn.glitch.global/8b3b7a25-c5d2-4814-b789-c42ba416a25e/grass2.png?v=1714290141761");
    rock = sketch.loadImage("https://cdn.glitch.global/8b3b7a25-c5d2-4814-b789-c42ba416a25e/rock.png?v=1714291957297");
    rock2 = sketch.loadImage("https://cdn.glitch.global/8b3b7a25-c5d2-4814-b789-c42ba416a25e/rock2.png?v=1714291974798");
    log = sketch.loadImage("https://cdn.glitch.global/8b3b7a25-c5d2-4814-b789-c42ba416a25e/log.png?v=1714294979815");
  }
  function p3_setup() {
    grass.loadPixels();
    grass2.loadPixels();
    rock.loadPixels();
    rock2.loadPixels();
    log.loadPixels();
  }

  let worldSeed;

  function p3_worldKeyChanged(key) {
    worldSeed = XXH.h32(key, 0);
    sketch.noiseSeed(worldSeed);
    sketch.randomSeed(worldSeed);
  }

  function p3_tileWidth() {
    return 32;
  }
  function p3_tileHeight() {
    return 16;
  }

  let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

  let clicks = {};

  function p3_tileClicked(i, j) {
    let key = [i, j];
    clicks[key] = 1 + (clicks[key] | 0);
  }

  function p3_drawBefore() {}

  function p3_drawTile(i, j) {
    sketch.noStroke();
    
    if ((sketch.floor(7 * sketch.noise(i, j))) < 4) {
      sketch.image(grass, 0, 0, 64, 64);
    } else if ((sketch.floor(4 * sketch.noise(i, j))) < 3) {
      let windOffsetX = (sketch.sin(sketch.millis() / 500 + (0.25 * sketch.abs(i))) * 4) + 10;
      sketch.image(grass2, 0 + windOffsetX, 0, 64, 64);
    } else {
      sketch.image(rock, 0, 0, 64, 64);
    }
    
    if((sketch.floor(7 * sketch.noise(i, j))) > 4){
      if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
        sketch.image(rock2, 0, 0, 64, 64);
      }
    }

    sketch.push();

    // beginShape();
    // vertex(-tw, 0);
    // vertex(0, th);
    // vertex(tw, 0);
    // vertex(0, -th);
    // endShape(CLOSE);

    let n = clicks[[i, j]] | 0;
    if (n % 2 == 1) {
      sketch.image(log, -30, -30, 64, 64);
    }

    sketch.pop();
  }

  function p3_drawSelectedTile(i, j) {
    sketch.noFill();
    sketch.stroke(0, 255, 0, 128);

    // beginShape();
    // vertex(-tw, 0);
    // vertex(0, th);
    // vertex(tw, 0);
    // vertex(0, -th);
    // endShape(CLOSE);

    // noStroke();
    // fill(0);
    // text("tile " + [i, j], 0, 0);
  }

  function p3_drawAfter() {}
}

let world1 = new p5(w1, 'w1');