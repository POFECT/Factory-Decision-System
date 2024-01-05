import { useEffect } from "react";
import TestApi from "src/api/Test";

const hello = ()=>{
//  const { data: session } = useSession();
  useEffect(()=>{
      TestApi.TestApi((response)=>{console.log(response)})
  })
  
  return <div></div>
}
export default hello;