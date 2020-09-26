define([], function() {
    return {
        zhezhao: (function() {

            const $btn = $('.btn')
            const $zhezhao = $('.zhezhao')

            $btn.on('click', function() {
                $zhezhao.hide()
            })
        })()
    }
})