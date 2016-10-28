jQuery(document).ready(function($){
    /*Globals*/
    $um_window = $(window);
    if(Modernizr.touch){
        smooth_scroll = false;
    }
    /*Menu Hover Audio Effects*/
    if($("#audio_hover").length){
        try{
            var audio_hover_player = new MediaElementPlayer('#audio_hover',{
                features : [],
                pauseOtherPlayers: false
            });
            audio_hover_player.setVolume(0.5);
            $(".main_menu a").on("hover",function(){
                /*Pause just in case is playing and seek to 0*/
                audio_hover_player.pause();
                audio_hover_player.setCurrentTime(0);
                audio_hover_player.play();
            });
        }catch(err){

        }
    }
    /*Menu Hover Audio Effects*/

    /*Ambient Audio*/
    if($("#ambient").length){
        try {
            var cur_audio_state = getCookie("ambient_audio");
            var ambient_audio_player = new MediaElementPlayer('#ambient', {
                features: [],
                loop: true,
                startVolume: 0.5,
                success: function (mediaElement, domObject) {
                    if (cur_audio_state != "off") {
                        mediaElement.play();
                    }
                },
                pauseOtherPlayers: false
            });
            if (cur_audio_state != "off") {
                ambient_audio_player.play();
            }
        }catch(err){

        }
    }
    /*Ambient Audio*/

    /*Play Pause Ambient Player*/
    if($("#ambient").length){
        $(".music-player a").on("click",function(e){
            e.preventDefault();
            var cur_audio_state = getCookie("ambient_audio");
            if(cur_audio_state == "off"){
                ambient_audio_player.play();
                setCookie("ambient_audio","on",360);
                $(this).parent().removeClass("no-sound");
            }else{
                ambient_audio_player.pause();
                setCookie("ambient_audio","off",360);
                $(this).parent().addClass("no-sound");
            }
        });
    }
    /*Play Pause Ambient Player*/

    /*Character Animator*/
    var animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
    };
    var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    $(".typo-slides .page-intro-con h1").each(function(){
        //Chunk all chars into span's
        var text = $(this).text().split("");
        var markup = "";
        $.each(text,function(el){
            if(this == " "){
                //markup += "<span class='single_char space_char'>"+this+"</span>";
                markup += " ";
            }else{
                markup += "<span class='single_char'>"+this+"</span>";
            }
        });
        $(this).html(markup);
    });


    $um_window.load(function(){
        setTimeout(function(){
            $(".typo-slides .page-intro-con:eq(0)").addClass("typo-animated");
        },600);
    });

    $(".typo-slides").each(function(){
        if($(this).find(".page-intro-con").length > 1){
            $(this).addClass("typo-slider");
        }
    });

    setInterval(function(){
        $(".typo-slides.typo-slider").each(function(){
            var visible_slide = $(this).find(".page-intro-con:visible");
            var next_slide = visible_slide.next();
            if(!next_slide.length){
                next_slide = $(".typo-slides .page-intro-con:eq(0)");
            }
            visible_slide.addClass("typo-anim-out");

            setTimeout(function(){
                next_slide.removeClass("typo-animated");
                next_slide.show();
                setTimeout(function(){
                    visible_slide.hide();
                    next_slide.removeClass("typo-anim-out");
                    next_slide.addClass("typo-animated");
                },300);
            },1200);
        });
    },8000);
    /*Character Animator*/

    /*Make Secion Size and Position Logic*/
    $um_window.load(function(){
        $(".inner_content > section .center-container").append("<div class='clearfix'></div>");
    });
    function make_main_section_pos(){
        $(".inner_content > section").css("min-height",$(window).height()+"px");
        $(".inner_content > section").css("width",$(window).width()+"px");
        $(".page-intro-con").each(function(){
            $(this).css("margin-top","-" + $(this).height() / 2 + "px");
            $(this).css("margin-left","-" + $(this).width() / 2 + "px");
        });
        $(".inner_content > section .center-container").each(function(){
            $(this).css("margin-top","0px");
            var this_height = $(this).height();
            var parent_height = $um_window.height();
            console.log($(this).get(0));
            console.log(this_height + " : " + parent_height);
            if(this_height < parent_height){
                var margin_top = parent_height / 2;
                margin_top -= this_height / 2;
                $(this).css("margin-top",margin_top+"px");
            }else{
                $(this).css("margin-top","0px");
            }
        });
    }
    $um_window.load(function(){
        make_main_section_pos();
    });
    $um_window.on("debouncedresize",function(){
        make_main_section_pos();
    });
    /*Make Secion Size and Position Logic*/

    /*ScrollTo Section when 30% in view*/
    var sections = $(".inner_content > section");
    var lastScrollTop = 0;
    function scroll_to_section(){
        var window_height = $um_window.height();
        var window_scroll_top = $um_window.scrollTop();
        if(window_scroll_top > lastScrollTop){
            for(var i = 1; i < sections.length ; i++){
                var this_el = sections[i];
                var this_top = this_el.initial_top;
                //Find out if element is visible on screen and if scrolled up to 30% of the screen
                if( this_top >= ( window_scroll_top + window_height - window_height / 4) ){

                    break;
                }
            }
        }else{
            //scrolling down
        }
        lastScrollTop = window_scroll_top;
    }
    //$um_window.scroll(scroll_to_section);
    $(window).on("scroll",scroll_to_section);
    /*ScrollTo Section when 30% in view*/

    /*Hide Loader*/
    $um_window.load(function(){
        $(".loader").hide();
    });
    /*Hide Loader*/

    /*Portfolio Hover Color*/
    function get_portfolio_image_color_dominance(){
        $(".portfolio-item:not(.done_with_hover)").each(function(){
            try{
                var portfolio = $(this);
                var colorThief = new ColorThief();
                var color = colorThief.getColor(portfolio.find("img")[0]);
                color = color.join(",");
                $(this).find(".pt-hover").css("background","rgb("+color+")");
                portfolio.addClass("done_with_hover");
            }catch(err){
                console.log("shit happened");
            }
        });
    }
    if(smart_portfolio_overlay){
        $um_window.load(function(){
            get_portfolio_image_color_dominance();
        });
    }
    /*Portfolio Hover Color*/



    /*Portfolio Featured Images*/
    $(".pgrid.portfolio-thumb").imgLiquid();

    $(".custom-map-image").imgLiquid({
        fill:false
    });
    /*Portfolio Featured Images*/

    /*Show and hide scroll down*/
    var $go_down = $(".go-down");
    $um_window.on("scroll",function(){
        var window_height = $um_window.height() / 2;
        var scroll_top = $(document).scrollTop();
        if( scroll_top > 0){
            $go_down.stop(true,true).fadeOut("slow");
        }
        if( scroll_top <= 0 && !$go_down.is(":visible")){
            $go_down.stop(true,true).fadeIn("slow");
        }
    });
    /*Show and hide scroll down*/

    /*Mobile Menu Button*/
    $(".mobile-menu-button a").click(function(e){
        e.preventDefault();
        $(".mobile-menu").stop(true,true).fadeToggle("fast");
    });
    /*Mobile Menu Button*/

    /*SVG Map aspect keep*/
    function calculate_height(){
        var img = $("img.map");
        var ratio = 825 / 461;
        var height = img.width() / ratio;
        img.css("height",Math.ceil(height));
    }
    $um_window.load(function(){
        calculate_height();
    });
    $um_window.on("debouncedresize",function(){
        calculate_height();
    });
    /*SVG Map aspect keep*/

    /*Contact Form Handling*/
    $(".um-form-con").on("submit",function(){
        var form_data = $(this).serializeArray();
        var return_state = true;
        var $form = $(this);
        //Validate inputs
        var inputs = $(this).find("input");
        inputs.each(function(){
            if($(this).attr("required") == true && !$(this).val()){
                $(this).addClass("error");
                return_state = false;
            }
        });
        if(!$(this).find("[name='message']").val()){
            $(this).find("[name='message']").addClass("error");
            return_state = false;
        }
        if(return_state){
            $.post(um_ajaxurl,form_data,function(data){
                $form.stop(true,true).fadeOut("slow",function(){
                    $form.parent().find(".mail_sent_message").stop(true,true).fadeIn("slow");
                    $form.remove();
                });
            });
        }
        return false;
    });

    $(".um-form-con input , .um-form-con textarea").click(function(){
        $(this).removeClass("error");
    });
    /*Contact Form Handling*/

    /*Single Portfolio*/
        var curent_portfolio_contaner = null;
        var $portfolio_popup = $(".works-popup");
        var um_page_url = window.location.href;
        var dialog_open = false;
        //Show the dialog
        if(!Modernizr.touch){
            $("body").on("click",".portfolio-thumb a",function(e){
                e.preventDefault();
                dialog_open = true;
                $("body").css("overflow","hidden");
                curent_portfolio_contaner = $(this).parents("section.portfolio:eq(0)");
                var parent = $(this).parents(".portfolio-item:eq(0)");
                parent.addClass("current");
                $(".loader").show();
                $portfolio_popup.html("");
                var portfolio_url = $(this).attr("href");
                var state_obj = {
                    um_dynamic:true,
                    post_id:parent.attr("id")
                };
                history.pushState(state_obj,null,portfolio_url);
                $.post(portfolio_url,{um_ajax:true},function(data){
                    $portfolio_popup.html(data);
                    $(".loader").hide();
                    $portfolio_popup.stop(true,true).fadeIn("fast");
                    $(".works-popup").waitForImages(function(){
                        $(".bwp-desc").niceScroll();
                    });
                });
            });
        }
        //Portfolio slider navigation
        $("body").on("click",".bwp-navigation .next_slide",function(e){
            e.preventDefault();
            var slider = $(this).parents(".bwp-holder").find(".bwp-single-slide");
            var visible_slide = slider.find(".single_slide:visible");
            var next_slide = visible_slide.next();
            if(!next_slide.length){
                next_slide = slider.find(".single_slide:eq(0)");
            }
            next_slide.stop(true,true).fadeIn("fast");
            visible_slide.stop(true,true).fadeOut("fast");
        });

        $("body").on("click",".bwp-navigation .prev_slide",function(e){
            e.preventDefault();
            var slider = $(this).parents(".bwp-holder").find(".bwp-single-slide");
            var visible_slide = slider.find(".single_slide:visible");
            var next_slide = visible_slide.prev();
            if(!next_slide.length){
                next_slide = slider.find(".single_slide:last-child");
            }
            next_slide.stop(true,true).fadeIn("fast");
            visible_slide.stop(true,true).fadeOut("fast");
        });

        //Next Prev Close portfolio navigation
        function close_portfolio_popup(e){
            e.preventDefault();
            $("body").css("overflow","auto");
            $(".bwp-desc").getNiceScroll().remove();
            $(this).parents(".works-popup").stop(true,true).fadeOut("fast",function(){
                $(this).html("");
                history.pushState(null,null,um_page_url);
                dialog_open = false;
            });
        }
        $("body").on("click",".works-popup .close_portfolio",close_portfolio_popup);

        $("body").on("click",".works-popup .navigation-arrows .next",function(e){
            e.preventDefault();
            e.stopPropagation();
            $("body").off("click",".works-popup .close_portfolio",close_portfolio_popup);
            var curent = curent_portfolio_contaner.find(".portfolio-item.current");
            var next = curent.next();
            if(!next.length){
                next = curent_portfolio_contaner.find(".portfolio-item:eq(0)");
            }
            curent.removeClass("current");
            $portfolio_popup.stop(true,true).hide();
            $(".loader").show();
            next.find(".portfolio-thumb a").trigger("click");
            $("body").on("click",".works-popup .close_portfolio",close_portfolio_popup);
        });

        $("body").on("click",".works-popup .navigation-arrows .previous",function(e){
            e.preventDefault();
            e.stopPropagation();
            $("body").off("click",".works-popup .close_portfolio",close_portfolio_popup);
            var curent = curent_portfolio_contaner.find(".portfolio-item.current");
            var next = curent.prev();
            if(!next.length){
                next = curent_portfolio_contaner.find(".portfolio-item:last-child");
            }
            curent.removeClass("current");
            $portfolio_popup.stop(true,true).hide();
            $(".loader").show();
            next.find(".portfolio-thumb a").trigger("click");
            $("body").on("click",".works-popup .close_portfolio",close_portfolio_popup);
        });

        $(document).click(function(e) {
            if(!$(e.target).parents(".bwp-holder").length && dialog_open){
                $(".works-popup .close_portfolio").trigger("click");
            }
        });

        $(document).keyup(function(e){
            if(dialog_open && e.keyCode == 27){
                $(".works-popup .close_portfolio").trigger("click");
            }
            if(team_dialog_display && e.keyCode == 27) {
                $(".team-popup .close").trigger("click");
            }
        });

        window.onpopstate = function(event) {
            if(event.state == null){
                //window.location.reload();
            }
            if(event.state != null && event.state.hasOwnProperty("um_dynamic") && event.state.um_dynamic){
                event.preventDefault();
                var curent = curent_portfolio_contaner.find(".portfolio-item.current");
                curent.removeClass("current");
                $portfolio_popup.stop(true,true).hide();
                $(".loader").show();
                var portfolio_item = $("#"+event.state.post_id);
                portfolio_item.find(".portfolio-thumb a").trigger("click");
            }
        };
    /*Single Portfolio*/

    /*Portfolio Filter*/
    $(".btn-filters").click(function(e){
        e.preventDefault();
        $(this).next().stop(true,true).slideToggle("fast");
    });
    var project_filter = "";
    if(filter_works){
        $(".mobile-filters ul li a").click(function(e){
            e.preventDefault();
            project_filter = jQuery(this).data("filter");
            $(this).parents(".mobile-filters").find(".btn-filters").text($(this).text());
            var portfolio_parent = $(this).parents(".portfolio:eq(0)");
            portfolio_parent.find(".disabled").removeClass("disabled");
            portfolio_parent.find(".portfolio-item:not(."+project_filter+")").addClass("disabled");
        });
        $(".filter-works a").click(function(e){
            e.preventDefault();
            project_filter = jQuery(this).data("filter");
            var parent = $(this).parent().parent();
            parent.find("a.active-filter").removeClass("active-filter");
            $(this).addClass("active-filter");
            var portfolio_parent = $(this).parents(".portfolio:eq(0)");
            portfolio_parent.find(".disabled").removeClass("disabled");
            portfolio_parent.find(".portfolio-item:not(."+project_filter+")").addClass("disabled");
        });
    }
    /*Portfolio Filter*/

    /*Portfolio Load More*/
    $(".load-portfolio a").click(function(e){
        e.preventDefault();
        $(".loader").show();
        var parent = $(this).parents("section.portfolio:eq(0)");
        var cur_page = parseInt(parent.data("page"))+1;
        var cur_section = parent.data("section");
        var max_page = $(this).data("max-page");
        var ajax_data = {
            um_section : cur_section,
            um_page : cur_page
        };
        $.post(um_page_url,ajax_data,function(data){
            if(data){
                parent.find(".portfolios_holder").append(data);
                parent.waitForImages(function(){
                    get_portfolio_image_color_dominance();
                    if(parent.hasClass("portfolio_masonry")){
                        parent.find(".portfolios_holder").masonry( 'destroy' );
                        parent.find(".portfolios_holder").masonry({
                            itemSelector: '.portfolio-item'
                        });
                    }
                });
                if(project_filter){
                    parent.find(".portfolio-item:not(."+project_filter+")").addClass("disabled");
                }
                if(cur_page == max_page){
                    parent.find(".load-portfolio").fadeOut("fast",function(){
                        $(this).remove();
                    });
                }
            }
            $(".loader").hide();
        });
    });
    /*Portfolio Load More*/

    /*Blog Posts Load More*/
    var blog_page = 1;
    $(".load-blogposts a").click(function(e){
        e.preventDefault();
        $(".loader").show();
        var max_pages = $(this).data("max-page");
        var load_more_dom = $(this).parent();
        blog_page++;
        var ajax_data = {
            um_blog_page : true,
            paged : blog_page,
            page : blog_page
        };
        $.post(um_page_url,ajax_data,function(data){
            if(max_pages == blog_page){
                load_more_dom.fadeOut("fast",function(){
                    $(this).remove();
                });
            }
            if(data){
                $("div.posts_container").append(data);
            }
            $(".loader").hide();
        });
    });
    /*Blog Posts Load More*/

    /*Team Members Dialog*/
        var cur_team_container = null;
        var $team_popup = $(".team-popup");
        var team_dialog_display = false;
        $team_popup.find(".stp-holder").niceScroll();
        $(".team .single-team > a").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            team_dialog_display = true;
            var parent = $(this).parent();
            parent.addClass("current");
            cur_team_container = $(this).parents("section.team:eq(0)");
            var markup = parent.find(".dialog_content").html();
            $team_popup.find(".stp-holder").html(markup);
            $team_popup.stop(true,true).fadeIn("fast");
        });

        $(".team-popup .next").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            team_dialog_display = true;
            var curent = cur_team_container.find(".current");
            var next = cur_team_container.find(".single-team:eq("+(curent.index(".single-team")+1)+")");
            if(typeof next === 'undefined' || !next.length){
                next = cur_team_container.find(".single-team:eq(0)");
            }
            curent.removeClass("current");
            $team_popup.stop(true,true).fadeOut("fast");
            next.find("> a").trigger("click");
        });

        $(".team-popup .previous").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            team_dialog_display = true;
            var curent = cur_team_container.find(".current");
            var next = cur_team_container.find(".single-team:eq("+(curent.index(".single-team")-1)+")");
            if(typeof next === 'undefined' || !next.length){
                next = cur_team_container.find(".single-team:eq(0)");
            }
            curent.removeClass("current");
            $team_popup.stop(true,true).fadeOut("fast");
            next.find("> a").trigger("click");
        });

        $(".team-popup .close").click(function(e){
            e.preventDefault();
            team_dialog_display = false;
            $team_popup.find(".stp-holder").html("");
            $team_popup.stop(true,true).fadeOut("fast");
        });

        $(document).click(function(e) {
            if(!$(e.target).parents(".team_dialog").length && team_dialog_display){
                $(".team-popup .close").trigger("click");
            }
        });
    /*Team Members Dialog*/

    /*Umbrella Slider*/
    $(".u-single-slide .slide-image").imgLiquid();

    var um_autoplay_object = function(parent,delay){
        this.parent = parent;
        this.delay = delay;

        var parent = this.parent;

        var play = function(obj){
            if(!obj.find(".u-slides-control").is(":hover")){
                obj.find("a.next").trigger("click");
            }
        }

        setInterval(function(){
            play(parent);
        },this.delay);
    }

    function umbrella_slider_auto_play(){
        $("section.slider").each(function(){
            var $this = $(this);
            var autoplay = parseInt($this.data("auto"));
            if(autoplay > 0){
                new um_autoplay_object($this,autoplay);
            }
        });
    }

    $um_window.load(function(){
        $("section.slider").each(function(){
            var visible_slide = $(this).find(".u-single-slide:visible");
            um_animate_slider_caption(visible_slide);
            pasueVimeo(parent,visible_slide);
            pasueYoutube(parent,visible_slide);
        });
        umbrella_slider_auto_play();
    });

    $("section.slider .u-slide-buttons .next").click(function(e){
        e.preventDefault();
        var $this = $(this);
        var parent = $this.parents("section.slider:eq(0)");
        var visible_slide = parent.find(".u-single-slide:visible");
        var next_slide = visible_slide.next();
        if(!next_slide.length){
            next_slide = parent.find(".u-single-slide:eq(0)");
        }
        visible_slide.stop(true,true).fadeOut("fast",function(){
            um_animate_slider_caption(next_slide);
            next_slide.stop(true,true).fadeIn("fast");
            pasueVimeo(parent,next_slide);
            pasueYoutube(parent,next_slide);
        });
    });

    $("section.slider .u-slide-buttons .previous").click(function(e){
        e.preventDefault();
        var $this = $(this);
        var parent = $this.parents("section.slider:eq(0)");
        var visible_slide = parent.find(".u-single-slide:visible");
        var next_slide = visible_slide.prev();
        if(!next_slide.length){
            next_slide = parent.find(".u-single-slide:last");
        }
        visible_slide.stop(true,true).fadeOut("fast",function(){
            um_animate_slider_caption(next_slide);
            next_slide.stop(true,true).fadeIn("fast");
            pasueVimeo(parent,next_slide);
            pasueYoutube(parent,next_slide);
        });
    });

    function um_animate_slider_caption(slide){
        var h2_caption = slide.find(".u-captions h2");
        h2_caption.removeClass();
        h2_caption.addClass("animated " + h2_caption.data("anim"));

        var button = slide.find(".u-captions .a")
        button.removeClass();
        button.addClass("btn1 animated " + h2_caption.data("anim"));
    }

    function center_umbrella_slider_videos(){
        $(".u-single-slide iframe").each(function(){
            center_video($(this));
        });
    }
    $um_window.load(center_umbrella_slider_videos);
    $um_window.resize(center_umbrella_slider_videos);

    /*Make Slider Navigate By Swipe*/
    $(".slider").swipe({
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            /*Play Previous Slide*/
            $(this).find(".u-slide-buttons a.previous").trigger("click");
        },
        swipeRight:function(event, direction, distance, duration, fingerCount){
            /*Play Next Slide*/
            $(this).find(".u-slide-buttons a.next").trigger("click");
        }
    });
    /*Make Slider Navigate By Swipe*/
    /*Umbrella Slider*/

    /*One Page Menu Navigation*/
    $(".page-builder-menu-item.curent_page_builder_item a").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $um_window.off("scroll",UpdateMenuOnScroll);
		$(".mobile-menu").stop(true,true).fadeOut("fast");
        var id = $(this).attr("href");
        var section = $(id);
        if(section.length && smooth_scroll){
            $um_window.scrollTop(section.offset().top);
            history.pushState(null, null, id);
        }else if(section.length && !smooth_scroll){
            $("body").scrollTo(section,800);
            history.pushState(null, null, id);
        }
        $mainMenu.find(".current-menu-item").removeClass("current-menu-item");
        $(this).parent().addClass("current-menu-item");
        window.setTimeout(function(){
            $um_window.on("scroll",UpdateMenuOnScroll);
        },1200);
    });
    /*One Page Menu Navigation*/

    /*In screen*/
    var $_ScrollTop = 0;
    var $sectionElement = $(".inner_content > section[id]");
    var $mainMenu = $("#main_menu");
    function UpdateMenuOnScroll(){
        var scroll_top = $um_window.scrollTop();
        var window_height = $um_window.height() / 2;
        $sectionElement.each(function(){
            var $this = $(this);
            if($_ScrollTop > scroll_top){
                //Scrolling UP
                var element_bottom = $this.offset().top + $this.outerHeight() + (window_height - (window_height / 2));
                if(element_bottom >= scroll_top && $this.offset().top < scroll_top){
                    history.pushState(null, null, "#"+$this.attr("id"));
                    $mainMenu.find(".current-menu-item").removeClass("current-menu-item");
                    $mainMenu.find("a[href$='#"+$this.attr("id")+"']").parent().addClass("current-menu-item");
                }
            }else{
                //Scrolling Down
                var window_scroll_top_offset = (scroll_top + $um_window.height()) - window_height;
                if($this.offset().top <= window_scroll_top_offset && ($this.offset().top + $this.height()) > window_scroll_top_offset){
                    history.pushState(null, null, "#"+$this.attr("id"));
                    $mainMenu.find(".current-menu-item").removeClass("current-menu-item");
                    $mainMenu.find("a[href$='#"+$this.attr("id")+"']").parent().addClass("current-menu-item");
                }
            }
        });
        $_ScrollTop = scroll_top;
    }
    /*In screen*/

    $um_window.load(function(){
        //Window Location Hash
        if(window.location.hash){
            var el = $(window.location.hash);
            if(el.length && !smooth_scroll){
                $("body").scrollTo(el,800);
            }
        }
        $um_window.on("scroll",UpdateMenuOnScroll);
    });

    /*Shortcodes*/

    /*Accordions*/

    $("body").on("click","ul.accordion li > a",function(e){
        e.preventDefault();
        var parent = $(this).closest("ul.accordion");
        var this_element = $(this);
        parent.find("a.active").removeClass("active").find('i').addClass('fa-plus-square').removeClass('fa-minus-square').parent().siblings(".section_content").stop(true,true).slideUp({
            duration : 200 ,
            complete : function(){
                this_element.addClass("active").find('i').removeClass('fa-plus-square').addClass('fa-minus-square').parent().siblings(".section_content").stop(true,true).slideDown({

                });
            }
        });
    });

    /*Tabs*/

    $("body").on("click","div.tabs ul.tab_buttons li > a",function(e){
        e.preventDefault();
        var parent = $(this).parent().parent();
        var this_index = $(this).parent().index();
        parent.find("a").removeClass("active");
        $(this).addClass("active");
        parent.next().children("li:visible").stop(true,true).fadeOut({
            duration : 200 ,
            complete : function(){
                parent.next().children("li").eq(this_index).stop(true,true).fadeIn({
                    duration : 200
                });
            }
        });
    });

    /*Toggles*/
    $("body").on("click",".toggle li > a",function(e){
        e.preventDefault();
        var section_content = $(this).siblings(".section_content");
        if($(this).hasClass("active")){
            $(this).removeClass("active").find('i').addClass('fa-plus-square').removeClass('fa-minus-square');
        }else{
            $(this).addClass("active").find('i').removeClass('fa-plus-square').addClass('fa-minus-square');
        }
        section_content.stop(true,true).slideToggle({
            duration : 200
        });
    });

    $("body").on("click","div.alert_container a.close",function(e){
        e.preventDefault();
        $(this).parent().fadeOut({
            duration : 800
        });
    });
    /*Alerts*/

    $('.accordion li:first-child').find('a').addClass('active').find('i').removeClass('fa-plus-square fa').addClass('fa-minus-square fa');
    $('.accordion li:first-child').find('.section_content').show();

    $('.tabs .tab_buttons > li:first-child').find('a').addClass('active');
    $('.tabs .tab_content li:first-child').show();
    /*Shortcodes*/

    /*Google Maps*/
    $("section.contact .google_map").each(function(){
        var $this = $(this);
        var map_style = [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff00c9"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#e5e8e9"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];
        var map_options = {
            zoom: 8,
            center: new google.maps.LatLng(parseFloat($this.parent().data("lat")), parseFloat($this.parent().data("lang"))),
            scrollwheel: false,
            styles : map_style
        };
        var map = new google.maps.Map($this.get(0), map_options);
        new google.maps.Marker({
            title : $this.parent().data("address"),
            position: new google.maps.LatLng(parseFloat($this.parent().data("lat")), parseFloat($this.parent().data("lang"))),
            map: map
        })
    });
    /*Google Maps*/

    /*Virtual Scroll*/
    if(smooth_scroll){
        var inner_content = $(".inner_content");
        var inner_content_dom = inner_content.get(0);
        var page_scroll = $("<div class='page_scroll'></div>");
        function um_smooth_scroll_handler(e){
            var scroll_top = -($(this).scrollTop());
            if(typeof inner_content_dom === 'object'){
                TweenLite.to(inner_content_dom,1,{
                    transform : "translate3d(0px, "+scroll_top+"px, 0px)",
                    ease : Expo.easeOut,
                    force3D:true
                });
            }
            //To keep an element fixed position we need to calculate it's original height + window scroll top
            //$(".subject").css("top",Math.abs(scroll_top) + 20 + "px");
            // To keep an element fixed within it's container we need to calculate :
            // Window Scroll Top + Window Height - Element Top Possition - Fixed Element Top Position , while the element has absolute position
            // Parent element offset top position should be calculated on the begining before the container is made fixed pos
            /*var subject_text = "";
             subject_text += "Window : " + (Math.abs(scroll_top) + $um_window.height());
             subject_text += "<br/> Services " + $(".services").offset().top;
             subject_text += "<br/> Diff " + ((Math.abs(scroll_top) + $um_window.height()) - $(".services").offset().top);
             $(".subject").html(subject_text);
             $(".subject").css("top", (((Math.abs(scroll_top) + $um_window.height()) - $(".services").offset().top) - 150)+"px");*/

            //inner_content.css("transform","translate3d(0px, "+scroll_top+"px, 0px)");
            //inner_content.css("-webkit-ransform","translate3d(0px, "+scroll_top+"px, 0px)");
        }
        $um_window.on("hashchange",function(){
            $um_window.off("scroll",um_smooth_scroll_handler);
            window.setTimeout(function(){
                $um_window.on("scroll",um_smooth_scroll_handler);
                $um_window.scrollTop(0);
            },1000);
        });
        $um_window.load(function(){
            //Scroll to DOM if it's ID is located on window.hash, and perform the operation right in here
            //Before you create the page_scroll shadow DOM element which forces window height same as inner_content
            var el_offset = 0;
            if(window.location.hash){
                var el = $(window.location.hash);
                if(el.length){
                    el_offset = el.offset().top;
                }
            }

            var inner_content_height = inner_content.outerHeight();
            page_scroll.css("height",inner_content_height+"px");
            inner_content.addClass("smoothscroll");
            inner_content.after(page_scroll);

            //Calculate each section initial top
            sections.each(function(){
                this.initial_top = $(this).offset().top;
            });
            $um_window.on("scroll",um_smooth_scroll_handler);
            if(el_offset){
                _scrollTo = el_offset;
                setTimeout(check_window_scroll,function(){
                    check_window_scroll();
                },300);
            }
        });
        $um_window.on("debouncedresize",function(){
            inner_content.removeClass("smoothscroll");
            var inner_content_height = inner_content.outerHeight();
            page_scroll.css("height",inner_content_height+"px");
            inner_content.addClass("smoothscroll");
            //Calculate each section initial top
            sections.each(function(){
                this.initial_top = $(this).offset().top;
            });
        });
    }
    /*Virtual Scroll*/

    /*Notify when window stops scrolling*/
    var windowScrollTop = $um_window.scrollTop();
    var windowScrollChangeAttempts = 0;
    var _scrollTo = 0;
    function check_window_scroll(){
        var curWindowScrolltop = $um_window.scrollTop();
        if(windowScrollChangeAttempts >= 3){
            window.scrollTo(0,_scrollTo);
            return;
        }
        if(curWindowScrolltop == windowScrollTop){
            windowScrollChangeAttempts++;
        }
        setTimeout(check_window_scroll,function(){
            check_window_scroll();
        },300);
    }

    /*Masonry*/
    $um_window.load(function(){
        $(".portfolio_masonry .portfolios_holder").masonry({
            itemSelector: '.portfolio-item',
            isResizable: false
        });
    });
    /*Masonry*/

    /*Canvas Particles - inner_content*/
    if($("#global-background").length && !Modernizr.touch){
      alert('2323');
        particlesJS('global-background', {
        particles: {
            color: canvas_color,
            shape: 'circle',
            opacity: .3,
            size: 1.5,
            size_random: true,
            nb: 200,
            line_linked: {
                enable_auto: true,
                distance: 200,
                color: canvas_color,
                opacity: .5,
                width: 0.5,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 1
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 250
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
                opacity: 0.5
            },
            events: {
                onclick: {
                    push_particles: {
                        enable: true,
                        nb: 4
                    }
                }
            }
        },
        retina_detect: true
    });
    }
    /*Canvas Particles*/
});


/*Custom Functions*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

/*Youtube and Vimeo API Functions*/
function pasueVimeo(parent,player) {
    pauseAllVimeos(parent);
    var volume = parseInt(player.data("video-volume")) / 100;
    player = player.find("iframe.vimeo").get(0);
    if (player) {
        player = player.contentWindow;
        player.postMessage('{"method":"play"}', '*');
        player.postMessage('{"method":"setVolume","value":'+volume+'}', '*');
    }
}

function pasueYoutube(parent,player) {
    pauseAllYoutubes(parent);
    var volume = parseInt(player.data("video-volume"));
    player = player.find("iframe.youtube").get(0);
    if (player) {
        player = player.contentWindow;
        var func = "playVideo";
        player.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
        player.postMessage('{"event":"command","func":"' + "setVolume" + '","args":['+volume+']}', '*');
    }
}

function pauseAllYoutubes(parent) {
    var youtube_players = jQuery(parent).find("iframe.youtube");
    for (var i = 0; i < youtube_players.length; i++) {
        var youtube_player = youtube_players[i];
        youtube_player = youtube_player.contentWindow;
        var func = "pauseVideo";
        youtube_player.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    }
}

function pauseAllVimeos(parent) {
    var youtube_players = jQuery(parent).find("iframe.vimeo");
    for (var i = 0; i < youtube_players.length; i++) {
        var youtube_player = youtube_players[i];
        youtube_player = youtube_player.contentWindow;
        youtube_player.postMessage('{"method":"pause"}', '*');
    }
}

function center_video(el){
    var playerBox = el;
    var win = {};
    var el = jQuery(window);

    win.width = el.width();
    win.height = el.height();

    var margin = 24;
    var vid = {};
    vid.width = win.width + ((win.width * margin) / 100);
    vid.height = Math.ceil((9 * win.width) / 16);
    vid.marginTop = -((vid.height - win.height) / 2);
    vid.marginLeft = -((win.width * (margin / 2)) / 100);

    if (vid.height < win.height) {
        vid.height = win.height + ((win.height * margin) / 100);
        vid.width = Math.floor((16 * win.height) / 9);
        vid.marginTop = -((win.height * (margin / 2)) / 100);
        vid.marginLeft = -((vid.width - win.width) / 2);
    }
    playerBox.css({width: vid.width, height: vid.height, marginTop: vid.marginTop, marginLeft: vid.marginLeft});
}
/*Youtube and Vimeo API Functions*/