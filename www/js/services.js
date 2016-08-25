//angular.module('starter.services', [])

app.factory('Scopes', function($rootScope) {
        var mem = {};

        /*Speichere ein Controller*/
        function store(key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
            // $rootScope.each(function(index, el) {
            //
            // });
            console.log(key)
        }

        /*Gibt den Controller Name zurück */
        function get(key) {
            return mem[key];
        }

        return {
            store: store,
            get: get
        };
    })
    .factory('Partners', function($http) {
        /**/
        function allPartners(url) {
            return $http.get(url);
        };

        /**/
        function getPartner(key) {};

        /**/
        function addPartner() {

        };

        /**/
        function removePartner() {

        };

        /**/
        function setPartner() {

        };

        return {
            allPartners: allPartners,
            getPartner: getPartner,
            addPartner: addPartner,
            removePartner: removePartner,
            setPartner: setPartner
        };
    })
    .factory('OfferEvents', function($http, $rootScope, $q) {
        var offerEvent = [];
        var offer = [{
            title: '50% Rabatt bei Lidl',
            description: '50% Rabatt auf alle Tee und Kaffeesorten bei Lidl',
            id: 1
        }, {
            title: 'Adidas - 20% günstiger',
            description: 'adidas Laufschuhe - 20% günstiger',
            id: 2
        }, {
            title: 'Brötchen in Angebot bei Backer Happ',
            description: '5 Brötchen zum Preis von 3 bei Backer Happ',
            id: 3
        }, {
            title: 'Verkaufsoffener Sonntag bei H&M',
            description: 'Verkaufsoffener Sonntag bei H&M',
            id: 4
        }, {
            title: '50% auf alle Bockwürste - Fleischerei Pfaff',
            description: 'Bockwürste zum halben Preis bei Fleischerei Pfaff',
            id: 5
        }, {
            title: 'Aldi verschenkt',
            description: '1 Kaffee umsonst bei jedem Einkauf ab 5 Euro',
            id: 6
        }];

        /*
         * Generiere ein Datum für die Kalendareinträge
         */

        var incrementDate = function(date, numberOfDay) {
            var currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + numberOfDay);
            return currentDate.toLocaleDateString();
        }

        /*
         * Erstelle alle Kalendareinträge mit dem Start -und Enddatum
         */

        offer.forEach(function(value, index) {
            var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            offerEvent.push({
                "title": value.title,
                "color": color,
                "description": value.description,
                "startdate": incrementDate(new Date, index + 1),
                "enddate": incrementDate(new Date, index + 2)
            })
        })

        /*
         * Gibt alle Kalendareinträge zurück
         */
        function getOfferEvent() {
            var deferred = $q.defer();
            deferred.resolve(offerEvent);
            return deferred.promise;
        };

        return {
            get: getOfferEvent
        };

    })
    .factory('Cards', function($http, $rootScope) {
        var Cards = [];

        /**/
        function allCards(url) {
            return $http.get(url);
        };

        /**/
        function getCard(key) {};

        /**/
        function addCard() {

        };

        /**/
        function removeCard() {

        };

        /**/
        function setCard() {

        };

        return {
            allCards: allCards,
            getCard: getCard,
            addCard: addCard,
            removeCard: removeCard,
            setCard: setCard
        };

    });
