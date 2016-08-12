app.controller('CalendarCtrl', function($scope, OfferEvents) {
    /*
     * OfferEvents services aufrufen und alle Angebote für Kalendar bereitsstellen
     */
    OfferEvents.get().then(function(events) {
        console.log("events", events);
        $scope.events = events;
    });

});