define(['jcookie'], function() {
    return {
        init: function() {

            //渲染列表
            (function() {
                function renderlist(sid, num) {
                    $.ajax({
                        url: 'http://192.168.13.13/360/projectname/php/360json.php',
                        dataType: 'json'
                    }).done((data) => {
                        $.each(data, function(index, value) {
                            if (sid === value.sid) {

                                let $clonebox = $('.cart-content:hidden').clone(true, true);
                                $clonebox.find('#pic').attr('src', value.url);
                                $clonebox.find('#pic').attr('sid', value.sid);
                                $clonebox.find('#title').html(value.title);
                                $clonebox.find('#price').html(value.price);
                                $clonebox.find('#sailnumber').val(num);
                                //计算单个商品的价格
                                $clonebox.find('#calc').html((value.price * num).toFixed(2));
                                $clonebox.css('display', 'block');
                                $('.wrap-box').append($clonebox);

                                calcprice(); //计算总价
                            }
                        })
                    })
                }
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let s = $.cookie('cookiesid').split(',')
                    let n = $.cookie('cookienum').split(',')
                    $.each(s, function(index, value) {
                        renderlist(s[index], n[index])
                    })
                }
            })();

            // //计算总价
            function calcprice() {
                let $sum = 0;
                let $count = 0;
                $('.cart-content:visible').each(function(index, ele) {
                    if ($(ele).find('.check').prop('checked')) { //复选框勾选
                        $sum += parseInt($(ele).find('#sailnumber').val());
                        $count += parseFloat($(ele).find('#calc').html());
                    }
                });
                $('.cart-resolve').find('i').html($sum);
                $('.cart-resolve').find('em').html($count.toFixed(2));
            }

            //全选
            $('.allsel').on('change', function() {
                $('.cart-content').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.allsel').prop('checked', $(this).prop('checked'));
                calcprice();
            });
            let $inputs = $('.cart-content:visible').find(':checkbox');
            $('.wrap-box').on('change', $inputs, function() {
                //$(this):被委托的元素，checkbox
                if ($('.cart-content:visible').find(':checkbox').length === $('.cart-content:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice();
            });

            //5.数量的改变
            $('.quantity-add').on('click', function() {
                let $num = $(this).parents('.cart-content').find('#sailnumber').val();
                $num++;
                $(this).parents('.cart-content').find('#sailnumber').val($num);

                $(this).parents('.cart-content').find('#calc').html(calcsingleprice($(this)));
                calcprice();
                setcookie($(this));
            });

            $('.quantity-down').on('click', function() {
                let $num = $(this).parents('.cart-content').find('#sailnumber').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).parents('.cart-content').find('#sailnumber').val($num);
                $(this).parents('.cart-content').find('#calc').html(calcsingleprice($(this)));
                calcprice();
                setcookie($(this));
            });

            $('#sailnumber').on('input', function() {
                let $reg = /^\d+$/g;
                let $value = $(this).val();
                if (!$reg.test($value)) {
                    $(this).val(1);
                }
                $(this).parents('.cart-content').find('#calc').html(calcsingleprice($(this)));
                calcprice();
                setcookie($(this));
            });

            //计算单价
            function calcsingleprice(obj) {
                let $dj = parseFloat(obj.parents('.cart-content').find('#price').html());
                let $num = parseInt(obj.parents('.cart-content').find('#sailnumber').val());
                return ($dj * $num).toFixed(2)
            }


            let arrsid = [];
            let arrnum = [];

            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }

            function setcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.cart-content').find('#pic').attr('sid');
                console.log($sid)
                arrnum[$.inArray($sid, arrsid)] = obj.parents('.cart-content').find('#sailnumber').val();
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }

            //6.删除
            function delcookie(sid, arrsid) {
                let $index = -1;
                $.each(arrsid, function(index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);

                $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
            }

            $('.del-one').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.cart-content').remove();
                    delcookie($(this).parents('.cart-content').find('#pic').attr('sid'), arrsid);
                    calcprice();
                }
            });

            $('.del-all').on('click', function() {
                cookietoarray();
                if (window.confirm('你确定要全部删除吗?')) {
                    $('.cart-content:visible').each(function() {
                        if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                            $(this).remove();
                            delcookie($(this).find('#pic').attr('sid'), arrsid);
                        }
                    });
                    calcprice();
                }
            });
        }
    }
})