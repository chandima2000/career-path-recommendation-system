import React from 'react';
import { SignIn, StarsCanvas } from '..';


export default function HelpToSignIn() {
  return (
    <div className="relative z-0 bg-primary">
          <div className="relative z-0">
            <SignIn/>
            <StarsCanvas/>
          </div>
    </div>
  )
}
