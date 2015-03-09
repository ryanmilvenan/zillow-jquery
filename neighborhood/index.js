var neighborhood = {

    rslt: {},
    searchByZipcode: function(zipcode) {

        var zipcode = zipcode || '80304';

        $.get("http://www.zillow.com/webservice/GetDemographics.htm?zws-id=" + apikey + "&zip=" + zipcode, function(data) {
            var response = $(data).find("response")
            if(response[0]) {
                var results = {}
                console.log(response)
                results.region = $(data).find("region")[0]
                results.links = $(data).find("links")[0]
                results.charts = $(data).find("charts")[0]
                results.market = $(data).find("market")[0]
                results.pages = $(data).find("pages")[0]
                neighborhood.rslt = results
                $.get("/zillow-jquery/neighborhood/list.jade", function(template) {
                    var html = jade.render(template, {
                        data: results
                    })
                    $("#list").html(html)
                })
            }
        })

    },

    displayDetailView: function() {
    
        var detailView = $(neighborhood.rslt)
        $.get("/zillow-jquery/neighborhood/detail.jade", function(template) {
            var html = jade.render(template, {
                data: detailView
            })
            $("#list").html(html)
            rslt = {}
        })

    },
    load: function() {

        $.get("/zillow-jquery/neighborhood/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })

        // default search results
        neighborhood.searchByZipcode()

    }

}
