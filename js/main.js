$(document).ready(function () {
    var i;
    var searchIcon = document.querySelector('.navigation__search');
    var searchBar = document.querySelector(".search-bar");

    var eventsContainer = document.querySelector('.events');
    var template = document.querySelector('.event-template').content;
    var catID = [26,34,30,33,25,31,29,28,27,32];
    var catName = ["Alternative", "Avantgarde", "Hip Hop", "Improvisation", "Jazz", "People", "Pop", "Punk", "Rock", "World" ];
    var venueID = [59,54,53,60,57,58,56,55,52];
    var venueName = ["Bastard cafe", "Cinema House", "Musikkafe", "Salon K", "Spisehuset", "Stardust", "The ballroom", "Vox", "Xenon"];
    var fetchLink = "http://viktorkacenak.com/WordpressSite/wpv1/wp-json/wp/v2/event?_embed?";



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
    for (i = 0; i < formCategoryArray.length; i++) {
        formCategoryArray[i].addEventListener('click', function () {
           

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
                console.log(formCategory[i].id);
                checkedCategory.push(formCategory[i].id);
            }
        }
        
      let checkedCategoryStr = checkedCategory.join(',');

        //VENUE
        var checkedVenue = [];
        for (i = 0; i < formVenue.length; i++) {
            if (formVenue[i].checked) {

                checkedVenue.push(formVenue[i].nextElementSibling.innerHTML);

            }
        }
        
        checkedVenue = [];
        // DATE



        // UPDATE LINK
        console.log(checkedCategoryStr);
        let fetchLink = "http://viktorkacenak.com/WordpressSite/wpv1/wp-json/wp/v2/event?categories=" + checkedCategoryStr +"&_embed"  
        let fetchLinkTest = "http://viktorkacenak.com/WordpressSite/wpv1/wp-json/wp/v2/event?_embed";
        console.log(fetchLink);
        JSONFetch(fetchLink);

    })




    // JSON FETCH

   
   
function JSONFetch(link){
    eventsContainer.innerHTML = "";
    var request = new XMLHttpRequest();
    request.open('GET', link , true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            createHTML(data);
            console.log(data);

        } else {
            // We reached our target server, but it returned an error

        }

    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();

    function createHTML(data) {
      
        for (i = 0; i < data.length; i++) {
            const clone = template.cloneNode(true);
               clone.querySelector('.event-img').src= data[i]._embedded['wp:featuredmedia']['0'].media_details.sizes.full.source_url;
                      
                      var catIndex = catID.findIndex(function(element) {
                        return element == data[i].categories[0];
                        
                      });
                      var venueIndex = venueID.findIndex(function(element) {
                        return element == data[i].place[0];
                        
                      });
                      clone.querySelector('.event-place').innerHTML = venueName[venueIndex];
                      clone.querySelector('.event-category').innerHTML = catName[catIndex];
                      clone.querySelector('.event-heading').innerHTML = data[i].title.rendered;
                      let date = data[i].dateday;
                      let time = data[i].timetime;
                      clone.querySelector('.event-date').innerHTML = date.substr(0,10);
                      clone.querySelector('.event-time').innerHTML = time.substr(0,5);



                      eventsContainer.appendChild(clone);
        }




    }

};


}); //JQUERY