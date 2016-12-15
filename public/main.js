$(function(){
  $('#load').click(function(){
    var member_name = $('#url').val();
    $.ajax({
      type: 'GET',
      url: 'https://shooting-barbieri0303.c9users.io/geturl/' + member_name,
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