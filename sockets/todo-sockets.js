const users= {}

module.exports = function(io){
  console.log('running')
  io.on('connection', function(socket){
    //socket routes
    socket.on('emit-users', function(data){
      if(name){
        const $select = $('<select>');
        select.append('<option>Select User</option>');
        console.log(data);
        $('#select-container').empty();
        $('select-container').append($select);
      }
    });
    socket.on('new-message', function(data){
      console.log(data);
      socket.emit()
    //   const socket1 = users[data.user1];
    //   const socket2 = users[data.user2];
      
    //   socket1.emit('emit-message', data);
    //   socket2.emit('emit-message', data);
    // })