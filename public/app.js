$(document).ready(function () {
    $('.button-collapse').sideNav();

    $('#noteModal').modal({ });

    $('.noteButton').on('click', function (ret) {
        //ret.stopImmediatePropagation();

        var currentButton = $(this).attr('id');

        //populateNote(currentButton);

        $('#noteModal').modal('open');

        $('#noteButton').on('click', function (ret) {
           // ret.preventDefault();

            var noteText = $('#noteText');

            $.post("/note/" + currentButton, $('#noteForm').serialize())
                .done(function (data) {
                       // populateNote(currentButton);
                    })
                .fail(function (error) {
                        console.log("Error writing note to db", error);
                    });

            noteText.val('');

            return false;
        });
    });

   


    function populateNote(id) {
        $('.messages').empty();

        $.get("/note/" + id, function (data) {
            if(data.noteText){

                for (var i = 0; i < data.length; i++) {
                    var note = $(
                        '<li class="note collection-item">'
                        + '<p>'
                        + (i+1) + ': ' + data[i].noteText + '</p>'
                        + '<button class="individualNoteButton waves-effect waves-light btn-flat red" data-currentButtonId="' + data[i]._id + '">Delete note #' + (i+1) + '</button>'
                        + '</li>'
                    );
                    $('.messages').append(note);
                }
            }

        })
        .then(function() {
            $(".individualNoteButton").on("click", function() {
                var currentButtonId = $(this).data(currentButtonId);
                $.post("/deleteNote/" + currentButtonId.currentbuttonid, $('#noteForm').serialize())
                    .done(function (data) {
                        $('#noteModal').modal('close');
                        })
                    .fail(function () {
                        console.log("Error reading note from db");
                        });
            });
        })
    }
})