export default function(scanList=[], action ){
  if (action.type == "setScan") {

       return action.scans;
  }else{
    return scanList
  }
}
