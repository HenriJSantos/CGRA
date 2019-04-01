/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.walls_height = 4;
        this.frontWalls_width = 10;
        this.walls_thick = 0.5;

        this.sideWalls_width = this.frontWalls_width/1.5;

        this.doorHeight = 3;

        this.backWall = new MySlab(scene, this.frontWalls_width, this.walls_height, this.walls_thick);
        this.frontWall = new MySlab(scene, this.frontWalls_width/2.5, this.walls_height, this.walls_thick);
        this.doorTopWall = new MySlab(scene, (this.frontWalls_width - this.frontWalls_width/2.5*2), this.walls_height - this.doorHeight, this.walls_thick);
        this.sideWall = new MySlab(scene, this.sideWalls_width, this.walls_height, this.walls_thick);
        this.floor = new MySlab(scene, this.frontWalls_width - this.walls_thick*2, this.sideWalls_width -this.walls_thick, 0);
        //this.doorFloor = new MySlab(scene, this.door- this.walls_thick*2, this.sideWalls_width -this.walls_thick, 0);

        this.roof = new MyRoof(scene);
    }
    updateBuffers() {

    }
    display() {
        //FRONT WALL1
        this.scene.pushMatrix();
        this.scene.translate(-(this.frontWalls_width - this.frontWalls_width/2.5)/2,0,0);
        this.frontWall.display();
        this.scene.popMatrix();

        //FRONT WALL2
        this.scene.pushMatrix();
        this.scene.translate((this.frontWalls_width - this.frontWalls_width/2.5)/2,0,0);
        this.frontWall.display();
        this.scene.popMatrix();

        //FRONT WALL3
        this.scene.pushMatrix();
        this.scene.translate(0,this.doorHeight/2,0);
        this.doorTopWall.display();
        this.scene.popMatrix();

        //SIDE WALL1
        this.scene.pushMatrix();
        this.scene.translate(this.frontWalls_width/2 - this.walls_thick/2,0,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.sideWall.display();
        this.scene.popMatrix();

        //SIDE WALL2
        this.scene.pushMatrix();
        this.scene.translate(-this.frontWalls_width/2 + this.walls_thick/2,0,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.sideWall.display();
        this.scene.popMatrix();

        //BACK WALL
        this.scene.pushMatrix();
        this.scene.translate(0 ,0,-this.sideWalls_width);
        this.backWall.display();
        this.scene.popMatrix();

        //FLOOR
        this.scene.pushMatrix();
        this.scene.translate(0, -this.walls_height/2,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.floor.display();
        this.scene.popMatrix();

        //CEILING
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.floor.display();
        this.scene.popMatrix();

        //ROOF
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.scale(this.frontWalls_width/2 + this.walls_thick, 3, this.sideWalls_width + this.walls_thick*2);
        this.roof.display();
        this.scene.popMatrix();
    }
}

