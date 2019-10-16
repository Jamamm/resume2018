!function () {
    let view = document.querySelector('#topNavBar')
    view.style.border = "2px solid red"

    let controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            window.addEventListener('scroll', (x) => {
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deActive()
                }
            })
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deActive: function () {
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)

}.call()
