$(document).ready(
  function () {
    function a(a, c, d, e, f, g, h) {
      $.post('/api/vehicles',
        {
          make: a,
          model: c,
          trim: d,
          color: e,
          year: f,
          vin: g,
          lp: h,
          GarageId: $.urlParam('garageid')
        })
        .then(function () {
          window.location.replace('/vehicles')
        })
        .catch(b)
    }
    function b(a) {
      $('#alert .msg').text(a.responseJSON),
        $('#alert').fadeIn(500)
    }
    const c = $('form#add-vehicle'),
      d = $('input#trim'),
      e = $('input#color'),
      f = $('input#year'),
      g = $('input#vin'),
      h = $('input#lp');
    $.urlParam = function (a) {
      var b = new RegExp('[?&]' + a + '=([^&#]*)').exec(window.location.href);
      return null === b ? null : decodeURI(b[1]) || 0
    },
      c.on('submit',
        function (b) {
          b.preventDefault();
          const c = {
            trim: d.val().trim(),
            color: e.val().trim(),
            year: f.val().trim(),
            vin: g.val().trim(),
            lp: h.val().trim()
          };
          c.trim && c.color && c.vin && c.lp && (a(c.model, c.color, c.make, c.vin, c.lp),
            d.val(''), e.val(''), f.val(''), g.val(''), h.val(''))
        })
  }), $(function () {
    $('#signUp').on('click',
      function (a) {
        a.preventDefault();
        var b = {
          email: $('#email').val().trim(),
          password: $('#password').val().trim()
        };
        $.ajax('/api/signup',
          {
            type: 'POST',
            data: b
          })
          .then(function () {
            window.location.replace('/')
          })
      })
  }),
  $(function () {
    $('#log').click('submit',
      function (a) {
        a.preventDefault();
        var b = {
          email: $('#email').val().trim(),
          password: $('#password').val().trim()
        };
        $.ajax('/api/login',
          {
            type: 'POST',
            data: b
          })
          .then(function (a) { window.location.href = '/users/' + a.id })
      })
  }), $(function () {
    $('#garage').click('submit',
      function (a) {
        a.preventDefault(),
          $.get('/api/user_data')
            .then(a => {
              var b = {
                name: $('#garageName').val().trim(), \
                address: $('#garageAddress').val().trim(),
                phoneNumber: $('#garageNumber').val().trim(),
                UserId: a.id
              };
              $.ajax('/api/garage',
                { type: 'POST', data: b })
                .then(function ({ id: a }) {
                  window.location.replace('/vehicles/add?garageid=' + a)
                })
            })
      })
  }),
  $(function () {
    $('.change-stock').on('click',
      function () {
        var a = $(this).data('id'),
          b = $(this).data('outOfStock');
        $.ajax('/api/vehicleform/' + a,
          {
            type: 'PUT',
            data: { stockAvail: b }
          }).then(function () {
            console.log('changed stock to',
              b),
              location.reload()
          })
      }),
      $('.delete').on('click',
        function () {
          const a = $(this).attr('data-id');
          $.ajax(`/api/vehicleForm/${a}`,
            { type: 'DELETE' })
            .then(() => {
              console.log(`deleted vehicle with id ${a}`),
                location.reload()
            })
        })
  }),
  $('.garage').on('click',
    function () {
      console.log('hit');
      const a = $(this).data('id');
      location.href = '/garage/' + a
    });