require('./array-where.js');

function isValorNaoNulo(obj) {
    return obj && obj !== "null" && obj !== "undefined";
}

//function to select specific attributes that will be used
// params: 
//        feed > feed de notícias retornado 
function filtrarAtributos(feed) {
    var jObj;
    var jTxt;
    var jFeedsTxt = "[ ";

    for (var i = 0; i < feed.length; i++) {

        console.log('Item [' + i + ']');
        //console.log(feed[i]);
        
        //jObj = JSON.parse(feed[i]); // data is already an object. No need to parse it. The javascript interpreter has already parsed
        jObj = feed[i];

        console.log('\njObj: \n');
        console.log(jObj);

        jTxt = '{ "title": "' + (isValorNaoNulo(jObj.title) ? jObj.title : '')
                + '", "description": "' + (isValorNaoNulo(jObj.description) ? jObj.description : '')
                + '", "date": "' + (isValorNaoNulo(jObj.date) ? jObj.date : '')
                + '", "link": "' + (isValorNaoNulo(jObj.link) ? jObj.link : '')
                + '", "author": "' + (isValorNaoNulo(jObj.author) ? jObj.author : '')
                + '", "language": "' + (isValorNaoNulo(jObj.meta.language) ? jObj.meta.language : '')
                + '", "categories": "' + (isValorNaoNulo(jObj.meta.categories) ? jObj.meta.categories : '') 
                + '" }';
        console.log('\njTxt: \n');
        console.log(jTxt);

        jFeedsTxt += jTxt;

        if ((i + 1) != feed.length)
            jFeedsTxt += ',';
    }

    jFeedsTxt += " ]"

    //console.log('\njFeedsTxt: \n');
    //console.log(jFeedsTxt);

    return JSON.parse(jFeedsTxt);
    //return jFeedsTxt;
}

function filtrarFeed(data, filtro)
{
  
  //console.log(res_teste);
  var feedFiltrado = filtrarAtributos(data);

  // query 'like%' : RegExp("^not", "i")
  // query '%like%' : RegExp("not", "i")
  // query '%like' : RegExp("not$", "i")
  // query first 10 : => res.length <= 9
  
  if (isValorNaoNulo(filtro.title))
    feedFiltrado = feedFiltrado.where("( el, i, res, param) => param.test( el.title ) ", RegExp(filtro.title, "i"));

  if (isValorNaoNulo(filtro.author))
    feedFiltrado = feedFiltrado.where("( el, i, res, param) => param.test( el.author ) ", RegExp(filtro.author, "i"));

  if (isValorNaoNulo(filtro.categories))
    feedFiltrado = feedFiltrado.where("( el, i, res, param) => param.test( el.categories ) ", RegExp(filtro.categories, "i"));

  console.log('\nJSON Filtrado. Total: ' + feedFiltrado.length);
  console.log(JSON.stringify(feedFiltrado, 0, 4)); 

  return feedFiltrado;

}