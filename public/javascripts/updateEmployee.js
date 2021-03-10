const employeeID = $('#employeeID').val();

// update company ajax
$('#updateForm').on('submit', function (e) {
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
        type: "PATCH",
        url: `http://localhost:8000/employee/update/${employeeID}`,
        data,
        success: function (response) {
            validation(response);
        }
    });
});

// delete company ajax
$('#deleteForm').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
        type: "DELETE",
        url: `http://localhost:8000/employee/delete/${employeeID}`,
        success: function (response) {
            console.log(response);
            setTimeout(() => location.href = 'http://localhost:8000/employee', 4000);
        }
    });
});


function validation(response) {
    creatationResult(response);

    if (response === 'update') setTimeout(() => location.href = `http://localhost:8000/employee/${employeeID}`, 3000);
}

function creatationResult(status) {
    $('.result').html('result: ' + status + '.');
}