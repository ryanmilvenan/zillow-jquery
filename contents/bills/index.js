var bills = {

    searchByKeyword: function(keyword) {

        $.get("https://congress.api.sunlightfoundation.com/bills/search?query=" + keyword, apikey, function(data) {

            console.log('got ' + data)
            console.debug(data)
            if (data.results){

                $.get("/sunlight/bills/list.jade", function(template) {
                    var html = jade.render(template, {
                        data: data
                    })
                    console.log(html)
                    $("#list").html(html)
                })

            }

        })

    },


    load: function() {

        $.get("/sunlight/bills/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })

        // default search results
        bills.searchByKeyword('health care')

    }

}
