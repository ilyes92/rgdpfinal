var express = require('express');
var router = express.Router();
const request = require('request');
const fileUpload = require('express-fileupload');
router.use(fileUpload());
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dz64uwlpf',
  api_key: '843937583176376',
  api_secret: '3_XjrhexYCVbVpQz-0nS_Pmb5EE'
});

var mongoose= require('mongoose');
var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://admin:toto12toto@ds063889.mlab.com:63889/rgpd',
    options,
    function(err) {
     console.log(err);
    });

////////////////////// collection donneesmap : contient les données à matcher
var DonneemappingSchema = mongoose.Schema({donneemap: String, catmap: String, sensible: String})
var DonneemappingModel = mongoose.model('donneesmapping', DonneemappingSchema);

// route pour ajouter une donnée avec la catégories
router.post('/add-donneemapping', function(req, res, next) {
console.log(req.body);
      var newdonnemapping = new DonneemappingModel ({
        donneemap: req.body.donneemap,
        catmap: req.body.catmap,
        sensible: req.body.sensible
      });
      newdonnemapping.save(
          function (error, datas) {
    });
});


///////////////// ajout traitement depuis formulaire
//modele et schéma traitement simple
var DonneesTraitementSchema = mongoose.Schema({donnee:[]})
var DonneesTraitementModel = mongoose.model('donneestraitement', DonneesTraitementSchema);

var TraitementSchema = mongoose.Schema({ traitement: String, objectif: String, activite: String, dureetraitement: String, donnees: [DonneesTraitementSchema], status:String })
var TraitementModel = mongoose.model('traitement', TraitementSchema);

//route en post /sigin
router.post('/add-traitement', function(req, res, next) {
  console.log(req.body);

  var traitement = new TraitementModel({
  traitement: req.body.traitement,
  objectif: req.body.objectif,
  activite: req.body.activite,
  status:"Enregistré"
  });

traitement.save(function(error, datas){
  console.log("retour de l'envoi du nouveau traitement en bdd",datas);
res.json(datas);
})
});


////////////////////////// route pour ajouter des données d'un traitements
//var donneesTraitementSchema = mongoose.Schema({ idtraitement: String, donnee: [] })

router.post('/add-donneestraitement', function(req, res, next) {

console.log("tableau envoyé au back à ajouter en bdd pour ce traitement : ",req.body.donnes);
//console.log("tableau[0] données à ajouter en bdd pour ce traitement :",req.body.donnes[0]);
var donneesValides = JSON.parse(req.body.donnes)
console.log("tableau parsé avant insertion bdd données pour ce traitement : ",donneesValides);
//console.log(donneesValides[0]);

TraitementModel.findOne({
   _id:req.body.idtraitement
 },function(error, traitement) {

         traitement.donnees.push({donnee:donneesValides});
             traitement.save(function(error, datas){
              console.log("données reçues de mlab après insertion données pour ce traitement : ",datas);
              res.json(datas);
            });
      })
});

////////////// route récupération des traitements pour affichagedans liste des TraitementS
// route en get  /signin
router.get('/traitements', function(req, res, next)  {
  TraitementModel.find(
      function(error, traitements) {
        console.log('TRAITEMENTS BDD',traitements);
        res.json(traitements);
  });
})

///////////////////// route depuis un nouveau traitement + scan
router.get('/traitement', function(req, res, next)  {
  console.log('traitement',req.query);
  TraitementModel.find(
    {
      _id:req.query.id
    },
      function(error, traitement) {
        console.log('bdd traitement retour',traitement);

        res.json(traitement);
  });
})
//// route suppression traitements
///////////////////// route depuis un nouveau traitement + scan
router.get('/delete-traitement', function(req, res, next)  {
  console.log('traitement',req.query);
  TraitementModel.deleteOne(
    {
      _id:req.query.id
    },
      function(error, traitement) {

        console.log('bdd traitement retour',traitement);
        TraitementModel.find(
            function(error, traitements) {
              console.log('TRAITEMENTS BDD',traitements);
              res.json(traitements);
        });

  });
})

//////////////////// route maj traitement

//// route MAJ traitements
///////////////////// route depuis un nouveau traitement + scan
router.get('/update-traitement', function(req, res, next)  {
  console.log('traitement',req.query);
  TraitementModel.updateOne(
    {
      _id:req.query.id

    },

      {
        status:"Validé"
      },
      function(error, traitement) {

        console.log('bdd traitement retour',traitement);
        TraitementModel.find(
            function(error, traitements) {
              console.log('TRAITEMENTS BDD',traitements);
              res.json(traitements);
        });

  });
})
/////////////// route depuis la liste mestraitements


router.get('/ficheTraitement', function(req, res, next)  {
  console.log('traitement',req.query);
  TraitementModel.find(
    {
      _id:req.query.id
    },
      function(error, traitement) {
        console.log('bdd traitement retour',traitement);

        res.json(traitement);
  });
})

////////////////////////////////////
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ///////////////////////////////////////////// UTILISATION API MICROSOFT AZURE
var i = 0;


router.post('/upload', function(req, res) {

// FILEPATH DYNAMIC >> DRY (don't repeat yourself! Aka Thierry!)
let photoPath = `public/images/nomImageAChoisir-${i}.jpg`;

i++;
  //recup l'image depuis le front
let filename = req.files.photo;

// envoyer l'image dans le dossier publi/images en mettant le nom et le format de l'image
 filename.mv(photoPath, function(err) {
   if (err){
     return res.status(500).send(err);
   }
   cloudinary.v2.uploader.upload(photoPath,
    function(error, result){
      console.log(result);
      if(result){
        var coincide=[];
        var mapping=[];
///// API AZURE
        const subscriptionKey = '5ef4b09295c445ea9ee389b1a7e02eb3';
        const uriBase = 'https://westeurope.api.cognitive.microsoft.com/vision/v1.0/ocr';
        const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};
        const options = {
            uri: uriBase,
            qs: params,
            body: '{"url": ' + '"' + result.url + '"}',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key' : subscriptionKey
            }
        };

request.post(options, (error, response, body) => {
  if (error) {
    console.log("voici l'erreur: ", error);
    return;
  }
  //// si pas d'erreur récupération de la réponse parsée en json dans jsonresponse
  let jsonResponse =JSON.parse(body);

  //console.log('JSON Response\n');
  //console.log(jsonResponse);

  // boucle dans la réponse pour isoler les mots trouvés par l'api azure et construction d'un tableau mapping

    for(var i=0;i<jsonResponse.regions.length;i++){
      for(var j=0;j<jsonResponse.regions[i].lines.length;j++){
        for (var k=0;k<jsonResponse.regions[i].lines[j].words.length; k++) {
          mapping.push(jsonResponse.regions[i].lines[j].words[k].text);
  }
  }
  }

// utilisation du modele pour récupérer les mots à comparer de la collection DonneemappingModel et stockage dans le tableau datas
  DonneemappingModel.find(function(error, datas)
    {
       console.log(mapping);
       console.log(datas);

       // Avec une boucle on parcourt les deux tableaux

    for (var i = 0; i < mapping.length; i++) {
      for (var j = 0; j < datas.length; j++) {

        // A chaque pas si le mot trouvé dans le retour de l'api est identique à celui du tableau comparatif en bdd et s'il n'est pas déjà présent dans le tableau coincide.....
          if ((mapping[i]==datas[j].donneemap)&&(coincide.includes(datas[j].donneemap)==false)){

            /// alors on le met dans le tableau coincide
              coincide.push(datas[j].donneemap);
        }
       }
    }
        console.log("mots qui apparaissent en commun sont ",coincide);
        // on renvoi le tableaau coincide
          res.json({coincide});
      });
    });

      } else if (error) {
        res.send(error);
      }
      });
    });
 });

router.get('/displayPicture', function(req, res, next) {
  pictureModel.find(function(err, picture){
    console.log("PHOTO RECUP",picture);
    res.json(picture)
  })
});


module.exports = router;
