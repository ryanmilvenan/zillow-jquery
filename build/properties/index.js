var properties = {

    rslt: {},
    searchByZipcode: function(address, zipcode) {

        // search legistalors by zipcode (default to Boulder, 80301)
        // ref: https://sunlightlabs.github.io/congress/legislators.html

        var address = address || '3745 Birchwood Dr';
        address = encodeURIComponent(address);
        var zipcode = zipcode || '80304';
        
        $.get("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + apikey + "&address=" + address + "&citystatezip=" + zipcode + "&output=json", function(data) {

            var response = $(data).find("response")
            if (response[0]){
                var results = {}
                var idx = 0;
                $(data).find("result").each(function(){
                    results[idx] = $(this)[0]
                    idx++;
                });
                properties.rslt = results
                $.get("/properties/list.jade", function(template) {
                    var html = jade.render(template, {
                        data: results
                    })
                    $("#list").html(html)
                })
            }

        });
       
      

    },

    displayDetailView: function(property) {
    
        var detailView = $(properties.rslt[property])
        detailView = detailView[0].children
        $.get("/properties/detail.jade", function(template) {
            var html = jade.render(template, {
                data: detailView
            })
            $("#list").html(html)
        })

    },

    load: function() {

        $.get("/properties/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })

        // default search results
        properties.searchByZipcode()

    }

}
