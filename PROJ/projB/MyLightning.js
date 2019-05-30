/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.init();
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar();
        this.generateLightning();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyCylinder(this.scene, 5),
            "X": new MyCylinder(this.scene, 5)
        };
    };

    generateLightning() {
        this.generate(
                "X",
                {
                    "F": [  "FF" ],
                    "X": [  "F[-X][X]F[-X]+FX" ]
                },
                30,
                3,
                0.5);
    }
    
    update(t) {

    }
}
