$('#delete-playlist-confirm').on('show.bs.modal', function(e) {
  //get data-id attribute of the clicked element
  var playlistId = $(e.relatedTarget).data('playlist-id');
  $('#deletePlaylist').attr('data-playlist-id', playlistId);
  //populate the textbox
});
