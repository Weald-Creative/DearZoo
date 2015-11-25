WLD.lightsController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    var particleLight;
    
    //--------------------------------------------------------
    // Private functions
    
    var initLights = function(e){

        var scene = WLD.appController.getScene();
        
        var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
        scene.add(light);
        
//        particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
//        scene.add( particleLight );

        // Lights

        scene.add( new THREE.AmbientLight( 0xcccccc ) );
//
//        var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
//        directionalLight.position.x = Math.random() - 0.5;
//        directionalLight.position.y = Math.random() - 0.5;
//        directionalLight.position.z = Math.random() - 0.5;
//        directionalLight.position.normalize();
//        scene.add( directionalLight );

//        var pointLight = new THREE.PointLight( 0xffffff, 4 );
//        particleLight.add( pointLight );
    };
            
    // Public
    return { 
        
        initialise: function (){
            
            _self = app.getLightsController();
            
            initLights();
        },
        
        update: function(){

//            var timer = Date.now() * 0.0005;
//            particleLight.position.x = Math.sin( timer * 4 ) * 3009;
//            particleLight.position.y = Math.cos( timer * 5 ) * 4000;
//            particleLight.position.z = Math.cos( timer * 4 ) * 3009;
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.appController";
        }
    };
   
}());