import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import { Navigate } from 'react-router-dom'
import ServerIcon from './ServerIcon'
import { ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline'
import Channels from './Channels'
import Chat from './Chat'

const Home = () => {
    const [user] = useAuthState(auth)
    const [channels] = useCollection(db.collection("channels"))

    const handleAddChannels = () => {
        const channelName = prompt('New Channels')

        if (channelName) {
            db.collection("channels").add({
                channelName: channelName,
            })
        }
    }

    return (
        <>
            {!user && <Navigate replace to='/' />}
            <div className="flex h-screen">
                <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
                    <div className="server-default hover:bg-discord_purple">
                        <img
                            className='h-5'
                            src="https://rb.gy/kuaslg" alt="" />
                    </div>
                    <hr className=" border-gray-700 border w-8 mx-auto" />
                    <ServerIcon image="https://rb.gy/qidcpp" />
                    <ServerIcon image="https://rb.gy/zxo0lz" />
                    <ServerIcon image="https://rb.gy/qidcpp" />
                    <ServerIcon image="https://rb.gy/zxo0lz" /> 
                    <div className="server-default hover:divide-discord_green group">
                        <PlusIcon className='text-discord_green h-7 group-hover:text-white' />
                    </div>
                </div>
                <div className="bg-discord_channelsBg flex flex-col min-w-max">
                    <h2 className='flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer'>Official Server...<ChevronDownIcon className='h-5 ml-2' />
                    </h2>
                    <div className="text-discord_channel flex-grow overflow-y-scroll scrollbar-hide">
                        <div className="flex items-center p-2 mb-2">
                            <ChevronDownIcon className='h-3 mr-2' />
                            <h4 className='font-semibold'>Channels</h4>
                            <PlusIcon
                                onClick={handleAddChannels}
                                className='h-3 ml-auto cursor-pointer hover:text-white' />
                        </div>
                        <div className="flex flex-col px-2 mb-4">
                            {channels?.docs.map((doc) => (
                                <Channels key={doc.id} id={doc.id} channelName={doc.data().channelName} />
                            ))}
                        </div>
                    </div>
                    <div className="bg-discord_userBg p-2 flex justify-between items-center space-x-8">
                        <div className="flex items-center space-x-1">
                            <img
                                onClick={() => auth.signOut()}
                                className='h-9 rounded-full '
                                src={(user as any)?.photoURL}
                            />
                            <h4 className='text-white text-xs font-medium'>
                                {user?.displayName}
                                <span className='block text-discord_userSectionText'>#{user?.uid.substring(0, 4)}</span>
                            </h4>
                        </div>
                        <div className="text-gray-400 flex items-center ">
                            <div className="hover:bg-discord_iconHover rounded-md">
                                <MicrophoneIcon className='h-5 hover:text-#dcddde' />
                            </div>

                            <div className="hover:bg-discord_iconHover rounded-md">
                                <PhoneIcon className='h-5 hover:text-#dcddde' />
                            </div>

                            <div className="hover:bg-discord_iconHover rounded-md">
                                <CogIcon className='h-5 hover:text-#dcddde' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-discord_chatBg flex-grow">
                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Home
