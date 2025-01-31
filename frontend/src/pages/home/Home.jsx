import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/Animegreen.json';
import Footer from '../../components/Footer';
import Cardai from '../../components/Cardai';
const Home = () => {
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
      <div className="flex items-center justify-center gap-8 p-4">
      <div className="ml-28 mt-5">
      <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    <div>
      <h1 className="text-5xl  font-mono font-bold">Welcome to <span className="text-[#52cc99]">Mental Health</span> <span className="text-orange-400">Pro</span></h1>
      <p className="text-2xl  font-mono font-semibold grid grid-cols-1 mt-5 text-[#208a5e]">Your mental health is our priority. Explore our resources and tools to help you manage your mental well-being.</p>
      
    </div>
    </div>
    <div>
      <Cardai />
    </div>
    <Footer />
    </div>
  )
}

export default Home