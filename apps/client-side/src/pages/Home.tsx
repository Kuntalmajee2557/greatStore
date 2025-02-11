import { useNavigate } from 'react-router-dom';
import LogoIcon from '../Icons/Logo';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-900 via-teal-800 to-blue-700 text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full h-20 bg-black/20 border-b border-white/10 flex items-center justify-between px-10">
        <div className="flex items-center gap-3">
        <div className='text-white rotate-90'>
            <LogoIcon color1="#FF5733" color2="#4A90E2" size='32'/>
            </div>
            <p className=' font-medium text-4xl bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 text-transparent bg-clip-text'>GreateStore</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/signin')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-5">
        <h2 className="text-5xl font-bold mb-6">Welcome to GreateStore</h2>
        <p className="text-xl max-w-3xl mb-10">
          GreateStore is your ultimate personal assistant for saving and organizing your daily links. 
          Whether it’s videos, articles, images, or any other content, GreateStore helps you keep everything in one place, 
          easily accessible and beautifully organized.
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => navigate('/signin')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-medium"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
