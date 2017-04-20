var express = require('express');
var router = express.Router();
var path = require('path');
var now = require('performance-now');
var bubble_sort = require('../On2/bubble_sort');
var selection_sort = require('../On2/selection_sort');
var insertion_sort = require('../On2/insertion_sort');

/* GET home page. */
router.get('/', function(req, res, next) {
    var round = Number(req.query['round']);

    if (req.query['bubble_total'] >= 15 || req.query['selection_total'] >= 15 || req.query['insertion_total'] >= 15) {
        //race is over
        res.render('On2results', {bubble_score: req.query['bubble_total'], selection_score: req.query['selection_total'], insertion_score: req.query['insertion_total']})
    }


    console.log('bubblescore');
    console.log(req.query['bubblescore']);
    var size = req.query['amount'];
    var numbers = [];

    while(numbers.length<(size)) {
        numbers[numbers.length] = Math.floor((Math.random()*size)+1); //Generates a random number over from 1 to the size selected
    }

    var bubble = {data: numbers.slice(), total: Number(req.query['bubble_total'])};
    var selection = {data: numbers.slice(), total: Number(req.query['selection_total'])};
    var insertion = {data: numbers.slice(), total: Number(req.query['insertion_total'])};

    console.log('bubble sort');
    console.log(bubble.data);
    var bstart = now();
    bubble = bubble_sort(bubble);
    var bend = now();
    bubble.time = bend-bstart;
    console.log(bubble.data);
    bubble.score = 3;

    console.log('selection sort');
    console.log(selection.data);
    var sstart = now();
    selection = selection_sort(selection);
    var send = now();
    selection.time = send - sstart;
    console.log(selection.data);

    if(selection.time<bubble.time) {
        selection.score = 3;
        bubble.score = 2;
    }
    else {
        selection.score = 2;
    }

    console.log('insertion sort');
    console.log(insertion.data);
    var istart = now();
    insertion = insertion_sort(insertion);
    var iend = now();
    insertion.time = iend-istart;
    console.log(insertion.data);

    if (insertion.time > selection.time && insertion.time > bubble.time) {
        insertion.score = 1;
    }
    else if (insertion.time < selection.time && insertion.time < bubble.time) {
        insertion.score = 3;
        bubble.score = bubble.score-1;
        selection.score = selection.score-1;
    }
    else if (insertion.time < selection.time && insertion.time > bubble.time) {
        insertion.score = selection.score;
        selection.score = selection.score-1;
    }
    else if (insertion.time > selection.time && insertion.time < bubble.time) {
        insertion.score = bubble.score;
        bubble.score = bubble.score-1;
    }

    bubble.total = bubble.total + bubble.score;
    selection.total = selection.total + selection.score;
    insertion.total = insertion.total + insertion.score;

    res.render('On2', { amount: req.query['amount'], round: round+1, bubble_score: bubble.total, selection_score: selection.total, insertion_score: insertion.total,
                        bubble_time: bubble.time, selection_time: selection.time, insertion_time: insertion.time});

});

module.exports = router;
