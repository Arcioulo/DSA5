module.exports = function(merge) {
    //console.log('inside function');
    //console.log(split(merge.data));
    return split(merge.data);

};

function split(arr)
{
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    // console.log('left');
    // console.log(left);
    // console.log('right');
    // console.log(right);

    return merge(split(left), split(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    // console.log('result');
    // console.log(result);

    return result;
}