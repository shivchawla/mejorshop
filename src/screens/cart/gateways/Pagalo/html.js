// export default `
// <!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> <link href='https://fonts.googleapis.com/css?family=Jost:400,300,100' rel='stylesheet' type='text/css'> <style>*{box-sizing:border-box}body,html{height:100%;min-height:100%}body{margin:0;background-color:#ddd;font-family:'Jost',sans-serif}input::-webkit-input-placeholder {color:#777;font-weight:400;}input,select,button{font-family:'Jost',sans-serif; font-weight:400 !important;}.credit-card{width:360px;height:400px;margin:60px auto 0;border:1px solid #ddd;border-radius:6px;background-color:#fff;box-shadow:1px 2px 3px 0 rgba(0,0,0,.1)}.form-header{height:60px;padding:20px 30px 0;border-bottom:1px solid #e1e8ee}.form-body{height:340px;padding:30px 30px 20px}.title{margin:0;color:#5e6977;font-size:18px}.card-number,.cvv-input input,.month select,.paypal-btn,.proceed-btn,.year select{height:42px}.card-number,.cvv-input input,.month select,.year select{font-size:14px;line-height:14px}.card-number,.cvv-details,.cvv-input input,.month select,.year select{color:#000;opacity:1.0}.card-number{width:100%;margin-bottom:20px;padding-left:20px;border:2px solid #e1e8ee;border-radius:6px}.month select,.year select{-moz-appearance:none;-webkit-appearance:none;width:145px;margin-bottom:20px;padding-left:20px;border:2px solid #e1e8ee;border-radius:6px;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNiYmIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==) no-repeat;background-position:85% 50%}.month select{float:left}.year select{float:right}.cvv-input input{width:145px;float:left;padding-left:20px;border:2px solid #e1e8ee;border-radius:6px;background:#fff}.cvv-details{float:right;margin-bottom:20px;font-size:14px;font-weight:300;line-height:16px}.cvv-details p{margin-top:6px}.paypal-btn,.proceed-btn{cursor:pointer;width:100%;border-color:transparent;border-radius:6px;font-size:16px}.proceed-btn{margin-bottom:10px;background:#23282d}.paypal-btn a,.proceed-btn a{text-decoration:none;cursor:pointer}.proceed-btn a{color:#fff}.paypal-btn a{color:rgba(242,242,242,.7)}.paypal-btn{padding-right:95px;background:url(paypal-logo.svg) no-repeat 65% 56% #009cde}</style> <script type="text/javascript" src="https://s3.amazonaws.com/documentacionpagalo/archivos/cybs_devicefingerprint.js"></script></head><body> <form class="credit-card" id="checkoutFormPagalo"> <div class="form-body"> <input type="hidden" id="fingerprintId" name="deviceFingerprintID" value=""> <input type="text" class="card-number" id="nameCard" autocomplete="off" placeholder="Nombre en la Tarjeta" value=""/> <input type="text" class="card-number" placeholder="Número de Tarjeta" id="ccNo" maxlength="16"> <div class="date-field"> <div class="month"> <select name="Month" id="expMonth"> <option value="">Mes</option><option value="01">Enero</option><option value="02">Febrero</option><option value="03">Marzo</option><option value="04">Abril</option><option value="05">Mayo</option><option value="06">Junio</option><option value="07">Julio</option><option value="08">Agosto</option><option value="09">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option> </select> </div><div class="year"> <select name="Year" id="expYear"> <option value="">Año</option> <option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option> </select> </div></div><div class="card-verification"> <div class="cvv-input"> <input type="text" placeholder="CVV" id="cvv" maxlength="4"> </div><div class="cvv-details"> <p>Código de 3 o 4 números situado en el reverso de la tarjeta</p></div></div><button type="submit" class="proceed-btn" id="place_order"><a href="#">Finalizar Pago</a></button> </div></form> <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script> <script>document.getElementById('fingerprintId').value=cybs_dfprofiler("visanetgt_jupiter","test"); </script> <script type="text/javascript">var formName="checkoutFormPagalo"; $('#' + formName).on("click", function(){$('#place_order').unbind('click'); $('#place_order').click(function(e){e.preventDefault(); sendRequest();});}); function sendRequest(data){$('#place_order').unbind('click'); $('#place_order').click(function(e){return true;}); $('#place_order').click(); clearPaymentFields();}function clearPaymentFields(){$('#nameCard').val(''); $('#ccNo').val(''); $('#cvv').val(''); $('#expMonth').val(''); $('#expYear').val('');}</script></body></html>
// `;

export default getHtML = (buttonText, processingDisplay, errorMessage) => `
  <!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <!-- Styles -->
  <link href='https://fonts.googleapis.com/css?family=Jost:400,300,100' rel='stylesheet' type='text/css'>
  <style>
    *{box-sizing:border-box}body,html{height:100%;min-height:100%}body{margin:0;background-color:#ddd;font-family:'Jost',sans-serif}input::-webkit-input-placeholder {color:#777;font-weight:400;}input,select,button{font-family:'Jost',sans-serif; font-weight:400 !important;}.credit-card{width:360px;height:420px;margin:60px auto 0;border:1px solid #ddd;border-radius:6px;background-color:#fff;box-shadow:1px 2px 3px 0 rgba(0,0,0,.1)}.form-header{height:60px;padding:20px 30px 0;border-bottom:1px solid #e1e8ee}.form-body{height:340px;padding:30px 30px 20px}.title{margin:0;color:#5e6977;font-size:18px}.card-number,.cvv-input input,.month select,.paypal-btn,.proceed-btn,.year select{height:42px}.card-number,.cvv-input input,.month select,.year select{font-size:14px;line-height:14px}.card-number,.cvv-details,.cvv-input input,.month select,.year select{color:#000;opacity:1.0}.card-number{width:100%;margin-bottom:20px;padding-left:20px;border:2px solid #e1e8ee;border-radius:6px}.month select,.year select{-moz-appearance:none;-webkit-appearance:none;width:145px;margin-bottom:20px;padding-left:20px;border:2px solid #e1e8ee;border-radius:6px;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiNiYmIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==) no-repeat;background-position:85% 50%}.month select{float:left}.year select{float:right}.cvv-input input{width:145px;float:left;padding-left:20px;border:2px solid #e1e8ee;border-radius:6px;background:#fff}.cvv-details{float:right;margin-bottom:20px;font-size:14px;font-weight:300;line-height:16px}.cvv-details p{margin-top:6px}.paypal-btn,.proceed-btn{cursor:pointer;width:100%;border-color:transparent;border-radius:6px;font-size:16px}.proceed-btn{margin-bottom:10px;background:#23282d}.paypal-btn a,.proceed-btn a{text-decoration:none;cursor:pointer}.proceed-btn a{color:#fff}.paypal-btn a{color:rgba(242,242,242,.7)}.paypal-btn{padding-right:95px;background:url(paypal-logo.svg) no-repeat 65% 56% #009cde}
  </style> 

   <style>
     body{overflow-y: hidden;}
    .overlay-spinner {
      position: absolute;
      height: 100%;
      width: 100%;
      background: #ddd; opacity: .6;
      z-index: 1000;
      margin-top: -60px;
    }
    .spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  top: 20%;
  
  -webkit-animation: sk-rotate 2.0s infinite linear;
  animation: sk-rotate 2.0s infinite linear;
}

.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #b97a34;
  border-radius: 100%;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
  </style>    
            
    <script type="text/javascript" src="https://s3.amazonaws.com/documentacionpagalo/archivos/cybs_devicefingerprint.js"></script>
</head>

<body>
    <form class="credit-card" id="checkoutFormPagalo">
      <div class="overlay-spinner" style="display: ${processingDisplay}">
          <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
          </div>
      </div>

      <div class="form-body">
        <div class="card-error" style="
            color: crimson;
            margin-bottom: 10px;
            text-align: center;
        ">${errorMessage}</div>
        <input type="hidden" id="fingerprintId" name="deviceFingerprintID" value="">

        <!--Card Name -->
        <input required type="text" class="card-number" id="nameCard" name="nameCard" autocomplete="off" placeholder="Nombre en la Tarjeta" value="" />

        <!-- Card Number -->
        <input required type="text" inputmode="numeric" pattern="[0-9]*" class="card-number" id="ccNo" name="ccNo" placeholder="Número de Tarjeta"  maxlength="19">

        <!-- Date Field -->
        <div class="date-field">
          <div class="month">
            <select name="expMonth" id="expMonth" required>
              <option value="">Mes</option><option value="01">Enero</option><option value="02">Febrero</option><option value="03">Marzo</option><option value="04">Abril</option><option value="05">Mayo</option><option value="06">Junio</option><option value="07">Julio</option><option value="08">Agosto</option><option value="09">Septiembre</option><option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option>
            </select>  

          </div>
          <div class="year">
            <select name="expYear" id="expYear" required>
              <option value="">Año</option>
              <option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option>
            </select>
          </div>
        </div>

        <!-- Card Verification Field -->
        <div class="card-verification">
          <div class="cvv-input">
            <input required type="text" inputmode="numeric" pattern="[0-9]*" placeholder="CVV" id="cvv" name="cvv" maxlength="4">
          </div>
          <div class="cvv-details">
            <p>Código de 3 o 4 números situado en el reverso de la tarjeta</p>
          </div>
        </div>

        <!-- Buttons -->
        <button type="submit" class="proceed-btn" id="place_order"><a href="#">${buttonText}</a></button>
      </div>
    </form>

    <div style="text-align: center; margin-top: 50px">
      <img style="width: 100px;" src="https://staging.mejorshop.com/wp-content/uploads/2020/08/pagalo_org.png">
    </div>

    <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>

    <script> 
    document.getElementById('fingerprintId').value = cybs_dfprofiler("visanetgt_jupiter","test");
    </script>

    <script type="text/javascript">
      $('#place_order').click(function(e) {
          e.preventDefault();
          var form = $('#checkoutFormPagalo');
          window.ReactNativeWebView.postMessage(form.serialize());
          form.trigger("reset");
          return false;
      });

      $('#nameCard').focus(function(e) {
        $('.card-error').hide();
      });

      $('#checkoutFormPagalo').submit(function(e) {
        e.preventDefault();
        return false;
      }) 

      // $('#ccNo').on('keypress change', function () {
      //   $(this).val(function (index, value) {
      //     return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
      //   });
      // });

      $('#ccNo').on('keypress change', function () {
        $(this).val(function (index, value) {
          return value.replace(/[^0-9]/g, "").replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        });
      });


    </script>

</body>

</html>
`;