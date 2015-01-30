

###
Factorys
###
APP.factory 'API', ['$http', 'swal',
    ($http, swal)->
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
                        url: '/action/api/' + model
                    .success (data)-> callback data if callback?
                    .error this.err

            show: (model, id, callback)->
                $http.get '/action/api/' + model + '/' + id
                    .success (data)-> callback? data if data?
                    .error this.err

            store: (model, data, callback)->
                $http.post '/action/api/' + model, data
                    .success (data)-> callback? data if data?
                    .error this.err

            update: (model, id, data, callback)->
                $http.put '/action/api/' + model + '/' + id, data
                    .success (data)-> callback? data if data?
                    .error this.err

            edit: (model, id, callback)->
                $http.get '/action/api/' + model + '/' + id + '/edit'
                    .success (data)-> callback? data if data?
                    .error this.err

            destroy: (model, id, callback)->
                $http.delete '/action/api/' + model + '/' + id
                    .success (data)-> callback? data if data?
                    .error this.err
]




