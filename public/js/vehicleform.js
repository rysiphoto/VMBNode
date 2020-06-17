$(document).ready(function () {
  const vehicle = $('form#add-vehicle');
  const make = $('input#make');
  const model = $('input#model');
  const trim = $('input#trim');
  const year = $('input#year');
  const color = $('input#color');
  const vin = $('input#vin');
  const lp = $('input#lp');

  $.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
      return null;
    }
    return decodeURI(results[1]) || 0;
  };
  vehicle.on('submit', function (event) {
    event.preventDefault();
    const vehicleData = {
      make: make.val().trim(),
      model: model.val().trim(), //can be left blank, will return a 'N/A' value if left blank
      trim: trim.val().trim(),
      year: year.val().trim(),
      color: color.val().trim(),
      vin: vin.val().trim(),
      lp: lp.val().trim()
    };
    if (!vehicleData.make || !vehicleData.model || !vehicleData.color) {
      return;
    }
    createBeer(vehicleData.make, vehicleData.model, vehicleData.trim, vehicleData.year, vehicleData.color, vehicleData.vin, vehicleData.lp);
    make.val('');
    model.val('');
    trim.val('');
    year.val('');
    color.val('');
    vin.val('');
    lp.val('');
  });

  function createVehicle(make, model, trim, year, color, vin, lp) {
    $.post('/api/vehicles', {
      make: make,
      model: model,
      trim: trim,
      year: year,
      color: color,
      vin: vin,
      lp: lp,
      GarageId: $.urlParam('garageid')
    })
      .then(function (data) {
        window.location.replace('/vehicles');
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

});

$(function () {
  $('#signUp').on('click', function (event) {
    event.preventDefault();
    var newUser = {
      name: $('#name').val().trim(),
      email: $('#email').val().trim(),
      password: $('#password').val().trim()
    };

    $.ajax('/api/signup', {
      type: 'POST',
      data: newUser
    }).then(function () {
      window.location.replace('/');
    });
  });
});

$(function () {
  $('#log').click('submit', function (event) {
    event.preventDefault();
    var logIn = {
      email: $('#email').val().trim(),
      password: $('#password').val().trim()
    };

    $.ajax('/api/login', {
      type: 'POST',
      data: logIn
    }).then(function (User) {
      window.location.href = '/users/' + User.id;
    });
  });
});

// $(function () {
//   $('#garage').click('submit', function (event) {
//     event.preventDefault();
//     $.get('/api/user_data').then(user => {

//       var addBrewery = {
//         name: $('#breweryName').val().trim(),
//         address: $('#breweryAddress').val().trim(),
//         phoneNumber: $('#breweryNumber').val().trim(),
//         UserId: user.id
//       };
//       $.ajax('/api/garage', {
//         type: 'POST',
//         data: addGarage
//       }).then(function ({ id }) {
//         window.location.replace('/beers/add?garageid=' + id);
//       });
//     });
//   });
// });

// $(function () {
//   $('.change-stock').on('click', function (event) {
//     var id = $(this).data('id');
//     var noStock = $(this).data('outOfStock');

//   var stockState = {
//     stockAvail: noStock
//   };
//   $.ajax('/api/beerform/' + id, {
//     type: 'PUT',
//     data: stockState
//   }).then(
//     function () {
//       console.log('changed stock to', noStock);
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });
$('.delete').on('click', function (event) {
  const id = $(this).attr('data-id');

  $.ajax(`/api/vehicle/${id}`, {
    type: 'DELETE'
  }).then(() => {
    console.log(`deleted vehicle with id ${id}`);
    location.reload();
  });
});


$('.garage').on('click', function () {
  console.log('hit');
  const id = $(this).data('id');
  location.href = '/garage/' + id;
});