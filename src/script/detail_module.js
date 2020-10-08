define([], function() {
    return {
        init: function() {
            //渲染数据
            (function() {
                let $datasid = location.search.substring(1).split('=')[1]

                $.ajax({
                    url: 'http://192.168.13.13/360/projectname/php/getsid.php',
                    data: {
                        sid: $datasid
                    },
                    dataType: 'json'
                }).done(function(data) {
                    $('#title').html(data.title)
                    $('#price').html(data.price)
                    $('#sailnumber').html(data.sailnumber)
                    $('#spic').attr('src', data.url)
                    $('#spic').attr('sid', data.sid)
                    $('#bpic').attr('src', data.url)

                    let $pics = data.piclisturl.split(',')

                    let str = ''
                    $.each($pics, function(index, value) {
                        str +=
                            `
                            <img src="${value}" alt="">
                        `
                    })
                    $('#tutu').html(str);

                    ! function() {
                        let $num = 5
                        if ($('#tutu img').size() < $num) {
                            $('.five-spic .right').css({
                                'visibility': 'hidden',
                            })
                        }
                    }()

                })
            })();
            //放大镜效果
            (function() {
                $wrap = $('.wrap')
                $spic = $('.spic')
                $sf = $('.sf')
                $bf = $('.df')
                $bpic = $('#bpic')

                $spic.hover(() => {
                    $sf.show()
                    $bf.css({
                        visibility: 'visible'
                    })
                    let bili = $bpic.outerHeight() / $spic.outerHeight()

                    $sf.css({
                        width: $spic.outerWidth() * $bf.outerWidth() / $bpic.outerWidth(),
                        height: $spic.outerHeight() * $bf.outerHeight() / $bpic.outerHeight()
                    })



                    $spic.on('mousemove', function(e) {
                        let l = e.pageX - $wrap.offset().left - $sf.height() / 2
                        let t = e.pageY - $wrap.offset().top - $sf.width() / 2

                        if (l <= 0) {
                            l = 0
                        } else if (l >= $spic.width() - $sf.width()) {
                            l = $spic.width() - $sf.width()
                        }
                        if (t <= 0) {
                            t = 0
                        } else if (t >= $spic.height() - $sf.height()) {
                            t = $spic.height() - $sf.height()
                        }

                        $sf.css({
                            top: t,
                            left: l
                        })
                        $bpic.css({
                            top: t * -bili,
                            left: l * -bili
                        })
                    })
                }, () => {
                    $sf.hide()
                    $bf.css({
                        visibility: 'hidden'
                    })
                })

                $('#tutu').on('click', 'img', function() {
                    console.log(this)
                    let $picurl = $(this).attr('src')
                    $('#bpic').attr('src', $picurl)
                    $('#spic').attr('src', $picurl)

                })


                let $num = 5
                    //右键点击

                $('.five-spic .right').on('click', function() {

                    if ($('#tutu img').size() > $num) {
                        $num++
                        $('.five-spic .left').css({
                            'visibility': 'visible',
                        })
                    }
                    if ($('#tutu img').size() === $num) {
                        $('.five-spic .right').css({
                            'visibility': 'hidden',
                        })
                    }
                    $('#tutu').animate({
                        left: -($num - 5) * $('#tutu img').eq(0).outerWidth(true)

                    })
                })
                $('.five-spic .left').on('click', function() {
                    if ($num > 5) {
                        $num--
                        $('.five-spic .right').css({
                            'visibility': 'visible',
                        })
                        $('#tutu').animate({
                            left: -($num - 5) * $('#tutu img').eq(0).outerWidth(true)
                        })
                        if (5 === $num) {
                            $('.five-spic .left').css({
                                'visibility': 'hidden',
                            })
                        }
                    }

                })

            })();

            //按钮加加减减
            (function() {
                let num = $('#shuzi').val()
                $('.jian').on('click', function() {
                    if (num > 1) {
                        num--
                        $('#shuzi').val(num)
                    }
                })
                $('.jia').on('click', function() {
                    num++
                    $('#shuzi').val(num)
                })
            })();
            //购物车效果

            (function() {
                let arrsid = []
                let arrnum = []

                function cookie() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        arrsid = $.cookie('cookiesid').split(',')
                        arrnum = $.cookie('cookienum').split(',')
                    } else {
                        arrsid = []
                        arrnum = []
                    }
                }

                $('.addcart').on('click', function() {
                    let $sid = $(this).parents('.content').find('#spic').attr('sid');

                    cookie();
                    if ($.inArray($sid, arrsid) != -1) {
                        let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#shuzi').val());
                        arrnum[$.inArray($sid, arrsid)] = $num;
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    } else {

                        arrsid.push($sid);
                        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                        arrnum.push($('#shuzi').val());
                        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                    }
                });
            })()






        }
    }
})