WLD.app = (function (){
    
    // Private
    
    
    // Public
    return { 
       
        getAppController:           function(){ return WLD.appController; },
        getLandscapeController:     function(){ return WLD.landscapeController; },
        getLightsController:        function(){ return WLD.lightsController; },
        getPatrickController:        function(){ return WLD.patrickController; },
        
        //--------------------------------------------------------
        initialise: function (){
            
            this.getAppController().initialise();
        },
        
        //--------------------------------------------------------
        description: function (){
            
           return "WLD.app";
        }
    };
   
}());