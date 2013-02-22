 		class Tree {

  float leafColor;
  float trunkColor;
  float xpos;

  float scale;




// Contructeur

Tree(float scaleDimension) {

  xpos = random(50, width - 200);

  scale = scaleDimension;

  drawTree(xpos, scale);

}

void drawTree(float xpos, float scale) {

 stroke(255);

  fill(0);

  triangle(xpos, 500 - 10 *scale, xpos + scale*50, scale*150 - 10 *scale, xpos + scale*100, 500 - 10 *scale);

  fill(50);

  rect(xpos+scale*40, 500 - 10 *scale, scale*20, 50 + 10 *scale);




  /*
  beginShape();
    fill(0);
    vertex(xpos, scale*300);
    vertex(xpos + scale*50, scale*150);
    vertex(xpos + scale*100, scale*300);
    vertex(xpos+scale*80, scale*300);
    fill(100);
    vertex(xpos+scale*80, scale*550);
    vertex(xpos+scale*20, scale*550);
    vertex(xpos+scale*20, scale*300);

  endShape(CLOSE);

  */

}


Tree tree;

float xpos;

void setup() {

  size(1200, 700);

  tree = new Tree(1);


}

void draw() {


 if(mousePressed == true) {

   tree = new Tree(random(1,2));

 }

}

}