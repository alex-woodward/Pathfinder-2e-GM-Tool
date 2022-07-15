/* 
 * Allow toggling of search providers where supported
 */
jQuery('div.search div.search-provider-select input[type="radio"]').change(function(){
   $provider=(jQuery(this).val());
   console.log(jQuery(this).val());
   jQuery('div.search div.search-provider').addClass("hidden");
   jQuery('div.search div#search-'+$provider).removeClass("hidden");
});

/*
 * Make tables scroll horizontally
 */

jQuery(document).ready(function(){
    console.log("fixing tables");
    jQuery("div.article-content table").not(".nowrap").removeAttr("size");
    jQuery("div.article-content table").not(".nowrap").css("width","");
    jQuery("div.article-content table").not("div.flexbox table").not(".nowrap").wrap("<div class='table-wrapper'></div>");
});

/*
* Table Zoomer
*/

/*
jQuery(document).on("ognbardone",function() {
    jQuery("article table").not(".nozoom").each(function(){
        //check if table has more than 3 columns
        var colCount = 0;
        jQuery(this).find('tr:nth-child(1)').first().find('> td, > th ').each(function () {
            if (jQuery(this).attr('colspan')) {
                colCount += +jQuery(this).attr('colspan');
            } else {
                colCount++;
            }
        });
        console.log("cols: "+colCount);
        if (colCount > 2 || jQuery(this).hasClass("zoom")) {
            var $link = jQuery("<a class=\"tablezoomer-link\" href=\"#\">[Zoom Table]</a>");
            var $table = this;
            $link.appendTo("<p></p>").insertBefore(this);
            $link.click(function(){ zoomTable($table); })
        }
    });
});


function zoomTable(table) {
    jQuery("div.article-content").append("<div id=\"tablezoomer\"><div id=\"tablezoomer-inner\"></div></div>");
    jQuery(table).clone(true).appendTo("#tablezoomer-inner");
    jQuery("body").css("overflow","hidden");
    jQuery("#tablezoomer").append("<a id=\"tablezoomer-closebutton\" href=\"#\">X</a>");
    jQuery("#tablezoomer-closebutton").click(function() { unzoomTable(); });
}

function unzoomTable()
{
    jQuery("body").css("overflow", "auto");
    jQuery("div#tablezoomer").remove();
}*/