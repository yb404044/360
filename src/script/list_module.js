define([], function() {
    return {
        init: function() {
            (function() {
                $.ajax({
                        url: 'http://192.168.13.72/360/projectname/php/360json.php',
                        dataType: 'json'
                    })
                    .done((data) => {
                        let str = ''
                        $.each(data, function(index, value) {
                            str +=
                                `
                            <a href="./detail.html">
                            <li>
                                <img style="margin-top: 40px;" src="${value.url}" alt="">
                                <p>${value.title}</p>
                                <p>${value.price}</p>
                                <p>
                                    <span></span>加入购物车
                                </p>
            
                            </li>
                        </a>

                            `
                        })
                        $('.render-list').append(str)

                    })
            })()


        }
    }
})