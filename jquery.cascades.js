/**
 *  Cascades
 *
 * jQuery plugin for run in cascades CSS3 animation
 * v. 0.1
 * 
 */

(function($, window, undefined){

  $.fn.cascades = function(event_type, options){


    /**
     * Run cascades
     * @event_type  {string} 
     * Type of event will be triggred
     * Example: 'scroll', 'click', ...
     * 
     * @options  {object} 
     * Options object
     * 
     * Example:
     * options = {
     *   trigger: 'selector', // Use only for event type 'scroll'.
     *   triggerHeight: 30,   // Height in percent (of window height), when cascad will be run of crossing, 
     *   [
     *     {
            selector: '.portfolio-slider-block',
            effect: 'slideUp',
            timeout: 1000 
          },
          {
            selector: '.work-scheme-block',
            effect: 'slideUp',
            timeout: 1000 
          }
     *   ]
     * }
     */
    runHandler = function(event){

      switch(event.type) {
        case 'scroll': 

          // Get trigger element
          var $trigger = (event.data.trigger !== undefined) ? $(event.data.trigger) : console.error("When use event type 'scroll' you must define triger CSS selector");

          if ($trigger.offset() !== undefined) {

            var triggerTop = $trigger.offset().top;

            var triggerHeight = $(this).height() * event.data.triggerHeight / 100;

            var scrollTop = $(this).scrollTop() + triggerHeight;

            if (scrollTop >= triggerTop) {
              run(event.data.cascade);
            }

          };
          
        break;

        default:
          run(event.data.cascade);
        break;
      }
      
    }

    run = function(cascades){
      $.each(cascades, function(index, cascad){

        //Get elements of cascad
        var $cascadElement = (cascad.selector !== undefined) ? $(cascad.selector) : console.error("selector in some cascade is undefined!");
            
            $.each($cascadElement, function(i, el){
              setTimeout(function(){
                $(el).addClass(cascad.effect);
              }, cascad.timeout + ( i * cascad.timeout));
            });
      });
    }

    this.on(event_type, options, runHandler);

  }

})(jQuery, window);