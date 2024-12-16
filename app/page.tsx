"use client";
import React from "react";
import { title} from "@/app/components/primitives";
import { Student } from "@/service/student.service";
import NewStudentSignupPopup from "@/app/student/new-student-signup-popup";
import GuideLoginPopup from "@/app/guide/login-popup";
import TypeWrite from "./Typewriteeffect";
import GuideList from "./components/guideList";
import StandardImageList from "./components/imageLsit";
import FeaturesSection from "./components/featuresection";
import Footer from "./components/footer";
import { useRouter } from "next/navigation";
import Navbar from "./components/nav";

export default function Home() {

  const router = useRouter();
  
  const handleSave = (student: Student) => {
    console.log("Trying to save: ", student);
  };

 
   
  return (
      <>
      <div className="absolute inset-0">
      <Navbar/>
      </div>
        <section 
        id="home-section"
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" 
             style={{ 
                     minHeight: '700px' 
                    }}>
                     
            <div
                 className="absolute inset-0 w-full h-full"
             style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(" https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149151738.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706313600&semt=ais")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                   }}
            ></div>
             <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
               <h1 className={title()}>Empower Your</h1>
               <br />
              <h1 className={title()}>Software Development Skills</h1>
               <br />
              <h1 className={title()}>with <span className={title({ color: "violet" })}>Guidely!!!</span>
              </h1>
              <br />
            <TypeWrite/>
            
          </div>
    
          <div className="flex gap-3">
            <NewStudentSignupPopup onSave={handleSave}/>
            <GuideLoginPopup onSave={undefined}/>
          </div>

        </section>

       <section 
      
       className="absolute inset-x-0 mt-1 bg-gradient-to-br from-gray-800 via-black to-violet-900" id="features-section" style={{ paddingTop: '72px' }}>

        
       <div className="text-3xl font-bold my-8 text-left  text-center mb-10" >
        <div className="m-16">
           
          <h1 className="mt-20">
          <img src="/images/21.png" alt="Icon" className="inline-block mr-4 h-14 w-14"/>
            Top<span className={title({ color: "yellow",size:"sm" })}>  Features</span> 
          </h1>

        </div> 
 
        <div className='flex items-center justify-center h-full text-lg text- leading-relaxed  '>
          <h2 className='text-xl'>
            "Find out why our platform is the preferred choice for IT projects. 
             With expert guides, diverse technologies,<br/> and a supportive community, 
             we provide the tools you need to succeed."
          </h2>
         </div>
        </div>
      
       
        <FeaturesSection/>
      <section id="mentors-section" className="relative z-10"  style={{ paddingTop: '18px' }}>

        <div>
        <div className="text-3xl font-bold my-8 text-left mb-10 text-center ">
        <div className="m-16">

          <h1 className="mt-20">
          <img src="/images/20.png" alt="Icon" className="inline-block mr-4 h-14 w-14" />
            Explore <span className={title({ color: "yellow",size:"sm" })}>1,000 +</span> Available Mentors
          </h1>

        </div>
        <div className='text-lg text- leading-relaxed '>

          <h2 className='text-xl text-center m-2'>
          "Our mentors are experts in a wide array of programming languages and frameworks, 
          ensuring you get the best guidance<br/>  for your projects. Explore the technologies 
          our mentors specialize in and find the perfect match to elevate your coding<br/>  skills 
          and project outcomes. Select a mentor who excels in your chosen technology and start
           building with confidence."
          </h2>

        </div>
        </div>
        
        <GuideList /> 
        
       
        </div>

        
        </section>
        <div>

 

      <div className=" bottom-20 " id="technologies-section"   style={{ paddingTop: '72px' }}>
       <div className="text-3xl font-bold my-8  text-center mt-20" >  
       <div className='text-4xl font-bold text-center mb-10'>

          
         <h1>
         <img src="/images/19.png" alt="Icon" className="inline-block mr-4 h-14 w-14" />  
           Technologies Our<span className={title({ color: "yellow", size: "sm" })}> Mentors</span> Excel In
         </h1>

       </div> 
       <div className=' p-6 rounded-lg shadow-lg'>
       <div className='text-lg text- leading-relaxed'>

        <h2 className='text-xl text-center '>
          "Our mentors are experts in a wide array of programming languages and frameworks,
           ensuring you get the best guidance<br/>  for your projects. Explore the technologies our 
           mentors specialize in and find the perfect match to elevate your<br/>  coding skills and 
           project outcomes. Select a mentor who excels in your chosen technology and start 
           building with confidence."
        </h2>

     </div>
     </div>
     </div>
     <div className="mb-10">
        <StandardImageList/>
     </div>
      </div>
      </div>
     
       <Footer/> 
     
      </section>
      </>
  );
}
