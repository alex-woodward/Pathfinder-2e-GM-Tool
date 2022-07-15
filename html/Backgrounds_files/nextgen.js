(function ($) {
    
   
    /*
     * Wrap tables in a div for scrolling
     */
    $('table').not(".nowrap").wrap("<div class='tablewrapper'></div>");
    
    
    //onclick for "scroll to top" buttons
    $('#top-link-block a').on('click', function (event) {
        $('html,body').animate({scrollTop:0},'slow');
        return false;
    });
    
    // Enable "scroll to top button" on long pages
    // Note the window height + offset
    if ( ($(window).height() + 100) < $(document).height() ) {
        $('#top-link-block').removeClass('hidden').affix({
            // how far to scroll down before link "slides" into view
            offset: {top:100}
    });
    
    /*
    * Load Nav menu from supplied URL
    */

        /*
   $('#ogn-nextgen-navbar-data-container').load(srd_nextgen_vars.navbarURL,'',function(){
        //Enable multi-level dropdowns on nextgen navbar
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
          // Avoid following the href location when clicking
          event.preventDefault();
          // Avoid having the menu to close when clicking
          event.stopPropagation();
          // If a sibling menu is already open we close it
          $(this).parent().siblings().removeClass('open');
          //toggle our choice
          $(this).parent().toggleClass('open');          
        });   
    })*/
}
    
})(jQuery);

