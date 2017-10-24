/* GET 'home' page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', { 
    title: 'WhereWiFi - Find a place to work with Wifi', 
    pageHeader : {
      title: 'WhereWiFi',
      strapline: 'Find places to work with WiFi near you!'
    },
    sidebar: "Looking for wifi and a seat? WhereWiFi helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let WhereWiFi help you find the place you're looking for.",
    locations: [{
      name: 'Starbucks',
      address: '21 Jalan Mata Kucing, Klang 41100',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '100m'
    }, {
      name: 'Coffee Beans',
      address: '40 Kota Damansara, Petaling Jaya 35100',
      rating: 4,
      facilities: ['Food', 'Premium wifi'],
      distance: '100m'
    }, {
      name: 'Johns Mamak',
      address: 'A-27 Subang Street, Subang 41550',
      rating: 2,
      facilities: ['Hot drinks', 'Premium wifi'],
      distance: '100m'
    }]
  });
};

/* GET 'location info' page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', { 
    title: 'Starbucks',
    pageHeader: {
      title: 'Starbucks'
    },
    sidebar: {
      context: 'is on WhereWiFi because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'  
    },
    location: {
      name: 'Starbucks',
      address: '21 Jalan Mata Kucing, Klang 41100',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: {
          lat: 2.994793,
          lng: 101.4424813
              },
      openingTimes: [{
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
      }, {
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
      }, {
          days: 'Sunday',
          closed: true
      }],
      reviews: [{
          author: 'Simon Holmes',
          rating: 3,
          timestamp: '16 October 2017',
          reviewText: 'What a great place. I can\'t say enough good things about it.'
      }, {
          author: 'Charlie Chaplin',
          rating: 3,
          timestamp: '16 October 2017',
          reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
      }]
    }

  });
};

/* GET 'add review' page */
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Review Starbucks on WhereWiFi',
        pageHeader: {
            title: 'Review Starbucks'
        }
    });
};

