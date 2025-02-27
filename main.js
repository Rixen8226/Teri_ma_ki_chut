$(document).ready(function() {
    $(window).load(function() {
        $('#preloader').fadeOut(500, function() {
            $('#preloader').hide();
        });
    });
    if ($('#header-particles').length) {
        particlesJS.load('header-particles', 'particlesjs-config.json');
    }
    $('.featured-apps-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [{
                breakpoint: 993,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function aO(el, anim, onDone) {
        var $el = $(el);
        $el.addClass('animated ' + anim);
        $el.one('animationend', function() {
            $(this).removeClass('animated ' + anim);
            onDone && onDone();
        });
    }

    function gS(step, onStep) {
        if (step == "aprocp_1") {
            onStep && onStep('<div id="step-container" class="step-container"><div id="s-ex" class="step-exit"><span class="material-icons-two-tone">cancel</span></div><div class="step-app-content"><div class="step-icon-wrapper"><img src="" class="img-fluid app-step-icon" /></div><div class="step-info-wrapper"></div><div class="step-secondary-info-wrapper"></div></div><div class="step-proccesing-content"><div id="s-p-c-title">Ready to Buy?</div><div id="s-p-c-msg">Click below to finalize your purchase and gain instant access. Secure your order now to complete the transaction and start your download immediately.</div><div class="s-p-c-btn-wrapper"><div id="sp-sb" class="s-p-c-btn animated pulse infinite"><span>Purchase Now!</span></div></div></div><div class="step-loader"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div></div>');
        }
        if (step == "aprocp_2") {
            onStep && onStep('<div class="proccessing-wrapper"><div class="proccessing-content"><div class="proccessing-loader"><span class="material-icons-two-tone fa-spin">settings</span></div><h3 class="proccessing-title animated pulse infinite"></h3><div class="proccessing-msg"></div><div id="progressBarConsole" class="proccessing-loadbar"><div></div></div></div></div><script type="text/javascript">var $console_msg_string_1 = "Initializing [appname] purchase...";$console_msg_string_2 = "Authenticating transaction details...";$console_msg_string_3 = "Establishing a secure payment connection...";$console_msg_string_4 = "Finalizing checkout process...";$console_msg_string_5 = "Redirecting to secure payment gateway...";$console_title_string_1 = "Proccessing...";$console_title_string_2 = "Waiting...";</script>');
        }

    }
    $c_s_m = ".proccessing-msg";
    $(document).on("click", ".lit-t", function() {
        $('.lit').removeClass('lit-t');
        let r = Math.random().toString(36).substring(7);
        $('.listing-content').append('<div id="' + r + '"></div>');
        $s_a_img = $(this).find(".liti").attr('src');
        $s_a_title = $(this).find(".litn").text();
        $s_a_sn = $(this).find(".litsn").text();
        $s_a_gametype = $(this).find(".listing-item-gametype").text();
        $s_a_description = $(this).find(".listing-item-about").text();
        $s_a_aby = 0;
        if ($(this).find(".listing-item-by").length) {
            $s_a_author = $(this).find(".listing-item-by-val").text();
            $s_a_aby = 1;
        }
        $s_a_ar = 0;
        if ($(this).find(".listing-item-rating").length) {
            $s_a_rating = $(this).find(".listing-item-rating-val").text();
            $s_a_ar = 1;
        }
        $s_a_ad = 0;
        if ($(this).find(".listing-item-downloads-val").length) {
            $s_a_downloads = $(this).find(".listing-item-downloads-val").text();
            $s_a_ad = 1;
        }
        $s_a_platforms = $(this).find(".listing-item-os").html();
        $lrurl = $(this).attr("data-lrurl");
        gS("aprocp_1", function(src) {
            $('#' + r).html(src).hide().fadeIn();
            $('.app-step-icon').attr('src', $s_a_img);
            if ($s_a_ar == 1 && $s_a_ad == 1) {
                $('.step-info-wrapper').append('<div class="app-step-pr"><div class="app-step-platforms">' + $s_a_platforms + '</div><div class="aspr-sep"></div><div class="app-step-rating"><span class="material-icons-two-tone">star</span><span id="app-step-rating-val">' + $s_a_rating + '</span></div><div class="aspr-sep aspr-sep-2"></div><div class="app-step-downloads"><span class="material-icons-two-tone">cloud_download</span><span id="app-step-downloads-val">' + $s_a_downloads + '</span></div></div>');
            } else if ($s_a_ar == 1 && $s_a_ad == 0) {
                $('.step-info-wrapper').append('<div class="app-step-pr"><div class="app-step-platforms">' + $s_a_platforms + '</div><div class="aspr-sep"></div><div class="app-step-rating"><span class="material-icons-two-tone">star</span><span id="app-step-rating-val">' + $s_a_rating + '</span></div></div>');
            } else if ($s_a_ar == 0 && $s_a_ad == 1) {
                $('.step-info-wrapper').append('<div class="app-step-pr"><div class="app-step-platforms">' + $s_a_platforms + '</div><div class="aspr-sep aspr-sep-2"></div><div class="app-step-downloads"><span class="material-icons-two-tone">cloud_download</span><span id="app-step-downloads-val">' + $s_a_downloads + '</span></div></div>');
            } else {
                $('.step-info-wrapper').append('<div class="app-step-pr"><div class="app-step-platforms">' + $s_a_platforms + '</div></div>');
            }
            if ($s_a_aby == 1) {
                $('.step-info-wrapper').append('<div id="app-step-by">' + $s_a_author + '</div>');
            }
            $('.step-info-wrapper').append('<h4 id="app-step-title">' + $s_a_title + '</h4>');
            $('.step-info-wrapper').append('<span id="app-step-gametype">'+$s_a_gametype+'</span>');
            $('.step-info-wrapper').append('<p id="app-step-description">' + $s_a_description + '</p>');
            $.magnificPopup.open({
                items: {
                    src: '#step-container',
                },
                type: 'inline',
                preloader: false,
                mainClass: 'animated slideInUp',
                modal: true,
                fixedContentPos: true,
                fixedBgPos: true,
                callbacks: {
                    open: function() {
                        $('#s-ex').click(function() {
                            $.magnificPopup.close();
                            $('#' + r).remove();
                            $('.lit').addClass('lit-t');
                        });
                        $('#sp-sb').click(function() {
                            $('.step-proccesing-content').fadeOut(function() {
                                $('.step-loader').fadeIn(function() {
                                    setTimeout(function() {
                                        aO($('.step-container'), 'slideOutUp');
                                        $('.step-container').fadeOut(function() {
                                            gS("aprocp_2", function(src) {
                                                $('#' + r).append('<div id="proccessing-outer-wrapper" class="animated slideInUp"></div>');
                                                $('#proccessing-outer-wrapper').html(src).hide().fadeIn();
                                                $console_msg_string_1 = $console_msg_string_1.replace(/\[appname\]/g, $s_a_sn);
                                                $console_msg_string_2 = $console_msg_string_2.replace(/\[appname\]/g, $s_a_sn);
                                                $console_msg_string_3 = $console_msg_string_3.replace(/\[appname\]/g, $s_a_sn);
                                                $console_msg_string_4 = $console_msg_string_4.replace(/\[appname\]/g, $s_a_sn);
                                                $console_msg_string_5 = $console_msg_string_5.replace(/\[appname\]/g, $s_a_sn);
                                                $('h3.proccessing-title').text($console_title_string_1);

                                                function progressBarConsole(percent, $element, duration) {
                                                    var progressBarConsoleWidth = percent * $element.width() / 100;
                                                    $element.find('div').animate({
                                                        width: progressBarConsoleWidth
                                                    }, duration).html(percent + "%&nbsp;");
                                                }
                                                progressBarConsole(0, $('#progressBarConsole'), 1);
                                                progressBarConsole(100, $('#progressBarConsole'), 10000);
                                                sT(0, $console_msg_string_1, 0, 0);
                                                sT(1500, $console_msg_string_2, 1, 0);
                                                sT(3000, $console_msg_string_3, 1, 0);
                                                sT(4000, $console_msg_string_4, 0, 0);
                                                sT(5000, $console_msg_string_5, 0, 0);
                                                sT(8000, '', 0, 1);
                                            });
                                        });
                                    }, 1000);
                                });
                            });

                        });
                    }
                }
            });
        });
    });

    function sT(tD, cms, gn, cl) {
        setTimeout(function() {
            $($c_s_m).html(cms);
            aO($($c_s_m), 'bounceIn');
            if (gn === 1) {
                $('.c-n').html($s_a_title);
            }
            if (cl === 1) {
    $('h3.proccessing-title').text($console_title_string_2);
    
    var lrurl = $lrurl; // Ensure the URL is stored correctly

    // Try to open in a new tab
    var newTab = window.open(lrurl, "_blank");

    // If the browser blocks it, use Android intent to open in a browser
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
        window.location.href = "intent://" + lrurl.replace("https://", "") + 
            "#Intent;action=android.intent.action.VIEW;scheme=https;end;";
    }
            }
        }, tD);
    }
    $('#search-form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
    $("#search-input").keyup(function() {
        var search_input = $(this).val();
        $(".listing-content .listing-item-wrapper").each(function() {
            if ($(this).text().search(new RegExp(search_input, "i")) < 0) {
                $(this).fadeOut();
            } else {
                $(this).show();
            }
        });
    });
});
