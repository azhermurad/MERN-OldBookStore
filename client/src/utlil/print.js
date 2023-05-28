const print = () => {
    var WinPrint = window.open(
        'a',
        'a',
        'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
    );
    WinPrint.document.write('<h1 style="color:blue;">print</h1>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
};
