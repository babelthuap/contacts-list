'use strict';

$(document).ready(() => {

  // initialize page
  let sortBy = 0;
  let list = localStorage.list ? JSON.parse(localStorage.list) : [];
  printList();
  $('#name').focus();


  $('#clear').click(() => { updateList([]); });
  $('#add').click(() => { addContact(); });
  $('table').on('click', 'td', updateContact);
  $('.header').click(changeSortBy);
  $('.new').on('keypress', (e) => {
    if (e.charCode === 13) addContact();
  });

  function changeSortBy() {
    sortBy = $(this).prevAll().length;
    $('.header:nth-of-type(' + (sortBy + 1) + ') h4').append( $('#caret') );
    
    printList();
  }

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

    list.sort(function(a, b) {
      return a[sortBy] > b[sortBy];
    });

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
    let newValue = prompt('New Value:', $(this).text());
    if (newValue) {
      list[indexToUpdate][fieldToUpdate] = newValue;
      updateList(list);
    }
  }
})
