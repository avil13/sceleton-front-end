

###
Factorys
###
APP.factory 'API', ['$http', 'swal',
    ($http, swal)->
            url: ''

            err: (data, status)->
                console.log(status, data)
                msg = if data && data.error && data.error.message then data.error.message  else ''
                swal('Возникли проблемы...', msg, 'error')
                return

            post: (url, data, callback)->
                if !callback && data instanceof Function
                    callback = data
                    data = {}

                $http.post(url, data)
                    .success (data)->
                        swal('', data.message) if data.message
                        callback data if callback
                    .error this.err
                return

            # REST
            get: (model, callback)->
                $http
                        method: 'GET',
                        url: @url + model
                    .success (data)-> callback data if callback?
                    .error this.err

            show: (model, id, callback)->
                $http.get @url + model + '/' + id
                    .success (data)-> callback? data
                    .error this.err

            store: (model, data, callback)->
                $http.post @url + model, data
                    .success (data)-> callback? data
                    .error this.err

            update: (model, id, data, callback)->
                $http.put @url + model + '/' + id, data
                    .success (data)-> callback? data
                    .error this.err

            edit: (model, id, callback)->
                $http.get @url + model + '/' + id + '/edit'
                    .success (data)-> callback? data
                    .error this.err

            destroy: (model, id, callback)->
                $http.delete @url + model + '/' + id
                    .success (data)-> callback? data
                    .error this.err
]




