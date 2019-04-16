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
        this.cubeMap = new MyCubeMap(this);
        let grassTexture = new CGFtexture(this, 'textures/grassTexture.jpg');
        this.grass = new MyFloor(this, 40, 40, grassTexture);
        let sandTexture = new CGFtexture(this, 'textures/sandTexture.jpg');
        this.sand = new MyFloor(this, 40, 6, sandTexture);
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
        let logTexture = new CGFtexture(this, 'textures/logTexture.jpg');
        this.campfire = new MyCampfire(this, logTexture, trunkTexture, false);
        let cubeMapMaterialProperties = [
            5.0, 5.0, 5.0, 1.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0
        ];
        this.dayCubeMapMaterial = new MyMaterial(this, 'textures/DayCubeMap.png', ["CLAMP_TO_EDGE", "CLAMP_TO_EDGE"], 10, cubeMapMaterialProperties);
        this.nightCubeMapMaterial = new MyMaterial(this, 'textures/NightCubeMap.png', ["CLAMP_TO_EDGE", "CLAMP_TO_EDGE"], 10, cubeMapMaterialProperties);
        
        let beachballMaterialProperties = [
            0.5, 0.5, 0.5, 1.0,
            0.8, 0.8, 0.8, 1.0,
            0.7, 0.7, 0.7, 1.0
        ];
        this.beachballMaterial = new MyMaterial(this, 'textures/beachballTexture.jpg', ["REPEAT", "REPEAT"], 10, beachballMaterialProperties);
        this.beachball = new MySphere(this, 20, 20);

        this.beachTowel1Material = new MyMaterial(this, 'textures/beachTowel1.jpg');
        this.beachTowel2Material = new MyMaterial(this, 'textures/beachTowel2.jpg');
        this.beachTowel = new MyQuad(this);

        let umbrella1Material1 = new MyMaterial(this, 'textures/umbrella1.jpg', ["REPEAT", "REPEAT"], 10, beachballMaterialProperties);
        this.umbrella1 = new MyUmbrella(this, umbrella1Material1);

        let umbrella1Material2 = new MyMaterial(this, 'textures/umbrella2.jpg', ["REPEAT", "REPEAT"], 10, beachballMaterialProperties);
        this.umbrella2 = new MyUmbrella(this, umbrella1Material2);

        let umbrella1Material3 = new MyMaterial(this, 'textures/umbrella3.jpg', ["REPEAT", "REPEAT"], 10, beachballMaterialProperties);
        this.umbrella3 = new MyUmbrella(this, umbrella1Material3);

        this.car = new MyCar(this, 4, 10, 4);

        //Objects connected to MyInterface
        this.scaleFactor = 1.0;
        this.night = false;
        this.campfireLit = false;
        this.carLights = false;
    }
    initLights() {
        this.lights[0].setPosition(10, 150, 10, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setAmbient(0.4,0.4,0.4,1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(10, 150, 10, 1);
        this.lights[1].setDiffuse(0.05, 0.15, 0.2, 1.0);
        this.lights[1].setSpecular(0.05, 0.1, 0.15, 1.0);
        this.lights[1].setAmbient(0.0,0.05,0.1,1.0);
        this.lights[1].enable();
        this.lights[1].update();


        this.lights[2].setPosition(0, 0.5, 8, 1);
        this.lights[2].setDiffuse(1.0, 0.2, 0.0, 1.0);
        this.lights[2].setSpecular(0.0, 0.0, 0.0, 1.0);
        this.lights[2].setConstantAttenuation(0.1);
        this.lights[2].setLinearAttenuation(0.05/this.scaleFactor);
        this.lights[2].enable();
        this.lights[2].update();

        this.lights[3].setPosition(-9,2.5,0, 1);
        this.lights[3].setDiffuse(0.9, 1.0, 0.6, .7);
        this.lights[3].setSpecular(0.7, .8, 0.4, .5);
        this.lights[3].setConstantAttenuation(0.1);
        this.lights[3].setLinearAttenuation(0.05/this.scaleFactor);
        this.lights[3].enable();
        this.lights[3].update();

        this.lights[4].setPosition(-7,2.5,0, 1);
        this.lights[4].setDiffuse(0.9, 1.0, 0.6, .7);
        this.lights[4].setSpecular(0.7, .8, 0.4, .5);
        this.lights[4].setConstantAttenuation(0.1);
        this.lights[4].setLinearAttenuation(0.05/this.scaleFactor);
        this.lights[4].enable();
        this.lights[4].update();
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
        (this.night? this.nightCubeMapMaterial.apply() : this.dayCubeMapMaterial.apply());
        this.cubeMap.display();
        this.popMatrix();

        // MyFloor
        this.grass.display();

        this.pushMatrix();
        this.translate(0, 0, 48);
        this.sand.display();
        this.popMatrix();

        // MyCampfire
        this.pushMatrix();
        this.translate(0,0,8);
        this.campfire.display();
        this.popMatrix();

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
        this.pushMatrix();
        this.translate(-24, 6, 12);
        this.tree.display();
        this.popMatrix();

        //MyBeachBall
        this.pushMatrix();
        this.translate(9, 0.5, 46);
        this.scale(0.5,0.5,0.5);
        this.beachballMaterial.apply();
        this.beachball.display();
        this.popMatrix();

        //BeachTowels
        this.pushMatrix();
        this.translate(4, 0.05, 46);
        this.scale(2,1,4);
        this.rotate(-Math.PI/2,1,0,0);
        this.beachTowel1Material.apply();
        this.beachTowel.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(7, 0.05, 46.5);
        this.scale(2,1,4);
        this.rotate(-Math.PI/2,1,0,0);
        this.beachTowel2Material.apply();
        this.beachTowel.display();
        this.popMatrix();

        //MyUmbrella
        this.pushMatrix();
        this.translate(-3, 0.05, 46);
        this.scale(2,2,2);
        this.umbrella1.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0.05, 45);
        this.scale(2,2,2);
        this.umbrella2.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-25, 0.05, 47);
        this.scale(2,2,2);
        this.umbrella3.display();
        this.popMatrix();

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
        this.translate(0,2.5,-10);
        this.rotate(Math.PI, 0,1,0);
        this.house.display();
        this.popMatrix();

        // ---- END Primitive drawing section

        this.pushMatrix();
        this.translate(-8,1.5,-6);
        this.car.display();
        this.popMatrix();

    }

    update(currTime) {
        if(this.night) {
            this.lights[0].disable();
            this.lights[1].enable();
        }
        else {
            this.lights[1].disable();
            this.lights[0].enable();
        }
        this.campfire.update(currTime);

        if(this.carLights)
        {
            this.car.turnOnLights();
            this.lights[3].enable();
            this.lights[4].enable();
        }
        else
        {
            this.car.turnOffLights();
            this.lights[3].disable();
            this.lights[4].disable();
        }
    }

    updateLights() {
        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].setLinearAttenuation(0.1/this.scaleFactor);
        this.lights[2].update();
        this.lights[3].setLinearAttenuation(0.1/this.scaleFactor);
        this.lights[3].update();
        this.lights[4].setLinearAttenuation(0.1/this.scaleFactor);
        this.lights[4].update();
    }
}