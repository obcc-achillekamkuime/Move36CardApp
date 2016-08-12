app.directive('shopStatus', function($interval) {
        return {
            restrict: 'A',
            scope: {
                shoppingTime: '=time'
            },
            link: function(scope, element, attrs) {
                var date = new Date(); //oeffnungszeit_tag
                var timeNow = date.toLocaleTimeString();
                var timeNowHour = timeNow.split(":")[0];
                //console.log(timeNowHour)
                function setOpenTime() {
                    //console.log(scope.shoppingTime)
                    if(scope.shoppingTime.oeffnungszeit_tag !== undefined){
                        //console.log(scope.shoppingTime.oeffnungszeit_tag)
                        var openTimeArr = scope.shoppingTime.oeffnungszeit_tag.split(" ");
                        var openTimeLastHour = openTimeArr[openTimeArr.length-1].split(":")[0];

                        if(timeNowHour - openTimeLastHour < 0){
                            //console.log("open!!!");
                        }else{
                            element.addClass("close");
                            element.text("close")
                        }
                        //console.log("Last item ", openTimeArr[openTimeArr.length-1]);
                    }
                }

                setOpenTime();

                $interval(setOpenTime, 60000);
            }
        };
});