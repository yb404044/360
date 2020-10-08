define(['pagination', 'jlazyload', 'jcookie', 'sha1'], function() {
    return {
        init: function() {

            //遮罩
            (function() {
                $('.btn').on('click', function() {
                    $('.zhezhao').hide()
                })
            })();
            //渲染更多商品
            (function() {
                $.ajax({
                        url: 'http://192.168.13.13/360/projectname/php/360json.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let strhtml = ''
                        $.each(data, function(index, value) {
                            strhtml +=
                                `<div>
                                    <img class="lazy" data-original="${value.url}" width="185" height="165" alt="">
                                    <p>${value.title}</p>
                                    <p>￥${value.price}</p>
                                    <p>直降</p>
                                </div>`
                        })
                        $('.mod-goods').html(strhtml)
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                    })
            })();
            //渲染智能
            (function() {
                $.ajax({
                        url: 'http://192.168.13.13/360/projectname/php/360json.php',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        let str = '<img src="https://p2.ssl.qhimg.com/t019f48638d8e0a78b6.webp" alt="">'
                        $.each(data, function(index, value) {
                            str +=
                                `<div class="family-box">
                                    <img class="lazy"  data-original="${value.url}" width="240" height="240" alt="">
                                    <p>360家庭防火墙路由器V5x</p>
                                    <p>游戏加速拒绝卡顿</p>
                                    <div>
                                        <span>${value.price}</span>
                                        <span>${value.price}</span>
                                    </div>
                                </div>`
                            if (index === 5) {
                                return false
                            }
                        })
                        $('.mod-smart').html(str)
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });
                    })
            })();
            //tab切换
            (function() {
                $('.menu-list li').on('mouseover', function() {
                    $_this = $(this)
                    $_this.addClass('active').siblings('.menu-list li').removeClass('active')
                    $('.menu-list-two .item').eq($_this.index()).show().siblings().hide()
                    $('.menu-list-two').show()
                    $('.menu-list-two').hover(() => {
                        $('.menu-list-two').show()
                        $_this.addClass('active').siblings('.menu-list li').removeClass('active')
                    }, () => {
                        $(this).removeClass('active')
                        $('.menu-list-two').hide()
                    })
                })
                $('.menu-list li').on('mouseout', function() {
                    $(this).removeClass('active')
                    $('.menu-list-two').hide()
                })
            })();
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
            })();
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
                $loucengli.each(function(index, element) {
                    let $loucengtop = $(element).offset().top + $(element).height() / 6
                    if ($loucengtop > $bartop) {
                        $loutili.removeClass('active')
                        $loutili.eq(index).addClass('active')
                        return false
                    }
                })
            })();
            //右侧栏回到顶部
            (function() {
                const $top = $('.rightside-box .totop')
                let $head = $(window).scrollTop()
                $head > 580 ? $top.show() : $top.hide()
                $(window).on('scroll', function() {
                    let $head = $(window).scrollTop()
                    $head > 580 ? $top.show() : $top.hide()
                });
                $top.on('click', function() {

                    $('html,body').animate({
                        scrollTop: 0
                    })
                    $(this).hide()
                })

            })();
            $('section b').on('click', function() {
                $('.rightside-box>img').show()
                $('section i').show()
            });

            $('section i').on('click', function() {
                console.log(1)
                $('.rightside-box>img').hide()
                $('section i').hide()
            });
            // 倒计时
            (function() {

                setInterval(() => {
                    let futuretime = new Date('2020-10-10 9:00:00')
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

            //判断用户名是否存在
            (function() {
                if ($.cookie('username')) { //如果cookie存在用户名，显示admin，并且赋值
                    $('.admin').show()
                    $('.head-smallbox-right').hide()
                    $('.admin span').html($.cookie('username'))
                }
                $('.admin a').on('click', function() {
                    $.cookie('username', $('._username').val(), { expires: -1, path: '/' });
                    $('.admin').hide()
                    $('.head-smallbox-right').show()
                })
            })();
            // 点击登录
            $('._login').on('click', function() {
                $('#zhe').show()
                $('.login').show()
                $('._username').val('');
                $('._password').val('');
            })
            $('.btns').on('click', function() {
                $('#zhe').hide()
                $('.login').hide()
            })
            $('.zhuce').on('click', function() {
                $('#zhao').show()
                $('.registry').show()
                $('#zhe').hide()
                $('.login').hide()
                userInput.val('')
                passInput.val('')
                emailInput.val('')

                userSpan.html('')
                userInput.css({
                    border: '1px solid #ddd'
                })
                userSpan.css({
                    color: '#ddd',
                })

                passSpan.html('')
                passInput.css({
                    border: '1px solid #ddd'
                })
                passSpan.css({
                    color: '#ddd',
                })

                emailSpan.html('')
                emailInput.css({
                    border: '1px solid #ddd'
                })
                emailSpan.css({
                    color: '#ddd',
                })
            });



            $('#_login>div').on('click', function() {
                $.ajax({
                        type: 'post',
                        url: 'http://192.168.13.13/360/projectname/php/login.php',
                        data: {
                            user: $('._username').val(),
                            pass: hex_sha1($('._password').val())
                        }
                    })
                    .done((data) => {
                        if ($('._username').val() != '') {
                            if (!data) {
                                alert('用户名或者密码错误');
                                $('._username').val('');
                                $('._password').val('');
                            } else {
                                alert('登录成功');
                                $.cookie('username', $('._username').val(), { expires: 7, path: '/' });
                                $('#zhe').hide()
                                $('.login').hide()
                                $('.admin').show()
                                $('.head-smallbox-right').hide()
                                $('.admin span').html($.cookie('username'))
                                $('#zhe').hide()
                                $('.login').hide()
                            }

                        }
                    })
            })

            //登录验证
            $('._username').on('focus', function() {
                $('._userSpan').html('请输入用户名')
                $('._username').css({
                    border: '1px solid #36b447'
                })
                $('._userSpan').css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })
            $('._username').on('input', function() {
                $('._userSpan').html('')
                $('._username').css({
                    border: '1px solid #36b447'
                })
                $('._userSpan').css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })
            $('._password').on('focus', function() {
                $('._passSpan').html('请输入密码')
                $('._password').css({
                    border: '1px solid #36b447'
                })
                $('._passSpan').css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })
            $('._password').on('input', function() {
                $('._passSpan').html('')
                $('._password').css({
                    border: '1px solid #36b447'
                })
                $('._passSpan').css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })
            $('.deng').on('click', function() {
                    console.log(1)
                    if ($('._username').val() === '') {
                        $('._userSpan').html('用户名不能为空')
                        $('._username').css({
                            border: '1px solid #F36903'
                        })
                        $('._userSpan').css({
                            // color: '#F36903'//橙色
                            color: '#F36903',
                        })

                    }
                    if ($('._password').val() === '') {
                        $('._passSpan').html('密码不能为空')
                        $('._passname').css({
                            border: '1px solid #F36903'
                        })
                        $('._passSpan').css({
                            // color: '#F36903'//橙色
                            color: '#F36903',
                        })
                    }
                })
                //点击跳转到购物车
            $('.admin i').on('click', function() {
                location.href = 'http://localhost/360/projectname/src/cart.html'
            })
            $('.head-smallbox-right i').on('click', function() {
                alert('请先登录')
            });
            //点击注册
            $('._registry').on('click', function() {
                $('#zhao').show()
                $('.registry').show()

                userSpan.html('')
                userInput.val('')
                userInput.css({
                    border: '1px solid #ddd'
                })
                userSpan.css({
                    color: '#ddd',
                })

                passSpan.html('')
                passInput.val('')
                passInput.css({
                    border: '1px solid #ddd'
                })
                passSpan.css({
                    color: '#ddd',
                })

                emailSpan.html('')
                emailInput.val('')
                emailInput.css({
                    border: '1px solid #ddd'
                })
                emailSpan.css({
                    color: '#ddd',
                })


            })
            $('.btnn').on('click', function() {
                $('#zhao').hide()
                $('.registry').hide()
            });

            //表单验证
            const userInput = $('.username')
            const userSpan = $('.userSpan')
            const passSpan = $('.passSpan')
            const emailSpan = $('.emailSpan')
            const passInput = $('.password')
            const emailInput = $('.email')
            userInput.on('focus', function() {
                userSpan.html('中英文均可，最长14个英文或7个汉字')
                userInput.css({
                    border: '1px solid #36b447'
                })
                userSpan.css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })
            let userflag = false;
            let passflag = false;
            let emailflag = false;
            $('.username').val('');
            $('.password').val('');
            $('.email').val('');
            $('#registry .userSpan').html('')
            $('.username').on('blur', function() {
                    $.ajax({
                            type: 'post',
                            url: 'http://192.168.13.13/360/projectname/php/registry.php',
                            data: {
                                name: $('.username').val() //将用户名传给后端
                            }
                        })
                        .done((data) => {
                            if (!data) {
                                if ($(this).val() !== '') { //值不为空
                                    //判断是否符合正则规范。
                                    //将中文转换成两个字符，计算长度。
                                    var strlen = $(this).val().replace(/[\u4e00-\u9fa5]/g, '**').length;
                                    //正则表达式
                                    var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                                    if (strlen <= 14) { //满足长度
                                        if (reg.test($(this).val())) { //检测是否符合正则规范
                                            userSpan.html('✔')
                                            userInput.css({
                                                border: '1px solid #36b447'
                                            })
                                            userSpan.css({
                                                // color: '#F36903'//橙色
                                                color: '#36b447',
                                            })
                                            userflag = true;
                                        } else {
                                            userSpan.html('请输入中文或者汉字')
                                            userInput.css({
                                                border: '1px solid #F36903'
                                            })
                                            userSpan.css({
                                                // color: '#F36903'//橙色
                                                // color: '#36b447',//绿色
                                                color: '#F36903',
                                            })
                                            userflag = false;
                                        }
                                    } else { //超出
                                        userSpan.html('不能超过14个英文或7个汉字')
                                        userInput.css({
                                            border: '1px solid #F36903'
                                        })
                                        userSpan.css({
                                            // color: '#F36903'//橙色
                                            // color: '#36b447',//绿色
                                            color: '#F36903',
                                        })
                                        userflag = false;
                                    }
                                } else { //值不为空
                                    userSpan.html('用户名不能为空')
                                    userInput.css({
                                        border: '1px solid #F36903'
                                    })
                                    userSpan.css({
                                        color: '#F36903' //橙色
                                            // color: '#36b447',
                                    })
                                    userflag = false;
                                }
                            } else {
                                userSpan.html('该用户名已经存在')
                                userInput.css({
                                    border: '1px solid #F36903'
                                })
                                userSpan.css({
                                    color: '#F36903' //橙色
                                        // color: '#36b447',
                                })
                                userflag = false;
                            }
                        })
                })
                //密码验证
            passInput.on('focus', function() {
                passSpan.html('请输入6-12密码')
                passInput.css({
                    border: '1px solid #36b447'
                })
                passSpan.css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })
            passInput.on('input', function() {

                //控制密码长度
                if ($(this).val().length >= 6 && $(this).val().length <= 12) {
                    //控制字符种类
                    var reg1 = /\d+/; //数字
                    var reg2 = /[a-z]+/;
                    var reg3 = /[A-Z]+/;
                    var reg4 = /[\W\_]+/; //特殊字符
                    var count = 0; //统计字符的种类。
                    if (reg1.test($(this).val())) { //密码中存在数字。
                        count++;
                    }
                    if (reg2.test($(this).val())) { //密码中存在小写字母。
                        count++;
                    }
                    if (reg3.test($(this).val())) { //密码中存在大写字母。
                        count++;
                    }
                    if (reg4.test($(this).val())) { //密码中存在特殊符号。
                        count++;
                    }

                    //根据count检测你的字符种类
                    switch (count) {
                        case 1:
                            passSpan.html('弱')
                            passInput.css({
                                border: '1px solid #F36903'
                            })
                            passSpan.css({
                                color: '#F36903'
                            })
                            passflag = false;
                            break;
                        case 2:
                        case 3:
                            passSpan.html('中')
                            passInput.css({
                                border: '1px solid #36b447'
                            })
                            passSpan.css({
                                // color: '#F36903'//橙色
                                // color: '#36b447',//绿色
                                color: '#36b447',
                            })
                            passflag = true;
                            break;
                        case 4:
                            passSpan.html('强')
                            passInput.css({
                                border: '1px solid #36b447'
                            })
                            passSpan.css({
                                // color: '#F36903'//橙色
                                // color: '#36b447',//绿色
                                color: '#36b447',
                            })
                            passflag = true;
                            break;
                    }
                } else {
                    passSpan.html('密码长度必须是6-12个字符')
                    passInput.css({
                        border: '1px solid #F36903'
                    })
                    passSpan.css({
                        // color: '#F36903'//橙色
                        // color: '#36b447',//绿色
                        color: '#F36903',
                    })
                    passflag = false;
                }

            })

            //失去焦点验证整个密码是通过。
            passInput.on('blur', function() {
                if ($(this).val() !== '') {
                    if (passflag) {
                        passSpan.html('✔')
                        passInput.css({
                            border: '1px solid #36b447'
                        })
                        passSpan.css({
                            // color: '#F36903'//橙色
                            // color: '#36b447',//绿色
                            color: '#36b447',
                        })
                    }
                } else {
                    passSpan.html('密码不能为空')
                    passInput.css({
                        border: '1px solid #F36903'
                    })
                    passSpan.css({
                        // color: '#F36903'//橙色
                        // color: '#36b447',//绿色
                        color: '#F36903',
                    })
                }
            })

            //4.电子邮箱。
            emailInput.on('focus', function() {
                emailSpan.html('请输入正确的电子邮箱')
                emailInput.css({
                    border: '1px solid #36b447'
                })
                emailSpan.css({
                    // color: '#F36903'//橙色
                    color: '#36b447',
                })
            })

            emailInput.on('blur', function() {
                if ($(this).val() !== '') {
                    var reg = /^(\w+([-+.]\w+)*)@(\w+([-.]\w+)*)\.(\w+([-.]\w+)*)$/; //转义字符 \.  匹配点字符。
                    if (reg.test($(this).val())) {
                        emailSpan.html('✔')
                        emailInput.css({
                            border: '1px solid #36b447'
                        })
                        emailSpan.css({
                            // color: '#F36903'//橙色
                            color: '#36b447',
                        })
                        emailflag = true;
                    } else {
                        emailSpan.html('邮箱格式有误')
                        emailInput.css({
                            border: '1px solid #F36903'
                        })
                        emailSpan.css({
                            // color: '#F36903'//橙色
                            // color: '#36b447',//绿色
                            color: '#F36903',
                        })
                        emailflag = false;
                    }
                } else {
                    emailSpan.html('邮箱不能为空')
                    emailInput.css({
                        border: '1px solid #F36903'
                    })
                    emailSpan.css({
                        // color: '#F36903'//橙色
                        // color: '#36b447',//绿色
                        color: '#F36903',
                    })
                    emailflag = false;
                }
            })

            $('.er').on('click', function() {

                if (userInput.val() === '') {
                    userSpan.html('用户名不能为空')
                    userInput.css({
                        border: '1px solid #F36903'
                    })
                    userSpan.css({
                        color: '#F36903',
                    })
                    userflag = false;
                }

                if (passInput.val() === '') {
                    passSpan.html('密码不能为空')
                    passInput.css({
                        border: '1px solid #F36903'
                    })
                    passSpan.css({
                        color: '#F36903',
                    })
                    passflag = false;
                }

                if (emailInput.val() === '') {
                    emailSpan.html('邮箱不能为空')
                    emailInput.css({
                        border: '1px solid #F36903'
                    })
                    emailSpan.css({
                        color: '#F36903',
                    })
                    emailflag = false;
                }
            })






            $('.denglu').on('click', function() {
                $('#zhao').hide()
                $('.registry').hide()
                $('#zhe').show()
                $('.login').show()
            });
            $('.er').on('click', function() {
                if (userflag) {
                    $.ajax({
                        type: "post",
                        url: "http://localhost/360/projectname/php/registry.php",
                        data: {
                            username: $('.username').val(),
                            password: $('.password').val(),
                            email: $('.email').val(),
                            dataType: "json",
                        }
                    }).done((data) => {
                        if (data) {
                            $('.registry').hide()
                            $('#zhao').hide()
                            $('.login').show()
                            $('#zhe').show()
                        }
                    })
                }
            })
        }
    }
})