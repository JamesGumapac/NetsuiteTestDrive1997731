/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

var PAGE_SIZE = 200;

var CLIENT_SCRIPT_FILE_ID = 12052;

define(['N/ui/serverWidget',
        'N/search',
        'N/redirect',
        'N/cache',
        'N/runtime',
        'N/url'],
    function (serverWidget, search, redirect, cache, runtime, url) {
        function onRequest(context) {
            if (context.request.method == 'GET') {
                var scriptObj = runtime.getCurrentScript();
                var SEARCH_ID = scriptObj.getParameter({
                    name: 'custscript_pending_approval_search'
                })
                log.debug('Search ID', SEARCH_ID)

                var response = context.response;
                var form = serverWidget.createForm({
                    title: 'Transaction Amounts',
                    hideNavBar: false
                });

                form.clientScriptFileId = 12052;

                // Get parameters
                var pageId = parseInt(context.request.parameters.page);
                var scriptId = context.request.parameters.script;
                var deploymentId = context.request.parameters.deploy;

                // Add sublist that will show results
                var sublist = form.addSublist({
                    id: 'custpage_table',
                    type: serverWidget.SublistType.LIST,
                    label: 'Transactions'
                });

                // Add columns to be shown on Page
                sublist.addMarkAllButtons();
                sublist.addRefreshButton();
                var tranchckbx = sublist.addField({
                    id: 'custpage_tran_check',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Select'
                });
                sublist.addField({
                    id: 'id',
                    label: 'Internal ID',
                    type: serverWidget.FieldType.TEXT
                });
                sublist.addField({
                    id: 'customer',
                    label: 'Customer',
                    type: serverWidget.FieldType.TEXT
                });

                var location = sublist.addField({
                    id: 'location',
                    label: 'Location',
                    type: serverWidget.FieldType.TEXT
                })

                sublist.addField({
                    id: 'amount',
                    label: 'Amount',
                    type: serverWidget.FieldType.CURRENCY
                });


                // Run search and determine page count
                var retrieveSearch = runSearch(SEARCH_ID, PAGE_SIZE);
                var pageCount = Math.ceil(retrieveSearch.count / PAGE_SIZE);

                // Set pageId to correct value if out of index
                if (!pageId || pageId == '' || pageId < 0)
                    pageId = 0;
                else if (pageId >= pageCount)
                    pageId = pageCount - 1;

                // Add buttons to simulate Next & Previous
                if (pageId != 0) {
                    form.addButton({
                        id: 'custpage_previous',
                        label: 'Previous',
                        functionName: 'getSuiteletPage(' + scriptId + ', ' + deploymentId + ', ' + (pageId - 1) + ')'
                    });
                }

                if (pageId != pageCount - 1) {
                    form.addButton({
                        id: 'custpage_next',
                        label: 'Next',
                        functionName: 'getSuiteletPage(' + scriptId + ', ' + deploymentId + ', ' + (pageId + 1) + ')'
                    });
                }

                // Add drop-down and options to navigate to specific page
                var selectOptions = form.addField({
                    id: 'custpage_pageid',
                    label: 'Page Index',
                    type: serverWidget.FieldType.SELECT
                });

                for (i = 0; i < pageCount; i++) {
                    if (i == pageId) {
                        selectOptions.addSelectOption({
                            value: 'pageid_' + i,
                            text: ((i * PAGE_SIZE) + 1) + ' - ' + ((i + 1) * PAGE_SIZE),
                            isSelected: true
                        });
                    } else {
                        selectOptions.addSelectOption({
                            value: 'pageid_' + i,
                            text: ((i * PAGE_SIZE) + 1) + ' - ' + ((i + 1) * PAGE_SIZE)
                        });
                    }
                }

                // Get subset of data to be shown on page
                var addResults = fetchSearchResult(retrieveSearch, pageId);

                // Set data returned to columns
                var j = 0;
                addResults.forEach(function (result) {

                    sublist.setSublistValue({
                        id: 'id',
                        line: j,
                        value: result.id
                    });
                    sublist.setSublistValue({
                        id: 'customer',
                        line: j,
                        value: result.customerName
                    })

                    sublist.setSublistValue({
                        id: 'location',
                        line: j,
                        value: result.formulatext
                    });


                    sublist.setSublistValue({
                        id: 'amount',
                        line: j,
                        value: result.amount
                    });

                    j++
                });
                form.addSubmitButton({
                    label: 'Submit'
                });
                context.response.writePage(form);
            } else {


                var lineCount = context.request.getLineCount({sublistId: 'custpage_table'})
                log.debug('lineCount', lineCount)
                var checkMark = context.request.getSublistValue('custpage_table', 'custpage_tran_check', 1);
                log.debug('checkMark', checkMark)
                listOfIds = ' '
                var Ids = new Array()
                for (var i = 0; i < 1000; i++) {
                    if (context.request.getSublistValue('custpage_table', 'custpage_tran_check', i) == 'T') {
                        Ids.push(context.request.getSublistValue('custpage_table', 'id', i));
                        listOfIds += context.request.getSublistValue('custpage_table', 'id', i)
                        listOfIds += ' \n'
                    }

                }
                log.debug(`Ids`, Ids)
                var form1 = serverWidget.createForm({
                    title: 'Results Page',
                    hideNavBar: false
                });
                form1.clientScriptFileId = 12052;

                form1.addButton({
                    id: 'custpage_goback',
                    label: 'Go Back',
                    functionName: 'redirect()'
                });

                form1.addButton({
                    id: 'custpage_home',
                    label: 'Go Home',
                    functionName: 'redirectToHome()'
                });
                var listOfSO = form1.addField({
                    id: 'listofso',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'List of Sales Order to be Approve',

            }).defaultValue = listOfIds;


                context.response.writePage(form1)
            }
        }

        return {
            onRequest: onRequest
        };

        function runSearch(searchId, searchPageSize) {
            var searchObj = search.load({
                id: searchId
            });

            log.debug('searchObj', JSON.stringify(searchObj));

            return searchObj.runPaged({
                pageSize: searchPageSize
            });
        }

        function fetchSearchResult(pagedData, pageIndex) {

            var searchPage = pagedData.fetch({
                index: pageIndex
            });

            var results = new Array();

            searchPage.data.forEach(function (result) {
                var internalId = result.id;

                var amount = result.getValue({
                    name: 'amount'
                });
                var customerName = result.getText({
                    name: 'entity'
                })
                var formulatext = result.getValue({
                    name: 'formulatext'
                })


                results.push({
                    "id": internalId,
                    "customerName": customerName,
                    "formulatext": formulatext,
                    "amount": amount

                });
            });
            log.debug('results OBJ', results)
            return results;
        }
    });