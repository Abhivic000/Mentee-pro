import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Depimg from "../../assets/boydep.jpg";

const mentalHealthConditions = [
  {
    name: "Depression",
    image: Depimg,
    description:
      "Depression is a common but serious mood disorder that affects how a person feels, thinks, and handles daily activities. It causes persistent sadness and a loss of interest in activities once enjoyed. Treatment often includes therapy and medications.",
  },
  {
    name: "Anxiety",
    image: Depimg,
    description:
      "Anxiety is characterized by excessive worry or fear about everyday situations. It can manifest as physical symptoms like a racing heart, sweating, or trembling. Anxiety disorders can be managed with therapy, medication, and lifestyle changes.",
  },
  {
    name: "Bipolar Disorder",
    image: Depimg,
    description:
      "Bipolar disorder involves extreme mood swings, including emotional highs (mania or hypomania) and lows (depression). These mood changes can affect sleep, energy, behavior, and judgment, but with proper treatment, individuals can manage the condition effectively.",
  },
  {
    name: "PTSD",
    image: Depimg,
    description:
      "Post-Traumatic Stress Disorder (PTSD) occurs after experiencing or witnessing a traumatic event. Individuals may relive the traumatic event through flashbacks or nightmares and may feel emotionally numb or detached. Therapy and support groups are vital in managing PTSD.",
  },
  {
    name: "OCD",
    image: Depimg,
    description:
      "Obsessive-Compulsive Disorder (OCD) involves recurring, unwanted thoughts (obsessions) and repetitive behaviors (compulsions) that individuals feel driven to perform. While challenging, OCD can be managed with therapy and medication, particularly cognitive-behavioral therapy.",
  },
  {
    name: "Schizophrenia",
    image: Depimg,
    description:
      "Schizophrenia is a severe mental illness that affects thinking, emotions, and behavior. People with schizophrenia may experience delusions, hallucinations, and disorganized thoughts. Medication and therapy can help individuals lead fulfilling lives despite the condition.",
  },
];

const MentalHealthAwareness = () => {
  
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-[#52cc99] mb-6">
        Mental Health Awareness
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentalHealthConditions.map((condition, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 transition-transform 
                      min-h-[280px] flex flex-col justify-between"
          >
            <img
              src={condition.image}
              alt={condition.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {condition.name}
              </h2>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="p-2 rounded-full bg-[#52cc99] text-white"
              >
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "h-[150px]" : "h-0"
              }`}
            >
              <div className="mt-2 p-3 bg-gray-100 rounded-lg h-[150px] overflow-y-auto">
                <p className="text-gray-700">{condition.description}</p>
                <button
                  onClick={() => navigate('/anachat')}
                  className="mt-3 bg-[#52cc99] text-white px-4 py-2 rounded-lg hover:bg-[#3aa87b] transition"
                >
                  Know More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthAwareness;
