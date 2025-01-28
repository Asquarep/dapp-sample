import { useState } from 'react'
import abi from './classworkAbi.json'
import {ethers} from 'ethers'
import { ToastContainer, toast } from 'react-toastify';

function Classwork() {

  const [userInput, setUserInput] = useState('')
  const [retrievedMessage, setRetrievedMessage] = useState('')
  const contractAddress = "0x17231475F1a270da478D8167EE5ca284409E4c33"

  async function getAccounts() {
    await window.ethereum.request({method:"eth_requestAccounts"})
  }

  async function withdraw() {
    if (typeof window.ethereum !== undefined){
      await getAccounts()

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer =  await provider.getSigner()
      const contract  = new ethers.Contract(contractAddress, abi, signer)
  
      try {
        const tx = await contract.withdraw(userInput)
        const receipt = tx.wait()
        toast('transaction successful');
        
      } catch(err){
        toast("Failed Transaction");
        
      }
    }

  }

  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      await getAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
     
    
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const tx = await contract.getMessage();
        setRetrievedMessage(tx)
        console.log("  Transaction successful", tx);
      } catch (error) {
        toast("fail  transaction", error);
      }
    }
  }


  return (
    <>
      <ToastContainer />
      <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type='text' placeholder='set your message' />
      <button onClick={()=> withdraw()}>Withdraw</button>
      <p></p>
      <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type='text' placeholder='set your message' />
      <button onClick={()=> getMessage()}>Get Message</button>
      <p></p>
      <button onClick={()=> getMessage()}>Get Balance</button>
      <p>Contract Balance Message: {retrievedMessage}</p>
    </>
  )
}

export default Classwork