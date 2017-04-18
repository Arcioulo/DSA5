var express = require('express');
var router = express.Router();
var path = require('path');
var now = require('performance-now');
var merge_sort = require('../On2/merge_sort');
var quicksort = require('../On2/quicksort');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query['quickmid_total']);
    var round = Number(req.query['round']);

    if (req.query['merge_total'] >= 15 || req.query['quickfront_total'] >= 15 || req.query['quickmid_total'] >= 15) {
        //race is over
        res.render('Onlognresults', {merge_score: req.query['merge_total'], quickfront_score: req.query['quickfront_total'], quickmid_score: req.query['quickmid_total']});
    }


    //console.log('mergescore');
    //console.log(req.query['mergescore']);
    var size = req.query['amount'];
    var numbers = [];

    while(numbers.length<(size/100)) {
        numbers[numbers.length] = Math.floor((Math.random()*(size/10))+1); //Generates a random number over from 1 to the size selected
    }

    var merge = {data: numbers.slice(), total: Number(req.query['merge_total'])};
    var quickfront = {data: numbers.slice(), total: Number(req.query['quickfront_total'])};
    var quickmid = {data: numbers.slice(), total: Number(req.query['quickmid_total'])};

    // console.log('merge sort');
    // console.log(merge.data);
    var mstart = now();
    merge.data = merge_sort(merge);
    var mend = now();
    merge.time = mend-mstart;
    console.log(merge.data);
    console.log(merge.time);
    merge.score = 3;

    console.log('quickfront sort');
    console.log(quickfront.data);
    var qfstart = now();
    quickfront.data = quicksort(quickfront, 0);
    var qfend = now();
    quickfront.time = qfend - qfstart;
    console.log(quickfront.time);
    console.log(quickfront.data);

    if(quickfront.time<merge.time) {
        quickfront.score = 3;
        merge.score = 2;
    }
    else {
        quickfront.score = 2;
    }

    console.log('quickmid sort');
    console.log(quickmid.data);
    var qmstart = now();
    quickmid.data = quicksort(quickmid, 1);
    var qmend = now();
    quickmid.time = qmend-qmstart;
    console.log(quickmid.data);

    if (quickmid.time > quickfront.time && quickmid.time > merge.time) {
        quickmid.score = 1;
    }
    else if (quickmid.time < quickfront.time && quickmid.time < merge.time) {
        quickmid.score = 3;
        merge.score = merge.score-1;
        quickfront.score = quickfront.score-1;
    }
    else if (quickmid.time < quickfront.time && quickmid.time > merge.time) {
        quickmid.score = quickfront.score;
        quickfront.score = quickfront.score-1;
    }
    else if (quickmid.time > quickfront.time && quickmid.time < merge.time) {
        quickmid.score = merge.score;
        merge.score = merge.score-1;
    }

    merge.total = merge.total + merge.score;
    quickfront.total = quickfront.total + quickfront.score;
    quickmid.total = quickmid.total + quickmid.score;

    res.render('Onlogn', { amount: req.query['amount'], round: round+1, merge_score: merge.total, quickfront_score: quickfront.total, quickmid_score: quickmid.total,
        merge_time: merge.time, quickfront_time: quickfront.time, quickmid_time: quickmid.time});

});

module.exports = router;
