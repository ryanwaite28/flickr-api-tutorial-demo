$(document).ready(function(){

  $('.collapsible').collapsible();

  function getRandomQuery() {
    let query_list = [
      'nature',
      'garden',
      'outer space',
      'festival',
      'park'
    ];

    return query_list[Math.floor(Math.random() * query_list.length)];
  }

  function MVC() {
    let self = this;
    let api_key = '3909720ecbeba83d318a1dd0a7578f03';

    self.query= ko.observable('');
    self.photos_list = ko.observableArray([]);

    self.search_flickr_images = function() {
      let query = getRandomQuery();
      self.query(query);

      window.jsonFlickrApi = function(json){
        // do stuff
        let photos_list = [];

        for(let photo of json.photos.photo) {
            var title = photo.title;
            var farm = photo.farm;
            var id = photo.id;
            var owner = photo.owner;
            var secret = photo.secret;
            var server = photo.server;
            var isFamily = photo.isfamily;
            var isFriend = photo.isfriend;
            var isPublic = photo.ispublic;

            var img = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';

            photos_list.push({
              title: title,
              img: img,
              owner: owner,
            });
        }

        self.photos_list(photos_list);

        console.log(json);
        console.log(photos_list);

        delete window.jsonFlickrApi
      }


      var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
      api_key + '&tags=' + query + '&format=json&callback=?';

      $.ajax({
        url: flickrAPI,
        dataType: 'jsonp',
        success: function(resp) {
          console.log(resp)
        }
      });
    }
  }

  let mvc = new MVC();
  mvc.search_flickr_images();

  ko.applyBindings(mvc);

  window.logmvc = function() {
    console.log(mvc);
  }

});
