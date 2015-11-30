WLD.crateController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    
    // MESH ===========================================
        
    var crate_door1,
        crate_door2,
        crate_side1,
        crate_side2,
        crate_top,
        crate_back;
    
    //--------------------------------------------------------
    // Private functions
    
    var initCrate = function(e){

        var scene = WLD.appController.getScene();
        var renderer = WLD.appController.getRenderer();
        var loader = new THREE.TextureLoader();

        // GEOMETRY =======================================
        
        var door_side_geometry = new THREE.PlaneGeometry(2, 4);
        var back_geometry = new THREE.PlaneGeometry(4, 4); 
        
        // TEXTURES =======================================
        
        loader.load('textures/crate_door1.png', function(texture) {
           
            var material = new THREE.MeshPhongMaterial({

                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide,
                transparent: true,
                map: texture
            });
            
            crate_door1 = new THREE.Mesh(door_side_geometry, material);
            crate_door1.name = "crate_door1"
            crate_door1.position.z+=1;
            crate_door1.position.y+=2;
            crate_door1.position.x+=-1;
            scene.add(crate_door1);
        });
        
        loader.load('textures/crate_door2.png', function(texture) {
           
            var material = new THREE.MeshPhongMaterial({

                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide,
                transparent: true,
                map: texture
            });
            
            crate_door2 = new THREE.Mesh(door_side_geometry, material);
            crate_door2.name = "crate_door2"
            crate_door2.position.z+=1;
            crate_door2.position.y+=2;
            crate_door2.position.x+=1;
            scene.add(crate_door2);
        });
        
        loader.load('textures/crate_side.png', function(texture) {
           
            var material = new THREE.MeshPhongMaterial({

                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide,
                transparent: true,
                map: texture
            });
            
            crate_side1 = new THREE.Mesh(door_side_geometry, material);
            crate_side2 = new THREE.Mesh(door_side_geometry, material);
            crate_top = new THREE.Mesh(door_side_geometry, material);
            
            crate_side1.name = "crate_side1"
            crate_side2.name = "crate_side2"
            crate_top.name = "crate_top"
            
            crate_side1.position.y+=2;
            crate_side1.position.x+=2;
            crate_side1.rotation.y = THREE.Math.degToRad(90);
            scene.add(crate_side1);
            
            crate_side2.position.y+=2;
            crate_side2.position.x+=-2;
            crate_side2.rotation.y = THREE.Math.degToRad(90);
            scene.add(crate_side2);
            
            crate_top.position.y+=4;
            crate_top.rotation.x = THREE.Math.degToRad(90);
            crate_top.rotation.z = THREE.Math.degToRad(90);
            scene.add(crate_top);
        });
        
        loader.load('textures/crate_back.png', function(texture) {
           
            var material = new THREE.MeshPhongMaterial({

                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide,
                transparent: true,
                map: texture
            });
            
            crate_back = new THREE.Mesh(back_geometry, material);
            crate_back.name = "crate_back"
            crate_back.position.z+=-1;
            crate_back.position.y+=2;
            scene.add(crate_back);
        });
    };
    
    //------------------------------------------------------
        
    var initialiseOpeningAnimation = function(){

        createjs.Tween.get(crate_door1.rotation).wait(1000).to({y:THREE.Math.degToRad(-90)}, 1000, createjs.Ease.getPowInOut(4));
        createjs.Tween.get(crate_door1.position).wait(1000).to({x:-2, z:1}, 1000, createjs.Ease.getPowInOut(4));
        
        createjs.Tween.get(crate_door2.rotation).wait(1000).to({y:THREE.Math.degToRad(90)}, 1000, createjs.Ease.getPowInOut(4));
        createjs.Tween.get(crate_door2.position).wait(1000).to({x:2, z:1}, 1000, createjs.Ease.getPowInOut(4)).call(handleComplete);
        
        function handleComplete() {

            console.log("tween done");
        }
    }
    
    
    //------------------------------------------------------
        
    var initialiseClosingAnimation = function(){

        createjs.Tween.get(crate_door1.rotation).to({y:0}, 1000, createjs.Ease.getPowInOut(4));
        createjs.Tween.get(crate_door1.position).to({x:-1, z:1}, 1000, createjs.Ease.getPowInOut(4));
        
        createjs.Tween.get(crate_door2.rotation).to({y:0}, 1000, createjs.Ease.getPowInOut(4));
        createjs.Tween.get(crate_door2.position).to({x:1, z:1}, 1000, createjs.Ease.getPowInOut(4)).call(handleComplete);
        
        function handleComplete() {

            console.log("tween done");
        }
    }
    
    
    
    
    
    
    
    // Public ========================================================
    
    return { 
        
        initialise: function (){
            
            _self = app.getCrateController();
            
            initCrate();
        },
        
        //-------------------------------------------------------
        
        startOpeningAnimation(){
         
            initialiseOpeningAnimation();
        },
        
        //-------------------------------------------------------
        
        closeCrate(){
         
            initialiseClosingAnimation();
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.appController";
        }
    };
   
}());