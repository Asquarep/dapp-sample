import { useEffect, useState } from 'react'
import abi from '../ABIs/classwork_29012025.json'
import { ethers } from 'ethers'
import { ToastContainer, toast } from 'react-toastify';

function Classwork_29012025() {

    const [taskTitle, setTaskTitle] = useState('')
    const [taskText, setTaskText] = useState('')
    const [myTasks, setMyTasks] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)
    const contractAddress = "0xE359796e59423EA628DE2F13b24b868b4771c117"

    async function getAccounts() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    }

    useEffect(() => {
        getMyTask()
    }, [])

    async function createTask() {
        if (typeof window.ethereum !== undefined) {
            await getAccounts()

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)

            try {
                const tx = await contract.addTask(taskText, taskTitle, isDeleted)
                const receipt = tx.wait()
                toast.success('Transaction successful');

            } catch (err) {
                toast.error(`Failed Transaction: ${err}`);

            }
        }

    }

    async function deleteTask(_id) {
        if (typeof window.ethereum !== undefined) {
            await getAccounts()

            const provider = new ethers.BrowserProvider(window.ethereum)
            // const signer = await provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, provider)

            try {
                const tx = await contract.deleteTask(_id)
                const receipt = tx.wait()
                toast.success('Transaction successful');

            } catch (err) {
                toast.error(`Failed Transaction: ${err}`);

            }
        }

    }


    async function getMyTask() {
        if (typeof window.ethereum !== "undefined") {

            await getAccounts();

            const provider = new ethers.BrowserProvider(window.ethereum);

            const contract = new ethers.Contract(contractAddress, abi, provider);
            try {
                const tx = await contract.getMyTask();
                console.log("TX: ", tx);

                setMyTasks(tx)
                toast.success("Transaction successful", tx);
            } catch (error) {
                toast.error(`Failed Transaction: ${error}`);
            }
        }
    }


    return (
        <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"flex-start"}}>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor:"lightblue", width:"500px", height:"500px", borderRadius:"5px", boxShadow:"5px 5px grey" }}>
            <div>
                <ToastContainer />

                <div>
                    <div>
                        <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} type='text' placeholder='Task Title' />
                    </div>
                    <div>
                        <input value={taskText} onChange={(e) => setTaskText(e.target.value)} type='text' placeholder='Task Text' />
                    </div>
                    <div>
                        <input value={isDeleted} onChange={() => setIsDeleted(!isDeleted)} type='checkbox' placeholder='is deleted' />
                    </div>
                </div>
                <button onClick={() => createTask()}>Create task</button>
                <p></p>
                <button onClick={() => getMyTask()}>Get My Tasks</button>
                {/* <p>Contract Balance: {retrievedMessage}</p> */}
                {myTasks.length > 0 &&
                    <div>
                        {myTasks.map((each) => (
                            <div>
                                <p>{each}</p>
                                <button onClick={() => deleteTask(each.id)}>Create task</button>
                            </div>
                        ))}
                    </div>}
            </div>
        </div>
        </div>
    )
}

export default Classwork_29012025