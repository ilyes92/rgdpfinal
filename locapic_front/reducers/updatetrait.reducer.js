export default function(traitements=[], action ){
  if (action.type == "updatetraitements") {

    //var copyUpdate  = [...traitements];
    //copyUpdate.push(action.traitements);
    var copyUpdate = traitements.concat(action.traitements);
    //console.log("REDUC TRAITEMENT",copyUpdate);

    return copyUpdate;
  } else if (action.type == "refreshTraitements") {
     return action.traitements;
  } else {
    return traitements;
  }
}
