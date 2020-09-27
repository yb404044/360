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
                        console.log(data)
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
                        index--
                        $right.trigger('click')
                    }, 3000)
                })

                timer = setInterval(() => {
                    index--
                    $right.trigger('click')
                }, 3000)


            })()
            //楼梯栏

        }
    }
})