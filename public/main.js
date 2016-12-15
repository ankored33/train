$(function(){
  $('#load').click(function(){
    var member_name = $('#member_name').val();
    $.ajax({
      type: 'GET',
      url: 'https://shooting-barbieri0303.c9users.io/member/' + member_name,
      dataType: 'json',
      success: function(json) {
        $('#result').append('<ul><li>' + json.name + '</li><li>' + json.age + '</li></ul>');
      },
      error: function() {
        $('#result').append('error');
      }
    });
  });
});