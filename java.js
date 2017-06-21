// Ugh, globals go here
var author = "";
var quote = "";
var colorPallet = ["#EFD0CA","#93A3B1","#B8D8BA","#A3B4A2","#CDC6AE"];
//---------------------
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function parseQuote(data){
  if(data.hasOwnProperty("quoteAuthor")){
    if(data.quoteAuthor != "" && data.quoteAuthor != " "){
        $("#author").html("- " + data.quoteAuthor);
        author = "- " + data.quoteAuthor;
       }else{
         $("#author").html("- Unknown");
         author = "- Unknown"
      }
   } 
  if(data.hasOwnProperty("quoteText")){
     $("#quote").html("\"" + data.quoteText + "\"");
    quote = data.quoteText;
   }
   $("#tweet").attr("href","https://twitter.com/intent/tweet?text=" + "\"" + quote + "\"" + " " + author);
}

function getQuote(parseCallback){
  var apiUrl = "https://api.forismatic.com/api/1.0/?jsonp=?";
  $.getJSON(apiUrl,{method: 'getQuote', lang:'en', format:'jsonp'},function(data){
    parseCallback(data);
  }).fail(function(e){
    $("#quote").html("Unable to reach quote server. :\(");
    console.log(e.statusText);
  });
}

$(document).ready(function(){
  getQuote(parseQuote);
  var qCont = $("#quoteContainer");
  
  qCont.hide().fadeIn(700);
  $("#generateQuote").click(function(){
    $("body").css('background', colorPallet[getRandomInt(0,colorPallet.length)]);
    qCont.fadeOut(700, function(){
      getQuote(parseQuote);
      qCont.fadeIn(700);
    });

      
  });
 
});

