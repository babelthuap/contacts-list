'use strict';

$(document).ready(() => {

  // initialize
  let list = initList();
  printList();

  $('#clear').click(() => { updateList([]); })
  $('#add').click(() => { addContact(); })
  $('.new').on('keypress', (e) => {
    if (e.charCode === 13) addContact();
  });

  function addContact() {
    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let twitter = $('#twitter').val();
    updateList( list.concat([{name: name, email: email, phone: phone, twitter: twitter}]) );
    $('#name').focus();
  }

  function removeContact() {
    let indexToRemove = $(this).closest('tr').attr('index');
    list.splice(indexToRemove, 1);
    updateList(list);
  }

  function initList() {
    // fetch the stored list from local storage
    return localStorage.list ? JSON.parse(localStorage.list) : [];
  }

  function printList() {
    $('tr').not('.permanent').remove();

    let newTableRows = [];
    list.forEach((person, i) => {
      // create table row entry representing that person
      let $removeButton = $('<button>').text('X').click(removeContact);
      let $entry = $('<tr>').append( $('<td>').text(person.name) )
                            .append( $('<td>').text(person.email) )
                            .append( $('<td>').text(person.phone) )
                            .append( $('<td>').text(person.twitter) )
                            .append( $('<td>').append($removeButton) )
                            .attr('index', i);
      newTableRows.push($entry);
    })
    $('#contacts').append(newTableRows);
  }

  function updateList(newList) {
    list = newList;
    localStorage.list = JSON.stringify(list);
    printList();
  }

})