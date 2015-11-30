WLD.appController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    
    var camera, scene, renderer, raycaster;
    var effect, controls, mouse;
    var element, container;
    var cube;
    
    var cameraOrbitSpeed = 0.2;
    
    var clock = new THREE.Clock();
    
    var isIntroAnimation = true;
    var isRequestReturnToFrontAnimation = false;
    
    var audioElement_part_one, audioElement_part_two;
    var grumpyTextElement;
    
    //--------------------------------------------------------
    // Private functions
    
    var init = function(){
        
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        raycaster = new THREE.Raycaster();
        element = renderer.domElement;
        container = document.getElementById('stage');
        container.appendChild(element);
        
        audioElement_part_one = document.getElementById('clip1');
        audioElement_part_two = document.getElementById('clip2');
        grumpyTextElement = document.getElementById('grumpy_text');

        scene = new THREE.Scene();
        mouse = new THREE.Vector2();
            
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 5;
        
        scene.add(camera);

        window.addEventListener('resize', resize, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
    };
    
    var onDocumentMouseUp = function(event){
     
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2-1;
        mouse.y = - (event.clientY / window.innerHeight) * 2+1;
        
        // find intersections if any (has something in 3D been clicked?)
        
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        
        if(intersects.length > 0){ 
         
            var objectClicked = intersects[0];
            
            if(objectClicked.object.name == "crate_door1" ||
               objectClicked.object.name == "crate_door2" ||
               objectClicked.object.name == "crate_side1" ||
               objectClicked.object.name == "crate_side2" ||
               objectClicked.object.name == "crate_top" ||
               objectClicked.object.name == "crate_back" ){
             
                // tell the crate controller to start the opening animation
                app.getCrateController().startOpeningAnimation();
                app.getCamelController().startAwakeAnimation();
                
                // set flags for returning camera to a position in front of the crate
                isRequestReturnToFrontAnimation = true;
                
                _self.playAudio(1);
                _self.fadeOutGrumpyText();
            }
        }
    }
    
    var resize = function(e){

        var width = container.offsetWidth;
        var height = container.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };
    
    var update = function(dt) {

        resize();
//        controls.update(dt);
        app.getLightsController().update();
    };

    var render = function(dt) {
        
        var timer = Date.now() * (cameraOrbitSpeed/1000);
        
//        console.log(timer);
        
        if(isIntroAnimation){
            
            camera.position.x = Math.cos( timer ) * 6;
            camera.position.y = 4 + (Math.cos( timer )*2);
            camera.position.z = Math.sin( timer ) * 10;
        
            // are we in front?
            // UPDATE: can be too much of a delay if the camera is behind the crate when the user clicks it.
//            if(camera.position.z > 0 && isRequestReturnToFrontAnimation){
            if(isRequestReturnToFrontAnimation){
             
                isIntroAnimation = false;
            }
        
        }else if(isRequestReturnToFrontAnimation){
            
            isRequestReturnToFrontAnimation = false;
            
            // we need to tween the z & x position of the camera to the front
            createjs.Tween.get(camera.position).to({x:0, y:3, z:8}, 3000, createjs.Ease.elasticOut).call(handleComplete);
            function handleComplete() {
                
                camera.position.x = 0;
                camera.position.y = 3;
                camera.position.z = 8;
                
                startCameraSwingLoop();
            }
        }
        
        camera.lookAt( scene.position ); // always look at 0,0
        renderer.render(scene, camera);
    };

    var animate = function(t) {
        
        requestAnimationFrame(animate);
        update(clock.getDelta());
        render(clock.getDelta());
    };
    
    var startCameraSwingLoop = function(){
      
        createjs.Tween.get(camera.position)
                .to({x:-3}, 3000, createjs.Ease.getPowInOut(4)).call(handleComplete)
            
        function handleComplete() {

            camera.position.x = -3;

            createjs.Tween.get(camera.position, {loop: true})
            .to({x:3}, 5000, createjs.Ease.getPowInOut(4))
            .to({x:-3}, 5000, createjs.Ease.getPowInOut(4))
        }
    };

    function fullscreen() {
        
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        }
    };
            
    // Public
    return { 
        
        //--------------------------------------------------------
        initialise: function (){
            
            _self = app.getAppController();
                
            init();
            app.getLightsController().initialise();
            app.getLandscapeController().initialise();
            app.getCrateController().initialise();
            app.getCamelController().initialise();
            animate();
        },
        
        //--------------------------------------------------------
        playAudio: function (clip){
            
            if(clip == 1){
                
                audioElement_part_one.play();
                
            }else{
                
                audioElement_part_two.play();
            }
        },
        
        //--------------------------------------------------------
        fadeInGrumpyText: function (){
            
            // just add the class 'show' to fade this element in
            grumpyTextElement.className = "show";
        },
        
        //--------------------------------------------------------
        fadeOutGrumpyText: function (){
            
            // just remove the class 'show' to fade this element out
            grumpyTextElement.className = "";
        },
        
        //--------------------------------------------------------
        getClock: function (){
            
            return clock;
        },
        
        //--------------------------------------------------------
        getScene: function (){
            
            return scene;
        },
        
        //--------------------------------------------------------
        getRenderer: function (){
            
            return renderer;
        },
        
        //--------------------------------------------------------
        getCamera: function (){
            
            return camera;
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.appController";
        }
    };
   
}());