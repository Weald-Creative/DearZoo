WLD.app = (function (){
    
    // Private
    
    
    // Public
    return { 
       
        getAppController:           function(){ return WLD.appController; },
        getLandscapeController:     function(){ return WLD.landscapeController; },
        getLightsController:        function(){ return WLD.lightsController; },
        getCrateController:         function(){ return WLD.crateController; },
        getCamelController:         function(){ return WLD.camelController; },
        
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