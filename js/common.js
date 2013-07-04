$(function(){

    //sidebar filter blocks expand toggle
    $('.filter__plus, .filter_sidebar .filter__text').click(function(e){
        var parent = $(this).closest('.filter__list-item, .filter__block'),
            plus,
            list = parent.find('.filter__expand');
        if ($(this).is(".filter__plus")){
            plus = $(this)
        }
        if ($(this).is(".filter__text")){
            plus = $(this).prev(".filter__plus");
        }
        plus.text() == '+' ? plus.text('-'):plus.text('+');
        list.toggle();

        e.preventDefault();
    });

    // producers & categories logo change on hover
    $('.b-prod, .b-category, .producers__item').not('.b-category_no-hover').each(function(){
        var image = $('img',this),
            imageNormal = image.attr('src'),
            imageHover = image.attr('data-hover-img');

        if(imageHover)
        {
        $(this).hover(
            function(){
                image.attr('src',imageHover)
            },
            function(){
                image.attr('src',imageNormal)
            }
        );
        }
    });

    //filter tabs navigation
    if(!$('.tabs__head').length == 0){
        $(".tabs__head-inner").carouFredSel({
            responsive:true,
            items:{
                width:120,
                visible:{
                    min:5,
                    max:12
                }
            },
            scroll:{
                items:1
            },
            auto:false,
            circular:false,
            prev:".tabs__nav-left",
            next:".tabs__nav-right"
        });
    }

    //producers list navigation
    $('.producers__list .list__scroll').each(function(){
        $(this).carouFredSel({
            responsive:true,
            scroll:1,
            items:{
                visible :1,
                width:287
            },
            auto:false,
            circular:false,
            prev:{
                button:function(){
                            return $(this).parents('.list').find('.list__btn-left');
                        }
            },
            next:{
                button:function(){
                    return $(this).parents('.list').find('.list__btn-right');
                }
            }
        });
    });

    //product image slider
    $('.product .item-logo__gallery').carouFredSel({
        circular:false,
        auto:false,
        pagination:".product .item-logo__bullets",
        width:'100%',
        items:{
            visible:1
        }
    });

    //related and other products slider
    $(".prod-list__gallery").each(function(){
        var gallery = $(this),
            arrowLeft = $(this).parents('.prod-list').prev('.pager').find('.ico_type_nav-left'),
            arrowRight = $(this).parents('.prod-list').prev('.pager').find('.ico_type_nav-right');
        gallery.carouFredSel({
            onCreate: function( data ) {
                $("#related-products").parents('.caroufredsel_wrapper').addClass('caroufredsel_wrapper-gallery');
            },
            circular:false,
            infinite:false,
            auto:false,
            responsive:true,
            scroll:1,
            prev:arrowLeft,
            next:arrowRight,
            items:{
                visible:4
            }
        });
    });

    galleryItemsScrolled();
    $(window).resize(function(){
        galleryItemsScrolled();
    });
    $(window).trigger('resize',1);

    function galleryItemsScrolled(){
        if($(window).width() < 1319){
            $("#related-products").trigger("configuration", {
                scroll: 3,
                items: {
                    visible: 3
                }
            });
        } else {
            $("#related-products").trigger("configuration", {
                scroll: 4,
                items: {
                    visible: 4
                }
            });
        }

    }


    //check/uncheck checkbox in orders table
    $('.orders__tbl tbody tr').click(function(){
        var input = $('.b-check',this);
        if(input.is(':checked'))
            {input.attr('checked',false);}
        else if(input.not(':checked'))
            {input.attr('checked',true);}
    });

    // custom scroll init
    if(!$('.scroll-pane').length == 0){
        $('.scroll-pane').jScrollPane();
    }
    $(window).resize(function(){
        if(!$('.scroll-pane').length == 0){
            $('.scroll-pane').jScrollPane();
        }
        drawListDots();
    });

    //line of dots in .list block
    drawListDots();

   function drawListDots(){
       $('.list__item').each(function(){
           var item = $(this);
           $('.list__item-bg',item).css({
               width: item.width() - $('.list__item-name',item).width() - $('.list__item-link',item).width() - $('.list__item-quantity',item).width() + parseInt(item.css('padding-right')), //padding-right
               left: $('.list__item-name',item).width()  // summary padding child elements
           });

           if(item.height() >= 35){

               $('.list__item-name, .list__item-quantity',item).css({
                   'background-color':'#fcfcfb'
               });
               $('.list__item-bg',item).css({
                   width: item.width() + 10,
                   left: 0
               })
           }
       });
   }

});


function InitIE(){
	if (($.browser.msie) && (/MSIE (5\.5|6).+Win/.test(navigator.userAgent))) {

	}
}

