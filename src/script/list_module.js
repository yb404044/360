define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            let array_default = []; //排序前的li数组
            let array = []; //排序中的数组
            let prev = null;
            let next = null;
            (function() {
                $.ajax({
                        url: 'http://192.168.13.13/360/projectname/php/listdata.php',
                        dataType: 'json'
                    })
                    .done((data) => {
                        let str = ''
                        $.each(data, function(index, value) {
                            str +=
                                `
                            <a href="./detail.html?sid=${value.sid}">
                            <li>
                                <img class="lazy" style="margin-top: 40px;" data-original="${value.url}" width="165" height="165" alt="">
                                <p>${value.title}</p>
                                <p class="money">${value.price}</p>
                                <p>
                                    <span></span>加入购物车
                                </p>
            
                            </li>
                        </a>

                            `
                        })
                        $('.render-list').html(str)

                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;

                        $('.render-list a').each(function(index, value) {
                                array[index] = $(this)
                                array_default[index] = $(this)
                            })
                            // console.log(array_default)
                            // console.log(array)

                        //2.分页思路
                        //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
                        $('.page').pagination({
                            pageCount: 3, //总的页数
                            jump: true, //是否开启跳转到指定的页数，布尔值。
                            coping: true, //是否开启首页和尾页，布尔值。
                            prevContent: '上一页',
                            nextContent: '下一页',
                            homePage: '首页',
                            endPage: '尾页',
                            callback: function(api) {
                                console.log(api.getCurrent()); //获取的页码给后端
                                $.ajax({
                                    url: 'http://192.168.13.13/360/projectname/php/listdata.php',
                                    data: {
                                        page: api.getCurrent()
                                    },
                                    dataType: 'json'
                                }).done(function(data) {
                                    let str = ''
                                    $.each(data, function(index, value) {
                                        str +=
                                            `
                                        <a href="./detail.html?sid=${value.sid}">
                                        <li>
                                            <img class="lazy" style="margin-top: 40px;" data-original="${value.url}" width="165" height="165" alt="">
                                            <p>${value.title}</p>
                                            <p class="money">${value.price}</p>
                                            <p>
                                                <span></span>加入购物车
                                            </p>
                        
                                        </li>
                                    </a>
            
                                        `
                                    })
                                    $('.render-list').html(str)

                                    $(function() {
                                        $("img.lazy").lazyload({ effect: "fadeIn" });
                                    });


                                    array_default = []; //排序前的li数组
                                    array = []; //排序中的数组
                                    prev = null;
                                    next = null;

                                    //将页面的li元素加载到两个数组中
                                    $('.render-list a').each(function(index, value) {
                                        array[index] = $(this)
                                        array_default[index] = $(this)
                                    })
                                })
                            }
                        });



                    })
            })()

            $('#anniu button').eq(0).on('click', function() {
                console.log(1)
                $.each(array_default, function(index, value) {
                    $('.render-list').append(value)
                })
            });

            $('#anniu button').eq(1).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.money').html());
                        next = parseFloat(array[j + 1].find('.money').html());
                        console.log(next);
                        //通过价格的判断，改变的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }

                $.each(array, function(index, value) {
                    $('.render-list').append(value)
                })
            });

            $('#anniu button').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.money').html());
                        next = parseFloat(array[j + 1].find('.money').html());
                        console.log(next);
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.render-list').append(value)
                })
            });
        }
    }
})