/**
 * Created by Mark on 4/15/17.
 */
module.exports = function(insertion) {
    size = insertion.data.length;
    var temp;
    for (i = 1; i<size; i++) {
        temp = insertion.data[i];
        for (j = i-1; j >= 0 && insertion.data[j] > temp; j--) {
            insertion.data[j + 1] = insertion.data[j];
        }
        insertion.data[j + 1] = temp;
    }
    return insertion;
}