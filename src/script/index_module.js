define([], function() {
    return {
        init: function() {

            //遮罩
            (function() {

                const $btn = $('.btn')
                const $zhezhao = $('.zhezhao')

                $btn.on('click', function() {
                    $zhezhao.hide()
                })
            })(),
            //渲染更多商品
            (function() {
                const $render = $('.mod-goods')
                $.ajax({
                        url: 'http://192.168.13.72/360/projectname/php/360json.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        // console.log(data)
                        let strhtml = ''
                        $.each(data, function(index, value) {

                            strhtml += `<div>
                            <img src="${value.url}" alt="">
                            <p>${value.title}</p>
                            <p>￥${value.price}</p>
                            <p>直降</p>
                       
                            `
                            strhtml += '</div>'
                        })
                        $render.html(strhtml)


                    })
            })(),
            //渲染智能
            (function() {
                const $smart = $('.mod-smart')
                $.ajax({
                        url: 'http://192.168.13.72/360/projectname/php/360json.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let str = '<img src="https://p2.ssl.qhimg.com/t019f48638d8e0a78b6.webp" alt="">'
                        $.each(data, function(index, value) {
                            str += `
                    <div class="family-box">
                        <img src="${value.url}" alt="">
                        <p>360家庭防火墙路由器V5x</p>
                        <p>游戏加速拒绝卡顿</p>
                        <div>
                            <span>${value.price}</span>
                            <span>${value.price}</span>
                        </div>
                    </div>   
        `
                            if (index === 5) {
                                return false
                            }
                        })
                        $smart.html(str)
                    })
            })(),
            //tab切换
            (function() {
                const $lis = $('.menu-list li')
                const $ols = $('.menu-list-two .item')
                const $ol = $('.menu-list-two')

                $lis.on('mouseover', function() {
                    $_this = $(this)
                    $_this.addClass('active').siblings('.menu-list li').removeClass('active')
                    $ols.eq($_this.index()).show().siblings().hide()
                    $ol.show()
                    $ol.hover(() => {
                        $ol.show()
                        $_this.addClass('active').siblings('.menu-list li').removeClass('active')
                    }, () => {
                        $ol.hide()
                        $(this).removeClass('active')
                        $ol.hide()
                    })


                })

                $lis.on('mouseout', function() {
                    $(this).removeClass('active')
                    $ol.hide()
                })


            })(),
            //轮播图
            (function() {
                const $banner = $('.banner-big')
                const $imgs = $('.banner-big>img')
                const $btns = $('.banner-big ol>li')
                const $left = $('.left')
                const $right = $('.right')
                let index = 0
                let timer = null



                $left.hover(() => {
                    $left.css('opacity', '0.6')
                }, () => {

                    $left.css('opacity', '0.2')
                })
                $right.hover(() => {
                    $right.css('opacity', '0.6')
                }, () => {

                    $right.css('opacity', '0.2')
                })
                $right.on('click', function() {
                    index++
                    if (index > $btns.length - 1) {
                        index = 0
                    }
                    $btns.eq(index).addClass('active').siblings('.banner-big ol>li').removeClass('active')
                    $imgs.eq(index).stop(true).animate({
                        opacity: 1
                    }).siblings('.banner-big>img').stop(true).animate({
                        opacity: 0
                    })
                })
                $left.on('click', function() {
                    index--
                    if (index < 0) {
                        index = $btns.length - 1
                    }
                    $btns.eq(index).addClass('active').siblings('.banner-big ol>li').removeClass('active')
                    $imgs.eq(index).stop(true).animate({
                        opacity: 1
                    }).siblings('.banner-big>img').stop(true).animate({
                        opacity: 0
                    })
                })



                $btns.on('click', function() {
                    index = $(this).index()

                    $(this).addClass('active').siblings('.banner-big ol>li').removeClass('active')
                    $imgs.eq($(this).index()).stop(true).animate({
                        opacity: 1
                    }).siblings('.banner-big>img').stop(true).animate({
                        opacity: 0
                    })

                })

                $banner.hover(() => {
                    clearInterval(timer)
                }, () => {
                    timer = setInterval(() => {
                        $right.trigger('click')
                    }, 3000)
                })

                timer = setInterval(() => {
                    $right.trigger('click')
                }, 3000)


            })(),
            //楼梯栏
            (function() {
                const $loutilist = $('.leftside-box')
                const $loutilia = $('.leftside-box a')
                const $loutili = $('.leftside-box li')
                const $loucengli = $('.mod-box').not('.clear')

                let $bartop = $(window).scrollTop()
                $bartop > 580 ? $loutilist.show() : $loutilist.hide()
                $(window).on('scroll', function() {
                    let $bartop = $(window).scrollTop()
                    $bartop > 580 ? $loutilist.show() : $loutilist.hide()

                    $loucengli.each(function(index, element) {
                        let $loucengtop = $(element).offset().top + $(element).height() / 6
                        if ($loucengtop > $bartop) {
                            $loutili.removeClass('active')
                            $loutili.eq(index).addClass('active')
                            return false
                        }
                    })
                })
                $loucengli.each(function(index, element) {
                    let $loucengtop = $(element).offset().top + $(element).height() / 6
                    if ($loucengtop > $bartop) {
                        $loutili.removeClass('active')
                        $loutili.eq(index).addClass('active')
                        return false
                    }
                })
                $loutilia.on('click', function() {
                    $loutili.eq($(this).index()).addClass('active');
                    $(this).siblings().find('li').removeClass('active')
                })




                $loutilia.on('mouseover', function() {
                    $loutili.eq($(this).index()).addClass('active');
                })
                $loutilia.on('mouseout', function() {
                    $(this).find('li').removeClass('active')
                })



                $loutilia.on('click', function() {
                    let $loucengtop = $loucengli.eq($(this).index()).offset().top - $loucengli.height() / 2.2

                    $('html,body').animate({
                        scrollTop: $loucengtop
                    })


                })
            })(),
            //右侧栏回到顶部
            (function() {
                const $top = $('.rightside-box .totop')

                let $head = $(window).scrollTop()
                $head > 580 ? $top.show() : $top.hide()
                $(window).on('scroll', function() {
                    let $head = $(window).scrollTop()
                    $head > 580 ? $top.show() : $top.hide()
                });

                //遗留问题
                // console.log($('.footer-top-wrap').height() + $('.footer-bottom-wrap').height())


                $top.on('click', function() {

                    $('html,body').animate({
                        scrollTop: 0
                    })
                    $(this).hide()
                })

            })();
            // 倒计时
            (function() {

                setInterval(() => {
                    let futuretime = new Date('2020-9-30 18:00:00')
                    let currenttime = new Date()
                    let cha = parseInt((futuretime - currenttime) / 1000)
                    let day = fn(parseInt(cha / 86400))
                    let hour = fn(parseInt(cha % 86400 / 3600))
                    let minute = fn(parseInt(cha % 3600 / 60))
                    let second = fn(cha % 60)

                    function fn(num) {

                        if (num < 10) {
                            return num = '0' + num
                        } else {
                            return num
                        }
                    }
                    $('.day').html(day)
                    $('.hour').html(hour)
                    $('.minute').html(minute)
                    $('.second').html(second)
                }, 1000)



            })();
            // 点击登录
            (function() {
                $login = $('._login')
                $zhe = $('#zhe')
                $logindiv = $('.login')
                $btn = $('.btns')
                $login.on('click', function() {
                    console.log(1)
                    $zhe.show()
                    $logindiv.show()
                })
                $btn.on('click', function() {
                    $zhe.hide()
                    $logindiv.hide()
                })
            })();
            //点击注册
            (function() {
                $registry = $('._registry')
                $zhao = $('#zhao')
                $registrydiv = $('.registry')
                $btnn = $('.btnn')
                $registry.on('click', function() {
                    $zhao.show()
                    $registrydiv.show()
                })
                $btnn.on('click', function() {
                    $zhao.hide()
                    $registrydiv.hide()
                })
            })()

        }
    }
})