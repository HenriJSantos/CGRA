/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.walls_height = 4;
        this.backWalls_width = 10;
        this.walls_thick = 0.5;

        this.sideWalls_width = this.backWalls_width/1.5;

        this.doorHeight = 3;
        let frontWallWidth = this.backWalls_width/2.5;
        let doorTopWidth = (this.backWalls_width - frontWallWidth*2);
        let doorTopHeight = this.walls_height - this.doorHeight;

        let doorTopTextCoords = [
            0, doorTopHeight/this.walls_height,
            0.5, doorTopHeight/this.walls_height,
            0,0,
            0.5, 0,
        ];

        let sideWallTextCoords = [
            0, 1,
            this.sideWalls_width/frontWallWidth, 1,
            0,0,
            this.sideWalls_width/frontWallWidth, 0,
        ];

        let backWallTextCoords = [
            0, 1,
            this.backWalls_width/frontWallWidth, 1,
            0,0,
            this.backWalls_width/frontWallWidth, 0,
        ];

        let woodTexture = new CGFtexture(this.scene, 'textures/HouseTextures/woodWall.jpeg');
        this.woodMaterial = new CGFappearance(scene);
        this.woodMaterial.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.woodMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.woodMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.woodMaterial.setShininess(10.0);
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.woodMaterial.setTexture(woodTexture);

        let roofTexture = new CGFtexture(this.scene, 'textures/HouseTextures/roofTexture.jpg');
        this.roofMaterial = new CGFappearance(this.scene);
        this.roofMaterial.setAmbient(0.4, 0.4, 0.4, 1.0);
        this.roofMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.roofMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.roofMaterial.setShininess(10.0);
        this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.roofMaterial.setTexture(roofTexture);

        this.backWall = new MySlab(scene, this.backWalls_width, this.walls_height, this.walls_thick, backWallTextCoords);
        this.frontWall = new MySlab(scene, frontWallWidth, this.walls_height, this.walls_thick);
        this.doorTopWall = new MySlab(scene, doorTopWidth, doorTopHeight, this.walls_thick, doorTopTextCoords);
        this.sideWall = new MySlab(scene, this.sideWalls_width, this.walls_height, this.walls_thick, sideWallTextCoords);
        this.floor = new MySlab(scene, this.backWalls_width, this.sideWalls_width + this.walls_thick*2, 0);
        this.ceiling = new MySlab(scene, this.backWalls_width + this.walls_thick*2, this.sideWalls_width + this.walls_thick*4, 0);
        this.roof = new MyRoof(scene);

        let doorTexture = new CGFtexture(this.scene, 'textures/HouseTextures/doorTexture.png');
        let knobTexture = new CGFtexture(this.scene, 'textures/HouseTextures/knobTexture.jpg');
        this.door = new MyDoor(scene, doorTexture, knobTexture);
    }
    updateBuffers() {

    }
    display() {
        this.woodMaterial.apply();
        //FRONT WALL1
        this.scene.pushMatrix();
        this.scene.translate(-(this.backWalls_width - this.backWalls_width/2.5)/2,0,this.walls_thick/2);
        this.frontWall.display();
        this.scene.popMatrix();

        //FRONT WALL2
        this.scene.pushMatrix();
        this.scene.translate((this.backWalls_width - this.backWalls_width/2.5)/2,0,this.walls_thick/2);
        this.frontWall.display();
        this.scene.popMatrix();

        //FRONT WALL3
        this.scene.pushMatrix();
        this.scene.translate(0,this.doorHeight/2,this.walls_thick/2);
        this.doorTopWall.display();
        this.scene.popMatrix();

        //SIDE WALL1
        this.scene.pushMatrix();
        this.scene.translate(this.backWalls_width/2 - this.walls_thick/2,0,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.sideWall.display();
        this.scene.popMatrix();

        //SIDE WALL2
        this.scene.pushMatrix();
        this.scene.translate(-this.backWalls_width/2 + this.walls_thick/2,0,-this.sideWalls_width/2);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.sideWall.display();
        this.scene.popMatrix();

        //BACK WALL
        this.scene.pushMatrix();
        this.scene.translate(0 ,0,-(this.sideWalls_width + this.walls_thick/2));
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
        this.ceiling.display();
        this.scene.popMatrix();

        //ROOF
        this.roofMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, this.walls_height/2,-this.sideWalls_width/2);
        this.scene.scale(this.backWalls_width/2 + this.walls_thick, 3, this.sideWalls_width + this.walls_thick*4);
        this.roof.display();
        this.scene.popMatrix();

        //DOOR
        this.scene.pushMatrix();
        this.scene.translate(0,  - (this.walls_height - this.doorHeight)/2, this.walls_thick/2);
        this.door.display();
        this.scene.popMatrix();
    }
}

