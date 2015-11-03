'use strict';

$(document).ready(() => {

  let list = initList();
  printList();
  console.log('list loaded:', JSON.stringify(list)); // DEBUG
  //console.log('first person:', list[0].name); // DEBUG
  

  $('#clear').click(() => {
    updateList( [] );
  })

  $('#add').click(() => {
    addContact();
  })

  function addContact() {
    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let twitter = $('#twitter').val();
    updateList( list.concat([{name: name, email: email, phone: phone, twitter: twitter}]) );
  }

  function removeContact() {
    // remove contact from list
  }

  function initList() {
    // fetch the stored list from local storage
    return localStorage.list ? JSON.parse(localStorage.list) : [];
  }

  function printList() {
    $('tr').not('.permanent').remove();

    let newTableRows = [];
    list.forEach((person) => {
      // create table row entry representing that person
      let $removeButton = $('<button>').text('X').click(removeContact());
      let $entry = $('<tr>').append( $('<td>').text(person.name) )
                            .append( $('<td>').text(person.email) )
                            .append( $('<td>').text(person.phone) )
                            .append( $('<td>').text(person.twitter) )
                            .append( $('<td>').append($removeButton) );
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