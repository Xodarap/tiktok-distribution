/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

   // Custom

    var getPercentile = function(data, followers) {
        var ok = data.filter(x => x[1] <= followers);
        return ok[ok.length - 1];
    };

    var describePercentile = function(percentile) {
        switch(percentile % 10){
            case 1: return String(percentile) + 'st percentile';
            case 2: return String(percentile) + 'nd percentile';
            case 3: return String(percentile) + 'rd percentile';
            default: return String(percentile) + 'th percentile';
        }
    }

    var validateNumber = function(x) {
        if(isNaN(x) || x === '') {
            $('#followerError').show();
            $('#resultTextHolder').hide();
            return false;
        }
        $('#resultTextHolder').show();
        $('#followerError').hide();
        return true;
    }

    var safeLog = function(x) {
        if(x == 0) {
            return 0;
        }
        return Math.log10(x);
    }
    var updateText = function(percentile) {
        $('#resultPercentile').text(percentile);
    }
    var updateChart = function(followers = undefined) {        
        var percentiles = [[1, 0], [2, 0], [3, 1], [4, 1], [5, 1], [6, 2], [7, 2], [8, 3], [9, 3], [10, 3], [11, 4], [12, 5], [13, 5], [14, 6], [15, 6], [16, 7], [17, 7], [18, 8], [19, 8], [20, 9], [21, 9], [22, 10], [23, 11], [24, 12], [25, 14], [26, 15], [27, 16], [28, 18], [29, 19], [30, 20], [31, 22], [32, 23], [33, 25], [34, 26], [35, 30], [36, 31], [37, 32], [38, 34], [39, 37], [40, 41], [41, 44], [42, 47], [43, 48], [44, 53], [45, 55], [46, 58], [47, 62], [48, 69], [49, 75], [50, 79], [51, 84], [52, 88], [53, 96], [54, 107], [55, 126], [56, 138], [57, 165], [58, 171], [59, 189], [60, 200], [61, 216], [62, 228], [63, 238], [64, 264], [65, 287], [66, 309], [67, 354], [68, 382], [69, 413], [70, 458], [71, 553], [72, 579], [73, 625], [74, 748], [75, 862], [76, 931], [77, 1045], [78, 1105], [79, 1230], [80, 1493], [81, 1744], [82, 2046], [83, 2579], [84, 4306], [85, 5797], [86, 8277], [87, 11709], [88, 16221], [89, 18850], [90, 33510], [91, 47407], [92, 61181], [93, 81370], [94, 108864], [95, 133196], [96, 183623], [97, 318487], [98, 397433], [99, 479964]];
        var line = {
            x: percentiles.map(x => x[0]),
            y: percentiles.map(x => x[1]),
            fill: 'tozeroy',
            type: 'scatter'
        };
        var data = [line];
        var annotations = [];

        if(followers !== undefined) {
            if(!validateNumber(followers)) {
                return;
            }
            var p = getPercentile(percentiles, followers);
            annotations = [{
                x: p[0],
                y: p[1],
                xref: 'x',
                yref: 'y',
                text: describePercentile(p[0]),
                showarrow: true,
                arrowhead: 7,
                ax: 0,
                ay: -40
            }]            
            updateText(p[0]);
        }
        var layout = {
            showlegend: false,
            margin: {
                l: 0,
                r: 0,
                t: 0,
                b: 0,
                pad: 0
            },
            height: 250,
            width: 275,
            xaxis: {
                visible: true,
                title: 'Percentile',
                automargin: true,
                fixedrange: true
            },
            yaxis: {
                visible: true,
                title: 'Follower Count',
                //type: 'log',
                automargin: true,
                showline: false,
                fixedrange: true
            },
            annotations: annotations
        }
        var config = {
            displayModeBar: false,
            responsive: true
        }
        
        Plotly.newPlot('plotHolder', data, layout, config);
    };

    var doScroll = function() {
        var resultTop = $('#resultsHolder').offset().top - 50;
        if($(document).scrollTop() < resultTop) { return; }
        $('html, body').stop().animate({
            scrollTop: resultTop
        }, 250, 'easeInOutExpo');
    };

    updateChart();
    $('#followerCount').on('blur', function(){
        updateChart($(this).val())
    });
    $('#followerForm').submit(function(event){
        event.preventDefault();
        $('#followerCount').blur();
        doScroll();
    });

})(jQuery); // End of use strict
