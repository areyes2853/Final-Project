import React from 'react';
import { Calendar } from "@/components/ui/calendar";
 
 export default function AboutPage() {
   return (
     <div className='bg-white top-7 flex flex-col items-center justify-center'>
       <h1>Hello about</h1>
       <div className='top-7 flex flex-col items-center justify-center'>
         <Calendar />
         </div>
       
     </div>
   );
 }
 
 // Drop this file in /pages/hello.js to route to /hello