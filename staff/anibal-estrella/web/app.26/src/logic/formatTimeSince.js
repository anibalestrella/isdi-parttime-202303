export default function formatTimeSince(eventTime) {
    var currentTime = new Date();
    var timeElapsed = currentTime - eventTime;
  
    var seconds = Math.floor(timeElapsed / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
  
    if (days > 30) {
      return eventTime.toLocaleString(); // Display actual date and time
    } else if (days >= 1) {
      return days + " days ago";
    } else if (hours >= 1) {
      return hours + " hours ago";
    } else if (minutes >= 1) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  }

  //usage
  console.debug( formatTimeSince(new Date("2023-04-28T14:00:50.796Z")) )