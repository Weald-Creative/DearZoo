WLD.appController = (function (){
    
    // Private
    var app = WLD.app;
    var _self;
    
    var camera, scene, renderer;
    var effect, controls;
    var element, container;
    
    var clock = new THREE.Clock();
    
    var nonVR = false;
    
    //--------------------------------------------------------
    // Private functions
    
    var init = function(){
        
        renderer = new THREE.WebGLRenderer();
        element = renderer.domElement;
        container = document.getElementById('example');
        container.appendChild(element);

        effect = new THREE.StereoEffect(renderer);

        scene = new THREE.Scene();

        if(nonVR){
            
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            camera.position.set( 2, 2, 3 );
        }else{
            
            camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
            camera.position.set(0, 10, 0);
        }
        
        scene.add(camera);

        controls = new THREE.OrbitControls(camera, element);
        controls.rotateUp(Math.PI / 4);
        controls.target.set(
            camera.position.x + 0.1,
            camera.position.y,
            camera.position.z
        );
        controls.noZoom = true;
        controls.noPan = true;

        function setOrientationControls(e) {
            
            if (!e.alpha) {
              return;
            }

            controls = new THREE.DeviceOrientationControls(camera, true);
            controls.connect();
            controls.update();

            element.addEventListener('click', fullscreen, false);

            window.removeEventListener('deviceorientation', setOrientationControls, true);
        }
        
        window.addEventListener('deviceorientation', setOrientationControls, true);
        window.addEventListener('resize', resize, false);
    };
    
    var resize = function(e){

        var width = container.offsetWidth;
        var height = container.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        effect.setSize(width, height);
    };
    
    var update = function(dt) {

        resize();
        controls.update(dt);
        app.getLightsController().update();
    };

    var render = function(dt) {
        
        var timer = Date.now() * 0.0005;
        
        if(nonVR){
            
            camera.position.x = Math.cos( timer ) * 10;
            camera.position.y = 2;
            camera.position.z = Math.sin( timer ) * 10;
            camera.lookAt( scene.position );
        }
        
        THREE.AnimationHandler.update(dt);
        effect.render(scene, camera);
//        renderer.render(scene, camera);
    };

    var animate = function(t) {
        
        requestAnimationFrame(animate);
        update(clock.getDelta());
        render(clock.getDelta());
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
            app.getPatrickController().initialise();
            document.addEventListener("patrickLoaded", function(e){
                
                init(e);
                app.getLightsController().initialise();
                app.getLandscapeController().initialise();
                app.getPatrickController().initPatrick();
                animate();
                
            }, false);
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
        description: function (){
            
           return "WLD.appController";
        }
    };
   
}());