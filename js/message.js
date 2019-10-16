!function () {
    var view = document.querySelector('section.message')
    view.style.border = "2px solid red"

    var model = {
        //获取数据
        init: function () {
            var APP_ID = 'RUFOTKxDS3uUbjr6mpWnpgoT-gzGzoHsz';
            var APP_KEY = 'eJmJoCB6sgFDvueJ5n3rA9aK';
            AV.init({appId: APP_ID, appKey: APP_KEY});
        },
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find()
        },
        //创建数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({'name': name, 'content': content,})
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector("#messageList")
            this.form = view.querySelector("form")
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let name = myForm.querySelector('input[name=name]').value
            let content = myForm.querySelector('input[name=content]').value
            this.model.save(name,content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = ''
                console.log(object)
            })
        }
    }

    controller.init(view, model)

}.call()



