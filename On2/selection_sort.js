/**
 * Created by Mark on 4/15/17.
 */
module.exports = function(selection) {
    size = selection.data.length;
    var swapIndex;
    var swapValue;
    for (i = 0; i<size-1; i++) {
        swapIndex = i;
        swapValue = selection.data[i];
        for (j = i+1; j<size; j++) {
            if (selection.data[j]<swapValue) {
                swapValue = selection.data[j];
                swapIndex = j;
            }
        }
        selection.data[swapIndex] = selection.data[i];
        selection.data[i] = swapValue;
    }
    return selection;
}