import React from 'react'
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../../config/thirdwebconfig";



const verification = () => {  const { mutate: sendTransaction } = useSendTransaction();

  return (
    <div>
    </div>
  )
}

export default verification