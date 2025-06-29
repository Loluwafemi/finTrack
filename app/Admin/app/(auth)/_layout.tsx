import { User } from "@/lib/auth";
import { getRoute } from "@/src/constants/routes";
import { Slot, router } from "expo-router";
import React from "react";

export default function AuthRootLayout() {

  const [status, setStatus] = React.useState(false)
  React.useEffect(()=>{
    const getSession = async () => {
      try {
        const response = await User.isAlive()
        
        if (response.status) {            
            setStatus(true)
            return router.navigate(getRoute('DASHBOARD'));
        }else{
          setStatus(false)
        }
      } catch (error) {
        setStatus(false)
      }
    };
    getSession();
  }, [])


  return <Slot />;
}
