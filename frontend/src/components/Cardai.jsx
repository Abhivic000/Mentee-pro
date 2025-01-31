import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../assets/botai.json';
import { useNavigate } from 'react-router-dom';

const Cardai = () => {
  const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
  return (
    <div>
        <div className="flex m-auto bg-[#ecfff7] rounded-3xl p-4 w-[90%] items-center shadow-lg">
          <div className="ml-5">
            <h1 className="text-2xl font-semibold">Hi, I'm Ana your AI mental wellness companion</h1>
            <h1 className="grid grid-cols-1">I'm here to listen, offer resources, and provide support. While I'm not a substitute for professional help, I can assist with self-reflection, stress management, and finding information.</h1>
            <button
            onClick={() => navigate('/anachat')}
            className="bg-[#357158] p-2 px-4 text-white rounded-3xl mt-4 ml-2 hover:bg-[#86fbca]"
          >
            Use Now
          </button>
          </div>
            <div className="mr-14">
            <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            
        </div>
    </div>
  )
}

export default Cardai