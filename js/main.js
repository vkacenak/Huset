$(document).ready(function () {
    var i;
    var searchIcon = document.querySelector('.navigation__search');
    var searchBar = document.querySelector(".search-bar");

    searchIcon.addEventListener("click", function () {
        console.log('click');
        $(".search-bar").toggleClass("search-bar-visible");
        $(".navigation__button").toggleClass("navigation__button-search");
        $(".navigation__background").toggleClass("navigation__background-search");
    });


    //FILTER

    var formCategory = document.getElementsByName('category[]');
    var formCategoryArray = Array.prototype.slice.call(formCategory);
    var selectCategory;
    var formVenue = document.getElementsByName('venue[]');
    
    // not working
    // toggle select deselect text based on state of checkboxes
   for (i = 0; i < formCategoryArray.length; i++){
      formCategoryArray[i].addEventListener('click', function () {
                console.log(formCategoryArray);
                
            });
            
    };
    
    // select deselect all
    var selectCategory = document.getElementById('categoryAll');
    var selectVenue = document.getElementById('venueAll');

    selectVenue.addEventListener("click", checkAllVenue);
    selectCategory.addEventListener("click", checkAllCategory);

    console.log(selectCategory);

    function checkAllCategory() {
        if (selectCategory.checked) {
            selectCategory.nextElementSibling.innerHTML = "Deselect All";
            for (i = 0; i < formCategory.length; i++) {
                formCategory[i].checked = true;

            }
        } else {
            selectCategory.nextElementSibling.innerHTML = "Select All";
            for (i = 0; i < formCategory.length; i++) {
                formCategory[i].checked = false;
            }
        }
    }

    function checkAllVenue() {
        if (selectVenue.checked) {
            selectVenue.nextElementSibling.innerHTML = "Deselect All";
            for (i = 0; i < formVenue.length; i++) {
                formVenue[i].checked = true;

            }
        } else {
            selectVenue.nextElementSibling.innerHTML = "Select All";
            for (i = 0; i < formVenue.length; i++) {
                formVenue[i].checked = false;
            }
        }
    }


    // GET THE FILTER DATA
    document.querySelector(".filterBtn").addEventListener("click", function () {
        //Category
        var checkedCategory = [];
        for (i = 0; i < formCategory.length; i++) {
            if (formCategory[i].checked) {

                checkedCategory.push(formCategory[i].nextElementSibling.innerHTML);

            }
        }
        console.log(checkedCategory);
        checkedCategory = [];

        //VENUE
        var checkedVenue = [];
        for (i = 0; i < formVenue.length; i++) {
            if (formVenue[i].checked) {

                checkedVenue.push(formVenue[i].nextElementSibling.innerHTML);

            }
        }
        console.log(checkedVenue);
        checkedVenue= [];
        // DATE
    })



// JSON FETCH
var request = new XMLHttpRequest();
request.open('GET', 'http://viktorkacenak.com/WordpressSite/wpv1/wp-json/wp/v2/event?_embed', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    console.log(data);
    createHTML(data);
 
  } else {
    // We reached our target server, but it returned an error

  }

};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
var eventsContainer = document.querySelector('.events');

function createHTML(data){
    var HTMLString = '';
    for (i = 0; i < data.length; i++){
        HTMLString += '<div class="event">';
       HTMLString += ' <img src="' + data[i]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url + '" alt="" class="event-img">'
       HTMLString += '</div>'

    }
eventsContainer.innerHTML = HTMLString;
    
    

}




}); //JQUERY