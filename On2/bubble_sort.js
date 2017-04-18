/**
 * Created by Mark on 4/15/17.
 */
module.exports = function(bubble) {
    size = bubble.data.length;
    for (i = 0; i<size-1; i++) {
        for (j = size-1; j>i; j--) {
            if (bubble.data[j]<bubble.data[j-1]) {
                var temp = bubble.data[j];
                bubble.data[j] = bubble.data[j-1];
                bubble.data[j-1] = temp;
            }
        }
    }
    return bubble;
}