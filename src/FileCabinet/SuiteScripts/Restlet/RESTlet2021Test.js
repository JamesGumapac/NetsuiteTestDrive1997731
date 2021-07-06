/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/search'],
    
    /**
     * @param{record} record
     */
    (record, search) => {
        /**
         *
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        
        const get = (requestParams) => {
            var array = [];
            var resultArr = [];
            var str = '';
            var current = ''
            var newCur = ''
            
            let result1 = {
                firstname: 'James ',
                lastname: 'Gumapac'
            }
            
            var soSearch = search.create({
                type: search.Type.EMPLOYEE,
                columns: ['altname', 'email', 'lastmodifieddate'],
                filters: [
                    search.createFilter({
                        name: 'supervisor',
                        operator: search.Operator.ANYOF,
                        values: '@NONE@'
                    })
                ]
            }).run()
            
            
            var result = soSearch.getRange({
                start: 0,
                end: 17
            });
            for (var i = 0; i < result.length; i++) {
                
                // var a = result[i].getValue('altname');
                // var b =
                // var c = result[i].getValue('lastmodifieddate');
                
                
                var resultobj = {}
                resultobj.name = result[i].getValue('altname');
                resultobj.email = result[i].getValue('email');
                resultobj.lastmodifieddate = result[i].getValue('lastmodifieddate');
                
                
                array[i] = resultobj;
                
                
            }
            
            return JSON.stringify(array);
            
        }
        
        
        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {
        
        }
        
        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {
            let arr = [];
            let columnsearch1 = requestBody.columnsearch1;
            let columnsearch2 = requestBody.columnsearch2;
            let columnsearch3 = requestBody.columnsearch3;

            let soSearch = search.create({
                type: search.Type.EMPLOYEE,
                columns: [columnsearch1, columnsearch2, columnsearch3],
                filters: [
                    search.createFilter({
                        name: 'supervisor',
                        operator: search.Operator.ANYOF,
                        values: '@NONE@'
                    })
                ]
            }).run()
            let result = soSearch.getRange({
                start: 0,
                end: 20
            })
            for (let i =0; i< result.length; i++){
                let resultobj = {}
                resultobj.firstname = result[i].getValue({
                    name: columnsearch1
                });
                resultobj.email = result[i].getValue({
                    name: columnsearch2
                });
                resultobj.lastmodifieddate = result[i].getValue({
                    name: columnsearch3
                });


                arr[i] = resultobj;
            }
            return JSON.stringify(arr)
        }
        
        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {
        
        }
        
        return {get, put, post, delete: doDelete}
        
    });
