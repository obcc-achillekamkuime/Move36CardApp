app.controller('shopsCtrl', function($scope, Partners, Scopes, $state, $ionicHistory) {

  var url = "data/partner.json";
  $scope.Shops = [];
  $scope.Histories = [];
  $scope.favorited = false;

  Partners.allPartners(url).then(
    function(res){
        $scope.Shops = res.data
        console.log(res.data)
      }, 
      function(error){
        console.log(error);
      }
   );

   /*
   *Erweirte alle Shops-daten mit der Eigenschaft favorited
   */  
   angular.forEach($scope.Shops, function(shop){
      shop.favorited = $scope.favorited;
   });

   $scope.detailView = function (item) {
     $state.go('app.shop-detail-view', { shopId: item.id });
     $scope.Histories.push(item);
     console.log( $scope.Histories);
     console.log("ionicHistory", $ionicHistory.viewHistory());
   }

   /*
   *Füge ein element in der Merkliste ein
   */ 
    $scope.addToFavorit = function (item) {
       console.log(item)
      item.favorited = !item.favorited;
    };

    /*
    *Entferne ein element aus der Merkliste
    */
    $scope.removeFavorit = function(item){
      console.log(item)
      $scope.addToFavorit(item);     
    };

    Scopes.store("shopsCtrl", $scope);
})
.controller('shopDetailViewCtrl', function ($scope, Scopes, $stateParams) {
  $scope.shopsCtrl = Scopes.get('shopsCtrl');


  angular.forEach( $scope.shopsCtrl.Shops, function(item){
      // console.log(item.name);
      if (item.id == $stateParams.shopId){
        $scope.currentShop = item;
      }
  });
})
.controller('FavoriteCtrl', function ($scope, Scopes) {
    $scope.shopsCtrl = Scopes.get('shopsCtrl');
    $scope.favorite = $scope.shopsCtrl.Shops;

    console.log("Favorite: ", $scope.favorite);

    $scope.addToFavorit = function(item){
       $scope.shopsCtrl.addToFavorit(item)
    }

    $scope.removeFavorit = function(item){
       $scope.addToFavorit(item);      
    }

    $scope.detailView = function (item) {
      $scope.shopsCtrl.detailView(item);
    }
})
.controller('HistoriesCtrl', function ($scope, Scopes, $timeout, $ionicActionSheet, $ionicListDelegate) {
  $scope.shopsCtrl = Scopes.get('shopsCtrl');  
  $scope.listCanSwipe = true;

  $timeout(function(){
    $scope.histories = $scope.shopsCtrl.Histories;    
  });

  $scope.deleteItem = function(item, index){   
    var index = $scope.histories.map(function(e) { return e.id; }).indexOf(index)//$scope.histories.indexOf(item); 
    console.log(index);
    $scope.histories.splice(index, 1);
    //Storage.storeItem("historie", JSON.stringify($scope.histories));
    //$scope.histories = $scope.newCtrl.histories;
    $ionicListDelegate.closeOptionButtons();
  }

  $scope.addToFavorit = function(item){
    console.log($scope.histories.indexOf(item));
    $scope.shopsCtrl.addToFavorit(item)
  }
 
  $scope.removeFavorit = function(item){
      $scope.addToFavorit(item);      
  }

  $scope.detailView = function (item) {
    $scope.shopsCtrl.detailView(item);
  }
  
  $scope.deleteHistories = function () {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-ios-trash-outline"></i> Ja, alle löschen' }
      ],
      titleText: 'Bist du sicher, all deine Verläufe zu löschen?',
      cancelText: 'Abbrechen',
      cancel: function () {
        // add cancel code..
      },
      buttonClicked: function (index) {
        if (index === 0) {
          $scope.shopsCtrl.Histories = [];
          $scope.histories = $scope.shopsCtrl.Histories;
          return true;
        }
      }
    });
  }
});