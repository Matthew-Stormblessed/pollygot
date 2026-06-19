'use client'
import Image from "next/image";
import { useState, useRef, useEffect  } from 'react'

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null);

    useEffect(() => {
    // Smoothly scroll to the hidden element at the bottom
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleChange = (event) => {
    setText(event.target.value);
  };

   const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      Translate();
    }
  };

  async function Translate(){
    try{
    setMessages(prev => [...prev, {owner: 1, message: text}]);
    const payload = {
      language: selectedLanguage,
      text: text
    }
    
    const response = await fetch("http://localhost:3001/api/translate", {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    setMessages(prev => [...prev, {owner: 0, message: data.response}])
  }
    catch(e){
      console.error(e);
      setMessages(prev => [...prev, {owner: 0, message: "Whoops I guess something went wrong."}])
    }
  }


  return (
    <main className="flex flex-col justify-center items-center h-[100vh]">
      <header className="flex justify-center items-center bg-[#0D182E] w-[390px] h-[213px]">

        <Image className="z-10" src="/parrot.png" width={94} height={84} alt="parrot picture" />
        <div className="z-10">
        <h1 className="font-extrabold text-[43.42px] leading-[150%] tracking-normal text-[#32CD32]">PollyGlot</h1>
        <h2 className="font-semibold text-[12.21px] leading-[150%] tracking-normal">Perfect Translation Every Time</h2>
        </div>
      </header>
      <section className="flex justify-center items-center bg-white w-[390px] h-full">
        <div className=" flex flex-col border-4 border-[#252F42] w-full h-[505px] m-3.5 pt-[44px] pr-6 pl-6 rounded-2xl">
          
          <div className="overflow-y-auto flex flex-col scroll-smooth scrollbar-none">
            <div className="w-[313px] h-[108px] bg-[#035A9D] p-3.5 font-semibold text-[20px] leading-[130%] tracking-normal rounded-2xl">
            Select the language you want me to translate into, type your text and hit send!
          </div>
            {messages.map((m, index) => <div key={index} className={`w-[313px] h-auto mt-5 ${m.owner === 0 ? "bg-[#035A9D]" : "bg-green-500"}  p-3.5 font-semibold text-[20px] leading-[130%] tracking-normal rounded-2xl`}>
            {m.message}
            <div ref={bottomRef}> </div>
          </div>)}
          </div>
          <div className="mt-5"></div>
          <div className="bg-[#F5F5F5] w-[313px] min-h-[67px] h-fit border-2 border-[#586E88] rounded-2xl mt-auto mb-3.5 flex">
          <textarea onKeyDown={handleKeyDown} content={text} onChange={handleChange} className=" mr-1 w-90 pl-3 resize-none font-semibold text-[20px] leading-[150%] tracking-normal text-[#333333] focus:outline-none scrollbar-none field-sizing-content"></textarea>
          <svg onClick={() => {
            Translate();
            }} className="ml-auto mr-4 mt-4 w-10" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.7981 12.6604L1.26603 24.0547L24.0547 12.6604L1.26603 1.26605L3.7981 12.6604ZM3.7981 12.6604L13.9264 12.6604" stroke="#32CD32" strokeWidth="2.53207" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          </div>
          <div className="flex justify-center gap-10 mb-4 mt-1">
          <Image alt="french flag" className={`border-3 ${selectedLanguage === 0 ? 'border-blue-700' : ''}`} onClick={() => setSelectedLanguage(0)} src="/frenchflag.png" width={50} height={33} />
          <Image alt="spanish flag" className={`border-3 ${selectedLanguage === 1 ? 'border-blue-700' : ''}`} onClick={() => setSelectedLanguage(1)} src="/spanishflag.png" width={50} height={33} />
          <Image alt="japan flag" className={`border-3 ${selectedLanguage === 2 ? 'border-blue-700' : 'border-[#999999]'}`} onClick={() => setSelectedLanguage(2)} src="/japanflag.png" width={50} height={33} />
          </div>
        </div>

      </section>
    </main>
  );
}
