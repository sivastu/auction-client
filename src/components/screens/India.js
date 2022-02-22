import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import logo from '../../logo/img/banner1.jpg'
import coin from '../../logo/img/coin.png'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const India  = ()=>{
    const history = useHistory()
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Invisible India</title>
            <meta name="keywords" content="Tourist, india, indian Tourist,Travel,find new place,India travel"/>
            <meta name="author" content="Siva"/>
            <meta name="description" content="This Website Created For Indian Travelers.." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
        </HelmetProvider>
        <div className="col s12 m5">
          <div className="banner card horizontal">
            <div className="bannersize card-image">
              <img className=" logocss" src={logo} alt="loading..." />
            </div>
            <div className="card-stacked">
              <div className="card-content befarediv">
                <img className=" logocss coin" src={coin} alt="loading..." />
              </div>
            </div>
          </div>
        </div>
        <div className="quote card-stacked">
          <div className="card-content">
            <cite className="qu">&rdquo; Travel is an inverstment in yourself ! &rdquo;</cite>
          </div>
        </div>
        <div className="trcd row">
          <div className="col s6 m6">
            <div className="card">
              <div className="card-content">
                <p>Never</p>
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card">
              <div className="card-content">
                <p>Stop</p>
              </div>
            </div>
          </div>
          <div className="col s6 m6">
            <div className="card">
              <div className="card-content">
                <p>Traveling !</p>
              </div>
            </div>
          </div>
        </div>
        <footer className="foot page-footer">
          <div className="foots footer-copyright">
            <div className="fo container">
              <p>©2021 Invisible India<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to="/about">About<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></Link>
                <Link to="/contact">Contact<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></Link>
                <Link to="/guide">Guide</Link>
              </p>
            </div>
          </div>
        </footer>
      </>
   )
}

export default India