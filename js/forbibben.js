function forbiddenkey(a) {
    var b = a.toString().split("");
    var all = "4524";
    for (let i = 0; i < b.length; i++) {
        var c = b[i];
        if (c == 1) {
            c = 4
        } else if (c == 2) {
            c = 1
        } else if (c == 3) {
            c = 5
        } else if (c == 4) {
            c = 6
        } else if (c == 5) {
            c = 2
        }else if (c == 6) {
            c = 4
        }else if (c == 7) {
            c = 3
        }else if (c == "d") {
            c = 9
        }else if (c == "c") {
            c = 8
        }else {
            c = 4;
        }
        all = all + c +"45814524";
    }
    return all;

}