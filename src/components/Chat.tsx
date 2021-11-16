import { EmojiHappyIcon, GiftIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { BellIcon, ChatIcon, HashtagIcon, InboxIcon, QuestionMarkCircleIcon, SearchIcon, UsersIcon } from '@heroicons/react/solid'
import { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChanneName } from '../features/channelSlice'
import { auth, db } from '../firebase'
import firebase from 'firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'

const Chat = () => {
    const channelName = useSelector(selectChanneName);
    const channelId = useSelector(selectChannelId);
    const [user] = useAuthState(auth)
    const chatRef = useRef(null)
    const [message] = useCollection(channelId &&
        db
            .collection('channels')
            .doc(channelId)
            .collection('message')
            .orderBy('timestamp', 'asc'))

    const inputref = useRef(null)
    // SCROLL BOTTOM
    const scrollToBottom = () => {
        (chatRef as any).current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    console.log(message)
    const sendMessage = (e: any) => {
        e.preventDefault()

        if ((inputref as any).current.value !== "") {
            db.collection('channels').doc(channelId).collection('message').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: (inputref as any).current.value,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email
            })
        }
        (inputref as any).current.value = '';
        scrollToBottom();
    }


    return (
        <div className="flex flex-col h-screen">
            <header className='flex items-center border-b border-gray-800 justify-between p-4 -mt-1 space-x-5'>
                <div className="flex items-center space-x-1">
                    <HashtagIcon className='h-6 text-[#72767d]' />
                    <h4 className='text-white font-semibold'>
                        {channelName}
                    </h4>
                </div>
                <div className="flex space-x-3">
                    <BellIcon className='icon' />
                    <ChatIcon className='icon' />
                    <UsersIcon className='icon' />
                    <div className="flex bg-[#202225] text-xs p-1 rounded-md">
                        <input type="text" placeholder="Search" className='bg-transparent focus:outline-none text-white pl-1 placeholder-[#72767d]' />
                        <SearchIcon className='h-4 text-[#72767d] mr-1' />
                    </div>
                    <InboxIcon className='icon' />
                    <QuestionMarkCircleIcon className='icon' />
                </div>
            </header>

            <main className='flex-grow overflow-y-scroll scrollbar-hide'>
                {message?.docs.map((ms) => {
                    const { message, timestamp, name, photoURL, email } = ms.data()
                    return <Message 
                    key={ms.id} 
                    id={ms.id} 
                    message={message} 
                    timestamp={timestamp} 
                    name={name} photoURL={photoURL} 
                    email={email} />
                })}
                <div ref={chatRef} className='pb-16' />
            </main>

            <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
                <PlusCircleIcon className='icon mr-4' />
                <form onClick={sendMessage} className='flex flex-grow'>
                    <input type="text" disabled={!channelId} placeholder={channelId ? `Message #${channelName}` : "Select a channel"}
                        className='bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm'
                        ref={inputref}
                    />
                    <button hidden type='submit' onClick={sendMessage}>Send</button>
                    <GiftIcon className='icon mr-2' />
                    <EmojiHappyIcon className='icon' />
                </form>
            </div>
        </div>
    )
}

export default Chat
