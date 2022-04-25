

var API_KEY = 'AIzaSyCQoZ73RrqoYAkUMs6PaIFQsAFg3ElPm9M'; 
var CLIENT_ID = '957819467271-ua5hqeg3jlq426ic50ku3clangmtc4t6.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var public_id = "";

var SCOPES= 'https://www.googleapis.com/auth/calendar'; // read/write access to calendars
//getting authorise and sign button from html
var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  //Append a pre element to the body containing the given message as its text node. 
  //Used to display the results of the API call.
  //@param {string} message Text to be placed in pre element.
  
  function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      appendPre('Upcoming events:');

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }
    });
  }
  function makeApiCall() {

    // Step 4: Load the Google+ API
    gapi.client.load('calendar', 'v3').then(function() {
      // Step 5: Assemble the API request
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary'
        });
      
        // Step 6: Execute the API request
        request.then(function(resp) {
     
          var eventsList = [];
          var successArgs;
          var successRes;

          if (resp.result.error) {
            reportError('Google Calendar API: ' + data.error.message, data.error.errors);
          }
          else if (resp.result.items) {
            $.each(resp.result.items, function(i, entry) {
              var url = entry.htmlLink;

              // make the URLs for each event show times in the correct timezone
              //if (timezoneArg) {
              //    url = injectQsComponent(url, 'ctz=' + timezoneArg);
              //}

              eventsList.push({
                id: entry.id,
                title: entry.summary,
                start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
                end: entry.end.dateTime || entry.end.date, // same
                url: url,
                location: entry.location,
                description: entry.description
              });
            });

            // call the success handler(s) and allow it to return a new events array
            successArgs = [ eventsList ].concat(Array.prototype.slice.call(arguments, 1)); // forward other jq args
            successRes = $.fullCalendar.applyAll(true, this, successArgs);
            if ($.isArray(successRes)) {
              return successRes;
            }
          }

          if(eventsList.length > 0)
          {
                          // Here create your calendar but the events options is :
                          //fullcalendar.events: eventsList (Still looking for a methode that remove current event and fill with those news event without recreating the calendar.
                          
                        }
                      return eventsList;
          
        }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
        });
    });
  }

  const today = new Date();
// const renderCalendar =() => {
  
//   today.setDate(1);
  var month = today.getMonth(); 
  var year =today.getFullYear();
  var day = today.getDay();
//   const lastDay = new Date(today.getFullYear(), today.getMonth()+1,0).getDate();
   
//   const prevLastDay = new Date(today.getFullYear(), today.getMonth(),0).getDate();
   
//   const firstDay = today.getDay();
  
//    const lastDayIndex = new Date(today.getFullYear(),today.getMonth() + 1,0
//   ).getDay();
//   const nextDays = 7 - lastDayIndex - 1;

   var dayNum = today.getDate();
  var dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"];
  const monthList =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  


//  var time = new Date(); 
//   var hours = time.getHours();
//   var mins = time.getMinutes(); 
//   var secs = time.getSeconds();
 
  


  // const  monthDays = document.querySelector(".calNum");

 document.getElementById("date").innerHTML= "Today is " + dayList[day]+" "+dayNum+" "+monthList[month] +" "+year;
//  document.getElementById("calMonth").innerHTML=monthList[today.getMonth()-1];
//  document.querySelector(".date h1").innerHTML=monthList[today.getMonth()];
//  document.querySelector(".date p").innerHTML= new Date().toDateString();
// for (let x = firstDay; x > 0; x--) {
//     days += `<div class="prevDate">${prevLastDay - x + 1}</div>`;
//   }

// for( let i = 1; i<=lastDay; i++){
//     if (
//         i === new Date().getDate() &&
//         today.getMonth() === new Date().getMonth()
//       ) {
//         days += `<div class="today">${i}</div>`;
//       } else {
//         days += `<div>${i}</div>`;
//       }
    
// }
// monthDays.innerHTML = days;
// for (let j = 1; j <= nextDays; j++) {
//     days += `<div class="nextMonth">${j}</div>`;
    
// }
// };
  
// document.querySelector(".prev").addEventListener("click", () => {
//     today.setMonth(today.getMonth() - 1);
//     renderCalendar();
//   });
  
//   document.querySelector(".next").addEventListener("click", () => {
//     today.setMonth(today.getMonth() + 1);
//     renderCalendar();
//   });
//   renderCalendar();
 


  public_id = document.getElementById("public-calendar").value;
//creating calendar from JavaScript Library 
  document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, 
    {
      headerToolbar: {
        center: 'dayGridMonth,timeGridFourDay,timeGridWeek' // buttons for switching between views
      },
      views: {
        timeGridFourDay: {
          type: 'timeGrid',
          duration: { days: 1 },
          buttonText: '1 day'
        }
      },
      displayEventTime:false,
      googleCalendarApiKey:'AIzaSyCQoZ73RrqoYAkUMs6PaIFQsAFg3ElPm9M',
      events: {
      googleCalendarId: 'ttq3m98h9pn5ab391j80ije6l4@group.calendar.google.com' //test calendar id
      }
    });
  calendar.render();
});