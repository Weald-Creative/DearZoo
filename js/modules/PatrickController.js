WLD.patrickController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    var dae;
            
    // Public
    return { 
        
        //-------------------------------------------------
        initialise: function (){
            
            _self = app.getPatrickController();
            _self.load();
        },
        
        //-------------------------------------------------
        load: function (){
            
            loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;
            loader.load('models/monster.dae',function colladaReady( collada ){
                
                dae = collada.scene;
                dae.traverse( function ( child ) {

                    if ( child instanceof THREE.SkinnedMesh ) {
                        var animation = new THREE.Animation( child, child.geometry.animation );
                        animation.play();
                    }
                } );

                dae.scale.x = dae.scale.y = dae.scale.z = 0.008;
                dae.updateMatrix();

                var customEvent = new CustomEvent(
                    "patrickLoaded", 
                    {
                        detail: {
                            dae: dae,
                            time: new Date(),
                        },
                        bubbles: true,
                        cancelable: true
                    }
                );

                document.dispatchEvent(customEvent);
            });
        },
        
        //-------------------------------------------------
        initPatrick: function (){
            
            var scene = WLD.appController.getScene();
            scene.add(dae);
            dae.translateZ(30);
            dae.translateY(5);
            dae.translateX(-10);
            dae.rotateY(20);
            
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.patrickController";
        }
    };
   
}());