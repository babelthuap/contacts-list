'use strict';

$(document).ready(() => {

  // initialize page
  let list = localStorage.list ? JSON.parse(localStorage.list) : [];
  printList();
  $('#name').focus();


  $('#clear').click(() => { updateList([]); });
  $('#add').click(() => { addContact(); });
  $('.new').on('keypress', (e) => {
    if (e.charCode === 13) addContact();
  });
  $('table').on('click', 'td', updateContact);

  function addContact() {
    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let twitter = $('#twitter').val();
    updateList( list.concat([[name, email, phone, twitter]]) );
    $('#name').focus();

    $('#phone').val( Math.floor(Math.random() * 9000000000) + 1000000000 ); // DEBUG
  }

  function removeContact() {
    let indexToRemove = $(this).closest('tr').attr('index');
    list.splice(indexToRemove, 1);
    updateList(list);
  }

  function printList() {
    $('tr').not('.permanent').remove();

    let newTableRows = [];
    list.forEach((person, i) => {
      // create table row entry representing that person
      let $removeButton = $('<button>').text('X').click(removeContact);
      let $entry = $('<tr>').append( $('<td>').text(person[0]) )
                            .append( $('<td>').text(person[1]) )
                            .append( $('<td>').text(person[2]) )
                            .append( $('<td>').text(person[3]) )
                            .append( $('<td>').append($removeButton) )
                            .attr('index', i); // used to identify the contact entry
      newTableRows.push($entry);
    })
    $('#contacts').append(newTableRows);
  }

  function updateList(newList) {
    list = newList;
    localStorage.list = JSON.stringify(list);
    printList();
  }

  function updateContact() {
    let indexToUpdate = $(this).closest('tr').attr('index');
    let fieldToUpdate = $(this).prevAll().length;

    console.log( 'old value:', list[indexToUpdate][fieldToUpdate] );


    let newValue = prompt('New Value:', $(this).text());
    if (newValue) list[indexToUpdate][fieldToUpdate] = newValue;
    printList();
  }

})
















