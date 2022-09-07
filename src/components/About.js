import React from 'react'

export default function About(props) {

//   const [myStyle, setmyStyle] = useState({
//     color: 'black',
//     backgroundColor: 'white'
//   }) 
    let myStyle = {
        color: props.mode ==='dark'?'white':'#042743',
        backgroundColor: props.mode ==='dark'?'rgb(36 74 104)':'white',
    }

  return (
    <div className="container">
        <h1 className="my-3" style={{color: props.mode ==='dark'?'white':'#042743'}}>About Us</h1>
        <div className="accordion" id="accordionExample" >
        <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <strong>Keep your Note Secure</strong>    
            </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
            If person have so many important things to note and they wanted to keep it more secure and private so they can free to use this website through which they can access their data anytime they want and edit it and more comfortabily.    
            </div>
            </div>
        </div>
        <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <strong>Free to use</strong>    
            </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
            Attracting visitors requires new content to be added on a regular basis. Writing fresh and relevant content for a site is a full-time occupation for many, and it often isn’t realistic for those with other duties to produce weekly postings that might run to a thousand words or more.             </div>
            </div>
        </div>
        <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <strong>Browser Compatible</strong>    
            </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
            The term browser compatibility refers to the ability of a certain website to appear fully functional on different browsers that are available in the market. This means that the website’s HTML coding, as well as the scripts on that website, should be compatible to run on the browsers. This is of immense importance, especially today when there is a large variety of web browsers available.
            </div>
            </div>
        </div>
        </div>
        {/* <div className="container my-3" >
            <button type="button" onClick={toggleStyle} className="btn btn-primary">{btnText}</button>
        </div> */}
    </div>
  )
}