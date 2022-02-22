import React from 'react'

import './popup.css'

function Popup(props){
	return(props.trigger)?(

		<div id="popup1" className="overlay">
			<div className="popup">
				{props.children}
			</div>
		</div>
		) : "";
}

export default Popup