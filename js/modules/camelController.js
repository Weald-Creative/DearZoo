WLD.camelController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    var camel;
    var camelMaterial_1, camelMaterial_2;
    var camera;
    var mouse;
    var raycaster;
    var scene;
    var renderer;
    
    //--------------------------------------------------------
    // Private functions
    
    var initCamel = function(e){

        var loader = new THREE.TextureLoader();
        
        scene = WLD.appController.getScene();
        renderer = WLD.appController.getRenderer();
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        camera = WLD.appController.getCamera();

        // GEOMETRY =======================================
        
        var camel_geometry = new THREE.PlaneGeometry(3.8, 3.8);
        
        // TEXTURES =======================================
        
        loader.load('textures/camel_1.png', function(texture) {
           
            camelMaterial_1 = new THREE.MeshPhongMaterial({

                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide,
                transparent: true,
                map: texture
            });
            
            camel = new THREE.Mesh(camel_geometry, camelMaterial_1);
            camel.name = "camel"
            camel.position.y+=1.9;
            scene.add(camel);
        });
        
        loader.load('textures/camel_2.png', function(texture) {
           
            camelMaterial_2 = new THREE.MeshPhongMaterial({

                color: 0xffffff,
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.FlatShading,
                side: THREE.DoubleSide,
                transparent: true,
                map: texture
            });
        });
        
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        
    };
    
    //------------------------------------------------------

    var onDocumentMouseUp = function(event){
     
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2-1;
        mouse.y = - (event.clientY / window.innerHeight) * 2+1;
        
        // find intersections if any (has something in 3D been clicked?)
        
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        
        if(intersects.length > 0){ 
         
            var objectClicked = intersects[0];
            
            if(objectClicked.object.name == "camel" ){
             
                camel.material = camelMaterial_1;
                sendBackAnimation();
                
                app.getAppController().playAudio(2);
                app.getAppController().fadeInGrumpyText();
            }
        }
    }
    
    
    //------------------------------------------------------

    var initialiseAwakeAnimation = function(){

        createjs.Tween.get(camel.position)
                .wait(3000)
                .to({z:4}, 2000, createjs.Ease.getPowInOut(4)).call(handleComplete)
            
        function handleComplete() {

            camel.material = camelMaterial_2;
        }
    }
    
    //------------------------------------------------------

    var sendBackAnimation = function(){

        createjs.Tween.get(camel.position)
                .to({z:0}, 2000, createjs.Ease.getPowInOut(4)).call(handleComplete)
            
        function handleComplete() {

            // now close up the crate!
            app.getCrateController().closeCrate();
        }
    }
     
    
    
    
    
    // Public ========================================================
    
    return { 
        
        initialise: function (){
            
            _self = app.getCrateController();
            
            initCamel();
        },
        
        //-------------------------------------------------------
        
        startAwakeAnimation(){
         
            initialiseAwakeAnimation();
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.appController";
        }
    };
   
}());