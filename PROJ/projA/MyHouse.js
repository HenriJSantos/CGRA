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

        this.frontWall = new MySlab(scene, this.frontWalls_width, this.walls_height, this.walls_thick);
        this.sideWall = new MySlab(scene, this.sideWalls_width, this.walls_height, this.walls_thick);
        this.floor = new MySlab(scene, this.frontWalls_width - this.walls_thick*2, this.sideWalls_width -this.walls_thick, 0);

    }
    updateBuffers() {

    }
    display() {
        //FRONT WALL1
        this.scene.pushMatrix();
        this.frontWall.display();
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

        //FRONT WALL2
        this.scene.pushMatrix();
        this.scene.translate(0 ,0,-this.sideWalls_width);
        this.frontWall.display();
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
    }
}

