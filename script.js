/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
/*particlesJS.load('particles-js', 'particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});*/

$(document).ready(function(){

  let repondu = 0;
  let questionNum = 0;
  let totalBonneReponse = 0;

  function bonneReponse(questionNum) {
    $('.rb'+questionNum).css({
      'display': 'block',
      'opacity': '1',
    });
    $('.rm'+questionNum).css('display', 'none');
    $('.q'+questionNum+' button').prop('disabled', true);
    totalBonneReponse++;
    repondu++;
    afficheScore();
    verifFini();
  }
  
  function mauvaiseReponse(questionNum) {
    $('.rm'+questionNum).css({
      'display': 'block',
      'opacity': '1'
    });
    $('.rb'+questionNum).css('display', 'none');
    $('.q'+questionNum+' button').prop('disabled', true);
    repondu++;
    afficheScore();
    verifFini();
  }

  function afficheScore(){
    $('.resultsActuel').css('opacity','1');
    $('.resultsActuel').text(`✔️ : ${totalBonneReponse}/7`);
  }

  function verifFini() {
    if (repondu < 6) {
      console.log(totalBonneReponse);
    }
    else {
      if (totalBonneReponse === 0){
        $('.msgFinal').text(`Vous avez eu ${totalBonneReponse} bonne réponse 📕, au moins vous avez dû apprendre des choses`);
      }
      else if (totalBonneReponse === 1){
        $('.msgFinal').text(`Vous avez eu ${totalBonneReponse} bonne réponse 📙, c'est mieux que 0 mais pas glorieux !`)
      }
      else if (totalBonneReponse > 1 && totalBonneReponse < 3){
        $('.msgFinal').text(`Vous avez eu ${totalBonneReponse} bonnes réponses 📒, c'est en dessous de la moyenne !`)
      }
      else if (totalBonneReponse >= 3 && totalBonneReponse < 4){
        $('.msgFinal').text(`Vous avez eu ${totalBonneReponse} bonnes réponses 📘, c'est pas mal !`)
      }
      else if (totalBonneReponse >= 5 && totalBonneReponse < 6){
        $('.msgFinal').text(`Vous avez eu ${totalBonneReponse} bonnes réponses 📘, c'est un très bon score !`)
      }
      else if (totalBonneReponse === 7){
        $('.msgFinal').text(`Vous avez eu ${totalBonneReponse} bonnes réponses 🏆, un sans faute ! 🎊 FÉLICITATIONS 🎊`)
      }
    }
  }

  function whichQuestion(question) {
    for (let i = 0; i<=7; i++) {
      if (question.hasClass(`${i}`)) {
        questionNum = i;
      }
    }
  }
  
  $('.q').click(function(){
    $(this).addClass('choix');
    whichQuestion($(this));
    console.log('question num :', questionNum);
    switch (questionNum) {
      case 1:
        $(this).text() === "Vol d'ordinateur portable" ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;
      case 2:
        $(this).text() === "C'est quand un pirate essaie de me soutirer des informations en essayant de me tromper" ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;
      case 3:
        $(this).text() === 'Mes informations de connexion' ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;
      case 4:
        $(this).text() === 'Utiliser des caracteres spéciaux' ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;
      case 5:
        $(this).text() === 'https://monsite.nc' ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;
      case 6:
      $(this).text() === 'Non' ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;  
      case 7:
        $(this).text() === 'Non'  ? bonneReponse(questionNum) : mauvaiseReponse(questionNum);
        break;
    }
  })

  let tabRegex = [/.{8,}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/, /.*[!@#\$%\^&\*]/];

  $("#password").on('input', function () {
    // appel fonction avec en paramètre la value de l'input
    testPassword($(this).val());
  });
  
  function testPassword(password) {
    let forceMdp = 0;                               // Pareil, mais en JQuery
    tabRegex.map(regex => {                           // $.map(tabRegex, function(regex){
      if (password.match(regex)) {                      // if(password.match(regex)) {
        forceMdp++;                                       // forceMdp++;
        console.log('forceMDP :', forceMdp);              // console.log('forceMDP :', forceMdp);
      }                                               // }
    });                                             // });
    messageForceMdp(forceMdp);
    console.log('end of line');
  }

  function messageForceMdp(forceMdp) {
    console.log('forceMdp reçu :', forceMdp);
    $('.messageMdp').css('opacity', '1');
    switch (forceMdp) {
      case 0:
        $('.messageMdp').text('💣 Avec 0 caractère, vous n\'irez pas loin ! DANGER 💣');
        break;
      case 1:
        $('.messageMdp').text('🚨 Votre message est court, mettez au moins 8 caractères 🚨');
        break;
      case 2:
        $('.messageMdp').text('⚠️ Votre message manque de complexité, ajoutez des majuscules par exemple ⚠️');
        break;
      case 3:
        $('.messageMdp').text('🚧 Pas mal, mais vous devriez encore l\'allonger ou rajouter des chiffres 🚧');
        break;
      case 4:
        $('.messageMdp').text('😊 C\'est bien, pensez juste à rajouter des caractères spéciaux 😊');
        break;
      case 5:
        $('.messageMdp').text('💪 Excellent ! Votre mot de passe est très bon 💪');
        break;
    }
  }
});