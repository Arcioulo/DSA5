module.exports = function (quick, pivot_pos) {
    return sort(quick.data, pivot_pos);
}

function sort(arr, pivot_pos) {
    // console.log('data');
    // console.log(arr);
    if (arr.length === 0) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];


    if (pivot_pos === 1) {
        pivot_pos = Math.floor(arr.length/2);
        // console.log('index');
        // console.log(pivot_pos);
        pivot = arr[pivot_pos];
    }
    // console.log('pivot is');
    // console.log(pivot);


//go through each element in array
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === pivot) {
            continue;
        }
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // console.log('left of pivot')
    // console.log(left);
    // console.log('right of pivot')
    // console.log(right);

    return sort(left, pivot_pos).concat(pivot, sort(right, pivot_pos));
}
