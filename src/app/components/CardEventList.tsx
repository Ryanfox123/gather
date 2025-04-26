import Image from "next/image";
import React, { useState } from "react";

type Props = {
  event: {
    _id: string;
    title: string;
    location: string;
    description: string;
    date: string;
    startTime: string;
    attendees: string[];
    duration: number;
    imageUrl: string;
  };
};

function CardEventList({ event }: Props) {
  const [imgError, setImgError] = useState(false);
  return (
    <li>
      <div className="flex flex-row">
        <div>
          {!imgError ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={200}
              height={200}
              onError={() => setImgError(true)}
              className="rounded-lg"
            />
          ) : (
            <div className="h-[200px] w-[200px] flex items-center justify-center bg-emerald-800 rounded-lg text-gray-200 font-medium">
              {event.title}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-black">{event.title}</h3>
          <p className="text-black">{event.description}</p>
        </div>
      </div>
    </li>
  );
}

export default CardEventList;
