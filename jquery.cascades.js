/**
 *  Cascades
 *
 * jQuery plugin for run in cascades CSS3 animation
 * v. 0.1
 * 
 */

(function($, window, undefined){

  $.fn.cascades = function(event_type, cascades){


    /**
     * Run cascades
     * @param  {object} 
     * Array of configured cascad object
     * 
     * Example:
     * cascades = {
     *   {
     *     selector: "#jQuery_selector_1",
     *     effect: "SlideUp",
     *     timeout: 1000,
     *   },
     *   {
     *     selector: "#jQuery_selector_2",
     *     effect: "SlideDown",
     *     timeout: 3000,
     *   }
     *   ....
     * }
     */
    run = function(event){
      
      $.each(event.data, function(index, cascad){

        //Get elements of cascad
        var $cascadElemenet = (cascad.selector !== undefined) ? $(cascad.selector) : console.error("selector in some cascade is undefined!");
        
        //For first element in cascad skip timeout
        if (index == 0) {
          $cascadElemenet.once(function(){
            $(this).addClass(cascad.effect);
          });
        }else {
          setTimeout(function(){
            $cascadElemenet.once(function(){
              $(this).addClass(cascad.effect);
            });          
          }, cascad.timeout);
        }

      });
    }

    switch(event_type) {
      case 'scroll': 
      break;

      default:
        this.on(event_type, cascades, run);
      break;
    }

  }

})(jQuery, window);