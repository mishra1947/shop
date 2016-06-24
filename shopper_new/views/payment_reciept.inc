<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title><?php echo $title;?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="../scripts/jspdf.min.js"></script>
        <script src="../scripts/jspdf.min.js"></script>
        <script src="../themes/js/jquery-1.7.2.min.js"></script>
    </head>
    <body>
        <div>
            <span><a href="http://shopper.com/" alt='Home page' title="Home page">Go to Home Page</a></span> &nbsp;
            <button id="cmd">Download Receipt</button>
        </div>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <div>date: <?php echo date("Y/m/d") ?></div>
        <div id='downloadReceipt'>
            <table>
                <thead>
                    <tr>
                        <th><h3>Payment Receipt</h3></th>
                    </tr>
                </thead>
                <tbody>	
                <tr>
                    <td><h4>Transaction time</h4></td>&nbsp;
                    <td><?php echo $time; ?></td>&nbsp;
                </tr>
                <tr>
                    <td><h4>Order No.</h4></td>&nbsp;
                <td><?php echo $item_no ?></td>&nbsp;
                </tr>
                <tr>
                <td><h4>PayPal transaction number</h4></td>&nbsp;
                <td><?php echo $transaction_id ?></td>&nbsp;
                </tr>
                <tr>
                <td><h4>Total</h4></td>&nbsp;
                <td>$<?php echo $item_price ?></td>&nbsp;
                </tr>
                <tr>
                    <td><h4>Paid to</h4></td>&nbsp;
                    <td>test facilitator's Test Store<br>
mishrasriniwas2­facilitator@gmail.com</td>&nbsp;
                </tr>
                </tbody>
            </table>
            <p style="color: orangered">
                We'll send a confirmation email to shivamcaet­buyer­1@gmail.com. This transaction will appear on your statement as
PayPal *TESTFACILIT.
            </p>
        </div>
        <div id="editor"></div>
    </body>
</html>
<script>
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#cmd').click(function () {
    doc.fromHTML($('#downloadReceipt').html(), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
    doc.save('Payment_receipt.pdf');
});
</script>
