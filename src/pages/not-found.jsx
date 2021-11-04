import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Instagram';
  }, []);

  return(
    <div className="bg-gray-background">
      <div className="mx-auth max-w-screen-lg">

        <p className="text-center text-2xl m-3">
          Whoops! How'd you get here? 
        </p>

        <p className="text-center text-4xl m-6">
          These aren't the droids you're looking for. Move along.
        </p>

      </div>
    </div>
  )
}