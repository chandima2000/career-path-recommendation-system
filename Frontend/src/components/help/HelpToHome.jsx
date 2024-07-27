import React from 'react';
import { Home, StarsCanvas } from '..';

export default function HelpToHome() {
  return (
   <div className="relative z-0 bg-primary">
          <div className="relative z-0">
            <Home/>
            <StarsCanvas/>
          </div>
    </div>
  )
}
