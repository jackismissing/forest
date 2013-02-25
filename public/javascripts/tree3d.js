import processing.opengl.*;

class Tree {

    float leafColor;
    float trunkColor;
    float xpos;
    float zpos;

    float scale;
    // Contructeur
    Tree(float scaleDimension, float zposition) {

        xpos = random(-50, width + 50);
        zpos = zposition;
        scale = scaleDimension;

        drawTree(xpos, scale, zpos);

    }

    void drawTree(float xpos, float scale, float zpos) {

        noStroke();


        float treeColor = int(random(1,4));

        if(treeColor == 1) {

            translate(0, 0, zpos);

            fill(107,191,165,191);

            triangle(xpos, 1000 - 10 *scale, xpos + scale*50, 650 - 100 *scale, xpos + scale*50, 1000 - 10 *scale);

            fill(64,171,136,191);

            triangle(xpos + scale*50, 1000 - 10 *scale, xpos + scale*50, 650 - 100 *scale, xpos + scale*100, 1000 - 10 *scale);

            fill(88,91,91,191);

            rect(xpos+scale*40, 1000 - 10 *scale, scale*10, 25 + 10 *scale);

            fill(59,61,61,191);

            rect(xpos+scale*50, 1000 - 10 *scale, scale*10, 25 + 10 *scale);

        }
        else if(treeColor == 2) {

            translate(0, 0, zpos);

            fill(234,139,139,191);

            triangle(xpos, 1000 - 10 *scale, xpos + scale*50, 650 - 100 *scale, xpos + scale*50, 1000 - 10 *scale);

            fill(214,99,97,191);

            triangle(xpos + scale*50, 1000 - 10 *scale, xpos + scale*50, 650 - 100 *scale, xpos + scale*100, 1000 - 10 *scale);

            fill(88,91,91,191);

            rect(xpos+scale*40, 1000 - 10 *scale, scale*10, 25 + 10 *scale);

            fill(59,61,61,191);

            rect(xpos+scale*50, 1000 - 10 *scale, scale*10, 25 + 10 *scale);

        }
        else if(treeColor == 3) {

            translate(0, 0, zpos);

            fill(238,211,142,191);

            triangle(xpos, 1000 - 10 *scale, xpos + scale*50, 650 - 100 *scale, xpos + scale*50, 1000 - 10 *scale);

            fill(234,197,93,191);

            triangle(xpos + scale*50, 1000 - 10 *scale, xpos + scale*50, 650 - 100 *scale, xpos + scale*100, 1000 - 10 *scale);

            fill(88,91,91,191);

            rect(xpos+scale*40, 1000 - 10 *scale, scale*10, 25 + 10 *scale);

            fill(59,61,61,191);

            rect(xpos+scale*50, 1000 - 10 *scale, scale*10, 25 + 10 *scale);
        }
    }
}


Tree tree;

// @pjs preload must be used to preload the image

/* @pjs preload="img/image.jpeg" */


PImage background;



float xpos;
float zpos;

void setup() {

    zpos = -1500;
    size(2560, 1440, P3D);
    frameRate(24);

    background = loadImage("img/image.jpeg");

    image(background,0,0);
    camera(width/2, height/2, 1500, width/2, height/2, 0, 0.0, 1.0, 0.0);
    tree = new Tree(1);
}
void growTree() {

    tree = new Tree(random(1,3), zpos);
    zpos += 30;
}