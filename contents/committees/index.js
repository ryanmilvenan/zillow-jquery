var committees = {

    searchByCommitteeName: function(committeeName) {

        // search all memb ers of a particular committee (default to SSAP)
        // ref: https://sunlightlabs.github.io/congress/legislators.html

        var committeeName = committeeName || 'SSAP'

        $.get("https://congress.api.sunlightfoundation.com/committees?committee_id=" + committeeName + "&fields=members", apikey, function(data) {

            console.log('got ' + data)
            if (data.results){

                $.get("/sunlight/committees/list.jade", function(template) {
                    var html = jade.render(template, {
                        data: data
                    })
                    console.log(html)
                    $("#list").html(html)
                })

            }

        })

    },

    searchByMemberID: function(nameID) {

        // search legistalors by name
        // ref: https://sunlightlabs.github.io/congress/legislators.html

        $.get("https://congress.api.sunlightfoundation.com/committees?member_ids=" + nameID, apikey, function(data) {

            $.get("/sunlight/committees/list.jade", function(template) {
                var html = jade.render(template, {
                    data: data
                })
                $("#list").html(html)
            })

        })

    },


    load: function() {

        $.get("/sunlight/committees/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })

        // default search results
        committees.searchByCommitteeName('SSAP')

    }

}