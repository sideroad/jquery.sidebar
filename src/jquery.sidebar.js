/*
 * jquery.sidebar v1.0.2
 * http://sideroad.secret.jp/
 *
 * Copyright (c) 2009 sideroad
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: 2009-09-01
 */
(function( $, _window ) {
    $.fn.sidebar = function(options){
        return this.each(function(){
            var elem = $(this),
                margin,
                width,
                height,
                duration,
                injectWidth,
                injectHeight,
                injectCss,
                containerCss,
                bodyCss,
                position,
                isEnter = false,
                isProcessing = false,
                enter,
                leave,
                opened,
                closed,
                container = $("<div><div/>"),
                inject = $("<div><div/>"),
                body = $("<div><div/>");
                
            //default setting
            options = $.extend(true, {
                position : "left",
                callback: {
                    item : {
                        enter : function(){
                            $(this).animate({marginLeft:"5px"},250);
                        },
                        leave : function(){
                            $(this).animate({marginLeft:"0px"},250);
                        }
                    },
                    sidebar : {
                        open : function(){
                            
                        },
                        close : function(){
                            
                        }
                    }
                },
                animate : {
                    container : {
                        enter : {},
                        leave : {}
                    }
                },
                duration : 200,
                open : "mouseenter.sidebar",
                close : "mouseleave.sidebar"
            }, options);
            
            opened = options.callback.sidebar.open;
            closed = options.callback.sidebar.close;
            position = options.position;
            duration = options.duration;
            
            container.attr("id", "jquerySideBar" + new Date().getTime()).addClass("sidebar-container-" + position);
            inject.addClass("sidebar-inject-" + position);
            body.addClass("sidebar-body");
            
            //append to body
            body.append(this);
            container.append(body);
            container.append(inject);
            $(document.body).append(container);
            
            width = container.width();
            height = container.height();
            injectWidth = inject.width();
            injectHeight = inject.height();
            
            containerCss = {
                height: height,
                width: width
            };
            bodyCss = {
                height: height,
                width: width
            };
            
            if(position == "left" || position == "right") {
                margin = width - injectWidth;
                injectCss = {
                    height : height,
                    width : injectWidth
                };
                containerCss.top = options.top || ($(_window).height()/2) - (height/2) + "px";
                
            } else {
                margin = height - injectHeight;
                injectCss = {
                    height : injectHeight,
                    width : width
                };
                containerCss.left = options.left || ($(_window).width()/2) - (width/2) + "px";
            }
            
            containerCss[position] = "-" + margin + "px";
            injectCss[position] = margin + "px";
            options.animate.container.enter[position] = 0;
            options.animate.container.leave[position] = "-" + margin;
            
            //container
            container.css(containerCss);
            
            //inject
            inject.css(injectCss);
            
            //body
            body.css(bodyCss).hide();
            
            //menu callback
            $(this).addClass("sidebar-menu").find("li")
                .bind("mouseenter.sidebar",options.callback.item.enter)
                .bind("mouseleave.sidebar",options.callback.item.leave);
            
            //container events
            enter = options.animate.container.enter;
            leave = options.animate.container.leave;
            container.bind(options.open,function(){
                if (isEnter) return;
                if (isProcessing) return;
                isEnter = true;
                isProcessing = true;
                container.animate(enter, {
                    duration: duration,
                    complete: function(){
                        inject.fadeOut(duration, function(){
                            body.show("clip", duration,function(){
                                isProcessing = false;
                                if(opened) opened();
                            });
                        });
                    }
                });
            }).bind(options.close,function(){
                if(!isEnter) return;
                if(isProcessing) return;
                isProcessing = true;
                container.animate(leave, {
                    duration: duration,
                    complete: function(){
                        body.hide("clip", duration, function(){
                            inject.fadeIn(duration, function(){
                                isEnter = false;
                                isProcessing = false;
                                if(closed) closed();
                            });
                        });
                    }
                });
            });
            
            $(_window).resize(function(){
                if(position == "left" || position == "right") {
                    container.css({top:($(this).height()/2) - (height/2) + "px"});
                } else {
                    container.css({left:($(this).width()/2) - (width/2) + "px"});
                }
            });
        });
    };
})(jQuery, this);