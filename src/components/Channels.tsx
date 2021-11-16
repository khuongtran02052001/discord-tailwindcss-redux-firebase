import { HashtagIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setChannelInfo } from '../features/channelSlice'

const Channels = ({ id, channelName }: any | unknown) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const setChannel = () => {
        dispatch(setChannelInfo({
            channelName: channelName,
            channelId: id
        }))
        navigate(`/channels/${id}`)
    }

    return (
        <div
            onClick={setChannel}
            className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 rounded-md  hover:text-white"
        >
            <HashtagIcon className="h-5 mr-2" />
            <span className='truncate w-32'>{channelName}</span>
        </div>
    )
}

export default Channels
