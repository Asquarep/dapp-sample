import { useState } from 'react'
import './App.css'
import abi from './abi.json'
import { ethers } from 'ethers'

function App() {

  const [userInput, setUserInput] = useState('')
  const [retrievedMessage, setRetrievedMessage] = useState('')
  const contractAddress = "0x32871De03345ECfba742e1BC163E66C2903F7640"

  async function getAccounts() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  async function setMessage() {
    if (typeof window.ethereum !== undefined) {
      await getAccounts()

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)

      try {
        const tx = await contract.setMessage(userInput)
        const receipt = tx.wait()
        console.log('transaction successful', receipt);

      } catch (err) {
        console.log("Failed Transaction", err);

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
        console.log("fail  transaction", error);
      }
    }
  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type='text' placeholder='set your message' />
        <button onClick={() => setMessage()}>Set Message</button>
        <button onClick={() => getMessage()}>Get Message</button>
        <p>Retrieved Message: {retrievedMessage}</p>
      </div>
    </div>
  )
}

export default App