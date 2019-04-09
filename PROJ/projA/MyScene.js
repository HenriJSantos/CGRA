/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.enableTextures(true);

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(10);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cubeMap = new MyCubeMap(this);
        let grassTexture = new CGFtexture(this, 'textures/grassTexture.jpg');
        this.floor = new MyFloor(this, 40, grassTexture);
        let treeTopTexture = new CGFtexture(this, 'textures/treeTopTexture.jpg');
        let trunkTexture = new CGFtexture(this, 'textures/trunkTexture.jpg');
        this.tree = new MyTree(this, 2, 0.5, 3, 3, trunkTexture, treeTopTexture);
        this.treeRowPatch1 = new MyTreeRowPatch(this,6,2,0.5,3,3,trunkTexture,treeTopTexture);
        this.treeRowPatch2 = new MyTreeRowPatch(this,3,2,0.5,3,3,trunkTexture,treeTopTexture);
        this.treeGroupPatch1 = new MyTreeGroupPatch(this,3,2,0.5,3,3,trunkTexture,treeTopTexture);
        this.treeGroupPatch2 = new MyTreeGroupPatch(this,2,2,0.5,3,3,trunkTexture,treeTopTexture);
        this.house = new MyHouse(this);
        this.hill1 = new MyVoxelHill(this, 4, grassTexture);
        this.hill2 = new MyVoxelHill(this, 6, grassTexture);
        this.hill3 = new MyVoxelHill(this, 8, grassTexture);
        this.sphere = new MySphere(this, 100, 100);
        let logTexture = new CGFtexture(this, 'textures/logTexture.jpg');
        this.campfire = new MyCampfire(this, logTexture, trunkTexture, false);
        let cubeMapMaterialProperties = [
            5.0, 5.0, 5.0, 1.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0
        ];
        this.cubeMapMaterial = new MyMaterial(this, 'textures/DayCubeMap.png', ["CLAMP_TO_EDGE", "CLAMP_TO_EDGE"], 10, cubeMapMaterialProperties);
        
        this.slab = new MySlab(this, 1,1,1);
        this.cube = new MyUnitCubeQuad(this);

        this.door = new MyDoor(this);

        //Objects connected to MyInterface
        this.scaleFactor = 1.0;
        this.campfireLit = false;
    }
    initLights() {
        this.lights[0].setPosition(10, 150, 10, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(0, 0.5, 0, 1);
        this.lights[1].setDiffuse(2.0, 0.0, 0.0, 1.0);
        this.lights[1].setSpecular(0.0, 0.0, 0.0, 1.0);
        this.lights[1].setConstantAttenuation(0.2);
        this.lights[1].setLinearAttenuation(0.05/this.scaleFactor);
        this.lights[1].enable();
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        //this.sphere.display();

        this.updateLights();

        this.pushMatrix();
        this.scale(300, 300, 300);
        this.cubeMapMaterial.apply();
        this.cubeMap.display();
        this.popMatrix();

        // MyFloor
        this.floor.display();

        // MyCampfire
        this.campfire.display();

        // MyVoxelHill
        this.pushMatrix();
        this.translate(20, 0, 6);
        this.hill1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(4, 0, 26);
        this.hill2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-24, 0, 12);
        this.hill3.display();
        this.popMatrix();

        // MyTree 
        

        // MyTreeGroupPatch
        this.pushMatrix();
        this.translate(-28, 0, -26);
        this.treeGroupPatch1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(12, 0, -16);
        this.treeGroupPatch1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(16, 0, 16);
        this.treeGroupPatch2.display();
        this.popMatrix();

        //MyTreeRowPatch
        this.pushMatrix();
        this.translate(-20, 0, -36);
        this.treeRowPatch1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-5, 0, -26);
        this.treeRowPatch1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(32, 0, 6);
        this.rotate(-Math.PI/2,0,1,0);
        this.treeRowPatch2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-28, 0, -2);
        this.treeRowPatch2.display();
        this.popMatrix();

        // MyHouse
        this.pushMatrix();
        this.translate(0,2,-10);
        this.house.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }

    update(currTime) {
        this.campfire.update(currTime);
    }

    updateLights() {
        //this.lights[0].update();
        this.lights[1].setLinearAttenuation(0.05/this.scaleFactor);
        this.lights[1].update();
    }
}