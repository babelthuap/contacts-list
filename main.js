'use strict';

$(document).ready(() => {
  // initialize page
  let sortBy = 0;
  let reverseSort = false;
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
    let newSortBy = $(this).prevAll().length;

    if (sortBy === newSortBy) {
      reverseSort = !reverseSort;
      $('#caret').toggleClass('fa-caret-up').toggleClass('fa-caret-down');
    } else {
      sortBy = newSortBy;
      $('.header:nth-of-type(' + (sortBy + 1) + ') > *').append( $('#caret') );
    }

    printList();
  }

  function addContact() {
    let name = $('#name').val();
    if (name) {
      let email = $('#email').val();
      let phone = $('#phone').val();
      let twitter = $('#twitter').val();
      updateList( list.concat([[name, email, phone, twitter]]) );
      $('.permanent input').val('');
    }
    $('#name').focus();
  }

  function removeContact() {
    let indexToRemove = $(this).closest('tr').attr('index');
    // make it easy to undo a deletion
    $('#name').val( list[indexToRemove][0] );
    $('#email').val( list[indexToRemove][1] );
    $('#phone').val( list[indexToRemove][2] );
    $('#twitter').val( list[indexToRemove][3] );
    list.splice(indexToRemove, 1);
    updateList(list);
  }

  function printList() {
    $('tr').not('.permanent').remove();

    list.sort(function(a, b) {
      return reverseSort ? a[sortBy] < b[sortBy] : a[sortBy] > b[sortBy];
    });

    let newTableRows = [];
    list.forEach((person, i) => {
      // create table row entry representing that person
      let $removeButton = $('<button>').html('<i class="fa fa-trash-o"></i>').click(removeContact);
      let $entry = $('<tr>').append( $('<td>').text(person[0]) )
                            .append( $('<td>').text(person[1]) )
                            .append( $('<td>').text(person[2]) )
                            .append( $('<td>').text(person[3]) )
                            .append( $('<td>').append($removeButton) )
                            .attr('index', i); // used to identify the contact entry
      $entry.find('td').not(':last-child').addClass('clickable');
      newTableRows.push($entry);
    })
    $('#contacts').append(newTableRows);
  }

  function updateList(newList) {
    list = newList;
    localStorage.list = JSON.stringify(list);
    printList();
  }

  let fields = ['name', 'email', 'phone number', 'Twitter handle']
  function updateContact() {
    let indexToUpdate = $(this).closest('tr').attr('index');
    let fieldToUpdate = $(this).prevAll().length;

    let name = list[indexToUpdate][0];
    let possesive = name[name.length - 1] === 's' ? "'" : "'s";
    let msg = 'Change ' + name + possesive + ' ' + fields[fieldToUpdate] + ' to:';
    let newValue = prompt(msg, $(this).text());

    if (newValue) {
      list[indexToUpdate][fieldToUpdate] = newValue;
      updateList(list);
    }
  }
})
