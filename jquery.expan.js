/*!
 * Expan tooltips v0.9 2014
 * Original author: Joel Paulino @addsthetics
 * Licensed under the MIT license
 */

(function ( $, window, document, undefined) {

    // Create the defaults once
    var pluginName = 'expan',
        defaults = {
            scrollSpeed  : 1000,
            isResponsive : false,
            mobileBreakingPoint : 480,
            medieObjTemplate : function(){
                    return $('<div class="media attribution"></div>')
            },
            mediaLeftTemplate : function(imgURI,name){
                    return '<span class="ex-close">&#10005;</span>'
                            + '<div class="img">'
                            + '<img src="'+ imgURI +'" alt="'+ name +'"/>'
                         + '</div>';
            },
            mediaRightTemplate : function(name, bio){
                    return  '<div class="bd">'
                            + '<h2>'+name+ '</h2>'
                            + '<p>'+bio+'</p>'
                        + '</div>';
            }
        },
        team = {};

    // The actual plugin constructor
    function Plugin( element, options, names) {
        this.element = element;
        
        this.last = null;
       
        options = options || function(){console.log('Test');return {};};

        this.options = $.extend( {}, defaults, options) ;

        this.names = $.extend( {}, team, names) ;
        
        this._defaults = defaults;

        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        var that = this ;
        that.open.apply(that);
        that.close.apply(that);
    };

    /*Open method which expands the expan with the Items information and media.*/
    Plugin.prototype.open = function(){
         var self = this;
         /*Sets the Click event that expands the expan*/
         $(self.element).on('click', '.ex-col',function(){

            var img, info, item, tooltips , name, expan, windowWidth, person = $(this);

            name = person.data('name').toLowerCase();

            windowWidth = $(window).width();

            if(name == 'na'){

                return;

            }

            item = self.names[name];

            if(self.last !== person){

                $(self.last).find('.tooltips').remove();

            }
            
            //add tool tip to element only if it doesn't already have one. Also assigned a value to tooltips.
            tooltips = person.find('.tooltips').length > 0 ?  $('') : person.append('<span class="tooltips"></span>').find('.tooltips') ;

            //Build our media object
            expan = $('<div class="ex-row expan" data-sibling="' + person.data('row') + '"></div>');

            media = self.options.medieObjTemplate();

            img   = self.options.mediaLeftTemplate(item.imgSrc,name);

            info  = self.options.mediaRightTemplate(name,item.bio);
            
            media.html(img+info);

            if(self.options.isResponsive && windowWidth < self.options.mobileBreakingPoint){

                $(self.element).find('.expan').remove();
                
                expan.append(media);

                setTimeout(function() {
                     media.addClass('show');
                }, 4);
               
                person.after(expan);

                tooltips.addClass('expanded');

                expan.addClass('expanded');
                
            }else if(person.data('row') === $(self.element).find('.expan').data('sibling')){

                tooltips.addClass('expanded');
                
                $(self.element).find('.expan').html(media);

                media.addClass('ex-quick');

                // Give jquery is bit of time to render the new element. If the class is added to the node
                // before is fully renders, the CSS transition appear choppy. 
                setTimeout(function() {
                     media.addClass('show');
                }, 4);

            }else {

                $(self.element).find('.expan').remove();
                

                expan.append(media);

                setTimeout(function() {
                     media.addClass('show');
                }, 4);
               
                $(this).parent().after(expan);

                tooltips.addClass('expanded');

                setTimeout(function() {
                    expan.addClass('expanded');
                    $('html,body').animate({scrollTop: expan.position().top - 100}, self.options.scrollSpeed);
                }, 50);

            }

            self.last = this;

        });
    };

    /*Closed method which contacts the expan and removes it from the DOM.*/
    Plugin.prototype.close = function(){
        var self = this;

        $(self.element).on('click', '.ex-close',function(){

            var tooltips ,expan = $(this).parent().parent();

            tooltip = $(self.last).find('.tooltips');

            $(this).parent().removeClass('show');
            
            tooltip.removeClass('expanded');

            expan.removeClass('expanded') 

            setTimeout(function() {
                   expan.remove();

                   tooltip.remove();
            }, 300);
            
        });
    };
    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn.expan = function ( options,names ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options, names ));
            }
        });
    }

})( jQuery, window, document );