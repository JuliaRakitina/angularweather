/**
 * Created by julia on 10/8/16.
 */
'use strict';
app.filter('DegToDir', function() {
    return function(degrees) {
        var d = parseFloat(degrees);
        var direction;
        //------MIN----------MAX-------------------------
        if (d <= 16.87 &&  d >=0){direction = 'N';}
        if (d <= 360 &&  d >=354.38){direction = 'N';}
        if (d >=16.88 &&  d <= 39.37){direction = 'NNE';}
        if (d >=39.38 &&  d <= 61.87){direction = 'NE';}
        if (d >=61.88 &&  d <= 84.37){direction = 'ENE';}
        if (d >=84.38 &&  d <= 106.87){direction = 'E';}
        if (d >=106.88 &&  d <=129.37){direction = 'ESE';}
        if (d >=129.38 &&  d <= 151.87){direction = 'SE';}
        if (d >=151.88 &&  d <= 174.37){direction = 'SSE';}
        if (d >=174.38 &&  d <= 196.87){direction = 'S';}
        if (d >=196.88 &&  d <= 219.37){direction = 'SSW';}
        if (d >=219.38 &&  d <= 241.87){direction = 'SW';}
        if (d >=241.88 &&  d <= 264.37){direction = 'WSW';}
        if (d >=264.38 &&  d <= 286.87){direction = 'W';}
        if (d >=286.88 &&  d <= 309.37){direction = 'WNW';}
        if (d >=309.38 &&  d <= 331.87){direction = 'NW';}
        if (d >=331.88 &&  d <= 354.37){direction = 'NNW';}

        return direction;
    };
});
