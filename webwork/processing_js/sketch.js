/* KLL copy from examples
 * @name Recursive Tree
 * @arialabel If the user’s mouse is on the far left side of the screen, there is a white vertical line on a black background. As the user’s mouse moves right, the top of the vertical line begins to expand into branches of a tree until it curves down into a very geometric tree
 * @description Renders a simple tree-like structure via recursion.
 * The branching angle is calculated as a function of the horizontal mouse
 * location. Move the mouse left and right to change the angle.
 * Based on Daniel Shiffman's <a href="https://processing.org/examples/tree.html">Recursive Tree Example</a> for Processing.
 */

/* and now i use my old code from
 * https://openprocessing.org/sketch/743146
 * to make a Recursive Tree v1.9.9
 * while waiting for p5.js 2.0.0
 *
 * use mouse X and Y
 */

let theta;
let first = 80;
let strk = 20;
let ang = 45;
let lvl = 1;
let shrink = 0.766;
let s = 1.0; // hight sun
let a = 0.0; // angle

function setup() {
  createCanvas(710, 400);
  console.log('use Mouse X and Y');
}

function draw() {
  frameRate(30);
  s = mouseY / height;
  background(100*s, 100*s, 100+100*s); // sky colored by mouse Y
  noStroke();
  fill(200,200*s,0); // _________________ yellow sun change position and color
  ellipse(width-60,200-100*s,60,60);
  fill(0, 100, 0); // ___________________ dark green grass by rectangle
  rect(0, height*0.85, width, height*(1-0.85));
  lvl = 1; // ___________________________ init branch level
  a = (mouseX / width) * ang; // ________ Let's pick an angle [ang] degrees based on the mouse position
  theta = radians(a); // ________________ Convert it to radians
  translate(width/2,height); // _________ Start the tree from the bottom of the screen
  stroke(80, 40*lvl, 80); // ____________ brown to green 
  strokeWeight(strk); // ________________ as tree / branch width
  line(0, -20, 0, -first); // ___________ shorter, grow on the green and draw a line 120 pixels
  translate(0, -first); // ______________ Move to the end of that line
  branch(first, strk, lvl); // __________ Start the recursive branching!
}

function branch(h, strk, lvl) {
  h *= shrink; // _______________________ Each branch will be [shrink] the size of the previous one
  strk *= shrink; // ____________________ for branch width
  stroke(80, 80*lvl, 80); // ____________ branch iterate color brown to green 
  strokeWeight(strk);
  lvl *= 0.85/shrink;
// All recursive functions must have an exit condition!!!! ours is when the length of the branch is 2 pixels or less
  if (h > 2) {
    push(); // __________________________ Save the current state of transformation (i.e. where are we now)
    rotate(theta); // ___________________ Rotate by theta
    line(0, 0, 0, -h); // _______________ Draw the branch
    translate(0, -h); // ________________ Move to the end of the branch
    branch(h, strk, lvl); // ____________ Ok, now call myself to draw two new branches!!
    pop(); // ___________________________ Whenever we get back here, we "pop" in order to restore the previous matrix state
    // __________________________________ Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, strk, lvl);
    pop();
  }
}