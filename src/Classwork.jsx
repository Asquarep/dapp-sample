import { useState } from 'react'
import abi from './classworkAbi.json'
import { ethers } from 'ethers'
import { ToastContainer, toast } from 'react-toastify';

function Classwork() {

    const [userInput, setUserInput] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const [retrievedMessage, setRetrievedMessage] = useState('')
    const contractAddress = "0x17231475F1a270da478D8167EE5ca284409E4c33"

    async function getAccounts() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    }

    async function withdraw() {
        if (typeof window.ethereum !== undefined) {
            await getAccounts()

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)

            try {
                const tx = await contract.withdraw(userInput)
                const receipt = tx.wait()
                toast('Transaction successful');

            } catch (err) {
                toast("Failed Transaction");

            }
        }

    }

    async function Deposit() {
        if (typeof window.ethereum !== undefined) {
            await getAccounts()

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)

            try {
                const tx = await contract.deposit(userInput2)
                const receipt = tx.wait()
                toast('Transaction successful');

            } catch (err) {
                toast("Failed Transaction");

            }
        }

    }


    async function getBalance() {
        if (typeof window.ethereum !== "undefined") {
            await getAccounts();

            const provider = new ethers.BrowserProvider(window.ethereum);


            const contract = new ethers.Contract(contractAddress, abi, provider);
            try {
                const tx = await contract.getBalance();
                console.log(tx);
                
                setRetrievedMessage(tx)
                toast.success("Transaction successful", tx);
            } catch (error) {
                console.log(" error", error);
                toast.error("Transaction Failed", error);
            }
        }
    }


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <ToastContainer />
                <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type='text' placeholder='set your message' />
                <button onClick={() => withdraw()}>Withdraw</button>
                <p></p>
                <input value={userInput2} onChange={(e) => setUserInput2(e.target.value)} type='text' placeholder='set your message' />
                <button onClick={() => Deposit()}>Deposit</button>
                <p></p>
                <button onClick={() => getBalance()}>Get Balance</button>
                <p>Contract Balance: {retrievedMessage}</p>
            </div>
        </div>
    )
}

export default Classwork