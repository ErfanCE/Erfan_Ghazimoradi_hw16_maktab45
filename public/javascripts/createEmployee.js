$('#createForm').on('submit', function (e) {
    e.preventDefault();

    const data = {
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        gender: $('#gender').val(),
        nationalNumber: $('#nationalNumber').val(),
        dateOfBirth: $('#dateOfBirth').val(),
        isManager: $('#isManager').val()
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8000/employee/create",
        data,
        success: function (response) {
            validation(response);
        }
    });
});

function validation(response) {
    creationResult(response);

    if (response === 'create') setTimeout(() => location.href = 'http://localhost:8000/employee', 3000);
}

function creationResult(status) {
    $('.result').html('result: ' + status + '.');
}