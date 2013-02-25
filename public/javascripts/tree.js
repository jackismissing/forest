Tree tree;
PImage background;
float xpos;
float zpos;
int cnt = 1;
int treeNumber;
float ypos;

void setup() {
  
  zpos = -1500;
  treeNumber = 1;
  ypos = -150;

size(2540, 1200);
/* @pjs preload="img/image.jpeg" */
background = loadImage("img/image.jpeg");

image(background,0,0);
tree = new Tree(treeNumber);


}


void growTree(int treeNumber) {

tree = new Tree(treeNumber);

}


class Tree {

float leafColor;
float trunkColor;
float xpos;

int treeNumber;

// Contructeur

Tree(int treeNumber) {
 xpos = random(-50, width + 50);

if(treeNumber % 8 == 0)
  ypos += 10;
  
//if(cnt == 8) {
//  ypos += 20;
//  cnt = 0;
//}
//else {
//  cnt++;
//}




drawTree(xpos, ypos);

}
void drawTree(float xpos, float ypos) {

noStroke();


float treeColor = int(random(1,4));

if(treeColor == 1) {

fill(107,191,165,191);



triangle(xpos, 1000 + 2*ypos, xpos + 50, 650 + 2 *ypos, xpos + 50, 1000 + 2 *ypos);

fill(64,171,136,191);

triangle(xpos + 50, 1000 + 2 *ypos, xpos + 50, 650 + 2 *ypos, xpos + 100, 1000 + 2 *ypos);

fill(88,91,91,191);

rect(xpos + 40, 1000 + 2 *ypos, 10, 25 + 10);

fill(59,61,61,191);

rect(xpos + 50, 1000 + 2 *ypos, 10, 25 + 10);

} else if(treeColor == 2) {
  


fill(234,139,139,191);
 
triangle(xpos, 1000 + 2*ypos, xpos + 50, 650 + 2 *ypos, xpos + 50, 1000 + 2 *ypos);

fill(214,99,97,191);

triangle(xpos + 50, 1000 + 2 *ypos, xpos + 50, 650 + 2 *ypos, xpos + 100, 1000 + 2 *ypos);

fill(88,91,91,191);

rect(xpos + 40, 1000 + 2 *ypos, 10, 25 + 10);

fill(59,61,61,191);

rect(xpos + 50, 1000 + 2 *ypos, 10, 25 + 10);



} else if(treeColor == 3) {
  


fill(238,211,142,191);

triangle(xpos, 1000 + 2*ypos, xpos + 50, 650 + 2 *ypos, xpos + 50, 1000 + 2 *ypos);

fill(234,197,93,191);

triangle(xpos + 50, 1000 + 2 *ypos, xpos + 50, 650 + 2 *ypos, xpos + 100, 1000 + 2 *ypos);

fill(88,91,91,191);

rect(xpos + 40, 1000 + 2 *ypos, 10, 25 + 10);

fill(59,61,61,191);

rect(xpos + 50, 1000 + 2 *ypos, 10, 25 + 10);

}



}
}
