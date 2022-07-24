$(document).ready(function(){
  
  $('form').on('submit', function(){


      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        //the above line is passing data back to the controller post method where the data array is updated and then the below like is called to rerender with the entire data array
        // so the data in the line above and below are different
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        //the above line is processed by delete method in the controller then the data is passed back to the below line
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
