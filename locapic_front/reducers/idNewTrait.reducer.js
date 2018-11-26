export default function(idNewTrait='', action ){
  if (action.type == "idNewTrait") {
    console.log("ID NEW TRAIT", action.idNewTrait);
       return action.idNewTrait;
  }else{
    return idNewTrait
  }
}
