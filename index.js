$(function () {
    var vals = ['야간', '비번', '휴무', '연가']
    // $('input').on('keydown', function () {
    //     if (vals.indexOf($(this).val()) > -1) {
    //         // 있다면, 3개가 모두 있는지 확인
    //         console.log('keyup');
    //         var thisid = $(this).attr('id');
    //         var andid = '';
    //         var lastid = '';
    //         // console.log(thisclass)
    //         // ㅣ열 == > [0] 사람  || ㅡ행 ==> ==[1]   일
    //         var id_splited = thisid.split('_');
    //         var id_person = id_splited[0];
    //         var id_date = id_splited[1]
            
    //         var threeval = 0;
    //         threeval = switch_it(id_date, id_person)
    //         console.log('t_val : ' + threeval)
    //         if (threeval) { make_temp(id_person); }
    //     }
    // })

    // $('input').keyup(function (e) { if (e.keyCode == 13) alert('Enter'); });
    $('input').keyup(function (e) { if (e.keyCode == 13) {
            if (vals.indexOf($(this).val()) > -1) {
                // 있다면, 3개가 모두 있는지 확인
                console.log('keyup');
                var thisid = $(this).attr('id');
                var thisval = $(this).val();
                // console.log(thisclass)
                // ㅣ열 == > [0] 사람  || ㅡ행 ==> ==[1]   일
                var id_splited = thisid.split('_');
                var id_person = id_splited[0];
                var id_date = id_splited[1]
                
                var threeval = 0;
                var si_result = switch_it(id_date, id_person, thisval)
                threeval = si_result[0]
                s_result = si_result[1]
                console.log('t_val : ' + threeval)
                if (threeval && s_result) { make_temp(id_person, s_result); }
            }
    } });

});
function switch_it(id_date, id_person, thisval) {
    switch (id_date) {
        case '1':
        console.log('case');
            andid = $('input#' + id_person +'_2').val();
            lastid = $('input#' + id_person +'_3').val();
            thisval = thisval;
            threeval = judge_val(andid, lastid);
            var s_result = logic_3rd( thisval, andid, lastid )

            console.log('1 : ' + thisval)
            console.log('2 : ' + andid)
            console.log('3 : ' + lastid)
        case '2':
        console.log('case');
            andid = $('input#' + id_person +'_1').val();
            lastid = $('input#' + id_person +'_3').val();
            thisval = thisval;
            threeval = judge_val(andid, lastid);
            var s_result = logic_3rd( andid, thisval, lastid )

            console.log('1 : ' + thisval)
            console.log('2 : ' + andid)
            console.log('3 : ' + lastid)
        case '3':
        console.log('case');
            andid = $('input#' + id_person +'_1').val();
            lastid = $('input#' + id_person +'_2').val();
            thisval = thisval;
            threeval = judge_val(andid, lastid);
            var s_result = logic_3rd( andid, lastid, thisval )

            console.log('1 : ' + thisval)
            console.log('2 : ' + andid)
            console.log('3 : ' + lastid)
    }
    
    var si_list = [threeval, s_result];
    console.log('si_list : ' + si_list)
    return si_list;
}
function judge_val(v1, v2) {
    if ( v1 && v2 ) {
        return 1;
    } else {
        return 0;
    }
}

function make_temp(ip, sr) {
    var shift = ['야간1', '비번1', '야간2', '비번2', '휴무1', '휴무2'];
    var startline = sr;
    var temp = '';
    for (var i=4; i<32;i++) {
        var num = startline % 6;
        console.log('======================')
        console.log(startline)
        console.log('======================')
        var tem =  '<tr>\
                        <td>'+i+'</td>\
                        <td><input type="text" id="'+ip+'_'+i+'" value="'+shift[num]+'">\
                    </tr>';
        temp += tem;
        startline += 1;
    }
    $('tbody').append(temp)
}

function logic_3rd( fi, se, th) {
    var f = fi;
    var s = se;
    var t = th;
    var start = '';
    var error = 0;
    // val() 야간, 비번, 휴무 일 경우
    // 로직이 비틀렸을때, alert
    if ( f == '야간' ) {
        if ( s = '비번' ) {
            if ( t == '야간' ) {
                start = 3;
            } else if ( t == '휴무' ) {
                start = 5;
            } else { error = error_it(); }
        } else { error = error_it(); }
    } else if (f == '비번' ) {
        if ( s == '야간' ) {
            if ( t == '비번' ) {
                start = 4;
            } else { error = error_it(); }
        } else if ( s == '휴무' ) {
            if ( t == '휴무' ) {
                start = 0;
            } else { error = error_it(); }
        } else { error = error_it(); }
    } else if ( f == '휴무' ) {
        if ( s == '휴무' ) {
            if ( t == '야간' ) {
                start = 1;
            } else { error = error_it(); }
        } else if ( s == '야간' ) {
            if ( t == '비번' ) {
                start = 2;
            } else { error = error_it(); }
        } else { error = error_it(); }
    } else { error = error_it(); }

    if (!error) {
        return start;
    } else {
        return false;
    }
}

function error_it() {
    alert('error!_!');
    return 0;
}