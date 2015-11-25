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
        
        // Grid

//        var size = 14, step = 1;
//
//        var geometry = new THREE.Geometry();
//        var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
//
//        for ( var i = - size; i <= size; i += step ) {
//
//            geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
//            geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );
//
//            geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
//            geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );
//
//        }
//
//        var line = new THREE.LineSegments( geometry, material );
//        scene.add( line );
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