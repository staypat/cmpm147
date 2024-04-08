// project.js - Experiment 1; Getting familiar with Glitch and HTML.
// Author: Patrick Hu
// Date: 4/7/24

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    user: ["good friend", "knowledge seeker", "curious explorer", "wisdom pursuer"],
    tip: ["Useful", "Strange", "Meaningless", "Practical", "Pro"],
    place: ["home", "school", "work", "a concert", "a party"],
    item: ["towel", "backpack", "laptop", "board games", "drinks", "blanket", "stuffed animal", "toothbrush"],
    emotion: ["excited", "happy", "angry", "sad", "lazy"],
    action: ["hate", "stare at", "ignore", "avoid"],
    reaction: ["breathing", "crying", "standing", "lying down", "sleeping"],
    num: ["two", "three", "a couple of", "twenty", "fifty"],
    end: ["useful", "practical", "helpful", "convenient", "nifty"]
    
  };
  
  const template = `Are you looking for a random tip? Look no further, my $user! The following tip will surely be of use (follow them at your own risk).
  
  $tip Tip: If you are leaving for $place, make sure to bring your $item! This makes sure that you feel $emotion. People may $action you for this, but it will work out!
  If this does not work, you can try $reaction for $num minutes to remedy this.
  
  I hope you found this tip to be $end.
  
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
main();