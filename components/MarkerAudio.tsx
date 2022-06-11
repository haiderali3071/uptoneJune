import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MarkerAudio(props : any) {
  return (
    <Svg
      width={16}
      height={108}
      viewBox="0 0 16 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M8 18v90" stroke="#D2AE9A" strokeWidth={1.5} />
      <Path
        d="M8.866 14.5a1 1 0 01-1.732 0l-5.196-9A1 1 0 012.804 4h10.392a1 1 0 01.866 1.5l-5.196 9z"
        fill="#D2AE9A"
      />
    </Svg>
  )
}

export default MarkerAudio
