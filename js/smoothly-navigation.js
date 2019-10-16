!function () {
    var view = document.querySelector('nav.menu')
    view.style.border = "1px solid red"

    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view
            this.aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
            this.initAnimate()
            this.bindEvents()
        },
        initAnimate: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            requestAnimationFrame(animate);
        },
        bindEvents: function () {
            let aTags = this.aTags
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x) => {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href') //'#siteAbout'
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        },
        scrollToElement: function (element) {
            let top = element.offsetTop
            let currentTop = window.scrollY
            let targetTop = top - 80
            let s = targetTop - currentTop // 路程
            let coords = {y: currentTop}; // 起始位置
            let t = Math.abs((s / 100) * 300); // 时间
            if (t > 500) {
                t = 500
            }
            let tween = new TWEEN.Tween(coords) // 起始位置
                .to({y: targetTop}, t) // 结束位置 和 时间
                .easing(TWEEN.Easing.Cubic.InOut) // 缓动类型
                .onUpdate(function () {
                    // coords.y 已经变了
                    window.scrollTo(0, coords.y) // 如何更新界面
                })
                .start(); // 开始缓动
        }
    }

    controller.init(view)
}.call()

