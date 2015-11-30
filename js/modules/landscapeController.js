WLD.landscapeController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    
    //--------------------------------------------------------
    // Private functions
    
    var initLandscape = function(e){

        var scene = WLD.appController.getScene();
        var renderer = WLD.appController.getRenderer();

        var texture = THREE.ImageUtils.loadTexture(
        'textures/patterns/checker.png'
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat = new THREE.Vector2(50, 50);
        texture.anisotropy = renderer.getMaxAnisotropy();

        var material = new THREE.MeshPhongMaterial({

            color: 0xffffff,
            specular: 0xffffff,
            shininess: 20,
            shading: THREE.FlatShading,
            map: texture
        });

        var geometry = new THREE.PlaneGeometry(1000, 1000);

        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);
    };
            
    // Public
    return { 
        
        initialise: function (){
            
            _self = app.getLandscapeController();
            
            initLandscape();
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.appController";
        }
    };
   
}());