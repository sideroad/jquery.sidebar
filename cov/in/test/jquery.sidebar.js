(function( $ ) {

    module( "jquery.sidebar" );
    
    var destroy = function destroy(){
        $(".sidebar-container.left,.sidebar-container.top,.sidebar-container.right,.sidebar-container.bottom").remove();
    };
    
    asyncTest( "default/left", function() {
        var elem = $("#sidebar"),
            inject,
            container,
            body,
            pos = "left";
            
        elem.sidebar({
            position : pos,
            callback : {
                sidebar : {
                    open : function(){
                        ok( !inject.is(":visible") );
                        ok( body.is(":visible") );
                        container.mouseleave();
                    },
                    close : function(){
                        ok( inject.is(":visible") );
                        ok( !body.is(":visible") );
                        destroy();
                        start();
                    }
                }
            }
        });
        
        inject = $(".sidebar-inject."+pos);
        container = $(".sidebar-container."+pos);
        body = $(".sidebar-body");
        
        equal( inject.length, 1 );
        equal( container.length, 1 );
        equal( body.length, 1 );
        equal( container.css( pos ), "-50px" );
        
        container.mouseenter();
    });
    asyncTest( "top", function() {
        var elem = $("#sidebar"),
            inject,
            container,
            body,
            pos = "top";
            
        elem.sidebar({
            position : pos,
            callback : {
                sidebar : {
                    open : function(){
                        ok( !inject.is(":visible") );
                        ok( body.is(":visible") );
                        container.mouseleave();
                    },
                    close : function(){
                        ok( inject.is(":visible") );
                        ok( !body.is(":visible") );
                        destroy();
                        start();
                    }
                }
            }
        });
        
        inject = $(".sidebar-inject."+pos);
        container = $(".sidebar-container."+pos);
        body = $(".sidebar-body");
        
        equal( inject.length, 1 );
        equal( container.length, 1 );
        equal( body.length, 1 );
        equal( container.css( pos ), "-150px" );
        
        container.mouseenter();
    });
    asyncTest( "right", function() {
        var elem = $("#sidebar"),
            inject,
            container,
            body,
            pos = "right";
            
        elem.sidebar({
            position : pos,
            callback : {
                sidebar : {
                    open : function(){
                        ok( !inject.is(":visible") );
                        ok( body.is(":visible") );
                        container.mouseleave();
                    },
                    close : function(){
                        ok( inject.is(":visible") );
                        ok( !body.is(":visible") );
                        destroy();
                        start();
                    }
                }
            }
        });
        
        inject = $(".sidebar-inject."+pos);
        container = $(".sidebar-container."+pos);
        body = $(".sidebar-body");
        
        equal( inject.length, 1 );
        equal( container.length, 1 );
        equal( body.length, 1 );
        equal( container.css( pos ), "-50px" );
        
        container.mouseenter();
    });
    
    asyncTest( "bottom", function() {
        var elem = $("#sidebar"),
            inject,
            container,
            body,
            pos = "bottom";
            
        elem.sidebar({
            position : pos,
            callback : {
                sidebar : {
                    open : function(){
                        ok( !inject.is(":visible") );
                        ok( body.is(":visible") );
                        container.mouseleave();
                    },
                    close : function(){
                        ok( inject.is(":visible") );
                        ok( !body.is(":visible") );
                        destroy();
                        start();
                    }
                }
            }
        });
        
        inject = $(".sidebar-inject."+pos);
        container = $(".sidebar-container."+pos);
        body = $(".sidebar-body");
        
        equal( inject.length, 1 );
        equal( container.length, 1 );
        equal( body.length, 1 );
        equal( container.css( pos ), "-150px" );
        
        container.mouseenter();
    });
    
    
    asyncTest( "open-event", function() {
        var elem = $("#sidebar"),
            inject,
            container,
            body,
            pos = "left";
            
        elem.sidebar({
            position : pos,
            open : "click",
            callback : {
                sidebar : {
                    open : function(){
                        ok( !inject.is(":visible") );
                        ok( body.is(":visible") );
                        container.mouseleave();
                    },
                    close : function(){
                        ok( inject.is(":visible") );
                        ok( !body.is(":visible") );
                        destroy();
                        start();
                    }
                }
            }
        });
        
        inject = $(".sidebar-inject."+pos);
        container = $(".sidebar-container."+pos);
        body = $(".sidebar-body");
        
        equal( inject.length, 1 );
        equal( container.length, 1 );
        equal( body.length, 1 );
        equal( container.css( pos ), "-50px" );
        
        container.click();
    });
    
    
    asyncTest( "call open/close method manually", function() {
        var elem = $("#sidebar"),
            inject,
            container,
            body,
            pos = "left";
            
        elem.sidebar({
            position : pos,
            open : "click",
            callback : {
                sidebar : {
                    open : function(){
                        ok( !inject.is(":visible") );
                        ok( body.is(":visible") );
                        elem.sidebar("close");
                    },
                    close : function(){
                        ok( inject.is(":visible") );
                        ok( !body.is(":visible") );
                        destroy();
                        start();
                    }
                }
            }
        });
        
        inject = $(".sidebar-inject."+pos);
        container = $(".sidebar-container."+pos);
        body = $(".sidebar-body");
        
        equal( inject.length, 1 );
        equal( container.length, 1 );
        equal( body.length, 1 );
        equal( container.css( pos ), "-50px" );
        
        elem.sidebar("open");

    });

})( jQuery );