const form = document.getElementById("contact_us");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Send Mail via Ajax
        sendMail(form)
    });

    function sendMail(form) {
        // Get the messages div.
        var form_results = $('#form_results');

        // Serialize the form data.
        var formData = $(form).serialize();


        // The Google checked
        if (grecaptcha === undefined) {
            alert('Recaptcha not defined');
            return;
        }

        var response = grecaptcha.getResponse();

        if (!response) {
            alert('Please click the Recaptcha!');
            return;
        }

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function (response) {
            if (response.success) {

                // Make sure that the form_results div has the 'success' class.
                form_results.removeClass('hide');
                form_results.addClass('show');

                // Set the message text.
                $('#message').text(response.text);

                // Clear the form.
                $("[name='contact_name']").val('');
                $("[name='contact_email']").val('');
                $("[name='contact_company']").val('');
                $("[name='contact_phone']").val('');
                $("[name='contact_message']").val('');

                console.log("Great! Message sent we'll response Shortly");

            }

        }).fail(function (data) {
            // Make sure that the form_results div has the 'error' class.
            form_results.removeClass('hide');
            form_results.addClass('show');

            form_results.addClass('alert-danger');

            // Set the message text.
            if (data.responseText !== '') {
                form_results.text(data.responseText);
            } else {
                form_results.text('Oops! An error occured and your message could not be sent.');
            }
        });
    }
}