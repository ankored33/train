$(function(){
  $('#load').click(function(){
    var geturl = $('#url').val();
    $.ajax({
      type: 'GET',
      url: 'https://shooting-barbieri0303.c9users.io/geturl/',
      dataType: 'json',
      success: function(json) {
        $('#result').append('<ul><li>' + json.url + '</li><li>' + json.age + '</li></ul>');
      },
      error: function() {
        $('#result').append('error');
      }
    });
  });
});