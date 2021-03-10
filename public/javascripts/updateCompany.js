const companyID = $('#companyID').val();

// update company ajax
$('#updateForm').on('submit', function (e) {
    e.preventDefault();

    const data = {
        companyName: $('#companyName').val(),
        state: $('#state').val(),
        city: $('#city').val(),
        phoneNumber: $('#phoneNumber').val(),
        registerNumber: $('#registerNumber').val(),
    };

    $.ajax({
        type: "PATCH",
        url: `http://localhost:8000/company/update/${companyID}`,
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
        url: `http://localhost:8000/company/delete/${companyID}`,
        success: function (response) {
            console.log(response);
            setTimeout(() => location.href = 'http://localhost:8000', 4000);
        }
    });
});


function validation(response) {
    creatationResult(response);

    if (response === 'update') setTimeout(() => location.href = `http://localhost:8000/company/${companyID}`, 3000);
}

function creatationResult(status) {
    $('.result').html('result: ' + status + '.');
}