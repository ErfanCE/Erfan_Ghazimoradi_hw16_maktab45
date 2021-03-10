$('#createForm').on('submit', function (e) {
    e.preventDefault();

    const data = {
        companyName: $('#companyName').val(),
        state: $('#state').val(),
        city: $('#city').val(),
        phoneNumber: $('#phoneNumber').val(),
        registerNumber: $('#registerNumber').val()
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8000/company/create",
        data,
        success: function (response) {
            validation(response);
        }
    });
});

function validation(response) {
    creationResult(response);
    
    if (response === 'create') setTimeout(() => location.href = 'http://localhost:8000', 3000);
}

function creationResult(status) {
    $('.result').html('result: ' + status + '.');
}