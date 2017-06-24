/**
 * Created by pco2699 on 2017/06/24.
 */

var pprn_org = {
    "3/13": 27,
    "3/14": 5,
    "3/15": 32,
    "3/16": 45,
    "3/17": 6,
    "3/21": 56,
    "3/22": 64,
    "3/23": 55,
    "3/24": 23,
    "3/27": 70,
    "3/28": 75,
    "3/29": 60,
    "3/30": 81,
    "3/31": 78,
    "4/4": 75,
    "4/6": 87,
    "4/7": 88,
    "4/10": 90,
    "4/11": 95,
    "4/12": 50,
    "4/13": 100,
    "4/14": 75,
    "4/18": 90,
    "4/19": 100,
    "4/20": 88,
    "4/24": 96,
    "4/25": 105,
    "4/26": 85,
    "4/27": 105,
    "4/28": 111,
    "5/1": 107,
    "5/8": 105,
    "5/10": 117,
    "5/11": 110,
    "5/12": 116,
    "5/15": 118,
    "5/17": 87,
    "5/18": 125,
    "5/19": 107,
    "5/22": 141,
    "5/23": 140,
    "5/25": 138,
    "5/26": 150,
    "5/31": 160,
    "6/1": 187,
    "6/2": 214
};

$(function () {
    var pprn;
    // localStorageにpprnがあったらそれを変数に入れる
    if(localStorage.getItem("pprn")){
        pprn = JSON.parse(localStorage.getItem("pprn"));
    }
    // 無かったら↑のpprn_orgで日付を設定しlocalstorageに格納
    else{
        var pprn_json = JSON.stringify(pprn_org);
        localStorage.setItem("pprn", pprn_json);
        pprn = pprn_org;
    }


    draw(pprn);
    function draw(pprn) {
        var data = {
            labels: [],
            datasets: [
                {
                    label: "紳さんぺペロン日和",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: []
                }
            ]
        };
        Object.keys(pprn).forEach(function (key) {
            data.labels.push(key);
            data.datasets[0].data.push(pprn[key]);
        });
        var ctx = $("#lineChart")[0].getContext('2d');
        var options = {
            scaleOverride: true,
            scaleSteps: 16,
            scaleStepWidth: 10,
            scaleStartValue: 0,
            scaleLabel: "<%=value%> 点",
            showTooltips: true,
        };
        new Chart(ctx).Line(data, options);
    }

    $("#setBtn").on("click", function () {
        var date = $("#date").val();
        var score = $("#score").val();
        pprn[date] = score;

        // updateしたpprn情報を格納
        localStorage.setItem("pprn", JSON.stringify(pprn_org));

        draw(pprn);
    });

    // 日付を入力する際にカレンダーを表示させる
    $("#date").datepicker();


    // 点数入力箇所は数字以外NGにする
    $('#score').on('keydown', function (e) {
        var k = e.keyCode;
        // 0～9, テンキ―0～9, スペース, backspace, delete, →, ←, ,. 以外は入力キャンセル
        if (!((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k == 32 || k == 8 || k == 46 || k == 39 || k == 37 || k == 190)) {
            return false;
        }
    });

});


