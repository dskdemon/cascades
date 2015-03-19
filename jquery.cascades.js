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
    runHandler = function(event){

      switch(event.type) {
        case 'scroll': 
          console.log($(this).scrollTop());
        break;

        default:
          run(event.data);
        break;
      }
      
    }

    run = function(cascades){
      $.each(cascades, function(index, cascad){

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

    this.on(event_type, cascades, runHandler);

  }

})(jQuery, window);