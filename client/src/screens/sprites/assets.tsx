const HangFrame = () => {
  return (
    <>
      <rect
        x="71"
        y="63"
        width="12"
        height="362"
        rx="1.5"
        fill="white"
        stroke="black"
        stroke-width="2"
      />
      <rect
        x="423"
        y="84"
        width="12"
        height="341"
        rx="1.5"
        fill="white"
        stroke="black"
        stroke-width="2"
      />
      <rect
        x="52"
        y="125"
        width="12"
        height="397"
        rx="1.5"
        transform="rotate(-90 52 125)"
        fill="white"
        stroke="black"
        stroke-width="2"
      />
      <circle cx="76.5" cy="119.5" r="1.5" fill="black" />
      <circle cx="428.5" cy="119.5" r="1.5" fill="black" />
    </>
  )
}

const HangBox = () => {
  return (
    <>
      <rect
        x="214"
        y="368"
        width="73"
        height="55"
        fill="white"
        stroke="black"
        stroke-width="2"
      />
      <rect
        x="219"
        y="373"
        width="63"
        height="46"
        fill="white"
        stroke="black"
        stroke-width="2"
      />
      <line
        x1="219.284"
        y1="378.588"
        x2="277.284"
        y2="418.588"
        stroke="black"
      />
      <line
        x1="278.804"
        y1="373.423"
        x2="219.267"
        y2="411.098"
        stroke="black"
      />
      <line
        x1="223.284"
        y1="372.588"
        x2="281.284"
        y2="412.588"
        stroke="black"
      />
      <line
        x1="281.804"
        y1="381.423"
        x2="222.267"
        y2="419.098"
        stroke="black"
      />
      <rect
        x="245.734"
        y="388.496"
        width="17"
        height="6.18513"
        transform="rotate(35.2977 245.734 388.496)"
        fill="white"
      />
    </>
  )
}

const HangRope = () => {
  return (
    <>
      <path
        d="M237.5 111V126.5C237.5 127.052 237.948 127.5 238.5 127.5V127.5C239.052 127.5 239.5 127.052 239.5 126.5V112.25C239.5 111.56 240.06 111 240.75 111V111C241.44 111 242 111.56 242 112.25V126.5C242 127.052 242.448 127.5 243 127.5V127.5C243.552 127.5 244 127.052 244 126.5V111V255"
        stroke="black"
        stroke-width="2"
      />
      <path
        id="hang-rope-hook"
        d="M221.5 283C221.073 272.335 237.39 259.122 242.189 255.473C242.95 254.894 243.993 254.97 244.671 255.644C248.817 259.766 262.575 274.086 263 283C263.5 293.5 251.5 305.5 243.5 306C235.5 306.5 222 295.5 221.5 283Z"
        stroke="black"
        stroke-width="2"
      />
    </>
  )
}

export { HangFrame, HangBox, HangRope }
