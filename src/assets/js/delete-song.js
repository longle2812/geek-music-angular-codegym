$('#delete-confirm').on('show.bs.modal', function(e) {
  //get data-id attribute of the clicked element
  var songId = $(e.relatedTarget).data('song-id');
  $('#deleteSong').attr('data-song-id', songId);
  //populate the textbox
});
