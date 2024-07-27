import React from 'react';
import { Quiz, StarsCanvas } from '..';

export default function HelpToQuiz() {
  return (
   <div className="relative z-0 bg-primary">
          <div className="relative z-0">
            <Quiz/>
            <StarsCanvas/>
          </div>
    </div>
  )
}