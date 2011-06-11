/*
 * jquery.sidebar v1.0.2
 * http://sideroad.secret.jp/
 *
 * Copyright (c) 2009 sideroad
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: 2009-09-01
 */
(function($) {
    $.fn.sidebar = function(options){
        return this.each(function(){
            var margin,
                injectCss,
                containerCss,
                bodyCss,
                position,
                isEnter,
                isProcessing,
                isItemEnter,
                enter,
                leave,
                container = $("<div><div/>"),
                inject = $("<div><div/>"),
                body = $("<div><div/>");
                
            //default setting
            options = $.extend(true, {
                position : "left",
                width : 100,
                height : 200,
                injectWidth : 50,
                events: {
                    item : {
                        enter : function(){
                            $(this).animate({marginLeft:"5px"},250);
                        },
                        leave : function(){
                            $(this).animate({marginLeft:"0px"},250);
                        }
                    }
                },
                animate : {
                    container : {
                        enter : {},
                        leave : {}
                    }
                },
                open : "mouseenter.sidebar",
                close : "mouseleave.sidebar"
            }, options);
            
            position = options.position;
            containerCss = {
                height: options.height,
                width: options.width
            };
            bodyCss = {
                height: options.height,
                width: options.width
            };
            
            if(position == "left" || position == "right") {
                margin = options.width - options.injectWidth;
                injectCss = {
                    height : options.height,
                    width : options.injectWidth
                };
                containerCss.top = ($(window).height()/2) - (options.height/2) + "px";
                
            } else {
                margin = options.height - options.injectWidth;
                injectCss = {
                    height : options.injectWidth,
                    width : options.width
                };
                containerCss.left = ($(window).width()/2) - (options.width/2) + "px";
            }
            
            containerCss[position] = "-" + margin + "px";
            injectCss[position] = margin + "px";
            options.animate.container.enter[position] = 0;
            options.animate.container.leave[position] = "-" + margin;
            
            //container
            container.attr("id", "jquerySideBar" + new Date().getTime()).addClass("sidebar-container-" + position).css(containerCss);
            
            //inject
            inject.addClass("sidebar-inject-" + position).css(injectCss);
            
            //body
            body.addClass("sidebar-body").css(bodyCss).hide();
            
            //menu events
            $(this).addClass("sidebar-menu").find("li")
                .bind("mouseenter.sidebar",options.events.item.enter)
                .bind("mouseleave.sidebar",options.events.item.leave);
            
            //container events
            enter = options.animate.container.enter;
            leave = options.animate.container.leave;
            container.bind(options.open,function(){
                if (isEnter) return;
                if (isProcessing) return;
                isEnter = true;
                isProcessing = true;
                container.animate(enter, {
                    duration: 200,
                    complete: function(){
                        inject.fadeOut(200, function(){
                            body.show("clip", 200,function(){
                                isProcessing = false;
                            });
                        });
                    }
                });
            }).bind(options.close,function(){
                if(!isEnter) return;
                if(isProcessing) return;
                isProcessing = true;
                container.animate(leave, {
                    duration: 200,
                    complete: function(){
                        body.hide("clip", 200, function(){
                            inject.fadeIn(200, function(){
                                isEnter = false;
                                isProcessing = false;
                            });
                        });
                    }
                });
            });
            
            //append to body
            body.append(this);
            container.append(body);
            container.append(inject);
            $(document.body).append(container);
            $(window).resize(function(){
                if(position == "left" || position == "right") {
                    container.css({top:($(this).height()/2) - (options.height/2) + "px"});
                } else {
                    container.css({left:($(this).width()/2) - (options.width/2) + "px"});
                }
            });
        });
    }
})(jQuery);