window.onload = function() { // Start after loading page

  /*
    video.js configuration
   */
  var video = {
    attribute: "video-id",                                  // string,  <video> tag attribute
    idLength: 11,                                           // integer, Video ID length
    ids: document.getElementsByTagName("video"),            // array,   Video elements collection
    proxy: "http://www.example.com/api/video.php?code=",    // string,  Video source proxy site
    reqType: "GET"                                          // string,  Request type
  }

  /*
    Request raw sources from proxy and set them
    element - integer , element index number
    id      - string  , video-id value to be requested from server
   */
  function setSource(element, id) {
    var sourceComplete = false;
    if (id.length === video.idLength) {
      const http = new XMLHttpRequest();  // Create a new request
      const url = video.proxy + id;       // Add video ID to url
      http.open(video.reqType, url);      // Open request type with url
      http.send();
      http.onreadystatechange = function() {  // On request state change
        if (http.responseText && sourceComplete === false) {
          sources = http.responseText;              // Set video source reply
          video.ids[element].innerHTML = sources;   // Update <video> with new source
          sourceComplete = true;
        }
      }
    }
  }

  /*
    Go through every video tag and trigger source update
   */
  for (var vid = 0; vid < video.ids.length; vid++) {
    id = video.ids[vid].getAttribute(video.attribute);  // Get video ID via video-id attribute value
    setSource(vid, id);                                 // Set fresh sources
  }
}
