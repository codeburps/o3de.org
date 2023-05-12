const navbarBurger = () => {
  const burger = $(".navbar-burger"),
    menu = $(".navbar-menu");

  burger.click(() => {


    [burger, menu].forEach((el) => el.toggleClass('is-active'));
  });
}

$(() => {
  navbarBurger();
});

const newnavBurger = () => {
  const newMenu = $(".new-nav");
   let hamburger = newMenu.find(".navbar-toggler");
   hamburger.click((e) => {
    e.preventDefault();
    let $this = $(e.currentTarget);
    $('.menu-wrapper').toggleClass('is-active');
    $this.find('.navbar-toggler-icon').toggleClass('is-active');
    $('html').toggleClass('has-menu-active');
   });
   let dropclick = $('.drop-click');
   dropclick.click((e)=> {
    let $this = $(e.currentTarget);
    $this.toggleClass('is-open');
    $this.parents('.navbar-start').find('.sub-menu').slideToggle();

   });
}

// active nav bar link
$(() => {

  if($('.main-navbar').hasClass("new-nav")){
    newnavBurger();
  }

  $('.navbar-start').on({
    mousemove: (e) => {
       
        let $this = $(e.currentTarget);
        console.log();
        // let title = $this.find('> a').attr('title');

        if(!e.currentTarget.activeTimeout){
          $this.addClass("is-open");
        } 
       
    },
    mouseleave: (e) => {
        let $this = $(e.currentTarget);

        $this.removeClass('is-open');
        e.currentTarget.activeTimeout = true;
        setTimeout(()=>{
            e.currentTarget.activeTimeout = false;
        
        },650)
    }
});
});

$(() => {
  const url = window.location.pathname;
  $("ul.mr-auto.navbar-nav li a").each(function(){
    if( $(this).attr("href")+"/" == url ) {
      $("ul.navbar-nav li a").removeClass("active");
      $("ul.navbar-nav li").removeClass("active");
      $(this).addClass("active");
      $(this).parents().addClass("active");
    }
  })
});

// Lightbox behavior

$(function() {
  $("a.lightbox-trigger").click(function(e) {
    var lightboxId = $(this).data("lightbox");
    if(lightboxId)
    {
      var lightboxObject = $("#" + lightboxId);
      if(lightboxObject.hasClass("lightbox-content"))
      {
        e.preventDefault();
        lightboxObject.fadeIn(500);
      }
    }
  });
  
  $(".lightbox-content").click(function(e) {
    $(this).fadeOut(500);
  });
  
  $(".lightbox-content iframe").click(function(e) {
    e.preventDefault();
  });
});

// nav bar search

$(() => {
  $(".search-icon").on('click', (e) => {
    e.preventDefault();
    if(!$(".search-drop.is-active").length){
      $(".search-drop").addClass('is-active');
    } else{
      $(".search-drop").removeClass('is-active');
    }
  });
  $('.close-popup').on('click', (e) => {
    e.preventDefault();
    $(".search-drop").removeClass('is-active');
  });
 
  // $("#search").submit(function(event){
  //   if($(".search-input-view").is(":hidden"))
  //   {
  //     event.preventDefault();
  //     $(".search-input-view").show();
  //   }
  // });
});

// --- Downloads page
// Handle click to switch between download pages.
$(function() {
  $(".os-selector-button").click(function(event){
    if($(this).hasClass("active"))
    {
      return;
    }

    // Switch enabled button
    $(".os-selector-button.active").removeClass("active");
    $(this).addClass("active");

    // Switch content
    $(".os-content.active").removeClass("active");
    $("#content-" + $(this).data("os")).addClass("active");
  });
});

// --- Staff page
// Handle click to switch between staff groups.
$(function() {
  $(".staff-selector").click(function(event){
    if($(this).hasClass("active"))
    {
      return;
    }

    // Switch enabled button
    $(".staff-selector.active").removeClass("active");
    $(this).addClass("active");

    // Switch content
    $(".reslult-list.active").removeClass("active");
    $("#"+$(this).data("staff")+"-staff").addClass("active");
  });
});

// Detect anchor in URL on load and select appropriate tab.
// This uses the click to switch function, so it must be defined after it.
$(function() {
  // Retrieve the hash from the url.
  var hash = $(location).attr('hash').replace( /#/, "" );

  // Try to click the appropriate button.
  // If it doesn't exist, this will just do nothing.
  $("#os-" + hash).trigger("click");
});

// Docs navigation

$(function() {
  const url = window.location.pathname;
  $("#docs-nav a").each(function(){
    if($(this).attr("href") == url) {
      $(this).addClass("currentPage");

      // Apply attributes to the parent pages/sections for styling.
      $(this).parentsUntil("#docs-nav", "ul").each(function(){
        $(this).addClass("currentAncestor");
        $(this).siblings('a').each(function()
        {
          $(this).addClass("currentAncestor").addClass("open");          
        });                  
        $(this).parent('li').addClass("currentAncestorCategory");    
      })
      $(this).parent('li').addClass("currentAncestorCategory");    
      
    }
  })
});

// Applies to the current page in the docs-nav.
$(function() {
  $("#docs-nav a.currentPage").each(function(e){

    // Show children pages/sections in the docs-nav, if any.
    if ($(this).hasClass('has-children')){
      console.log("yes has children");

      $(this).addClass("open");
      showChildren(this);
    }
    $(this).siblings('.has-children-icon').each(function()
    {
      $(this).addClass("open");
      $(this).addClass("currentPage");
    });
  })
});

// For sections in the docs-nav, this applies to the drop-down icon's click event.
$(function() {
  $("#docs-nav a.has-children-icon").click(function(e){
    console.log("has-children-icon triggered");
    $(this).toggleClass("open");
    showChildren(this);
  })
});

// A helper function to show the list of children in the docs-nav.
function showChildren(e) {
  $(e).siblings('ul').each(function()
  {
    $(this).slideToggle(300);
  });
}

// A helper function to customize the dropdown for the version switcher.
function updateSelectElement(currentOrigin) {
    var originMatched = false;
    
    // Make the following modifications to the dropdown options:
    // - Add "(latest)" to the production URL option.
    // - Set the selected option and enhance its style.
    $("#version-switcher").children("option").attr("value", function(i, currentValue) {
        if (currentValue.includes("www.o3de.org")) {
            $(this).text($(this).text() + " (latest)");
        }

        if (currentValue == currentOrigin) {
            originMatched = true;
            $(this).attr("selected", "selected");
            $(this).attr("class", "selectedVersion");
        }
    });

    // Add the current host if it's not one of the standard published branches.
    if (!originMatched) {
        var newOption = '<option value="' + currentOrigin + '" selected="selected" class="selectedVersion">';
        
        if (currentOrigin.includes("localhost")) {
            newOption += 'local</option>';
        }
        else if (currentOrigin.includes("deploy-preview")) {
            newOption += 'preview</option>';
        }
        else {
            newOption += new URL(currentOrigin).hostname + '</option>';
        }

        $("#version-switcher").append(newOption);
    }
}

function updateSidebarAttributes() {
    // If an info or warning banner is present, adjust the top and height of the left nav so that it doesn't scroll when scrolling the contents of the page.
    if ($("#preview-info").length > 0 || $("#version-warning").length > 0) {
        var bannerHeight = $("#docs-banners").height();
        $(".docs-sidebar").css("top", bannerHeight);
        $(".docs-sidebar").css("height", window.innerHeight - bannerHeight);
    }
}

// For docs navbar, switch to a different published docset.
$(function() {
    // Update the dropdown for the version switcher, based on the origin part of the URL.
    updateSelectElement(window.location.origin);

    // Set up the onChange event handler for the version switcher to load the current page from the selected location.
    $("#version-switcher").on("change", function(event) {
        // Get new host from selected version.
        const newHost = event.target.value;
        
        // Build a new URL using new host and old path.
        const newURL = new URL(newHost + window.location.pathname);
        var newHref = newURL.href;

        // Load the new location.
        if (newHref != window.location.href) {
            window.location.href = newHref;
        }
    });

    updateSidebarAttributes();
});

$(window).on("resize", function() {
    updateSidebarAttributes();
});

$(function() {
  $("body").append("<div id=\"docs-mobile-menu-overlay\" class=\"docs-mobile-menu-overlay\"></div>");

  $("#docs-mobile-menu-overlay").click(function(){
    $("body").removeClass("docs-mobile-menu-open");
    $(this).removeClass("show");
    setTimeout(function(){ $(this).hide(); }, 300);
  });

  $("#mobile-docs-toggler").click(function(){
    var overlay = $("#docs-mobile-menu-overlay");
    if(overlay.hasClass("show"))
    {
      $("body").removeClass("docs-mobile-menu-open");
      overlay.removeClass("show");
      setTimeout(function(){ overlay.hide(); }, 300);
    }
    else
    {
      $("body").addClass("docs-mobile-menu-open");
      overlay.show();
      setTimeout(function(){ overlay.addClass("show"); }, 10);
    }
  });
});

// Detect anchor links, add correct offset and scroll behavior.
$(function() {
  var scrollOffset = $(".main-navbar").height() + 32;

  $("a[href^=\\#]").click(function(e) {
    // Don't apply behavior to tabs
    if($(this).data("toggle") == "tab")
    {
      return;
    }

    var dest = $(this).attr('href');
    if(dest != "" && dest.length > 1 && $(dest).length > 0)
    {
      $('html,body').animate({ scrollTop: $(dest).offset().top - scrollOffset }, 'slow');
    }
  });
});

// Homepage Hero Slideshow
$(function()
{
  if($("#hero-slideshow").length > 0)
  {
    var slides = [];
    var i = 0;
    $("#hero-slideshow").find(".hero-slideshow-image").each(function()
    {
      slides[i] = $(this);
      ++i;
    });

    var slidesNum = slides.length;
    
    function setupSlides(index)
    {
      if(index < 0 || index >= slidesNum)
      {
        return;
      }

      var previousActive = $(".hero-slideshow-image.active");
      previousActive.addClass("fadeOut");
      slides[index].addClass("active");
      
      setTimeout(function() {
        previousActive.removeClass("fadeOut").removeClass("active");
      }, 1000);

      var nextIndex = index + 1;
      if (nextIndex == slidesNum)
      {
        nextIndex = 0;
      }

      setTimeout(function() {
        setupSlides(nextIndex);
      }, 7000);
    }

    setupSlides(0);
  }
  
});
//staff popup
$(function(){
  $('a[data-modal]').on('click',function(event) {
    $(this).modal({
      fadeDuration: 100
    });
    return false;
  });
   
});
// gems filter
$(function(){
  if($(".gem-page-content").length >0 ){
    $(".gem-page-list .gem-item").addClass('active');
    
    const gemLength = $('.gem-item.active').length;
    $('#found').html(gemLength);

    $('ul.filter-list li').on('click',(e)=>{
      const current =$(e.currentTarget).data('filter');
     if(current == "all"){
      $('ul.filter-list li').removeClass('active');
      $(e.currentTarget).addClass('active');
      $('.gem-item').addClass('active');
     } else{
      if($('ul.filter-list li.all.active').length > 0){
        $('ul.filter-list li.all.active').removeClass('active');
        $('.gem-item').removeClass('active');
        if($(e.currentTarget).hasClass('active')){
          $(e.currentTarget).removeClass('active');
          $('.gem-item.'+current).removeClass('active');
        }else{
          $(e.currentTarget).addClass('active');
          $('.gem-item.'+current).addClass('active');
        }
      }else{
        if($(e.currentTarget).hasClass('active')){
          $(e.currentTarget).removeClass('active');
          $('.gem-item.'+current).removeClass('active');
          if(!$('ul.filter-list li.active').length > 0){
            $('.gem-item').addClass('active');
            $('ul.filter-list li.all').addClass('active');
          }
        }else{
          $(e.currentTarget).addClass('active');
          $('.gem-item.'+current).addClass('active');
        }
        
      }
     }
     const gemLength = $('.gem-item.active').length;
     $('#found').html(gemLength);
  
      
      

    })
  }
})

$(function(){
  const api_url = "https://o3de.garethd4.sg-host.com/wp-json/o3de/v1/navigation-posts";

  $.ajax( {
    url: api_url,
    success: function ( data ) {
      if(data){
         //     hideloader();
         showBlog(data);
         showEvents(data);
      }
     
    },
    cache: false
  } );


function hideloader() {
  document.getElementById('loading').style.display = 'none';
}


function showEvents(data) {
  let featuredEvents= data.events;
  const date = new Date(featuredEvents.meta.event_date_and_time);
  const month = date.toLocaleString('default', { month: 'long' });
  const postDate = ("0" + date.getDate()).slice(-2)+"."+("0" + date.getMonth()).slice(-2)+"."+date.getFullYear();
  const eventLocation = featuredEvents.meta.event_location ? featuredEvents.meta.event_location+' | ' : '';
  const readTime = featuredEvents.meta.read_time ? ' | '+featuredEvents.meta.read_time : '';
  const postThumbnail =featuredEvents.post_thumbnail;
  const navDate = month+" "+("0" + date.getDate()).slice(-2)+", "+date.getFullYear();
  
  
  let homeBlog = `<a href="${featuredEvents.meta.event_link}" >
        <div class="community--card_img-wrapper">
            <div class="community--card_img" style="background-image: url('${postThumbnail}')"></div>
        </div>
        <div class="community--card_text">
            <div> 
            <span>Blog</span>
            <h3>${featuredEvents.content.post_title}</h3>
            </div>
            <p>${eventLocation} <time datetime="${postDate}">${postDate} </time></p>
        </div>
      </a>`
      document.getElementById("home-event").innerHTML = homeBlog;

    let navBlog = `<div class="main-menu-item__image-wrapper">
              <div class="bg-image" style="background-image: url('${postThumbnail}');"></div>
            </div>
            <div class="main-menu-item__text-wrapper">
                <span class="author-category">BLOG POST</span>
                <span class="main-menu-item__title">
                ${featuredEvents.content.post_title}
                </span>
                <span class="main-menu-item__date">${navDate}</span>
            </div>
            <a href="${featuredEvents.meta.event_link}" class="blog-link"></a>`
      document.getElementById("nav-event").innerHTML = navBlog;
    }  
function showBlog(data) {
  let featuredNews= data.news;
  const date = new Date(featuredNews.content.post_date);
  const month = date.toLocaleString('default', { month: 'long' });
  const postDate = ("0" + date.getDate()).slice(-2)+"."+("0" + date.getMonth()).slice(-2)+"."+date.getFullYear();
  const author = featuredNews.meta.author ? featuredNews.meta.author+' | ' : '';
  const readTime = featuredNews.meta.read_time ? ' | '+featuredNews.meta.read_time : '';
  const postThumbnail =featuredNews.post_thumbnail;
  const navDate = month+" "+("0" + date.getDate()).slice(-2)+", "+date.getFullYear();
  
  
  let homeBlog = `<a href="${featuredNews.content.guid}" >
        <div class="community--card_img-wrapper">
            <div class="community--card_img" style="background-image: url('${postThumbnail}')"></div>
        </div>
        <div class="community--card_text">
        <div>     
        <span>Blog</span>
            <h3>${featuredNews.content.post_title}</h3>
            </div>
            <p>${author} <time datetime="${postDate}">${postDate} </time>${readTime}</p>
        </div>
      </a>`
      document.getElementById("home-blog").innerHTML = homeBlog;

    let navBlog = `<div class="main-menu-item__image-wrapper">
              <div class="bg-image" style="background-image: url('${postThumbnail}');"></div>
            </div>
            <div class="main-menu-item__text-wrapper">
                <span class="author-category">BLOG POST</span>
                <span class="main-menu-item__title">
                ${featuredNews.content.post_title}
                </span>
                <span class="main-menu-item__date">${navDate}</span>
            </div>
            <a href="${featuredNews.content.guid}" class="blog-link"></a>`
      document.getElementById("nav-blog").innerHTML = navBlog;
    }  
  

});


// Updated home slider
$(function(){
  if($(".hero-banner-secton").length >0 ){
    const swiper = new Swiper('.banner-slider', {
      speed: 400,
      spaceBetween: 30,
      navigation: {
        nextEl: '.slide-nav.swiper-next',
        prevEl: '.slide-nav.swiper-prev',
      },
    });
  }
  if($(".industry-slider").length >0 ){
    const progress = $("ul.industry-list li .timer");
    const swiperIndustry = new Swiper('.industry-slider', {
      speed: 400,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      on: {
        init: function() {
          progress.removeClass('animate');
          progress.addClass('animate');
        },
        slideChangeTransitionStart: function () {
          progress.removeClass('animate');
        },
        slideChangeTransitionEnd: function () {
          progress.addClass('animate');
        }
      }
    });
    $("ul.industry-list li").on('click', (e)=>{
     let $this = e.currentTarget;
      let index = $this.getAttribute("data-industry");
      swiperIndustry.slideToLoop(index)
    });

    swiperIndustry.on('slideChange', function () {
      let activeIndex = swiperIndustry.activeIndex +1;
      $("ul.industry-list li").removeClass('active');
      $("ul.industry-list li:nth-child("+activeIndex +")").addClass('active');
      console.log(activeIndex);
    });

    function startProgressbar() {

    }

  }
  
  if($(".member-slider").length >0 ){
    const swiper1 = new Swiper('.member-slider-1', {
      speed: 5000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false
      },
      freeMode: true,
      spaceBetween: 30,
      loop: true,
      autoHeight: true,
      slidesPerView: "auto",

    });
    const swiper2 = new Swiper('.member-slider-2', {
      speed: 5000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        reverseDirection: true
      },
      freeMode: true,
      spaceBetween: 30,
      loop: true,
      autoHeight: true,
      slidesPerView: "auto",
    });
  }

  if($(".gallery-section").length >0 ){
    const swiper = new Swiper('.gallery-slider', {
      speed: 400,
      spaceBetween: 32,
      slidesPerView: 'auto',
      navigation: {
        nextEl: '.gallery-slide-nav .swiper-button.next',
        prevEl: '.gallery-slide-nav .swiper-button.prev',
        
      }
    });
  }
});