var districts = {

    searchByZipcode: function(zipcode) {


        // ref: https://sunlightlabs.github.io/congress/districts.html

        $("#list").html("TODO")

    },

    load: function() {

        $.get("/sunlight/districts/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })

        // default search results
        districts.searchByZipcode()

    }

}