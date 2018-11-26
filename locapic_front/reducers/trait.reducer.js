export default function(trait='', action ){
  if (action.type == "traitScan") {
    console.log("REDUCER TRAIT");
       return action.trait;
  }else{
    return trait;
  }
}
