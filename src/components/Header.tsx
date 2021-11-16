import { MenuIcon } from '@heroicons/react/outline'
import { auth, provider } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
const Header = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const signIn = (e: any) => {
        e.preventDefault()
        auth.signInWithPopup(provider).then(() => navigate("/channels")).catch((error) => alert(error.message))
    }

    return (
        <header className='bg-discord_blue flex items-center justify-between py-4 px-6'>
            <a href="/">
                <img src='https://pbs.twimg.com/media/E1re3XUX0AkPAvk.jpg' alt='' className='w-32 h-12 object-contain' />
            </a>
            <div className="hidden text-white lg:flex space-x-6">
                <a className='link'>Download</a>
                <a className='link'>Why Duscord</a>
                <a className='link'>Nitro</a>
                <a className='link'>Safety</a>
                <a className='link'>Support</a>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={!user ? signIn : () => navigate('/channels')}
                    className='rounded-full text-xs bg-white md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium'>
                    {!user ? "Login" : "Open Discord"}
                </button>
                <MenuIcon className='h-9 text-white cursor-pointer lg:hidden' />
            </div>
        </header>
    )
}

export default Header
