
// Place any jQuery/helper plugins in here.
/*!
 * Expan tooltips jQuery
 * Original author: @addsthetics
 * Licensed under the MIT license
 */

(function ( $, window, document, undefined) {

    // Create the defaults once
    var pluginName = 'expan',
        defaults = {
            scrollSpeed: 1000,
            medieObjTemplate : function(){
                    return $('<div class="media attribution"></div>')
            },
            mediaLeftTemplate: function(imgURI,name){
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
        /*$(that.element).on('click', '.ex-col',function(){

            var img, info, item, tooltips , name, expan, windowWidth, person = $(this);


            name = person.data('name').toLowerCase();

            windowWidth = $(window).width();

            if(name == 'na'){

                return;

            }

            item = that.names[name];

            if(last !== person){

                $(last).find('.tooltips').remove();

            }
            
            tooltips = person.find('.tooltips').length > 0 ?  $('') : person.append('<span class="tooltips"></span>').find('.tooltips') ;

            media = that.options.medieObjTemplate();

            img   = that.options.mediaLeftTemplate(item.imgSrc,name);

            info  = that.options.mediaRightTemplate(name,item.bio);
            
            media.html(img+info);
            if(person.data('row') === $(that.element).find('.expan').data('sibling') && windowWidth >= 480){

                tooltips.addClass('expanded');
                
                $(that.element).find('.expan').html(media);
                media.addClass('ex-quick');
                setTimeout(function() {
                     media.addClass('show');
                }, 4);

            }else if( windowWidth >= 480){

                $(that.element).find('.expan').remove();

                var expan = $('<div class="ex-row expan" data-sibling="'+person.data('row')+'"></div>');
                

                expan.append(media);
                setTimeout(function() {
                     media.addClass('show');
                }, 4);
               
                $(this).parent().after(expan);

                tooltips.addClass('expanded');

                setTimeout(function() {
                    expan.addClass('expanded');
                    $('html,body').animate({scrollTop: expan.position().top - 100}, that.options.scrollSpeed);
                }, 50);
            }else{
                $(that.element).find('.expan').remove();

                var expan = $('<div class="ex-row expan" data-sibling="' + person.data('row') + '"></div>');
                

                expan.append(media);
                setTimeout(function() {
                     media.addClass('show');
                }, 4);
               
                person.after(expan);

                tooltips.addClass('expanded');

                expan.addClass('expanded');
            }

            last = this;  
        });*/

        $(that.element).on('click', '.ex-close',function(){
            var expan = $(this).parent().parent();
            $(this).parent().removeClass('show');
            setTimeout(function() {
                expan.removeClass('expanded');
            }, 250);
             
            
            $(last).find('.tooltips').removeClass('expanded');
            setTimeout(function() {
                   expan.remove();
            }, 400);
            
        });
    };
    Plugin.prototype.open = function(){
         var last, self = this;
         $(self.element).on('click', '.ex-col',function(){

            var img, info, item, tooltips , name, expan, windowWidth, person = $(this);


            name = person.data('name').toLowerCase();

            windowWidth = $(window).width();

            if(name == 'na'){

                return;

            }

            item = self.names[name];

            if(last !== person){

                $(last).find('.tooltips').remove();

            }
            
            tooltips = person.find('.tooltips').length > 0 ?  $('') : person.append('<span class="tooltips"></span>').find('.tooltips') ;

            media = self.options.medieObjTemplate();

            img   = self.options.mediaLeftTemplate(item.imgSrc,name);

            info  = self.options.mediaRightTemplate(name,item.bio);
            
            media.html(img+info);
            if(person.data('row') === $(self.element).find('.expan').data('sibling') && windowWidth >= 480){

                tooltips.addClass('expanded');
                
                $(self.element).find('.expan').html(media);

                media.addClass('ex-quick');

                setTimeout(function() {
                     media.addClass('show');
                }, 4);

            }else if( windowWidth >= 480){

                $(self.element).find('.expan').remove();

                var expan = $('<div class="ex-row expan" data-sibling="'+person.data('row')+'"></div>');
                

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

            }else{

                $(self.element).find('.expan').remove();

                var expan = $('<div class="ex-row expan" data-sibling="' + person.data('row') + '"></div>');
                

                expan.append(media);
                setTimeout(function() {
                     media.addClass('show');
                }, 4);
               
                person.after(expan);

                tooltips.addClass('expanded');

                expan.addClass('expanded');
            }

            last = this;  
        });
    }
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